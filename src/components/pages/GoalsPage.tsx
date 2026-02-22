import { useState, useEffect, useCallback } from 'react';
import type { ChildName } from '../../data';
import { goalsApi, type Goal, type CreateGoalData, type UpdateGoalData } from '../../api/goals';

interface GoalsPageProps {
  isActive: boolean;
  activeChild: ChildName;
}

// Matches childid values in seed-postgres.sql
const CHILD_IDS: Record<ChildName, number> = { Avery: 1, Jordan: 2 };
// Hardcoded to Jamie Parker (userID 1) until auth is implemented
const USER_ID = 1;

const CATEGORIES = ['Fitness', 'Reading', 'Nutrition', 'Screen Time', 'Hydration', 'Sleep'] as const;
const FREQUENCIES = ['Daily', 'Weekly', 'Monthly'] as const;

interface FormState {
  category: string;
  goalType: string;
  targetValue: string;
  value: string;
  unit: string;
  start_date: string;
  end_date: string;
  frequency: string;
}

const today = new Date().toISOString().split('T')[0];
const defaultForm: FormState = {
  category: 'Fitness',
  goalType: '',
  targetValue: '',
  value: '0',
  unit: '',
  start_date: today,
  end_date: '',
  frequency: 'Daily',
};

function GoalsPage({ isActive, activeChild }: GoalsPageProps) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showGoals, setShowGoals] = useState(false);
  const [form, setForm] = useState<FormState>(defaultForm);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [editForm, setEditForm] = useState<FormState>(defaultForm);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const childID = CHILD_IDS[activeChild];

  const fetchGoals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await goalsApi.getAll(childID);
      setGoals(data);
    } catch {
      setError('Could not load goals. Make sure the API server is running (cd server && npm run dev).');
    } finally {
      setLoading(false);
    }
  }, [childID]);

  useEffect(() => {
    if (showGoals) fetchGoals();
  }, [showGoals, fetchGoals]);

  // Reset list when switching children
  useEffect(() => {
    setGoals([]);
    setEditingGoal(null);
    if (showGoals) fetchGoals();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChild]);

  const flash = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload: CreateGoalData = {
      userid: USER_ID,
      childid: childID,
      category: form.category,
      goaltype: form.goalType,
      targetvalue: parseInt(form.targetValue, 10),
      value: parseInt(form.value, 10) || 0,
      unit: form.unit,
      start_date: form.start_date,
      end_date: form.end_date,
      frequency: form.frequency,
      isactive: true,
    };
    try {
      await goalsApi.create(payload);
      setForm(defaultForm);
      flash('Goal saved!');
      if (showGoals) fetchGoals();
    } catch {
      setError('Failed to save goal. Make sure the API server is running.');
    } finally {
      setSaving(false);
    }
  };

  const handleStartEdit = (goal: Goal) => {
    setEditingGoal(goal);
    setEditForm({
      category: goal.category,
      goalType: goal.goaltype,
      targetValue: String(goal.targetvalue),
      value: String(goal.value),
      unit: goal.unit,
      start_date: goal.start_date.split('T')[0],
      end_date: goal.end_date.split('T')[0],
      frequency: goal.frequency,
    });
  };

  const handleUpdateGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGoal) return;
    setSaving(true);
    setError(null);
    const payload: UpdateGoalData = {
      category: editForm.category,
      goaltype: editForm.goalType,
      targetvalue: parseInt(editForm.targetValue, 10),
      value: parseInt(editForm.value, 10) || 0,
      unit: editForm.unit,
      start_date: editForm.start_date,
      end_date: editForm.end_date,
      frequency: editForm.frequency,
      isactive: editingGoal.isactive,
    };
    try {
      await goalsApi.update(editingGoal.goalid, payload);
      setEditingGoal(null);
      flash('Goal updated!');
      fetchGoals();
    } catch {
      setError('Failed to update goal.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteGoal = async (goalid: number) => {
    if (!window.confirm('Delete this goal? This cannot be undone.')) return;
    setError(null);
    try {
      await goalsApi.delete(goalid);
      flash('Goal deleted.');
      fetchGoals();
    } catch {
      setError('Failed to delete goal.');
    }
  };

  const activeGoals = goals.filter(g => g.isactive);
  const metGoals = activeGoals.filter(g => g.value >= g.targetvalue);
  const progressPercent =
    activeGoals.length > 0 ? Math.round((metGoals.length / activeGoals.length) * 100) : 0;
  const progressWidth = `${Math.max(8, Math.min(100, progressPercent))}%`;

  const setField = (setter: React.Dispatch<React.SetStateAction<FormState>>) =>
    (field: keyof FormState, val: string) =>
      setter(prev => ({ ...prev, [field]: val }));

  const setAddField = setField(setForm);
  const setEditField = setField(setEditForm);

  return (
    <section className={`page${isActive ? ' is-active' : ''}`} data-page="goals">
      <div className="page-header">
        <div>
          <h2>Goals</h2>
          <p className="muted">Set goals and keep your streak alive.</p>
        </div>
        {successMsg && (
          <span style={{ color: '#3cbc85', fontSize: '14px', fontWeight: 600 }}>
            {successMsg}
          </span>
        )}
      </div>

      {error && (
        <div
          style={{
            padding: '12px 16px',
            background: '#fff1f0',
            border: '1px solid #ffa39e',
            borderRadius: '8px',
            marginBottom: '16px',
            color: '#cf1322',
            fontSize: '14px',
          }}
        >
          {error}
        </div>
      )}

      <div className="two-col">
        {/* Add Goal Form */}
        <div className="glass card">
          <h3>Add a Goal</h3>
          <form onSubmit={handleAddGoal}>
            <label className="input-label">Category</label>
            <select
              className="input"
              value={form.category}
              onChange={e => setAddField('category', e.target.value)}
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>

            <label className="input-label">Goal Type</label>
            <input
              className="input"
              placeholder="e.g. Steps, Duration, Servings"
              value={form.goalType}
              onChange={e => setAddField('goalType', e.target.value)}
              required
            />

            <label className="input-label">Target Value</label>
            <input
              className="input"
              type="number"
              min="1"
              placeholder="e.g. 10000"
              value={form.targetValue}
              onChange={e => setAddField('targetValue', e.target.value)}
              required
            />

            <label className="input-label">Unit</label>
            <input
              className="input"
              placeholder="e.g. steps, minutes, cups"
              value={form.unit}
              onChange={e => setAddField('unit', e.target.value)}
              required
            />

            <label className="input-label">Frequency</label>
            <select
              className="input"
              value={form.frequency}
              onChange={e => setAddField('frequency', e.target.value)}
            >
              {FREQUENCIES.map(f => <option key={f}>{f}</option>)}
            </select>

            <label className="input-label">Start Date</label>
            <input
              className="input"
              type="date"
              value={form.start_date}
              onChange={e => setAddField('start_date', e.target.value)}
              required
            />

            <label className="input-label">End Date</label>
            <input
              className="input"
              type="date"
              value={form.end_date}
              onChange={e => setAddField('end_date', e.target.value)}
              required
            />

            <div className="button-row">
              <button className="primary-button" type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save Goal'}
              </button>
              <button
                className="ghost-button"
                type="button"
                onClick={() => setShowGoals(prev => !prev)}
              >
                {showGoals ? 'Hide Goals' : 'View Goals'}
              </button>
            </div>
          </form>
        </div>

        {/* Progress Card */}
        <div className="glass card">
          <h3>Progress</h3>
          {showGoals && goals.length > 0 ? (
            <>
              <div className="stat-label">Active goals</div>
              <div className="stat-value">{activeGoals.length}</div>
              <div className="progress">
                <div className="progress-fill" style={{ width: progressWidth }} />
              </div>
              <div className="muted">Goal completion ({progressPercent}%)</div>
              <div className="stat-label">Goals met</div>
              <div className="stat-value">
                {metGoals.length} / {activeGoals.length}
              </div>
            </>
          ) : (
            <>
              <div className="stat-label">Click "View Goals"</div>
              <div className="stat-value" style={{ fontSize: '16px' }}>to see live data</div>
              <div className="progress">
                <div className="progress-fill" style={{ width: '8%' }} />
              </div>
              <div className="muted">Pulls from your PostgreSQL database</div>
            </>
          )}
        </div>
      </div>

      {/* Goals List */}
      {showGoals && (
        <div className="glass card" style={{ marginTop: '16px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <h3 style={{ margin: 0 }}>Goals for {activeChild}</h3>
            <button className="ghost-button" onClick={fetchGoals} disabled={loading}>
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>

          {loading && <p className="muted">Loading goals...</p>}
          {!loading && goals.length === 0 && (
            <p className="muted">No goals found. Add one using the form above!</p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {goals.map(goal =>
              editingGoal?.goalid === goal.goalid ? (
                <EditGoalForm
                  key={goal.goalid}
                  form={editForm}
                  saving={saving}
                  onFieldChange={setEditField}
                  onSubmit={handleUpdateGoal}
                  onCancel={() => setEditingGoal(null)}
                />
              ) : (
                <GoalCard
                  key={goal.goalid}
                  goal={goal}
                  onEdit={handleStartEdit}
                  onDelete={handleDeleteGoal}
                />
              )
            )}
          </div>
        </div>
      )}

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

// --- Sub-components ---

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (goalid: number) => void;
}

function GoalCard({ goal, onEdit, onDelete }: GoalCardProps) {
  const pct = Math.min(100, Math.round((goal.value / goal.targetvalue) * 100));
  const met = goal.value >= goal.targetvalue;

  return (
    <div
      style={{
        padding: '16px',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: '12px',
        background: 'rgba(255,255,255,0.5)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '8px',
        }}
      >
        <div>
          <span
            style={{
              padding: '2px 10px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 600,
              background: '#e6f7ef',
              color: '#3cbc85',
              marginRight: '8px',
            }}
          >
            {goal.category}
          </span>
          <span style={{ fontSize: '12px', color: '#888' }}>{goal.frequency}</span>
          {!goal.isactive && (
            <span style={{ marginLeft: '8px', fontSize: '12px', color: '#aaa' }}>(inactive)</span>
          )}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="ghost-button"
            style={{ padding: '4px 10px', fontSize: '13px' }}
            onClick={() => onEdit(goal)}
          >
            Edit
          </button>
          <button
            style={{
              padding: '4px 10px',
              fontSize: '13px',
              border: '1px solid #ffa39e',
              borderRadius: '6px',
              background: 'none',
              color: '#cf1322',
              cursor: 'pointer',
            }}
            onClick={() => onDelete(goal.goalid)}
          >
            Delete
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '6px' }}>
        <strong>{goal.goaltype}</strong>
        <span style={{ color: '#666', marginLeft: '8px' }}>
          {goal.value} / {goal.targetvalue} {goal.unit}
        </span>
        {met && (
          <span style={{ marginLeft: '8px', color: '#3cbc85', fontWeight: 600 }}>Met</span>
        )}
      </div>

      <div className="progress">
        <div className="progress-fill" style={{ width: `${Math.max(4, pct)}%` }} />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '4px',
          fontSize: '12px',
          color: '#888',
        }}
      >
        <span>{pct}% complete</span>
        <span>
          {goal.start_date.split('T')[0]} → {goal.end_date.split('T')[0]}
        </span>
      </div>
    </div>
  );
}

interface EditGoalFormProps {
  form: FormState;
  saving: boolean;
  onFieldChange: (field: keyof FormState, val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

function EditGoalForm({ form, saving, onFieldChange, onSubmit, onCancel }: EditGoalFormProps) {
  return (
    <div
      style={{
        padding: '16px',
        border: '2px solid #3cbc85',
        borderRadius: '12px',
        background: 'rgba(60,188,133,0.04)',
      }}
    >
      <form onSubmit={onSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div>
            <label className="input-label">Category</label>
            <select
              className="input"
              value={form.category}
              onChange={e => onFieldChange('category', e.target.value)}
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="input-label">Frequency</label>
            <select
              className="input"
              value={form.frequency}
              onChange={e => onFieldChange('frequency', e.target.value)}
            >
              {FREQUENCIES.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label className="input-label">Goal Type</label>
            <input
              className="input"
              value={form.goalType}
              onChange={e => onFieldChange('goalType', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="input-label">Unit</label>
            <input
              className="input"
              value={form.unit}
              onChange={e => onFieldChange('unit', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="input-label">Target Value</label>
            <input
              className="input"
              type="number"
              value={form.targetValue}
              onChange={e => onFieldChange('targetValue', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="input-label">Current Value</label>
            <input
              className="input"
              type="number"
              value={form.value}
              onChange={e => onFieldChange('value', e.target.value)}
            />
          </div>
          <div>
            <label className="input-label">Start Date</label>
            <input
              className="input"
              type="date"
              value={form.start_date}
              onChange={e => onFieldChange('start_date', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="input-label">End Date</label>
            <input
              className="input"
              type="date"
              value={form.end_date}
              onChange={e => onFieldChange('end_date', e.target.value)}
              required
            />
          </div>
        </div>
        <div className="button-row" style={{ marginTop: '12px' }}>
          <button className="primary-button" type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Update Goal'}
          </button>
          <button className="ghost-button" type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default GoalsPage;
