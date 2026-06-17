export const Toast = ({ message, type }) => {
  if (!message) return null;
  const isError = type === 'error';
  return (
    <div style={{
      padding: '0.75rem 1rem',
      backgroundColor: isError ? '#FEF2F2' : '#ECFDF5',
      color: isError ? 'var(--color-error)' : 'var(--color-success)',
      border: `1px solid ${isError ? '#FECACA' : '#A7F3D0'}`,
      borderRadius: 'var(--border-radius)',
      marginBottom: '1.25rem',
      fontSize: '0.875rem',
      fontWeight: '500'
    }} className="fade-in">
      {message}
    </div>
  );
};
