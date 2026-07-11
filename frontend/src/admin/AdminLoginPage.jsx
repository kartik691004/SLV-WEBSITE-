import { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../DataContext.jsx';
import Logo from '../components/Logo.jsx';

export default function AdminLoginPage({ setPage }) {
    const { login } = useData();
    const [form, setForm] = useState({ email: '', password: '', remember: false });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
            setError('');
            setLoading(true);
            await login(form.email, form.password);
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials. Try admin@slv.com / admin123');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--charcoal)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Background photo */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=50)',
                backgroundSize: 'cover', backgroundPosition: 'center',
                opacity: 0.04,
            }} />
            {/* Grid texture */}
            <div style={{ position: 'absolute', inset: 0 }} className="arch-grid" />

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    position: 'relative',
                    background: 'rgba(17,17,19,0.92)',
                    border: '1px solid var(--stone)',
                    borderRadius: 'var(--r-2xl)',
                    padding: '48px 44px',
                    width: '100%',
                    maxWidth: 420,
                    backdropFilter: 'blur(32px)',
                    boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
                }}
            >
                {/* Logo */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--sp-7)' }}>
                    <Logo size="lg" />
                </div>

                {/* Title */}
                <div style={{ textAlign: 'center', marginBottom: 'var(--sp-7)' }}>
                    <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.75rem', fontWeight: 400, color: 'var(--ivory)', marginBottom: 'var(--sp-2)' }}>
                        Admin Login
                    </h1>
                    <p style={{ fontSize: '0.875rem', color: 'var(--ivory-4)' }}>Access your dashboard</p>
                </div>

                {/* Error */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            background: 'var(--red-dim)',
                            border: '1px solid rgba(239,68,68,0.3)',
                            borderRadius: 'var(--r-sm)',
                            padding: '10px 14px',
                            color: '#FCA5A5',
                            fontSize: '0.8125rem',
                            marginBottom: 'var(--sp-4)',
                        }}
                    >
                        {error}
                    </motion.div>
                )}

                {/* Form */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
                    <div className="field-group">
                        <label className="field-label">Email</label>
                        <input
                            type="email"
                            className="field-input"
                            placeholder="admin@slv.com"
                            value={form.email}
                            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                            onKeyDown={e => e.key === 'Enter' && handleLogin()}
                            autoComplete="email"
                        />
                    </div>
                    <div className="field-group">
                        <label className="field-label">Password</label>
                        <input
                            type="password"
                            className="field-input"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                            onKeyDown={e => e.key === 'Enter' && handleLogin()}
                            autoComplete="current-password"
                        />
                    </div>
                </div>

                {/* Remember + Forgot */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--sp-4)', marginBottom: 'var(--sp-6)' }}>
                    <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: '0.8125rem', color: 'var(--ivory-3)', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={form.remember}
                            onChange={e => setForm(p => ({ ...p, remember: e.target.checked }))}
                            style={{ accentColor: 'var(--champagne)' }}
                        />
                        Remember me
                    </label>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--champagne)', cursor: 'pointer' }}>Forgot password?</span>
                </div>

                <motion.button
                    onClick={handleLogin}
                    className="btn btn-primary btn-full btn-lg"
                    disabled={loading}
                    whileTap={{ scale: 0.98 }}
                    style={{ marginBottom: 'var(--sp-5)' }}
                >
                    {loading ? 'Signing In...' : 'Sign In to Dashboard'}
                </motion.button>

                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--ivory-4)', marginTop: 'var(--sp-2)' }}>
                    Hint: admin@slv.com / admin123
                </p>

                {/* Back to site */}
                <div style={{ textAlign: 'center', marginTop: 'var(--sp-5)' }}>
                    <motion.button
                        onClick={() => setPage('home')}
                        style={{ background: 'none', border: 'none', color: 'var(--ivory-4)', fontSize: '0.8125rem', cursor: 'pointer', transition: 'color 0.2s', fontFamily: 'inherit' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--ivory-3)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--ivory-4)'}
                        whileTap={{ scale: 0.97 }}
                    >
                        ← Back to website
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
