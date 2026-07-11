import Logo from './Logo.jsx';
import { waLink } from '../utils.js';

export default function Footer({ setPage }) {
    const year = new Date().getFullYear();
    return (
        <footer style={{ background: 'var(--charcoal-2)', borderTop: '1px solid var(--stone)' }}>
            <div className="container" style={{ padding: 'var(--sp-12) var(--sp-7) var(--sp-7)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 'var(--sp-9)', marginBottom: 'var(--sp-10)' }}>
                    {/* Brand */}
                    <div>
                        <Logo size="lg" />
                        <p style={{ color: 'var(--ivory-3)', fontSize: '0.875rem', lineHeight: 1.7, marginTop: 'var(--sp-4)', maxWidth: 280 }}>
                            Premium real estate brokerage for modern professionals and enterprises across Bangalore's finest neighbourhoods.
                        </p>
                        <div style={{ display: 'flex', gap: 'var(--sp-3)', marginTop: 'var(--sp-5)' }}>
                            <a href={waLink()} target="_blank" rel="noreferrer"
                                style={{ width: 36, height: 36, borderRadius: 'var(--r-sm)', border: '1px solid var(--stone-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ivory-3)', transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = '#22C55E'; e.currentTarget.style.color = '#22C55E'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--stone-2)'; e.currentTarget.style.color = 'var(--ivory-3)'; }}
                                aria-label="WhatsApp"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                            </a>
                            <a href="#" style={{ width: 36, height: 36, borderRadius: 'var(--r-sm)', border: '1px solid var(--stone-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ivory-3)', transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--champagne)'; e.currentTarget.style.color = 'var(--champagne)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--stone-2)'; e.currentTarget.style.color = 'var(--ivory-3)'; }}
                                aria-label="Instagram"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                            </a>
                            <a href="#" style={{ width: 36, height: 36, borderRadius: 'var(--r-sm)', border: '1px solid var(--stone-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ivory-3)', transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--champagne)'; e.currentTarget.style.color = 'var(--champagne)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--stone-2)'; e.currentTarget.style.color = 'var(--ivory-3)'; }}
                                aria-label="LinkedIn"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <div style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ivory-4)', marginBottom: 'var(--sp-4)' }}>Services</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {[['Rentals', 'rent'], ['Commercial Lease', 'lease'], ['Buy Property', 'purchase'], ['Sell Property', 'sell']].map(([label, key]) => (
                                <button key={key} onClick={() => setPage(key)}
                                    style={{ background: 'none', border: 'none', color: 'var(--ivory-3)', fontSize: '0.875rem', textAlign: 'left', cursor: 'pointer', padding: 0, transition: 'color 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.color = 'var(--ivory)'}
                                    onMouseLeave={e => e.currentTarget.style.color = 'var(--ivory-3)'}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <div style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ivory-4)', marginBottom: 'var(--sp-4)' }}>Company</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {[['About Us', 'about'], ['Properties', 'properties'], ['Reviews', 'reviews'], ['Contact', 'contact']].map(([label, key]) => (
                                <button key={key} onClick={() => setPage(key)}
                                    style={{ background: 'none', border: 'none', color: 'var(--ivory-3)', fontSize: '0.875rem', textAlign: 'left', cursor: 'pointer', padding: 0, transition: 'color 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.color = 'var(--ivory)'}
                                    onMouseLeave={e => e.currentTarget.style.color = 'var(--ivory-3)'}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <div style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ivory-4)', marginBottom: 'var(--sp-4)' }}>Reach Us</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <a href="tel:+918618327882" style={{ color: 'var(--ivory-3)', fontSize: '0.875rem', transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = 'var(--champagne)'}
                                onMouseLeave={e => e.currentTarget.style.color = 'var(--ivory-3)'}
                            >
                                +91 86183 27882
                            </a>
                            <span style={{ color: 'var(--ivory-4)', fontSize: '0.875rem' }}>Bangalore, Karnataka</span>
                            <span style={{ color: 'var(--ivory-4)', fontSize: '0.8125rem' }}>Mon–Sat, 9 AM – 8 PM</span>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{ borderTop: '1px solid var(--stone)', paddingTop: 'var(--sp-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--sp-3)' }}>
                    <div style={{ color: 'var(--ivory-4)', fontSize: '0.8125rem' }}>
                        © {year} SLV Enterprises. All rights reserved.
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--sp-5)' }}>
                        {['Privacy Policy', 'Terms of Service'].map(l => (
                            <span key={l} style={{ color: 'var(--ivory-4)', fontSize: '0.8125rem', cursor: 'pointer', transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = 'var(--ivory-3)'}
                                onMouseLeave={e => e.currentTarget.style.color = 'var(--ivory-4)'}
                            >{l}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Responsive footer grid */}
            <style>{`
                @media (max-width: 1024px) {
                    .footer-grid { grid-template-columns: 1fr 1fr !important; }
                }
                @media (max-width: 640px) {
                    .footer-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </footer>
    );
}
