import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SellPage({ setPage }) {
    const [form, setForm] = useState({ name: '', phone: '', address: '', type: 'Apartment', price: '', area: '' });
    return (
        <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
            <div style={{ background: 'var(--charcoal-2)', borderBottom: '1px solid var(--stone)', padding: 'var(--sp-9) 0' }}>
                <div className="container">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <div className="t-eyebrow" style={{ marginBottom: 'var(--sp-2)' }}>Sell</div>
                        <h1 className="t-display-lg" style={{ color: 'var(--ivory)', marginBottom: 'var(--sp-3)' }}>List Your Property</h1>
                        <p style={{ color: 'var(--ivory-3)', maxWidth: 520, lineHeight: 1.7 }}>Get accurate market valuation and sell faster with our verified buyer network and expert negotiation.</p>
                    </motion.div>
                </div>
            </div>
            <div className="container" style={{ padding: 'var(--sp-10) var(--sp-7)', maxWidth: 760 }}>
                <div style={{ background: 'var(--charcoal-2)', border: '1px solid var(--stone)', borderRadius: 'var(--r-xl)', padding: 'var(--sp-7)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
                    <div>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: 'var(--ivory)', marginBottom: 'var(--sp-4)', paddingBottom: 'var(--sp-3)', borderBottom: '1px solid var(--stone)' }}>Owner Details</h3>
                        <div className="form-grid-2">
                            <div className="field-group"><label className="field-label">Full Name</label><input className="field-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full Name" /></div>
                            <div className="field-group"><label className="field-label">Phone</label><input className="field-input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone Number" /></div>
                        </div>
                    </div>
                    <div>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: 'var(--ivory)', marginBottom: 'var(--sp-4)', paddingBottom: 'var(--sp-3)', borderBottom: '1px solid var(--stone)' }}>Property Details</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
                            <div className="field-group"><label className="field-label">Full Address</label><input className="field-input" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="Full property address" /></div>
                            <div className="form-grid-3">
                                <div className="field-group"><label className="field-label">Property Type</label><select className="field-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}><option>Apartment</option><option>Villa</option><option>Plot</option><option>Commercial</option><option>Independent House</option></select></div>
                                <div className="field-group"><label className="field-label">Expected Price</label><input className="field-input" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="₹" /></div>
                                <div className="field-group"><label className="field-label">Built-up Area (sqft)</label><input className="field-input" value={form.area} onChange={e => setForm({ ...form, area: e.target.value })} placeholder="e.g. 1500" /></div>
                            </div>
                        </div>
                    </div>
                    <motion.button className="btn btn-primary btn-lg" onClick={() => { alert('Property details submitted. Our agent will contact you soon!'); setPage('home'); }} whileTap={{ scale: 0.97 }}>Submit Property</motion.button>
                </div>
            </div>
        </div>
    );
}
