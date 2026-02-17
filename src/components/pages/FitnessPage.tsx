import type { ChildData } from '../../data';
import MiniChart from '../MiniChart';

interface FitnessPageProps {
  isActive: boolean;
  data: ChildData;
}

function FitnessPage({ isActive, data }: FitnessPageProps) {
  return (
    <section className={`page${isActive ? ' is-active' : ''}`} data-page="fitness">
      <div className="page-header">
        <div>
          <h2>Fitness</h2>
          <p className="muted">Weekly activity trends and sessions.</p>
        </div>
        <button className="secondary-button">Add Activity</button>
      </div>
      <div className="glass card">
        <h3>Weekly Fitness</h3>
        <MiniChart data={data.fitness.weekly} />
      </div>
      <div className="card-grid three">
        <div className="glass card">
          <h4>Activities</h4>
          <ul className="list">
            {data.fitness.activities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="glass card">
          <h4>Calories Burned</h4>
          <div className="stat-value">{data.fitness.calories}</div>
          <div className="muted">Avg per session</div>
        </div>
        <div className="glass card">
          <h4>Top Focus</h4>
          <div className="stat-value">{data.fitness.focus}</div>
          <div className="muted">Keep a balanced week</div>
        </div>
      </div>
      <div className="card-grid">
        <div className="glass card">
          <h4>Soccer</h4>
          <p className="muted">Coordination and team play.</p>
        </div>
        <div className="glass card">
          <h4>Yoga</h4>
          <p className="muted">Flexibility and mindfulness.</p>
        </div>
        <div className="glass card">
          <h4>Running</h4>
          <p className="muted">Build endurance steadily.</p>
        </div>
      </div>
    </section>
  );
}

export default FitnessPage;
