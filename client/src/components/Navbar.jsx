import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}>
      <Link to="/" style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-text)' }}>AuthApp</Link>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={logout} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', width: 'auto' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', width: 'auto' }}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};
