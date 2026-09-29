import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { HeroSection } from '../components/public/HeroSection';
import { ChurchHistory } from '../components/public/ChurchHistory';
import { TheologicalESI } from '../components/public/TheologicalESI';
import { LatestSermonPlayer } from '../components/public/LatestSermonPlayer';
import { PhotoGallery } from '../components/public/PhotoGallery';
import { EventsCalendar } from '../components/public/EventsCalendar';
import { InteractiveFAQ } from '../components/public/InteractiveFAQ';
import { ContactDonation } from '../components/public/ContactDonation';
import { Footer } from '../components/layout/Footer';
import { WhatsAppWidget } from '../components/public/WhatsAppWidget';

export const PublicHomePage: React.FC = () => {
  const [showDonateModal, setShowDonateModal] = useState(false);

  const handleOpenVisitModal = () => {
    const faqElement = document.getElementById('faq');
    if (faqElement) {
      faqElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      <Navbar 
        onOpenDonate={() => setShowDonateModal(true)} 
        onOpenVisitModal={handleOpenVisitModal}
      />
      
      <main className="flex-grow">
        <HeroSection 
          onOpenDonate={() => setShowDonateModal(true)} 
          onOpenVisitModal={handleOpenVisitModal}
        />
        <ChurchHistory />
        <TheologicalESI />
        <LatestSermonPlayer />
        <PhotoGallery />
        <EventsCalendar />
        <InteractiveFAQ />
        <ContactDonation showDonateModalInitial={showDonateModal} />
      </main>

      <Footer />
      <WhatsAppWidget />
    </div>
  );
};
