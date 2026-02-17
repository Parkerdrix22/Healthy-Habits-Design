import type { ChildData } from '../../data';

interface DietPageProps {
  isActive: boolean;
  data: ChildData;
}

function DietPage({ isActive, data }: DietPageProps) {
  return (
    <section className={`page${isActive ? ' is-active' : ''}`} data-page="diet">
      <div className="page-header">
        <div>
          <h2>Healthy Eating Habits</h2>
          <p className="muted">Balance meals and build positive food routines.</p>
        </div>
        <button className="secondary-button">Add Meal</button>
      </div>
      <div className="two-col">
        <div className="glass card">
          <h3>Recent Food Log</h3>
          <ul className="list">
            {data.diet.foodLog.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <button className="ghost-button">Add Item</button>
        </div>
        <div className="glass card">
          <h3>Health Metrics</h3>
          <div className="stat-grid">
            <div>
              <div className="stat-label">Water cups</div>
              <div className="stat-value">{data.diet.waterCups}</div>
            </div>
            <div>
              <div className="stat-label">Veggie servings</div>
              <div className="stat-value">{data.diet.veggieServings}</div>
            </div>
            <div>
              <div className="stat-label">Sugar level</div>
              <div className="stat-value">{data.diet.sugar}</div>
            </div>
            <div>
              <div className="stat-label">Protein</div>
              <div className="stat-value">{data.diet.protein}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-grid">
        <div className="glass card">
          <h4>Meal Ideas</h4>
          <p className="muted">Simple, nutrient-dense options.</p>
        </div>
        <div className="glass card">
          <h4>Snack Ideas</h4>
          <p className="muted">Smart snacks for steady energy.</p>
        </div>
        <div className="glass card">
          <h4>Family Cooking</h4>
          <p className="muted">Build habits together.</p>
        </div>
      </div>
    </section>
  );
}

export default DietPage;
