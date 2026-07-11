import { motion } from 'framer-motion';

function Reveal({ children, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    );
}

export default function AboutPage() {
    return (
        <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
            {/* Hero */}
            <section style={{ position: 'relative', minHeight: '60vh', display: 'flex', alignItems: 'center', overflow: 'hidden', borderBottom: '1px solid var(--stone)' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=70)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,11,0.95) 50%, rgba(10,10,11,0.6) 100%)' }} />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <Reveal>
                        <div className="t-eyebrow" style={{ marginBottom: 'var(--sp-4)' }}>Our Story</div>
                        <h1 className="t-display-xl" style={{ color: 'var(--ivory)', maxWidth: 680, marginBottom: 'var(--sp-5)' }}>
                            Redefining Real Estate<br />
                            <span style={{ color: 'var(--champagne)', fontStyle: 'italic' }}>in Bangalore.</span>
                        </h1>
                        <p style={{ color: 'var(--ivory-2)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: 520 }}>
                            At SLV Enterprises, we believe in complete transparency, exceptional service, and delivering properties that exceed expectations.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Mission */}
            <section className="section" style={{ borderBottom: '1px solid var(--stone)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-12)', alignItems: 'center' }}>
                        <Reveal>
                            <div>
                                <div className="t-eyebrow" style={{ marginBottom: 'var(--sp-3)' }}>Our Mission</div>
                                <h2 className="t-display-md" style={{ color: 'var(--ivory)', marginBottom: 'var(--sp-5)' }}>Removing friction from real estate.</h2>
                                <p style={{ color: 'var(--ivory-2)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: 'var(--sp-4)' }}>
                                    We started SLV Enterprises with a singular goal: to remove the friction and opacity from the Bangalore real estate market.
                                </p>
                                <p style={{ color: 'var(--ivory-2)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: 'var(--sp-8)' }}>
                                    Whether you are a first-time homebuyer, a business looking for premium office space, or an investor seeking high-yield opportunities, our dedicated team provides personalized guidance backed by rigorous data and local expertise.
                                </p>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-4)' }}>
                                    {[['12+', 'Years Experience'], ['100%', 'Verified Listings'], ['850+', 'Deals Closed'], ['1,200+', 'Happy Clients']].map(([num, label]) => (
                                        <div key={label} style={{ padding: 'var(--sp-4)', background: 'var(--charcoal-2)', border: '1px solid var(--stone)', borderRadius: 'var(--r-md)' }}>
                                            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: 'var(--champagne)', lineHeight: 1, marginBottom: 6 }}>{num}</div>
                                            <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ivory-4)' }}>{label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={0.15}>
                            <div style={{ height: 520, borderRadius: 'var(--r-xl)', overflow: 'hidden', border: '1px solid var(--stone)' }}>
                                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" alt="SLV Enterprises office" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section" style={{ background: 'var(--charcoal-2)', borderBottom: '1px solid var(--stone)' }}>
                <div className="container">
                    <Reveal>
                        <div style={{ textAlign: 'center', marginBottom: 'var(--sp-9)' }}>
                            <div className="t-eyebrow" style={{ marginBottom: 'var(--sp-3)' }}>Our Values</div>
                            <h2 className="t-display-md" style={{ color: 'var(--ivory)' }}>Built on principles.</h2>
                        </div>
                    </Reveal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, border: '1px solid var(--stone)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
                        {[
                            { num: '01', title: 'Transparency', desc: 'Every listing includes verified pricing, accurate specifications, and honest assessments of the property and its neighbourhood.' },
                            { num: '02', title: 'Expertise', desc: 'Our team holds deep knowledge of Bangalore\'s micro-markets, from Electronic City to Whitefield, Indiranagar to Sarjapur.' },
                            { num: '03', title: 'Speed', desc: 'We respect your time. Our processes are designed to close deals faster without compromising on due diligence.' },
                        ].map((v, i) => (
                            <Reveal key={v.num} delay={i * 0.08}>
                                <div style={{ padding: 'var(--sp-8)', background: 'var(--charcoal-2)', borderRight: i < 2 ? '1px solid var(--stone)' : 'none' }}>
                                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: 'var(--champagne)', fontWeight: 500, marginBottom: 'var(--sp-4)' }}>{v.num}</div>
                                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: 'var(--ivory)', marginBottom: 'var(--sp-3)' }}>{v.title}</h3>
                                    <p style={{ color: 'var(--ivory-3)', fontSize: '0.9rem', lineHeight: 1.7 }}>{v.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <style>{`
                @media (max-width: 768px) {
                    .about-grid { grid-template-columns: 1fr !important; }
                    .values-grid { grid-template-columns: 1fr !important; }
                    .values-item { border-right: none !important; border-bottom: 1px solid var(--stone) !important; }
                }
            `}</style>
        </div>
    );
}
