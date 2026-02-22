// API client for Goals — maps to server/routes/goals.js
// Column names are lowercase to match PostgreSQL output from schema-postgres.sql

export interface Goal {
  goalid: number;
  userid: number;
  childid: number;
  category: string;
  targetvalue: number;
  goaltype: string;
  value: number;
  unit: string;
  start_date: string;
  end_date: string;
  frequency: string;
  isactive: boolean;
}

export type CreateGoalData = Omit<Goal, 'goalid'>;

export type UpdateGoalData = Pick<
  Goal,
  'category' | 'targetvalue' | 'goaltype' | 'value' | 'unit' | 'start_date' | 'end_date' | 'frequency' | 'isactive'
>;

const BASE = '/api/goals';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const goalsApi = {
  getAll(childID: number): Promise<Goal[]> {
    return fetch(`${BASE}?childID=${childID}`).then(r => handleResponse<Goal[]>(r));
  },

  create(data: CreateGoalData): Promise<Goal> {
    return fetch(BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => handleResponse<Goal>(r));
  },

  update(goalid: number, data: UpdateGoalData): Promise<Goal> {
    return fetch(`${BASE}/${goalid}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => handleResponse<Goal>(r));
  },

  delete(goalid: number): Promise<void> {
    return fetch(`${BASE}/${goalid}`, { method: 'DELETE' }).then(r => handleResponse<void>(r));
  },
};
