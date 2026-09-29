import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { PublicHomePage } from './pages/PublicHomePage';
import { PublicHomePageV2 } from './pages/PublicHomePageV2';
import { PublicHomePageV3 } from './pages/PublicHomePageV3';
import { PublicHomePageV4 } from './pages/PublicHomePageV4';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { SermonsPage } from './pages/SermonsPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { NotreVisionPage } from './pages/NotreVisionPage';
import { NotreEquipePage } from './pages/NotreEquipePage';
import { VieDeLeglisePage } from './pages/VieDeLeglisePage';
import { ContactUsPage } from './pages/ContactUsPage';
import { EventsPage } from './pages/EventsPage';

export function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PublicHomePage />} />
            <Route path="/accueil-v2" element={<PublicHomePageV2 />} />
            <Route path="/v2" element={<PublicHomePageV2 />} />
            <Route path="/accueil-v3" element={<PublicHomePageV3 />} />
            <Route path="/v3" element={<PublicHomePageV3 />} />
            <Route path="/accueil-v4" element={<PublicHomePageV4 />} />
            <Route path="/v4" element={<PublicHomePageV4 />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/notre-vision" element={<NotreVisionPage />} />
            <Route path="/notre-equipe-2" element={<NotreEquipePage />} />
            <Route path="/equipe" element={<NotreEquipePage />} />
            <Route path="/vie-de-leglise" element={<VieDeLeglisePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events-calendar" element={<EventsPage />} />
            <Route path="/evenements" element={<EventsPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/predications" element={<SermonsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
