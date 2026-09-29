import React, { useState, useRef, useEffect } from 'react';
import { Upload, Crop, RotateCw, ZoomIn, ZoomOut, Check, X, Image as ImageIcon, RefreshCw, Maximize2 } from 'lucide-react';

interface ImageCropperModalProps {
  isOpen: boolean;
  initialImage?: string;
  onClose: () => void;
  onCropComplete: (croppedDataUrl: string) => void;
  aspectRatioPreset?: '4:3' | '16:9' | '1:1' | 'original';
}

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  isOpen,
  initialImage,
  onClose,
  onCropComplete,
  aspectRatioPreset = 'original'
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(initialImage || null);
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [aspectRatio, setAspectRatio] = useState<'4:3' | '16:9' | '1:1' | 'original'>(aspectRatioPreset);
  const [naturalRatio, setNaturalRatio] = useState<number>(4 / 3);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialImage) {
      setImageSrc(initialImage);
    }
  }, [initialImage]);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageSrc(event.target.result as string);
          setZoom(1);
          setRotation(0);
          setPan({ x: 0, y: 0 });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    if (img.naturalWidth && img.naturalHeight) {
      setNaturalRatio(img.naturalWidth / img.naturalHeight);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageSrc(event.target.result as string);
          setZoom(1);
          setRotation(0);
          setPan({ x: 0, y: 0 });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Pointer drag handlers for repositioning image inside viewport
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore pointer capture errors
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomDelta = e.deltaY < 0 ? 0.1 : -0.1;
    setZoom(prev => Math.min(Math.max(1, prev + zoomDelta), 3));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleReset = () => {
    setZoom(1);
    setRotation(0);
    setPan({ x: 0, y: 0 });
  };

  // Compute crop box style & aspect ratio so it NEVER gets cut off
  const getCropBoxOverlayClassAndStyle = () => {
    let ratio = naturalRatio;
    if (aspectRatio === '4:3') ratio = 4 / 3;
    else if (aspectRatio === '16:9') ratio = 16 / 9;
    else if (aspectRatio === '1:1') ratio = 1;
    else if (aspectRatio === 'original') {
      const isSwapped = rotation === 90 || rotation === 270;
      ratio = isSwapped ? (1 / naturalRatio) : naturalRatio;
    }

    return {
      className: "crop-overlay-box absolute pointer-events-none z-10 border-2 border-[rgb(53,125,122)] shadow-[0_0_0_9999px_rgba(0,0,0,0.65)] transition-all rounded-xs",
      style: {
        aspectRatio: `${ratio}`,
        maxWidth: 'calc(100% - 2.5rem)',
        maxHeight: 'calc(100% - 2.5rem)',
        width: '100%',
        height: '100%',
        margin: 'auto'
      }
    };
  };

  // Export cropped canvas
  const handleCropSave = () => {
    if (!imageRef.current || !imageSrc) return;

    const img = imageRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Full lossless original export if unmodified in original mode
    if (aspectRatio === 'original' && pan.x === 0 && pan.y === 0 && zoom === 1 && rotation === 0) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      onCropComplete(dataUrl);
      onClose();
      return;
    }

    let targetWidth = 1200;
    let targetHeight = 900;

    if (aspectRatio === 'original') {
      const origW = img.naturalWidth || 1200;
      const origH = img.naturalHeight || 900;
      let w = origW;
      let h = origH;
      if (rotation === 90 || rotation === 270) {
        w = origH;
        h = origW;
      }
      targetWidth = w;
      targetHeight = h;
    } else if (aspectRatio === '16:9') {
      targetWidth = 1280;
      targetHeight = 720;
    } else if (aspectRatio === '1:1') {
      targetWidth = 900;
      targetHeight = 900;
    } else { // 4:3
      targetWidth = 1200;
      targetHeight = 900;
    }

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    // Background fill white
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, targetWidth, targetHeight);

    ctx.save();
    // Center of canvas
    ctx.translate(targetWidth / 2, targetHeight / 2);
    ctx.rotate((rotation * Math.PI) / 180);

    // Calculate scale factor using actual rendered crop box dimensions
    const containerElem = containerRef.current;
    const cropBoxElem = containerElem?.querySelector('.crop-overlay-box') as HTMLElement;
    const cropBoxW = cropBoxElem ? cropBoxElem.clientWidth : (containerElem?.clientWidth || 400) * 0.8;

    const scaleFactor = targetWidth / cropBoxW;
    const drawWidth = img.naturalWidth * zoom * scaleFactor;
    const drawHeight = img.naturalHeight * zoom * scaleFactor;

    ctx.drawImage(
      img,
      -drawWidth / 2 + pan.x * scaleFactor,
      -drawHeight / 2 + pan.y * scaleFactor,
      drawWidth,
      drawHeight
    );

    ctx.restore();

    const dataUrl = canvas.toDataURL('image/jpeg', 0.90);
    onCropComplete(dataUrl);
    onClose();
  };

  const cropOverlay = getCropBoxOverlayClassAndStyle();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-[rgb(53,125,122)]/10 text-[rgb(53,125,122)] flex items-center justify-center font-bold">
              <Crop className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[rgb(55,69,90)]">Uploader & Recadrer la Photo</h3>
              <p className="text-[11px] text-slate-500">Ajustez le format (Original complet, 4:3, 16:9, 1:1), le zoom et le cadrage.</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {!imageSrc ? (
          /* Dropzone / Upload state */
          <div 
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-[rgb(53,125,122)] rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition bg-slate-50/50 hover:bg-teal-50/20 text-center space-y-3 min-h-[260px]"
          >
            <div className="w-14 h-14 rounded-2xl bg-[rgb(53,125,122)]/10 text-[rgb(53,125,122)] flex items-center justify-center shadow-xs">
              <Upload className="w-7 h-7" />
            </div>
            <div>
              <span className="block font-bold text-sm text-slate-800">Cliquez pour choisir un fichier photo</span>
              <span className="block text-xs text-slate-500 mt-1">ou glissez-déposez votre image ici (JPG, PNG, WEBP)</span>
            </div>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              onChange={handleFileSelect} 
              className="hidden" 
            />
          </div>
        ) : (
          /* Interactive Crop Canvas Viewport */
          <div className="space-y-4 flex-1 flex flex-col min-h-0">
            
            {/* Viewport Frame */}
            <div 
              ref={containerRef}
              onWheel={handleWheel}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className="relative w-full h-80 sm:h-96 bg-slate-950 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none flex items-center justify-center border border-slate-800 shadow-inner p-4"
            >
              {/* Cropping Grid Overlay with Visible Corner Handles */}
              <div 
                className={cropOverlay.className}
                style={cropOverlay.style}
              >
                {/* 4 Corner Markers */}
                <div className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 border-t-3 border-l-3 border-[rgb(53,125,122)] bg-white shadow-xs"></div>
                <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 border-t-3 border-r-3 border-[rgb(53,125,122)] bg-white shadow-xs"></div>
                <div className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 border-b-3 border-l-3 border-[rgb(53,125,122)] bg-white shadow-xs"></div>
                <div className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 border-b-3 border-r-3 border-[rgb(53,125,122)] bg-white shadow-xs"></div>

                <div className="w-full h-full grid grid-cols-3 grid-rows-3">
                  <div className="border-r border-b border-white/30"></div>
                  <div className="border-r border-b border-white/30"></div>
                  <div className="border-b border-white/30"></div>
                  <div className="border-r border-b border-white/30"></div>
                  <div className="border-r border-b border-white/30"></div>
                  <div className="border-b border-white/30"></div>
                  <div className="border-r border-white/30"></div>
                  <div className="border-r border-white/30"></div>
                  <div></div>
                </div>
              </div>

              {/* Transformable Image */}
              <img
                ref={imageRef}
                src={imageSrc}
                alt="Original"
                onLoad={handleImageLoad}
                draggable={false}
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom}) rotate(${rotation}deg)`,
                  transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                }}
                className="max-w-full max-h-full object-contain pointer-events-none"
              />
            </div>

            {/* Controls Bar */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-3">
              
              {/* Aspect Ratio Selector & Reset */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-1 bg-white p-1 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 px-2">Format:</span>
                  {[
                    { id: 'original', label: 'Original complet', icon: Maximize2 },
                    { id: '4:3', label: '4:3' },
                    { id: '16:9', label: '16:9' },
                    { id: '1:1', label: '1:1' }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setAspectRatio(item.id as any);
                        if (item.id === 'original') {
                          handleReset();
                        }
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center space-x-1 ${
                        aspectRatio === item.id 
                          ? 'bg-[rgb(53,125,122)] text-white shadow-xs' 
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {item.icon && <item.icon className="w-3 h-3" />}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleRotate}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[rgb(53,125,122)] hover:bg-slate-100 text-xs font-bold flex items-center space-x-1 shadow-xs transition"
                    title="Pivoter de 90°"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Pivoter</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-xs transition"
                    title="Réinitialiser zoom et position"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition flex items-center space-x-1"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Changer</span>
                  </button>
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileSelect} 
                    className="hidden" 
                  />
                </div>
              </div>

              {/* Zoom Slider */}
              <div className="flex items-center space-x-3 px-1">
                <ZoomOut className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full accent-[rgb(53,125,122)] h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
                <ZoomIn className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-[11px] font-mono text-slate-500 w-10 text-right">{zoom.toFixed(1)}x</span>
              </div>

            </div>

          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end space-x-3 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold text-xs transition"
          >
            Annuler
          </button>
          
          {imageSrc && (
            <button
              type="button"
              onClick={handleCropSave}
              className="px-5 py-2.5 rounded-xl bg-[rgb(53,125,122)] hover:bg-[rgb(38,92,90)] text-white font-bold text-xs shadow-md transition flex items-center space-x-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Valider & Enregistrer l'image</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
