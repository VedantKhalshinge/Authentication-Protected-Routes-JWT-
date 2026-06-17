import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getDashboardService } from '../services/api';
import { Loader } from '../components/Loader';
import { Toast } from '../components/Toast';

export const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getDashboardService();
        if (response.success) {
          setData(response.data);
        }
      } catch (err) {
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="main-content">
      <div className="dashboard-card fade-in">
        <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '0.5rem' }}>Dashboard</h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
          Welcome back, {user?.fullName}!
        </p>

        <Toast message={error} type="error" />

        {loading ? (
          <Loader />
        ) : (
          <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div className="card" style={{ margin: '0', maxWidth: 'none' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Statistics</h3>
              <div className="info-row">
                <span className="info-label">Total Logins</span>
                <span>{data?.stats?.logins || 0}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Active Sessions</span>
                <span>{data?.stats?.activeSessions || 0}</span>
              </div>
            </div>

            <div className="card" style={{ margin: '0', maxWidth: 'none' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Recent Activity</h3>
              {data?.recentActivity?.length > 0 ? (
                <ul style={{ paddingLeft: '1.25rem', color: 'var(--color-text-muted)' }}>
                  {data.recentActivity.map((activity, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>{activity}</li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: 'var(--color-text-muted)' }}>No recent activity.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
