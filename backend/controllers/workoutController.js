const Workout = require('../models/workouts');

exports.getAllWorkouts = function(req, res) {
    Workout.getAllWorkouts((err, workouts) => {
        if (err) throw err;
        res.json(workouts);
    });
};

exports.getWorkoutById = function(req, res) {
    Workout.getWorkoutById(req.params.id, (err, workout) => {
        if (err) throw err;
        res.json(workout);
    });
};
    
exports.createWorkout = function(req, res) {
    console.log(req.body);
    const newWorkout = {
        Workouts: req.body.Workouts,
        Sets: req.body.Sets,
        Reps: req.body.Reps
    };

    Workout.createWorkout(newWorkout, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Workout successfully logged!' });
    });
};

exports.updateWorkout = function(req, res) {
    const updatedWorkout = {
        Workout: req.body.Workout,
        Reps: req.body.Reps
    };

    Workout.updateWorkout(req.params.id, updatedWorkout, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Workout updated successfully' });
    });
};

exports.deleteWorkout = function(req, res) {
    Workout.deleteWorkout(req.params.id, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Workout deleted successfully' });
    });
};