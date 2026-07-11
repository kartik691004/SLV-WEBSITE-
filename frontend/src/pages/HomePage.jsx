import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useData } from '../DataContext.jsx';
import PropertyCard from '../components/PropertyCard.jsx';
import WaBtn from '../components/WaBtn.jsx';
import CallBtn from '../components/CallBtn.jsx';
import StarRating from '../components/StarRating.jsx';
import { waLink } from '../utils.js';

// ── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target, duration = 1800, start = false) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime = null;
        const step = ts => {
            if (!startTime) startTime = ts;
            const progress = Math.min((ts - startTime) / duration, 1);
            setVal(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target, duration, start]);
    return val;
}

// ── Reveal animation wrapper ──────────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 24, style }) {
    return (
        <motion.div
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
            style={style}
        >
            {children}
        </motion.div>
    );
}

export default function HomePage({ setPage, setSelectedProp }) {
    const { properties, reviews } = useData();
    const heroRef = useRef(null);
    const statsRef = useRef(null);
    const [statsVisible, setStatsVisible] = useState(false);
    const [reviewIdx, setReviewIdx] = useState(0);

    // Scroll-linked hero parallax
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 600], [0, 100]);
    const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

    // Stats count up
    const p = useCountUp(500, 2000, statsVisible);
    const c = useCountUp(1200, 2000, statsVisible);
    const d = useCountUp(850, 2000, statsVisible);
    const y = useCountUp(12, 2000, statsVisible);

    const approvedReviews = reviews?.filter(r => r.isApproved) || [];

    // Testimonial auto-advance
    useEffect(() => {
        if (approvedReviews.length === 0) return;
        const t = setInterval(() => setReviewIdx(i => (i + 1) % approvedReviews.length), 6000);
        return () => clearInterval(t);
    }, [approvedReviews.length]);

    // Stats IntersectionObserver
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
        if (statsRef.current) obs.observe(statsRef.current);
        return () => obs.disconnect();
    }, []);

    const featured = properties.filter(p => p.status !== 'Sold').slice(0, 4);
    const heroProperty = featured[0];
    const railProperties = featured.slice(1);

    return (
        <div>
            {/* ── CINEMATIC HERO ──────────────────────────────────────────── */}
            <section ref={heroRef} style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
                {/* Background */}
                <motion.div
                    style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: `url(${heroProperty?.img || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80'})`,
                        backgroundSize: 'cover', backgroundPosition: 'center',
                        y: heroY,
                    }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,11,0.92) 45%, rgba(10,10,11,0.55) 80%, rgba(10,10,11,0.2) 100%)' }} />
                <div style={{ position: 'absolute', inset: 0 }} className="arch-grid" style2={{ opacity: 0.15 }} />

                <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 'var(--nav-h)' }}>
                    <div style={{ maxWidth: 680 }}>
                        <Reveal delay={0.1}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 'var(--sp-5)' }}>
                                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--champagne)', animation: 'pulse-dot 2s ease-in-out infinite' }} />
                                <span className="t-eyebrow">Premium Real Estate · Bangalore</span>
                            </div>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <h1 className="t-display-2xl" style={{ marginBottom: 'var(--sp-5)', color: 'var(--ivory)' }}>
                                Finding Home<br />
                                <span style={{ color: 'var(--champagne)', fontStyle: 'italic' }}>In Bangalore.</span>
                            </h1>
                        </Reveal>

                        <Reveal delay={0.3}>
                            <p style={{ fontSize: '1.125rem', color: 'var(--ivory-2)', lineHeight: 1.7, marginBottom: 'var(--sp-8)', maxWidth: 520 }}>
                                Meticulously verified properties across Bangalore's most sought-after neighbourhoods. Renting, leasing, buying, or selling — we make it seamless.
                            </p>
                        </Reveal>

                        <Reveal delay={0.4}>
                            <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
                                <motion.button
                                    onClick={() => setPage('properties')}
                                    className="btn btn-primary btn-xl"
                                    whileTap={{ scale: 0.97 }}
                                >
                                    Explore Properties
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </motion.button>
                                <CallBtn variant="ghost" label="Call Now" />
                            </div>
                        </Reveal>

                        {/* Quick stat pills */}
                        <Reveal delay={0.55}>
                            <div style={{ display: 'flex', gap: 'var(--sp-4)', marginTop: 'var(--sp-10)', flexWrap: 'wrap' }}>
                                {[['500+', 'Properties'], ['12+', 'Years'], ['100%', 'Verified']].map(([n, l]) => (
                                    <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 500, color: 'var(--champagne)' }}>{n}</span>
                                        <span style={{ fontSize: '0.8125rem', color: 'var(--ivory-3)', fontWeight: 500 }}>{l}</span>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>

                {/* Hero property card — right side desktop */}
                {heroProperty && (
                    <motion.div
                        className="desktop-only"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        style={{ position: 'absolute', right: '6%', top: '50%', transform: 'translateY(-50%)', width: 320, zIndex: 2 }}
                    >
                        <div className="card" style={{ overflow: 'hidden', backdropFilter: 'blur(20px)', background: 'rgba(17,17,19,0.85)' }}>
                            <img src={heroProperty.img} alt={heroProperty.title} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                            <div style={{ padding: 'var(--sp-4)' }}>
                                <div className="t-eyebrow" style={{ marginBottom: 'var(--sp-2)' }}>Featured</div>
                                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: 'var(--ivory)', marginBottom: 'var(--sp-1)' }}>{heroProperty.title}</div>
                                <div style={{ fontSize: '0.8125rem', color: 'var(--ivory-3)', marginBottom: 'var(--sp-3)' }}>{heroProperty.address}</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', color: 'var(--champagne)' }}>{heroProperty.price}</span>
                                    <motion.button onClick={() => { setSelectedProp(heroProperty); setPage('detail'); }} className="btn btn-primary btn-sm" whileTap={{ scale: 0.97 }}>View</motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Scroll indicator */}
                <motion.div
                    style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer', zIndex: 1 }}
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
                >
                    <span style={{ fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ivory-4)' }}>Scroll</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ivory-4)" strokeWidth="2"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
                </motion.div>
            </section>

            {/* ── PROPERTY RAIL ───────────────────────────────────────────── */}
            <section className="section" style={{ borderBottom: '1px solid var(--stone)' }}>
                <div className="container">
                    <Reveal>
                        <div className="flex-between" style={{ marginBottom: 'var(--sp-7)' }}>
                            <div>
                                <div className="t-eyebrow" style={{ marginBottom: 'var(--sp-2)' }}>Curated Selection</div>
                                <h2 className="t-display-md" style={{ color: 'var(--ivory)' }}>Featured Listings</h2>
                            </div>
                            <motion.button onClick={() => setPage('properties')} className="btn btn-ghost" whileTap={{ scale: 0.97 }}>
                                View All
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </motion.button>
                        </div>
                    </Reveal>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--sp-5)' }}>
                        {railProperties.map((prop, i) => (
                            <Reveal key={prop.id} delay={i * 0.08}>
                                <PropertyCard
                                    property={prop}
                                    onView={p => { setSelectedProp(p); setPage('detail'); }}
                                />
                            </Reveal>
                        ))}
                    </div>
                </div>
                <style>{`@media(max-width:1024px){.prop-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:640px){.prop-grid{grid-template-columns:1fr!important}}`}</style>
            </section>

            {/* ── SERVICES — ROMAN NUMERAL BENTO ─────────────────────────── */}
            <section className="section" style={{ background: 'var(--charcoal-2)', borderBottom: '1px solid var(--stone)' }}>
                <div className="container">
                    <Reveal>
                        <div style={{ marginBottom: 'var(--sp-9)' }}>
                            <div className="t-eyebrow" style={{ marginBottom: 'var(--sp-2)' }}>What We Do</div>
                            <h2 className="t-display-md" style={{ color: 'var(--ivory)' }}>Everything you need.</h2>
                        </div>
                    </Reveal>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, border: '1px solid var(--stone)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
                        {[
                            { num: 'I', title: 'Rentals', desc: 'Find the perfect rental home with flexible terms, zero hidden fees, and full documentation support.', page: 'rent', color: '#22C55E' },
                            { num: 'II', title: 'Commercial Lease', desc: 'Premium office and retail spaces for startups and enterprises. Ready-to-move and custom build options.', page: 'lease', color: '#60A5FA' },
                            { num: 'III', title: 'Buy Property', desc: 'Curated residential and commercial opportunities with institutional-grade due diligence on every listing.', page: 'purchase', color: 'var(--champagne)' },
                            { num: 'IV', title: 'Sell Property', desc: 'Get accurate market valuation, verified buyer network, and close deals faster with expert negotiation.', page: 'sell', color: '#F59E0B' },
                        ].map((s, i) => (
                            <Reveal key={s.num} delay={i * 0.07}>
                                <motion.div
                                    onClick={() => setPage(s.page)}
                                    style={{ padding: 'var(--sp-9) var(--sp-8)', background: 'var(--charcoal-2)', cursor: 'pointer', borderRight: i % 2 === 0 ? '1px solid var(--stone)' : 'none', borderBottom: i < 2 ? '1px solid var(--stone)' : 'none', position: 'relative', overflow: 'hidden' }}
                                    whileHover={{ background: 'var(--charcoal-3)' }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '5rem', fontWeight: 300, color: 'var(--stone-2)', lineHeight: 1, marginBottom: 'var(--sp-4)', userSelect: 'none' }}>{s.num}</div>
                                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 500, color: 'var(--ivory)', marginBottom: 'var(--sp-3)' }}>{s.title}</h3>
                                    <p style={{ color: 'var(--ivory-3)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 340, marginBottom: 'var(--sp-5)' }}>{s.desc}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: s.color, fontSize: '0.8125rem', fontWeight: 600 }}>
                                        Learn more
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                    </div>
                                </motion.div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SLV ADVANTAGE ───────────────────────────────────────────── */}
            <section className="section" style={{ borderBottom: '1px solid var(--stone)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-12)', alignItems: 'center' }}>
                        <Reveal>
                            <div>
                                <div className="t-eyebrow" style={{ marginBottom: 'var(--sp-3)' }}>The SLV Advantage</div>
                                <h2 className="t-display-lg" style={{ color: 'var(--ivory)', marginBottom: 'var(--sp-5)' }}>
                                    Trust built through<br />
                                    <span style={{ color: 'var(--champagne)', fontStyle: 'italic' }}>transparency.</span>
                                </h2>
                                <p style={{ color: 'var(--ivory-2)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 'var(--sp-8)' }}>
                                    We eliminate the friction of real estate transactions by bringing institutional-grade verification to every listing.
                                </p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
                                    {[
                                        { n: '01', title: '100% Verified Listings', desc: 'Physical site verification before any property goes live.' },
                                        { n: '02', title: 'Rapid Expert Response', desc: 'Connect with a dedicated agent within minutes, not days.' },
                                        { n: '03', title: 'Deep Local Expertise', desc: 'Twelve years navigating Bangalore\'s micro-markets.' },
                                    ].map(item => (
                                        <div key={item.n} style={{ display: 'flex', gap: 'var(--sp-5)', alignItems: 'flex-start' }}>
                                            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: 'var(--champagne)', fontWeight: 500, paddingTop: 4, flexShrink: 0, minWidth: 28 }}>{item.n}</div>
                                            <div>
                                                <div style={{ fontWeight: 600, color: 'var(--ivory)', marginBottom: 4, fontSize: '0.9375rem' }}>{item.title}</div>
                                                <div style={{ color: 'var(--ivory-3)', fontSize: '0.875rem', lineHeight: 1.6 }}>{item.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={0.15}>
                            <div style={{ position: 'relative', height: 580, borderRadius: 'var(--r-xl)', overflow: 'hidden', border: '1px solid var(--stone)' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80"
                                    alt="Luxury real estate Bangalore"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,11,0.7) 0%, transparent 50%)' }} />
                                {/* Floating stat */}
                                <div style={{ position: 'absolute', bottom: 28, left: 28, background: 'rgba(10,10,11,0.85)', backdropFilter: 'blur(12px)', border: '1px solid var(--stone-2)', borderRadius: 'var(--r-md)', padding: '14px 20px' }}>
                                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: 'var(--champagne)', lineHeight: 1 }}>850+</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--ivory-3)', marginTop: 4, letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>Successful Deals</div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ── STATS STRIP ─────────────────────────────────────────────── */}
            <section ref={statsRef} style={{ background: 'var(--charcoal-2)', borderBottom: '1px solid var(--stone)', padding: 'var(--sp-10) 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--sp-6)' }}>
                        {[
                            { val: p, suffix: '+', label: 'Properties Listed' },
                            { val: c, suffix: '+', label: 'Happy Clients' },
                            { val: d, suffix: '+', label: 'Successful Deals' },
                            { val: y, suffix: '+', label: 'Years Experience' },
                        ].map((s, i) => (
                            <div key={i} style={{ textAlign: 'center', flex: '1 1 140px' }}>
                                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 400, color: 'var(--ivory)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                                    {s.val}{s.suffix}
                                </div>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ivory-4)', marginTop: 8 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ────────────────────────────────────────────── */}
            <section className="section" style={{ borderBottom: '1px solid var(--stone)' }}>
                <div className="container-sm">
                    <Reveal>
                        <div style={{ textAlign: 'center', marginBottom: 'var(--sp-9)' }}>
                            <div className="t-eyebrow" style={{ marginBottom: 'var(--sp-3)' }}>Testimonials</div>
                            <h2 className="t-display-md" style={{ color: 'var(--ivory)' }}>What our clients say</h2>
                        </div>
                    </Reveal>

                    <div style={{ position: 'relative', minHeight: 260 }}>
                        <AnimatePresence mode="wait">
                            {reviews[reviewIdx] && (
                                <motion.div
                                    key={reviewIdx}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -16 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    style={{ textAlign: 'center' }}
                                >
                                    {/* Large quote mark */}
                                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '5rem', color: 'var(--stone-2)', lineHeight: 0.8, marginBottom: 'var(--sp-4)', userSelect: 'none' }}>"</div>
                                    <p className="testimonial-quote" style={{ marginBottom: 'var(--sp-7)', maxWidth: 680, margin: '0 auto var(--sp-7)' }}>
                                        {approvedReviews[reviewIdx]?.review}
                                    </p>
                                    <StarRating rating={approvedReviews[reviewIdx]?.rating || 5} />
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--sp-3)', marginTop: 'var(--sp-4)' }}>
                                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--champagne-dim)', border: '1px solid var(--champagne-20)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: 'var(--champagne)', fontSize: '1rem' }}>
                                            {approvedReviews[reviewIdx]?.initials}
                                        </div>
                                        <div style={{ textAlign: 'left' }}>
                                            <div style={{ fontWeight: 600, color: 'var(--ivory)', fontSize: '0.875rem' }}>{approvedReviews[reviewIdx]?.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--ivory-4)' }}>{approvedReviews[reviewIdx]?.date}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Dot controls */}
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 'var(--sp-7)' }}>
                            {approvedReviews.map((_, i) => (
                                <motion.button
                                    key={i}
                                    onClick={() => setReviewIdx(i)}
                                    style={{
                                        height: 4, width: i === reviewIdx ? 28 : 8,
                                        borderRadius: 2, border: 'none', cursor: 'pointer',
                                        background: i === reviewIdx ? 'var(--champagne)' : 'var(--stone-2)',
                                        transition: 'all 0.3s var(--ease-spring)',
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA BAND ────────────────────────────────────────────────── */}
            <section style={{ background: 'var(--charcoal-2)', padding: 'var(--sp-14) 0', borderBottom: '1px solid var(--stone)' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: 640 }}>
                    <Reveal>
                        <div className="t-eyebrow" style={{ marginBottom: 'var(--sp-4)' }}>Start Today</div>
                        <h2 className="t-display-lg" style={{ color: 'var(--ivory)', marginBottom: 'var(--sp-4)' }}>
                            Ready to find your<br />
                            <span style={{ color: 'var(--champagne)', fontStyle: 'italic' }}>perfect property?</span>
                        </h2>
                        <p style={{ color: 'var(--ivory-2)', marginBottom: 'var(--sp-8)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                            Our experts are available seven days a week to navigate Bangalore's market with you.
                        </p>
                        <div style={{ display: 'flex', gap: 'var(--sp-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <CallBtn variant="primary" label="Call Now" />
                            <WaBtn />
                            <motion.button onClick={() => setPage('properties')} className="btn btn-ghost" whileTap={{ scale: 0.97 }}>
                                Browse Listings
                            </motion.button>
                        </div>
                    </Reveal>
                </div>
            </section>

            <style>{`
                @media (max-width: 1024px) {
                    .hero-right-card { display: none !important; }
                }
                @media (max-width: 768px) {
                    .services-grid { grid-template-columns: 1fr !important; }
                    .advantage-grid { grid-template-columns: 1fr !important; }
                    .advantage-img { display: none; }
                }
            `}</style>
        </div>
    );
}
