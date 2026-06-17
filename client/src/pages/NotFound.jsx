import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="main-content" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }} className="fade-in">
        <h1 style={{ fontSize: '4rem', fontWeight: '700', color: 'var(--color-text)', marginBottom: '0.5rem' }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '500', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Page Not Found</h2>
        <p style={{ marginBottom: '2rem', color: 'var(--color-text-muted)' }}>
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/login" className="btn btn-primary" style={{ display: 'inline-flex', width: 'auto', padding: '0.75rem 1.5rem' }}>
          Return to Login
        </Link>
      </div>
    </div>
  );
};
