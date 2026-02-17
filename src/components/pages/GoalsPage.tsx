import type { ChildData } from '../../data';

interface GoalsPageProps {
  isActive: boolean;
  data: ChildData;
}

function GoalsPage({ isActive, data }: GoalsPageProps) {
  const progressWidth = `${Math.max(8, Math.min(100, data.goals.progressPercent))}%`;

  return (
    <section className={`page${isActive ? ' is-active' : ''}`} data-page="goals">
      <div className="page-header">
        <div>
          <h2>Goals</h2>
          <p className="muted">Set goals and keep your streak alive.</p>
        </div>
        <button className="secondary-button">Edit Goals</button>
      </div>
      <div className="two-col">
        <div className="glass card">
          <h3>Add a Goal</h3>
          <label className="input-label">I want to be...</label>
          <input className="input" placeholder="More active after school" />
          <label className="input-label">Frequency</label>
          <select className="input">
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
          <div className="button-row">
            <button className="primary-button">Save Goal</button>
            <button className="ghost-button">View Goals</button>
          </div>
        </div>
        <div className="glass card">
          <h3>Progress</h3>
          <div className="stat-label">Current streak</div>
          <div className="stat-value">{data.goals.streak}</div>
          <div className="progress">
            <div className="progress-fill" style={{ width: progressWidth }}></div>
          </div>
          <div className="muted">Goal completion</div>
          <div className="stat-label">Next goal</div>
          <div className="stat-value">{data.goals.nextGoal}</div>
        </div>
      </div>
      <div className="card-grid">
        <div className="glass card">
          <h4>Vision Board</h4>
          <p className="muted">Visual goals help keep motivation high.</p>
        </div>
        <div className="glass card">
          <h4>Celebrate Wins</h4>
          <p className="muted">Reward consistency, not perfection.</p>
        </div>
        <div className="glass card">
          <h4>Daily Planner</h4>
          <p className="muted">A simple planner makes progress visible.</p>
        </div>
      </div>
    </section>
  );
}

export default GoalsPage;
