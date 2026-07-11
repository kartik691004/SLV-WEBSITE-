import { useState } from 'react';
import { motion } from 'framer-motion';
import Badge from '../components/Badge.jsx';
import WaBtn from '../components/WaBtn.jsx';
import CallBtn from '../components/CallBtn.jsx';
import StarRating from '../components/StarRating.jsx';

export default function DetailPage({ prop, setPage }) {
    const [activeImg, setActiveImg] = useState(0);

    if (!prop) { setPage('home'); return null; }

    // Build images array — handle both single img and images array
    const images = prop.images && prop.images.length > 0 ? prop.images : [prop.img].filter(Boolean);

    return (
        <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', paddingBottom: 'var(--sp-12)' }}>
            {/* Full-bleed hero image */}
            <div style={{ position: 'relative', height: 'min(70vh, 560px)', overflow: 'hidden' }}>
                <motion.img
                    key={activeImg}
                    src={images[activeImg]}
                    alt={prop.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(10,10,11,0.85) 100%)' }} />

                {/* Overlay: badges top-left */}
                <div style={{ position: 'absolute', top: 'var(--sp-5)', left: 'var(--sp-5)', display: 'flex', gap: 8 }}>
                    <Badge status={prop.status} />
                    {prop.badge && <Badge status={prop.badge} />}
                </div>

                {/* Back button top-right */}
                <motion.button
                    onClick={() => setPage('properties')}
                    style={{ position: 'absolute', top: 'var(--sp-5)', right: 'var(--sp-5)', background: 'rgba(10,10,11,0.7)', backdropFilter: 'blur(12px)', border: '1px solid var(--stone-2)', borderRadius: 'var(--r-sm)', padding: '8px 14px', color: 'var(--ivory-2)', fontSize: '0.8125rem', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit' }}
                    whileTap={{ scale: 0.97 }}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                    Back
                </motion.button>

                {/* Property title overlay at bottom */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'var(--sp-6) var(--sp-7)' }}>
                    <div className="container">
                        <div style={{ display: 'flex', gap: 8, marginBottom: 'var(--sp-2)' }}>
                            {(prop.categories || [prop.category]).filter(Boolean).map(c => (
                                <span key={c} className="t-eyebrow" style={{ color: 'var(--champagne)' }}>{c}</span>
                            ))}
                        </div>
                        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400, color: 'var(--ivory)', lineHeight: 1.1 }}>
                            {prop.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Image thumbnail strip */}
            {images.length > 1 && (
                <div style={{ background: 'var(--charcoal-2)', borderBottom: '1px solid var(--stone)', padding: '12px 0' }}>
                    <div className="container">
                        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
                            {images.map((img, i) => (
                                <motion.button
                                    key={i}
                                    onClick={() => setActiveImg(i)}
                                    style={{ flexShrink: 0, width: 72, height: 52, borderRadius: 'var(--r-sm)', overflow: 'hidden', border: `2px solid ${i === activeImg ? 'var(--champagne)' : 'var(--stone)'}`, cursor: 'pointer', background: 'none', padding: 0 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Main content grid */}
            <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 'var(--sp-9)', paddingTop: 'var(--sp-8)', alignItems: 'start' }}>
                {/* LEFT */}
                <div>
                    {/* Address & location */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--ivory-3)', fontSize: '0.9375rem', marginBottom: 'var(--sp-7)' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                        {prop.address}
                    </div>

                    {/* Spec pills row */}
                    <div style={{ display: 'flex', gap: 'var(--sp-4)', flexWrap: 'wrap', marginBottom: 'var(--sp-8)', padding: 'var(--sp-5)', background: 'var(--charcoal-2)', border: '1px solid var(--stone)', borderRadius: 'var(--r-lg)' }}>
                        {[
                            prop.bhk && { label: 'Configuration', val: `${prop.bhk} BHK` },
                            { label: 'Area', val: `${prop.area} sqft` },
                            { label: 'Furnishing', val: prop.furnished },
                            { label: 'Possession', val: prop.possession || 'Ready to Move' },
                            prop.parking !== undefined && { label: 'Parking', val: prop.parking ? 'Available' : 'Not Available' },
                        ].filter(Boolean).map(spec => (
                            <div key={spec.label} style={{ flex: '1 1 120px' }}>
                                <div style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ivory-4)', marginBottom: 4 }}>{spec.label}</div>
                                <div style={{ fontWeight: 600, color: 'var(--ivory)', fontSize: '0.9375rem' }}>{spec.val}</div>
                            </div>
                        ))}
                    </div>

                    {/* Amenities */}
                    {prop.amenities && prop.amenities.length > 0 && (
                        <div style={{ marginBottom: 'var(--sp-8)' }}>
                            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', color: 'var(--ivory)', marginBottom: 'var(--sp-5)' }}>Amenities</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 'var(--sp-3)' }}>
                                {prop.amenities.map(a => (
                                    <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 'var(--sp-3) var(--sp-4)', background: 'var(--charcoal-2)', border: '1px solid var(--stone)', borderRadius: 'var(--r-md)' }}>
                                        <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--champagne-dim)', border: '1px solid var(--champagne-20)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--champagne)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                        </div>
                                        <span style={{ fontSize: '0.875rem', color: 'var(--ivory-2)', fontWeight: 500 }}>{a}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Listed by */}
                    {prop.listedBy && (
                        <div style={{ padding: 'var(--sp-4)', background: 'var(--charcoal-2)', border: '1px solid var(--stone)', borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
                            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--champagne-dim)', border: '1px solid var(--champagne-20)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--champagne)', fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 500 }}>
                                {prop.listedBy.charAt(0)}
                            </div>
                            <div>
                                <div style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ivory-4)', marginBottom: 2 }}>Listed By</div>
                                <div style={{ fontWeight: 600, color: 'var(--ivory)', fontSize: '0.875rem' }}>{prop.listedBy}</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT — Sticky pricing card */}
                <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 24px)' }}>
                    <div style={{ background: 'var(--charcoal-2)', border: '1px solid var(--stone)', borderRadius: 'var(--r-xl)', padding: 'var(--sp-6)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
                        <div>
                            <div style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ivory-4)', marginBottom: 'var(--sp-2)' }}>Listed Price</div>
                            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', fontWeight: 400, color: 'var(--champagne)', lineHeight: 1, letterSpacing: '-0.01em' }}>
                                {prop.price}
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
                            <CallBtn variant="primary" full label="Call Now" />
                            <WaBtn property={prop.title} full />
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .detail-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
}
