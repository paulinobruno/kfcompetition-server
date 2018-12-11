'use strict';

const repository = require('repositories/WorkoutRepository');
const { NOT_FOUND } = require('controllers/HttpStatus');

const service = {
  findById(workoutId) {
    return repository.get(workoutId).then(_throwIfNotFound);
  },
  update(workout) {
    return repository
      .update(workout)
      .then(_throwIfNotFound);
  },
  delete(workoutId) {
    return repository
      .delete(workoutId)
      .then(_throwIfNotFound);
  }
};

module.exports = service;

const _throwIfNotFound = (workout) => {
  if (!workout) {
    const error = new Error('WORKOUT_NOT_FOUND');
    error.status = NOT_FOUND;

    throw error;
  }

  return workout;
}
