import React, { useEffect, useRef, useState } from 'react';
import { Video, Music, Check, RefreshCw, Moon, Sun, Play } from 'lucide-react';
import type { Sermon } from '../../types';

interface CustomVideoPlayerProps {
  sermon: Sermon;
  onClose?: () => void;
}

const getYouTubeEmbedUrl = (rawUrl?: string): string | null => {
  if (!rawUrl) return null;
  const str = rawUrl.trim();
  
  // Extract URL if user pasted a full <iframe src="..."> tag
  const iframeMatch = str.match(/src=["']([^"']+)["']/);
  const target = iframeMatch ? iframeMatch[1] : str;

  const ytReg = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = target.match(ytReg);

  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0&modestbranding=1`;
  }
  return null;
};

export const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ sermon }) => {
  const hasVideo = Boolean(sermon.videoUrl && sermon.videoUrl.trim() !== '');
  const hasAudio = Boolean(sermon.audioUrl && sermon.audioUrl.trim() !== '');

  const [mediaMode, setMediaMode] = useState<'video' | 'audio'>(() => {
    if (hasVideo) return 'video';
    if (hasAudio) return 'audio';
    return 'video';
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    setIsPlaying(false);
  }, [sermon.id, mediaMode]);

  useEffect(() => {
    if (hasVideo && !hasAudio) {
      setMediaMode('video');
    } else if (hasAudio && !hasVideo) {
      setMediaMode('audio');
    } else if (hasVideo && hasAudio) {
      if (sermon.mediaFormat === 'audio') {
        setMediaMode('audio');
      } else {
        setMediaMode('video');
      }
    }
  }, [sermon.id, sermon.videoUrl, sermon.audioUrl, sermon.mediaFormat, hasVideo, hasAudio]);

  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return document.documentElement.classList.contains('dark') || localStorage.getItem('ebv_theme') === 'dark';
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ebv_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ebv_theme', 'light');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const ytEmbedUrl = getYouTubeEmbedUrl(sermon.videoUrl);

  return (
    <div className={`rounded-3xl border shadow-2xl overflow-hidden animate-fadeIn transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-900 border-slate-800 text-white'
    }`}>
      
      {/* Wave animation styling */}
      <style>{`
        @keyframes audioWaveAnimation {
          0%, 100% {
            height: 8px;
            opacity: 0.4;
            transform: translateY(0px);
          }
          50% {
            height: 38px;
            opacity: 1;
            transform: translateY(-2px);
          }
        }
      `}</style>
      
      {/* Top Header inside Player */}
      <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/90 gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-300">
            {hasVideo && hasAudio ? 'Lecteur Média (Vidéo & Audio)' : hasVideo ? 'Lecteur Vidéo HD EGBV' : 'Lecteur Audio EGBV'}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Mode Nuit / Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 transition-colors flex items-center space-x-1.5 text-xs font-semibold border border-slate-700"
            title="Activer/Désactiver le Mode Nuit"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline text-slate-200">Mode Jour</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-amber-300" />
                <span className="hidden sm:inline text-slate-200">Mode Nuit</span>
              </>
            )}
          </button>

          {/* Media Selector: Render conditionally based on available formats */}
          {hasVideo && hasAudio ? (
            <div className="flex items-center space-x-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/50">
              <button
                onClick={() => setMediaMode('video')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                  mediaMode === 'video' ? 'bg-[rgb(53,125,122)] text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Vidéo HD</span>
              </button>
              <button
                onClick={() => setMediaMode('audio')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                  mediaMode === 'audio' ? 'bg-[rgb(53,125,122)] text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Music className="w-3.5 h-3.5" />
                <span>Audio MP3</span>
              </button>
            </div>
          ) : (
            <div className="px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700/50 text-xs font-bold text-teal-300 flex items-center space-x-1.5">
              {hasVideo ? <Video className="w-3.5 h-3.5" /> : <Music className="w-3.5 h-3.5" />}
              <span>{hasVideo ? 'Vidéo Uniquement' : 'Audio Uniquement'}</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Main Player Display Area (8 cols) */}
        <div className="lg:col-span-8 bg-black relative aspect-video flex items-center justify-center overflow-hidden">
          {mediaMode === 'video' ? (
            !isPlaying ? (
              /* Thumbnail Poster with Play Button Overlay */
              <div 
                onClick={() => setIsPlaying(true)}
                className="w-full h-full relative cursor-pointer group overflow-hidden bg-slate-950"
              >
                <img 
                  src={sermon.thumbnail || "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80"} 
                  alt={sermon.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col items-center justify-center p-6 text-center">
                  <div 
                    className="w-20 h-20 rounded-full bg-[rgb(53,125,122)]/90 hover:bg-[rgb(53,125,122)] border-2 border-white/80 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300 mb-3"
                    title="Lancer la lecture"
                  >
                    <Play className="w-9 h-9 fill-current ml-1 text-white" />
                  </div>
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/60 text-teal-300 backdrop-blur-md border border-white/10">
                    Cliquez pour lancer la vidéo
                  </span>
                </div>
              </div>
            ) : ytEmbedUrl ? (
              /* YouTube Embed Player */
              <div className="w-full h-full relative bg-black flex items-center justify-center overflow-hidden">
                <iframe
                  key={sermon.id + ytEmbedUrl}
                  src={ytEmbedUrl}
                  title={sermon.title}
                  className="w-full h-full border-0 absolute inset-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              /* Direct HTML5 Video Player */
              <div className="w-full h-full relative bg-black flex items-center justify-center overflow-hidden">
                <video
                  key={sermon.id + (sermon.videoUrl || '')}
                  poster={sermon.thumbnail}
                  controls
                  autoPlay
                  controlsList="nodownload"
                  className="w-full h-full object-contain bg-black"
                >
                  <source src={sermon.videoUrl} type={sermon.videoUrl?.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
                  Votre navigateur ne supporte pas la lecture de vidéo HTML5.
                </video>
              </div>
            )
          ) : (
            /* Custom Audio Visualizer Mode */
            <div className="w-full h-full bg-gradient-to-br from-slate-950 via-[rgb(55,69,90)] to-slate-950 p-8 flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden">
              
              {/* Background ambient glow */}
              <div className="absolute w-72 h-72 bg-[rgb(53,125,122)]/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

              <div className="relative z-10">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[rgb(53,125,122)] to-[rgb(55,69,90)] border-2 border-[rgb(73,155,152)]/50 flex items-center justify-center text-white shadow-2xl mb-4 mx-auto group-hover:scale-105 transition-transform">
                  <Music className="w-10 h-10 text-teal-200" />
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  Mode Audio HD
                </span>
                <h3 className="text-xl font-extrabold text-white mt-2 max-w-md line-clamp-1">{sermon.title}</h3>
                <p className="text-xs text-slate-300 mt-1">{sermon.speaker}</p>
              </div>

              <audio 
                ref={audioRef}
                key={sermon.id + (sermon.audioUrl || '')}
                src={sermon.audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"}
                onPlay={() => setIsAudioPlaying(true)}
                onPause={() => setIsAudioPlaying(false)}
                onEnded={() => setIsAudioPlaying(false)}
                controls
                className="w-full max-w-md relative z-10 accent-[rgb(53,125,122)]"
              />

              {/* Undulating Audio Wave Visualizer Dots */}
              <div className="flex items-center space-x-2 h-12 z-10 px-6 py-2 bg-slate-950/50 rounded-full border border-[rgb(73,155,152)]/30 backdrop-blur-md shadow-inner">
                {[...Array(16)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-2 rounded-full bg-gradient-to-t from-[rgb(53,125,122)] to-teal-200 transition-all duration-300"
                    style={{ 
                      animation: isAudioPlaying ? 'audioWaveAnimation 1.2s ease-in-out infinite' : 'none',
                      animationDelay: `${((i % 8) * 0.12).toFixed(2)}s`,
                      height: isAudioPlaying ? undefined : '8px',
                      opacity: isAudioPlaying ? 0.95 : 0.4
                    }} 
                  />
                ))}
              </div>

            </div>
          )}
        </div>

        {/* Sidebar info (4 cols) */}
        <div className="lg:col-span-4 p-6 sm:p-8 bg-slate-900 border-l border-slate-800 text-slate-300 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[rgb(53,125,122)]/20 text-teal-300 border border-[rgb(53,125,122)]/30">
                {sermon.category}
              </span>
              <span className="text-xs text-slate-400 font-mono font-semibold">
                {sermon.duration || "45 min"}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white leading-snug">{sermon.title}</h3>

            <div className="space-y-2 text-xs text-slate-300 pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Orateur :</span>
                <span className="font-semibold text-white">{sermon.speaker}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Date :</span>
                <span className="font-semibold text-white">
                  {new Date(sermon.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed pt-3 border-t border-slate-800/60">
              {sermon.description}
            </p>
          </div>

          <div className="pt-6 border-t border-slate-800 mt-6">
            <button
              onClick={handleCopyLink}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center space-x-2 transition border border-slate-700"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Lien copié !</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 text-teal-400" />
                  <span>Partager ce message</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};



