'use strict';

const debug = require('debug')('paal:repository:workout');
const Workout = require('models/Workout');

const repository = {
  insert(workout) {
    return new Workout(workout).save();
  },

  update(workout) {
    return Workout.findByIdAndUpdate(workout.id, workout).exec();
  },

  get(workoutId) {
    return Workout.findById(workoutId);
  },

  delete(workoutId) {
    return Workout.findByIdAndRemove(workoutId).exec();
  },

  findAll() {
    const queryProjection = { name: 1, validSince: 1, validUntil: 1 };
    const queryOpts = {
      sort: { validSince: -1 }
    };

    return Workout.find({}, queryProjection, queryOpts).exec()
  }
};

module.exports = repository;

