const API = "http://localhost:3000/workouts"; //if using tailscale, change the the url to your tailscale ip

// Types
interface Workout {
  id: number;
  Workouts: string;
  Reps: string;
  Created_on: string;
}

// DOM refs
const list = document.getElementById("workout-list") as HTMLDivElement;
const toastEl = document.getElementById("toast") as HTMLDivElement;
const inputExercise = document.getElementById(
  "input-exercise",
) as HTMLInputElement;
const inputReps = document.getElementById("input-reps") as HTMLInputElement;
const btnLog = document.getElementById("btn-log") as HTMLButtonElement;

// Validation
const isValidExercise = (val: string): boolean => /^[a-zA-Z\s]*$/.test(val);
const isValidNumber = (val: string): boolean =>
  val === "" || (/^\d+$/.test(val) && parseInt(val) > 0);

// Restrict input as user types
inputExercise.addEventListener("input", () => {
  if (!isValidExercise(inputExercise.value)) {
    inputExercise.value = inputExercise.value.replace(/[0-9]/g, "");
  }
});

inputReps.addEventListener("input", () => {
  if (!isValidNumber(inputReps.value)) {
    inputReps.value = inputReps.value.replace(/[^0-9]/g, "");
  }
});

// Toast
let toastTimer: ReturnType<typeof setTimeout>;
function showToast(msg: string): void {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2500);
}

// Fetch all workouts
async function fetchWorkouts(): Promise<void> {
  const res = await fetch(API);
  const data: Workout[] = await res.json();
  console.log(data);
  renderWorkouts(data);
}

// Render workout list
function renderWorkouts(workouts: Workout[]): void {
  list.innerHTML = "";

  if (workouts.length === 0) {
    list.innerHTML = `<div class="empty">No workouts logged yet</div>`;
    return;
  }

  //Group by date
  const byDate = Object.groupBy(workouts, (w) => w.Created_on);

  //Loop through each date
  for (const date in byDate) {
    const dateWorkouts = byDate[date]!;

    // Create date container
    const dateContainer = document.createElement("div");
    dateContainer.className = "date-group";
    dateContainer.innerHTML = `<div class="date-label">${new Date(date).toLocaleDateString()}</div>`;
    list.appendChild(dateContainer);

    //Group by exercise within that date
    const byExercise = Object.groupBy(dateWorkouts, (w) => w.Workouts);

    //Loop through each exercise
    for (const exercise in byExercise) {
      const sets = byExercise[exercise]!;

      // Create exercise container
      const exerciseContainer = document.createElement("div");
      exerciseContainer.className = "exercise-group";
      exerciseContainer.innerHTML = `<div class="exercise-label">${exercise}</div>`;
      dateContainer.appendChild(exerciseContainer);

      //Loop through each set and render a row
      sets.forEach((w, index) => {
        const row = document.createElement("div");
        const setNumber = index + 1;
        row.className = "workout-row";
        row.dataset.id = String(w.id);
        row.innerHTML = `
          <div class="workout-stat">Set <span>${setNumber}</span></div>
          <div class="workout-stat"><span>${w.Reps}</span> reps</div>
          <div class="actions">
            <button class="btn btn-edit" data-id="${w.id}">Edit</button>
            <button class="btn btn-danger" data-id="${w.id}">Delete</button>
          </div>
        `;

        //Edit button
        row
          .querySelector(".btn-edit")!
          .addEventListener("click", () => showEditRow(row, w));

        // Delete button
        row
          .querySelector(".btn-danger")!
          .addEventListener("click", async () => {
            await fetch(`${API}/${w.id}`, { method: "DELETE" });
            fetchWorkouts();
            showToast("Workout deleted.");
          });

        exerciseContainer.appendChild(row);
      });
    }
  }
}

// Show inline edit row
function showEditRow(row: HTMLDivElement, w: Workout): void {
  row.innerHTML = `
    <div class="edit-row">
      <input id="edit-exercise" type="text" value="${w.Workouts}" />
      <input id="edit-reps" type="text" value="${w.Reps}" />
      <div class="actions">
        <button class="btn btn-save" id="btn-save">Save</button>
        <button class="btn btn-cancel" id="btn-cancel">Cancel</button>
      </div>
    </div>
  `;

  const editExercise = row.querySelector("#edit-exercise") as HTMLInputElement;
  const editReps = row.querySelector("#edit-reps") as HTMLInputElement;

  // Validation on edit inputs
  editExercise.addEventListener("input", () => {
    if (!isValidExercise(editExercise.value)) {
      editExercise.value = editExercise.value.replace(/[0-9]/g, "");
    }
  });

  editReps.addEventListener("input", () => {
    if (!isValidNumber(editReps.value)) {
      editReps.value = editReps.value.replace(/[^0-9]/g, "");
    }
  });

  // Save
  row.querySelector("#btn-save")!.addEventListener("click", async () => {
    if (!editExercise.value || !editReps.value) return;
    await fetch(`${API}/${w.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Workouts: editExercise.value,
        Reps: editReps.value,
      }),
    });
    fetchWorkouts();
    showToast("Workout updated!");
  });

  // Cancel
  row
    .querySelector("#btn-cancel")!
    .addEventListener("click", () => fetchWorkouts());
}

// Log new workout
btnLog.addEventListener("click", async () => {
  const exercise = inputExercise.value.trim();
  const reps = inputReps.value.trim();

  if (!exercise || !reps) return;
  if (parseInt(reps) <= 0) return;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Workouts: exercise, Reps: reps }),
  });

  inputExercise.value = "";
  inputReps.value = "";
  fetchWorkouts();
  showToast("Workout logged.");
});

// Initial load
fetchWorkouts();
