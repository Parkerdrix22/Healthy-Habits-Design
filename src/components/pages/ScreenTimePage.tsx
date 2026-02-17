import type { ChildData } from '../../data';
import MiniChart from '../MiniChart';

interface ScreenTimePageProps {
  isActive: boolean;
  data: ChildData;
}

function ScreenTimePage({ isActive, data }: ScreenTimePageProps) {
  return (
    <section className={`page${isActive ? ' is-active' : ''}`} data-page="screen">
      <div className="page-header">
        <div>
          <h2>Screen Time</h2>
          <p className="muted">Track usage and keep a healthy balance.</p>
        </div>
        <button className="secondary-button">Set Goal</button>
      </div>
      <div className="card-grid three">
        <div className="glass card">
          <h4>Total Screen Time</h4>
          <div className="stat-value">{data.screen.totalHours}</div>
          <div className="muted">Today</div>
        </div>
        <div className="glass card">
          <h4>Goal</h4>
          <div className="stat-value">{data.screen.goalHours}</div>
          <div className="muted">Daily</div>
        </div>
        <div className="glass card">
          <h4>Family Average</h4>
          <div className="stat-value">{data.screen.familyAvg}</div>
          <div className="muted">This week</div>
        </div>
      </div>
      <div className="glass card">
        <h3>Weekly Screen Time</h3>
        <MiniChart data={data.screen.weekly} />
      </div>
    </section>
  );
}

export default ScreenTimePage;
