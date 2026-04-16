const db=require('../config/database');

exports.getAllWorkouts = function(callback) {
    db.query('SELECT * FROM Workouts', callback);
};
exports.getWorkoutById = function(id, callback) {
    db.query('SELECT * FROM Workouts where id = ?', [id], callback);
};
exports.createWorkout = function(newWorkout, callback){
    db.query('INSERT INTO Workouts SET ?', newWorkout, callback);
};
exports.updateWorkout = function(id, updatedWorkout, callback){
    db.query('UPDATE Workouts SET ? WHERE id = ?', [updatedWorkout, id], callback);
};
exports.deleteWorkout = function(id, callback){
    db.query('DELETE FROM Workouts WHERE id = ?', [id], callback);
};
