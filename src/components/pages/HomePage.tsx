import type { ChildData } from '../../data';
import MiniChart from '../MiniChart';

interface HomePageProps {
  isActive: boolean;
  data: ChildData;
  navigateTo: (page: string) => void;
}

function HomePage({ isActive, data, navigateTo }: HomePageProps) {
  return (
    <section className={`page${isActive ? ' is-active' : ''}`} data-page="home">
      <div className="hero">
        <div>
          <p className="eyebrow">Welcome back</p>
          <h1>Healthy Habits</h1>
          <p className="muted">Keep your family on track with consistent, healthy routines.</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => navigateTo('goals')}>View Goals</button>
            <button className="secondary-button" onClick={() => navigateTo('fitness')}>Open Fitness</button>
          </div>
        </div>
        <div className="hero-card glass">
          <div className="hero-card-header">
            <span className="badge">Goal Streak</span>
            <span className="pill">{data.home.streakDays}</span>
          </div>
          <div className="stat-grid">
            <div>
              <div className="stat-label">Goals this week</div>
              <div className="stat-value">{data.home.goalsMet}</div>
            </div>
            <div>
              <div className="stat-label">Avg sleep</div>
              <div className="stat-value">{data.home.sleepHours}</div>
            </div>
            <div>
              <div className="stat-label">Steps today</div>
              <div className="stat-value">{data.home.stepsToday}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-grid">
        <div className="glass card link-card" onClick={() => navigateTo('fitness')}>
          <div>
            <h3>Fitness</h3>
            <p className="muted">Stay active and build strong routines.</p>
          </div>
        </div>
        <div className="glass card link-card" onClick={() => navigateTo('diet')}>
          <div>
            <h3>Diet</h3>
            <p className="muted">Make nutritious choices every day.</p>
          </div>
        </div>
        <div className="glass card link-card" onClick={() => navigateTo('screen')}>
          <div>
            <h3>Screen Time</h3>
            <p className="muted">Keep a healthy tech balance.</p>
          </div>
        </div>
        <div className="glass card link-card" onClick={() => navigateTo('goals')}>
          <div>
            <h3>Goals</h3>
            <p className="muted">Track progress and celebrate wins.</p>
          </div>
        </div>
      </div>

      <div className="two-col">
        <div className="glass card">
          <h3>Quote of the Day</h3>
          <p className="quote">&ldquo;Habits are the compound interest of self-improvement.&rdquo;</p>
          <p className="muted">Small actions today build the life you want tomorrow.</p>
        </div>
        <div className="glass card">
          <h3>Weekly Momentum</h3>
          <MiniChart data={data.home.momentum} />
          <div className="muted small">Consistency score</div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
