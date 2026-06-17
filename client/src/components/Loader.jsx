export const Loader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
    <div style={{ width: '24px', height: '24px', border: '3px solid var(--color-border)', borderTopColor: 'var(--color-accent)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);
