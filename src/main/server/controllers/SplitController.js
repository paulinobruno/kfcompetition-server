'use strict';

const { CREATED, NO_CONTENT, RESET_CONTENT } = require('./HttpStatus');
const debug = require('debug')('paal:controllers:split');
const workoutService = require('services/WorkoutService');
const service = require('services/SplitService');

const controller = {
  addSplit(request, response, next) {
    const { workoutId } = request.params;
    const split = request.body;

    workoutService.findById(workoutId)
      .then(workout => {
        workout.splits.push(split);
        return workout.save().then(saved => saved.splits[saved.splits.length - 1]);
      })
      .then(data => {
        response
          .status(CREATED)
          .location(`/workouts/${workoutId}/splits/${data.id}`)
          .json(data);
      })
      .catch(next);
  },
  getSplit(request, response, next) {
    const { workoutId, splitId } = request.params;

    service.findById(workoutId, splitId)
      .then(({ split }) => response.json(split))
      .catch(next);
  },
  listWorkoutSplits(request, response, next) {
    const { workoutId } = request.params;

    workoutService.findById(workoutId)
      .then(workout => response.json(workout.splits))
      .catch(next);
  },
  updateSplit(request, response, next) {
    const { workoutId, splitId: id } = request.params;
    const currSplit = Object.assign(request.body, { id });

    service.findById(workoutId, id)
      .then(({ split, workout }) => {
        Object.assign(split, currSplit);
        return workout.save().then(() => split);
      })
      .then(data => response.status(NO_CONTENT).json(data))
      .catch(next);
  },
  deleteSplit(request, response, next) {
    const { workoutId, splitId } = request.params;

    service.findById(workoutId, splitId)
      .then(({ workout }) => {
        workout.splits = workout.splits.filter(curr => curr.id !== splitId);
        return workout.save();
      })
      .then(() => response.status(RESET_CONTENT).end())
      .catch(next);
  }
};

module.exports = controller;
