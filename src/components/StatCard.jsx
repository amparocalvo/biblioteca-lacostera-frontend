export const StatCard = ({ label, value, icon: Icon }) => {
  return (
    <article className="stat-card">
      <div className="stat-icon">
        {Icon && <Icon aria-hidden="true" />}
      </div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </article>
  );
};
