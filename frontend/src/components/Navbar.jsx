import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo.jsx';
import { waLink } from '../utils.js';

export default function Navbar({ page, setPage }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close menu on page change
    useEffect(() => { setMenuOpen(false); }, [page]);

    const navLinks = [
        { label: 'Properties', key: 'properties' },
        { label: 'About', key: 'about' },
        { label: 'Reviews', key: 'reviews' },
        { label: 'Contact', key: 'contact' },
    ];

    return (
        <>
            <header className={`nav-root${scrolled ? ' scrolled' : ''}`}>
                <div className="container flex-between" style={{ height: '100%' }}>
                    {/* Logo */}
                    <Logo size="md" onClick={() => setPage('home')} />

                    {/* Desktop Nav */}
                    <nav className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
                        {navLinks.map(l => (
                            <button
                                key={l.key}
                                onClick={() => setPage(l.key)}
                                className={`nav-link${page === l.key ? ' active' : ''}`}
                            >
                                {l.label}
                            </button>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <a
                            href={waLink()}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-ghost btn-sm"
                            style={{ color: '#22C55E', borderColor: 'rgba(34,197,94,0.25)' }}
                        >
                            WhatsApp
                        </a>
                        <motion.button
                            onClick={() => setPage('admin')}
                            className="btn btn-primary btn-sm"
                            whileTap={{ scale: 0.97 }}
                        >
                            Dashboard
                        </motion.button>
                    </div>

                    {/* Mobile hamburger */}
                    <motion.button
                        onClick={() => setMenuOpen(v => !v)}
                        style={{ display: 'none', background: 'none', border: 'none', color: 'var(--ivory-2)', cursor: 'pointer', padding: 6 }}
                        className="mobile-menu-btn"
                        aria-label="Open menu"
                        whileTap={{ scale: 0.93 }}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            {menuOpen
                                ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                                : <><line x1="3" y1="8" x2="21" y2="8" /><line x1="3" y1="16" x2="21" y2="16" /></>
                            }
                        </svg>
                    </motion.button>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        style={{ justifyContent: 'space-between' }}
                    >
                        <div>
                            <div style={{ marginBottom: 48 }}>
                                <Logo size="lg" onClick={() => setPage('home')} />
                            </div>
                            <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {[{ label: 'Home', key: 'home' }, ...navLinks].map(l => (
                                    <motion.button
                                        key={l.key}
                                        onClick={() => { setPage(l.key); setMenuOpen(false); }}
                                        style={{
                                            background: 'none', border: 'none',
                                            fontFamily: "'Cormorant Garamond', serif",
                                            fontSize: '2.2rem', fontWeight: 400,
                                            color: page === l.key ? 'var(--champagne)' : 'var(--ivory-3)',
                                            textAlign: 'left', cursor: 'pointer',
                                            padding: '8px 0',
                                            transition: 'color 0.2s',
                                        }}
                                        whileTap={{ x: 8 }}
                                    >
                                        {l.label}
                                    </motion.button>
                                ))}
                            </nav>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <motion.button
                                onClick={() => { setPage('admin'); setMenuOpen(false); }}
                                className="btn btn-primary btn-full btn-lg"
                                whileTap={{ scale: 0.98 }}
                            >
                                Admin Dashboard
                            </motion.button>
                            <a
                                href={waLink()}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-whatsapp btn-full btn-lg"
                                onClick={() => setMenuOpen(false)}
                            >
                                Chat on WhatsApp
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @media (max-width: 768px) {
                    .mobile-menu-btn { display: flex !important; }
                }
            `}</style>
        </>
    );
}
