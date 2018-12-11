'use strict';

const debug = require('debug')('paal:controllers:workout');
const repository = require('repositories/WorkoutRepository');
const service = require('services/WorkoutService');
const { CREATED, NO_CONTENT, RESET_CONTENT, BAD_REQUEST, NOT_FOUND } = require('./HttpStatus');

const controller = {
  addWorkout(request, response, next) {
    const { name, validSince, validUntil } = request.body;

    if (!name || !validSince || !validUntil) {
      return response.status(BAD_REQUEST).end();
    }

    const workout = { name, validSince, validUntil };

    repository
      .insert(workout)
      .then(data => {
        response
          .status(CREATED)
          .location(`/workouts/${data.id}`)
          .json(data);
      })
      .catch(next);
  },
  listWorkouts(request, response, next) {
    repository.findAll()
      .then(data => response.json(data))
      .catch(next);
  },
  getWorkout(request, response, next) {
    const { workoutId } = request.params;

    service.findById(workoutId)
      .then(data => response.json(data))
      .catch(next);
  },
  updateWorkout(request, response, next) {
    const { workoutId: id } = request.params;
    const { name, validSince, validUntil } = request.body;
    const workout = { id, name, validSince, validUntil };

    service.update(workout)
      .then(data => response.status(NO_CONTENT).json(data))
      .catch(next);
  },
  deleteWorkout(request, response, next) {
    const { workoutId } = request.params;

    service.delete(workoutId)
      .then(() => response.status(RESET_CONTENT).end())
      .catch(next);
  }
};

module.exports = controller;
