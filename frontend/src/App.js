import { useState, useEffect } from "react";

const API = "http://localhost:3000/workouts";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0a0a0a;
    color: #f0ede6;
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
  }

  .app {
    max-width: 720px;
    margin: 0 auto;
    padding: 48px 24px;
  }

  .header {
    margin-bottom: 20px;
    text-align: center;
  }

  .header h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 72px;
    line-height: 1;
    letter-spacing: 2px;
    color: #f0ede6;
  }

  .header h1 span {
    color: #f0ede6;
  }

  .header p {
    font-size: 13px;
    color: #666;
    margin-top: 8px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .form-card {
    background: #141414;
    border: 1px solid #1f1f1f;
    /*border-radius: 4px;*/
    padding: 28px;
    margin-bottom: 40px;
  }

  .form-title {
    text-align: center;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    letter-spacing: 2px;
    color: #ff4d4d;
    margin-bottom: 20px;
  }

  .form-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr auto;
    gap: 12px;
    align-items: end;
  }

  .field label {
    display: block;
    font-size: 11px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #555;
    margin-bottom: 6px;
  }

  .field input {
    width: 100%;
    background: #0a0a0a;
    border: 1px solid #2a2a2a;
    /*border-radius: 3px;*/
    padding: 10px 14px;
    color: #f0ede6;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
  }

  .field input:focus {
    border-color: #ff4d4d;
  }

  .btn {
    padding: 10px 20px;
    border: none;
    /*border-radius: 3px;*/
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.5px;
  }

  .btn-primary {
    background: #ff4d4d;
    color: #0a0a0a;
  }

  .btn-primary:hover {
    background: #ff4d4d;
    transform: translateY(-1px);
  }

  .btn-danger {
    background: transparent;
    color: #ff4d4d;
    border: 1px solid #2a2a2a;
    padding: 6px 12px;
    font-size: 12px;
  }

  .btn-danger:hover {
    border-color: #ff4d4d;
    background: #ff4d4d15;
  }

  .btn-edit {
    background: transparent;
    color: #888;
    border: 1px solid #2a2a2a;
    padding: 6px 12px;
    font-size: 12px;
  }

  .btn-edit:hover {
    border-color: #ff4d4d;
    color: #ff4d4d;
  }

  .btn-save {
    background: #ff4d4d;
    color: #0a0a0a;
    padding: 6px 12px;
    font-size: 12px;
  }

  .btn-cancel {
    background: transparent;
    color: #666;
    border: 1px solid #2a2a2a;
    padding: 6px 12px;
    font-size: 12px;
  }

  .section-label {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #444;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #1f1f1f;
  }

  .workout-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .workout-row {
    background: #141414;
    border: 1px solid #1f1f1f;
    /*border-radius: 3px;*/
    padding: 16px 20px;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr auto;
    align-items: center;
    gap: 12px;
    transition: border-color 0.2s;
  }

  .workout-row:hover {
    border-color: #2a2a2a;
  }

  .workout-name {
    font-weight: 500;
    font-size: 15px;
    color: #f0ede6;
  }

  .workout-stat {
    font-size: 13px;
    color: #666;
  }

  .workout-stat span {
    color: #f0ede6;
    font-weight: 500;
  }

  .actions {
    display: flex;
    gap: 6px;
  }

  .edit-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr auto;
    gap: 8px;
    align-items: center;
  }

  .edit-row input {
    background: #0a0a0a;
    border: 1px solid #ff4d4d;
    /*border-radius: 3px;*/
    padding: 6px 10px;
    color: #f0ede6;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    outline: none;
    width: 100%;
  }

  .empty {
    text-align: center;
    padding: 48px;
    color: #333;
    font-size: 13px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .toast {
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: #ff4d4d;
    color: #0a0a0a;
    padding: 12px 20px;
    border-radius: 3px;
    font-size: 13px;
    font-weight: 500;
    animation: slideIn 0.3s ease;
  }

  @keyframes slideIn {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

export default function App() {
  const [workouts, setWorkouts] = useState([]); //stores all workouts from backend
  const [form, setForm] = useState({ Workouts: "", Sets: "", Reps: "" }); //stores input values from user
  const [editId, setEditId] = useState(null); //tracks which workout is being edited
  const [editForm, setEditForm] = useState({}); //stores temp values when editing
  const [toast, setToast] = useState(""); //stores notification message

  const showToast = (msg) => { 
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }; //shows a notification messages and clears is after 2.5 seconds

  //GET Method
  const fetchWorkouts = async () => { //calls backend and converts response from JSON
    const res = await fetch(API);
    const data = await res.json();
    setWorkouts(data);
  };

  useEffect(() => { fetchWorkouts(); }, []); 

  //POST Method
  const handleAdd = async () => { 
    if (!form.Workouts || !form.Sets || !form.Reps) return; //submissions must not be empty
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }); //sends data back to backend
    setForm({ Workouts: "", Sets: "", Reps: "" }); //reset form
    fetchWorkouts(); //refresh list
    showToast("Workout logged."); //show notification
  };


  //DELETED Method
  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchWorkouts();
    showToast("Workout deleted.");
  };

  const handleEdit = (w) => {
    setEditId(w.id);
    setEditForm({ Workouts: w.Workouts, Sets: w.Sets, Reps: w.Reps });
  };

  const handleSave = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    setEditId(null);
    fetchWorkouts();
    showToast("Workout updated!");
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="header">
          <h1>WORKOUT LOGGER<br /></h1>
        </div>

        <div className="form-card">
          <div className="form-title">LOG A WORKOUT</div>
          <div className="form-row">
            <div className="field">
              <label>Type of Exercise:</label>
              <input
                placeholder="e.g Bench Press"
                value={form.Workouts}
                onChange={e => setForm({ ...form, Workouts: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Sets:</label>
              <input
                placeholder="0"
                value={form.Sets}
                onChange={e => setForm({ ...form, Sets: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Reps:</label>
              <input
                placeholder="0"
                value={form.Reps}
                onChange={e => setForm({ ...form, Reps: e.target.value })}
              />
            </div>
            <button className="btn btn-primary" onClick={handleAdd}>LOG</button>
          </div>
        </div>

        <div className="section-label">Workouts:</div>

        <div className="workout-list">
          {workouts.length === 0 && (
            <div className="empty">No workouts logged yet</div>
          )}
          {workouts.map(w => (
            <div className="workout-row" key={w.id}>
              {editId === w.id ? (
                <div className="edit-row" style={{ gridColumn: "1 / -1" }}>
                  <input value={editForm.Workouts} onChange={e => setEditForm({ ...editForm, Workouts: e.target.value })} />
                  <input value={editForm.Sets} onChange={e => setEditForm({ ...editForm, Sets: e.target.value })} />
                  <input value={editForm.Reps} onChange={e => setEditForm({ ...editForm, Reps: e.target.value })} />
                  <div className="actions">
                    <button className="btn btn-save" onClick={() => handleSave(w.id)}>Save</button>
                    <button className="btn btn-cancel" onClick={() => setEditId(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="workout-name">{w.Workouts}</div>
                  <div className="workout-stat"><span>{w.Sets}</span> sets</div>
                  <div className="workout-stat"><span>{w.Reps}</span> reps</div>
                  <div className="actions">
                    <button className="btn btn-edit" onClick={() => handleEdit(w)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(w.id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}