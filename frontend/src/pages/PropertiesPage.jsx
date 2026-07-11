import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../DataContext.jsx';
import Badge from '../components/Badge.jsx';
import { waLink } from '../utils.js';

function Reveal({ children, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    );
}

export default function PropertiesPage({ setPage, setSelectedProp, initialCategory = 'All' }) {
    const { properties } = useData();
    const [filters, setFilters] = useState({ category: initialCategory, location: 'All', bhk: 'All', furnished: 'All' });
    const [filtersOpen, setFiltersOpen] = useState(false);

    useEffect(() => { setFilters(f => ({ ...f, category: initialCategory })); }, [initialCategory]);

    const locations = ['All', ...new Set(properties.map(p => p.location))];
    const filtered = properties.filter(p => {
        const cats = p.categories || [p.category];
        if (filters.category !== 'All' && !cats.includes(filters.category)) return false;
        if (filters.location !== 'All' && p.location !== filters.location) return false;
        if (filters.bhk !== 'All' && String(p.bhk) !== filters.bhk) return false;
        if (filters.furnished !== 'All' && p.furnished !== filters.furnished) return false;
        return true;
    });

    const setF = (key, val) => setFilters(prev => ({ ...prev, [key]: val }));
    const resetFilters = () => setFilters({ category: 'All', location: 'All', bhk: 'All', furnished: 'All' });
    const hasActiveFilters = Object.values(filters).some(v => v !== 'All');

    return (
        <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
            {/* Page Header */}
            <div style={{ borderBottom: '1px solid var(--stone)', padding: 'var(--sp-9) 0', background: 'var(--charcoal-2)' }}>
                <div className="container">
                    <Reveal>
                        <div className="t-eyebrow" style={{ marginBottom: 'var(--sp-2)' }}>Browse</div>
                        <h1 className="t-display-lg" style={{ color: 'var(--ivory)' }}>All Properties</h1>
                        <p style={{ color: 'var(--ivory-3)', marginTop: 'var(--sp-2)', fontSize: '0.9375rem' }}>
                            {filtered.length} propert{filtered.length !== 1 ? 'ies' : 'y'} found
                            {hasActiveFilters ? ' · ' : ''}
                            {hasActiveFilters && <span style={{ color: 'var(--champagne)', cursor: 'pointer' }} onClick={resetFilters}>Clear filters</span>}
                        </p>
                    </Reveal>
                </div>
            </div>

            <div className="container" style={{ padding: 'var(--sp-7) var(--sp-7)', display: 'grid', gridTemplateColumns: '240px 1fr', gap: 'var(--sp-8)', alignItems: 'start' }}>
                {/* Sidebar Filters — desktop */}
                <aside style={{ position: 'sticky', top: 'calc(var(--nav-h) + 24px)' }} className="desktop-only">
                    <div style={{ background: 'var(--charcoal-2)', border: '1px solid var(--stone)', borderRadius: 'var(--r-lg)', padding: 'var(--sp-5)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ivory-4)' }}>Filters</div>

                        {/* Category */}
                        <div>
                            <div style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ivory-4)', marginBottom: 'var(--sp-3)' }}>Category</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {['All', 'Rent', 'Lease', 'Sale', 'Buy'].map(opt => (
                                    <button key={opt} onClick={() => setF('category', opt)} style={{
                                        background: filters.category === opt ? 'var(--champagne-dim)' : 'transparent',
                                        border: '1px solid',
                                        borderColor: filters.category === opt ? 'var(--champagne-20)' : 'transparent',
                                        color: filters.category === opt ? 'var(--champagne)' : 'var(--ivory-3)',
                                        borderRadius: 'var(--r-sm)', padding: '7px 12px',
                                        fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer',
                                        textAlign: 'left', transition: 'all 0.15s',
                                        fontFamily: 'inherit',
                                    }}>{opt}</button>
                                ))}
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <div style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ivory-4)', marginBottom: 'var(--sp-2)' }}>Location</div>
                            <select value={filters.location} onChange={e => setF('location', e.target.value)} className="field-input" style={{ background: 'var(--charcoal-3)' }}>
                                {locations.map(o => <option key={o}>{o}</option>)}
                            </select>
                        </div>

                        {/* BHK */}
                        <div>
                            <div style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ivory-4)', marginBottom: 'var(--sp-2)' }}>Configuration</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {['All', '1', '2', '3', '4', '5'].map(opt => (
                                    <button key={opt} onClick={() => setF('bhk', opt)} style={{
                                        padding: '5px 11px', borderRadius: 'var(--r-sm)', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer',
                                        background: filters.bhk === opt ? 'var(--champagne-dim)' : 'var(--charcoal-3)',
                                        color: filters.bhk === opt ? 'var(--champagne)' : 'var(--ivory-3)',
                                        border: '1px solid', borderColor: filters.bhk === opt ? 'var(--champagne-20)' : 'var(--stone)',
                                        transition: 'all 0.15s', fontFamily: 'inherit',
                                    }}>{opt === 'All' ? 'All' : `${opt} BHK`}</button>
                                ))}
                            </div>
                        </div>

                        {/* Furnished */}
                        <div>
                            <div style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ivory-4)', marginBottom: 'var(--sp-2)' }}>Furnishing</div>
                            <select value={filters.furnished} onChange={e => setF('furnished', e.target.value)} className="field-input" style={{ background: 'var(--charcoal-3)' }}>
                                {['All', 'Fully Furnished', 'Semi-Furnished', 'Unfurnished', 'Bare Shell'].map(o => <option key={o}>{o}</option>)}
                            </select>
                        </div>

                        {hasActiveFilters && (
                            <button onClick={resetFilters} className="btn btn-ghost btn-sm btn-full" style={{ marginTop: 'var(--sp-2)' }}>
                                Reset All Filters
                            </button>
                        )}
                    </div>
                </aside>

                {/* Listings */}
                <main>
                    {filtered.length > 0 ? (
                        <div>
                            {/* Alternating editorial rows */}
                            {filtered.map((property, i) => (
                                <Reveal key={property.id} delay={Math.min(i * 0.04, 0.2)}>
                                    <motion.div
                                        className="editorial-row"
                                        style={{
                                            borderRadius: i === 0 ? 'var(--r-lg) var(--r-lg) 0 0' : i === filtered.length - 1 ? '0 0 var(--r-lg) var(--r-lg)' : 0,
                                            overflow: 'hidden',
                                            border: '1px solid var(--stone)',
                                            borderBottom: '1px solid var(--stone)',
                                            marginBottom: i < filtered.length - 1 ? -1 : 0,
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => { setSelectedProp(property); setPage('detail'); }}
                                        whileHover={{ borderColor: 'var(--stone-2)' }}
                                    >
                                        {/* Image */}
                                        <div className={`editorial-row-img${i % 2 === 1 ? '' : ''}`} style={{ order: i % 2 === 0 ? 0 : 1 }}>
                                            <img src={property.img} alt={property.title} />
                                        </div>

                                        {/* Body */}
                                        <div className="editorial-row-body" style={{ order: i % 2 === 0 ? 1 : 0 }}>
                                            <div>
                                                <div style={{ display: 'flex', gap: 8, marginBottom: 'var(--sp-3)', flexWrap: 'wrap' }}>
                                                    <Badge status={property.status} />
                                                    {property.badge && <Badge status={property.badge} />}
                                                    {(property.categories || [property.category]).map(c => (
                                                        <span key={c} className="t-eyebrow" style={{ color: 'var(--ivory-4)' }}>{c}</span>
                                                    ))}
                                                </div>
                                                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 500, color: 'var(--ivory)', marginBottom: 'var(--sp-2)', lineHeight: 1.2 }}>{property.title}</h2>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--ivory-3)', fontSize: '0.875rem', marginBottom: 'var(--sp-5)' }}>
                                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                                    {property.address}
                                                </div>

                                                {/* Specs */}
                                                <div style={{ display: 'flex', gap: 'var(--sp-5)', marginBottom: 'var(--sp-6)' }}>
                                                    {property.bhk && <div><div style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ivory-4)', marginBottom: 2 }}>Config</div><div style={{ fontWeight: 600, color: 'var(--ivory)', fontSize: '0.9375rem' }}>{property.bhk} BHK</div></div>}
                                                    <div><div style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ivory-4)', marginBottom: 2 }}>Area</div><div style={{ fontWeight: 600, color: 'var(--ivory)', fontSize: '0.9375rem' }}>{property.area} sqft</div></div>
                                                    <div><div style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ivory-4)', marginBottom: 2 }}>Furnishing</div><div style={{ fontWeight: 600, color: 'var(--ivory)', fontSize: '0.9375rem' }}>{property.furnished}</div></div>
                                                </div>

                                                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.75rem', fontWeight: 500, color: 'var(--champagne)', marginBottom: 'var(--sp-6)' }}>{property.price}</div>

                                                <div style={{ display: 'flex', gap: 'var(--sp-3)' }}>
                                                    <motion.button
                                                        onClick={e => { e.stopPropagation(); setSelectedProp(property); setPage('detail'); }}
                                                        className="btn btn-primary"
                                                        whileTap={{ scale: 0.97 }}
                                                    >
                                                        View Details
                                                    </motion.button>
                                                    <motion.a
                                                        href={waLink(`Hello SLV Enterprises, I am interested in: ${property.title}`)}
                                                        target="_blank" rel="noreferrer"
                                                        className="btn btn-whatsapp"
                                                        onClick={e => e.stopPropagation()}
                                                        whileTap={{ scale: 0.97 }}
                                                    >
                                                        Enquire
                                                    </motion.a>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Reveal>
                            ))}
                        </div>
                    ) : (
                        <div style={{ minHeight: '40vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--sp-4)', textAlign: 'center' }}>
                            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--charcoal-2)', border: '1px solid var(--stone)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ivory-4)' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                            </div>
                            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', color: 'var(--ivory)' }}>No properties found</h3>
                            <p style={{ color: 'var(--ivory-3)', maxWidth: 320, fontSize: '0.9rem' }}>Try adjusting your filters to discover more properties.</p>
                            <button onClick={resetFilters} className="btn btn-primary">Clear Filters</button>
                        </div>
                    )}
                </main>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .prop-layout { grid-template-columns: 1fr !important; }
                    .editorial-row { grid-template-columns: 1fr !important; min-height: auto !important; }
                    .editorial-row-img { min-height: 240px !important; order: 0 !important; }
                    .editorial-row-body { order: 1 !important; padding: var(--sp-5) var(--sp-4) !important; }
                }
            `}</style>
        </div>
    );
}
