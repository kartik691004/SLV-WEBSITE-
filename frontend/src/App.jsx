import { lazy, Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Context
import { useData } from './DataContext.jsx';

// Core layout components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import FloatingWa from './components/FloatingWa.jsx';

// Public pages
import HomePage from './pages/HomePage.jsx';
import PropertiesPage from './pages/PropertiesPage.jsx';
import DetailPage from './pages/DetailPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ReviewsPage from './pages/ReviewsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import RentPage from './pages/RentPage.jsx';
import LeasePage from './pages/LeasePage.jsx';
import SellPage from './pages/SellPage.jsx';
import PurchasePage from './pages/PurchasePage.jsx';

const AdminLoginPage = lazy(() => import('./admin/AdminLoginPage.jsx'));
const AdminDashboard = lazy(() => import('./admin/AdminDashboard.jsx'));

function App() {
    const { token } = useData();
    const [page, setPage] = useState('home');
    const [selectedProp, setSelectedProp] = useState(null);

    // Scroll to top on page change
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [page, selectedProp]);

    // Handle initial routing from URL path
    useEffect(() => {
        const path = window.location.pathname.replace('/', '').toLowerCase();
        if (path === 'admin') setPage(token ? 'admin_dashboard' : 'admin_login');
        else if (path === 'admin/dashboard') setPage(token ? 'admin_dashboard' : 'admin_login');
        else if (['properties', 'about', 'reviews', 'contact', 'rent', 'lease', 'sell', 'purchase'].includes(path)) {
            setPage(path);
        }
    }, [token]);

    // Update URL when page changes
    useEffect(() => {
        let path = '/';
        if (page === 'admin_dashboard') path = '/admin/dashboard';
        else if (page === 'admin_login') path = '/admin';
        else if (page !== 'home' && page !== 'detail') path = '/' + page;
        window.history.pushState(null, '', path);
    }, [page]);

    // Is this an admin route?
    const isAdmin = page.startsWith('admin');

    return (
        <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
            
            {/* Show Navbar unless we are in the admin dashboard (login still shows nav) */}
            {page !== 'admin_dashboard' && <Navbar page={page} setPage={setPage} />}
            
            <AnimatePresence mode="wait">
                <motion.div
                    key={page + (page === 'detail' && selectedProp ? selectedProp.id : '')}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
                >
                    {/* Public Routing */}
                    {page === 'home'       && <HomePage setPage={setPage} setSelectedProp={setSelectedProp} />}
                    {page === 'properties' && <PropertiesPage setPage={setPage} setSelectedProp={setSelectedProp} />}
                    {page === 'detail'     && <DetailPage prop={selectedProp} setPage={setPage} />}
                    {page === 'about'      && <AboutPage />}
                    {page === 'reviews'    && <ReviewsPage />}
                    {page === 'contact'    && <ContactPage />}
                    
                    {/* Services Routing */}
                    {page === 'rent'       && <RentPage setPage={setPage} />}
                    {page === 'lease'      && <LeasePage setPage={setPage} />}
                    {page === 'sell'       && <SellPage setPage={setPage} />}
                    {page === 'purchase'   && <PurchasePage setPage={setPage} />}
                    
                    {/* Admin Routing */}
                    {page === 'admin_login' && (
                        <Suspense fallback={null}>
                            <AdminLoginPage setPage={setPage} />
                        </Suspense>
                    )}
                    {page === 'admin_dashboard' && (
                        <Suspense fallback={null}>
                            <AdminDashboard setPage={setPage} />
                        </Suspense>
                    )}
                    
                </motion.div>
            </AnimatePresence>

            {/* Show Footer and floating WhatsApp button unless on admin routes */}
            {!isAdmin && <Footer setPage={setPage} />}
            {!isAdmin && <FloatingWa />}
            
        </div>
    );
}

export default App;
