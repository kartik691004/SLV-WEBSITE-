export default function StarRating({ rating }) {
    return (
        <div style={{ display: 'flex', gap: 3 }}>
            {[1, 2, 3, 4, 5].map(i => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24"
                    fill={i <= rating ? 'var(--champagne)' : 'none'}
                    stroke={i <= rating ? 'var(--champagne)' : 'var(--stone-2)'}
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                </svg>
            ))}
        </div>
    );
}
