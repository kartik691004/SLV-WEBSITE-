import { useState } from 'react';
import { motion } from 'framer-motion';
import WaBtn from '../components/WaBtn.jsx';

export default function LeasePage({ setPage }) {
    const [form, setForm] = useState({ name: '', phone: '', location: '', type: 'Commercial Office', duration: '1–2 Years' });
    return (
        <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
            <div style={{ background: 'var(--charcoal-2)', borderBottom: '1px solid var(--stone)', padding: 'var(--sp-9) 0' }}>
                <div className="container">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <div className="t-eyebrow" style={{ marginBottom: 'var(--sp-2)' }}>Lease</div>
                        <h1 className="t-display-lg" style={{ color: 'var(--ivory)', marginBottom: 'var(--sp-3)' }}>Lease a Property</h1>
                        <p style={{ color: 'var(--ivory-3)', maxWidth: 520, lineHeight: 1.7 }}>Long-term lease options for residential and commercial spaces. Tailored agreements, verified properties.</p>
                    </motion.div>
                </div>
            </div>
            <div className="container" style={{ padding: 'var(--sp-10) var(--sp-7)', maxWidth: 660 }}>
                <div style={{ background: 'var(--charcoal-2)', border: '1px solid var(--stone)', borderRadius: 'var(--r-xl)', padding: 'var(--sp-7)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
                    <div className="form-grid-2">
                        <div className="field-group"><label className="field-label">Name</label><input className="field-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your Name" /></div>
                        <div className="field-group"><label className="field-label">Phone</label><input className="field-input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone Number" /></div>
                    </div>
                    <div className="field-group"><label className="field-label">Preferred Location</label><input className="field-input" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g. Koramangala, HSR Layout" /></div>
                    <div className="form-grid-2">
                        <div className="field-group"><label className="field-label">Space Type</label><select className="field-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}><option>Commercial Office</option><option>Retail Shop</option><option>Residential House</option><option>Warehouse</option></select></div>
                        <div className="field-group"><label className="field-label">Lease Duration</label><select className="field-input" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })}><option>1–2 Years</option><option>2–5 Years</option><option>5+ Years</option></select></div>
                    </div>
                    <motion.button className="btn btn-primary btn-lg" onClick={() => { alert('Requirement submitted successfully!'); setPage('home'); }} whileTap={{ scale: 0.97 }}>Submit Requirement</motion.button>
                </div>
            </div>
        </div>
    );
}
