import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="main-content" style={{ justifyContent: 'center' }}>
      <div className="card fade-in" style={{ maxWidth: '500px' }}>
        <h2 className="card-title">User Profile</h2>
        <p className="card-subtitle">Manage your personal information</p>

        <div style={{ marginTop: '2rem' }}>
          <div className="info-row">
            <span className="info-label">User ID</span>
            <span style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>{user?.id}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Full Name</span>
            <span>{user?.fullName}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Email Address</span>
            <span>{user?.email}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Status</span>
            <span style={{ color: 'var(--color-success)', fontWeight: '600' }}>Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
