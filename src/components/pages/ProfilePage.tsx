import type { ChildData } from '../../data';

interface ProfilePageProps {
  isActive: boolean;
  data: ChildData;
}

function ProfilePage({ isActive, data }: ProfilePageProps) {
  return (
    <section className={`page${isActive ? ' is-active' : ''}`} data-page="profile">
      <div className="page-header">
        <div>
          <h2>Profile &amp; Family</h2>
          <p className="muted">Manage profiles and family members.</p>
        </div>
        <button className="secondary-button">Add Member</button>
      </div>
      <div className="two-col">
        <div className="glass card">
          <h3>Profile</h3>
          <label className="input-label">Full name</label>
          <input className="input" defaultValue="Jamie Parker" />
          <label className="input-label">Email</label>
          <input className="input" defaultValue="jamie@healthyhabits.com" />
          <label className="input-label">Preferred focus</label>
          <input className="input" defaultValue="Balanced daily routines" />
          <button className="primary-button">Save Profile</button>
        </div>
        <div className="glass card">
          <h3>Family Members</h3>
          <div className="family-list">
            {data.profile.family.map((member) => (
              <div className="family-card" key={member.name}>
                <span>{member.name}</span>
                <small className="muted">{member.role}</small>
              </div>
            ))}
          </div>
          <button className="ghost-button">Invite Family Member</button>
        </div>
      </div>
      <div className="glass card">
        <h4>Family Wellness Snapshot</h4>
        <p className="muted">Shared goals and routines keep everyone connected.</p>
      </div>
    </section>
  );
}

export default ProfilePage;
