'use strict';

const { OK, CREATED, NO_CONTENT, RESET_CONTENT, NOT_FOUND } = require('controllers/HttpStatus');
const workoutRepository = require('repositories/WorkoutRepository');
const Workout = require('models/Workout');

describe('/workouts/:id/splits', () => {
  const validWorkout = {
    name: 'Hipertrofia',
    validSince: new Date(),
    validUntil: new Date(new Date().getFullYear() + 1, 11, 31)
  };

  const validSplit = {
    exercises: [
      {
        exercise: {
          name: 'Barbell Squat'
        },
        reps: [12, 10, 8],
        interval: 90
      }
    ]
  };

  before('insert base data for further tests', done => {
    workoutRepository.insert(validWorkout)
      .then(saved => {
        validWorkout.id = saved.id;
        done();
      });
  });

  afterEach('cleaning tested data', done => {
    workoutRepository.get(validWorkout.id)
      .then(workout => {
        workout.splits = [];
        workout.save().then(() => done());
      });
  });

  after('clean all data', done => {
    Workout.deleteMany().exec().then(() => done());
  });

  describe('POST /', () => {
    it('/:workoutId/splits should be CREATED', done => {
      authrequest
        .post(`/workouts/${validWorkout.id}/splits`)
        .send(validSplit)
        .set('Accept', 'application/json')
        .expect(CREATED)
        .end((err, response) => {
          const generatedId = response.body._id;
          assert.ok(!err);
          assert.ok(generatedId);
          assert.equal(
            response.headers.location,
            `/workouts/${validWorkout.id}/splits/${generatedId}`
          );
          done();
        });
    });

    it('/XPTO/splits should be NOT FOUND', done => {
      authrequest
        .post('/workouts/000000000000000000000000/splits')
        .send({ name: 'Levantamento Terra' })
        .set('Accept', 'application/json')
        .expect(NOT_FOUND)
        .expect('WORKOUT_NOT_FOUND')
        .end(done);
    });
  });

  describe('GET /:id', () => {
    it('/:workoutId/splits/1 should be OK', done => {
      workoutRepository.get(validWorkout.id)
        .then(workout => {
          workout.splits = [validSplit];
          return workout.save();
        })
        .then(saved => {
          const savedSplit = saved.splits[0];

          authrequest
            .get(`/workouts/${validWorkout.id}/splits/${savedSplit._id}`)
            .expect(OK)
            .end(done);
        });
    });

    it('/:workoutId/splits/XPTO should be NOT_FOUND', done => {
      authrequest
        .get(`/workouts/${validWorkout.id}/splits/000000000000000000000000`)
        .expect(NOT_FOUND)
        .expect('SPLIT_NOT_FOUND')
        .end(done);
    });

    it('/XPTO/splits/XPTO should be NOT_FOUND', done => {
      authrequest
        .get(`/workouts/000000000000000000000000/splits/XPTO`)
        .expect(NOT_FOUND)
        .expect('WORKOUT_NOT_FOUND')
        .end(done);
    });
  });

  describe('GET /', () => {
    it('/:workoutId/splits should be OK with response data array', done => {
      workoutRepository.get(validWorkout.id)
        .then(workout => {
          workout.splits = [Object.assign({}, validSplit), Object.assign({}, validSplit)];
          return workout.save();
        })
        .then(saved => {
          authrequest
            .get(`/workouts/${validWorkout.id}/splits`)
            .expect(OK)
            .expect(({ body }) => {
              assert.ok(Array.isArray(body));
              assert.equal(body.length, 2);
            })
            .end(done);
        });
    });

    it('/:workoutId/splits should be OK with empty response data array', done => {
      authrequest
        .get(`/workouts/${validWorkout.id}/splits`)
        .expect(OK, [])
        .end(done);
    });

    it('/XPTO/splits should be NOT_FOUND', done => {
      authrequest
        .get(`/workouts/000000000000000000000000/splits`)
        .expect(NOT_FOUND)
        .expect('WORKOUT_NOT_FOUND')
        .end(done);
    });
  });

  describe('PUT /:id', () => {
    it('/:workoutId/splits/1 should be OK', done => {
      const newSplit = {
        exercises: [
          {
            exercise: {
              name: 'Deadlift'
            },
            reps: [12, 10, 8],
            interval: 90
          }
        ]
      };

      workoutRepository.get(validWorkout.id)
        .then(workout => {
          workout.splits = [validSplit];
          return workout.save();
        })
        .then(saved => {
          const { _id: splitId } = saved.splits[0];

          authrequest
            .put(`/workouts/${validWorkout.id}/splits/${splitId}`)
            .send(newSplit)
            .set('Accept', 'application/json')
            .expect(NO_CONTENT)
            .end(() => {
              workoutRepository.get(validWorkout.id)
                .then(workout => {
                  const split = workout.splits[0];

                  assert.ok(split);
                  assert.equal(split.id, splitId);
                  assert.equal(split.exercises[0].exercise.name, 'Deadlift');
                  done();
                })
            });
        });
    });

    it('/:workoutId/splits/XPTO should be NOT_FOUND', done => {
      authrequest
        .put(`/workouts/${validWorkout.id}/splits/000000000000000000000000`)
        .send({ name: 'Stiff' })
        .set('Accept', 'application/json')
        .expect(NOT_FOUND)
        .expect('SPLIT_NOT_FOUND')
        .end(done);
    });

    it('/XPTO/splits/XPTO should be NOT_FOUND', done => {
      authrequest
        .put(`/workouts/000000000000000000000000/splits/000000000000000000000000`)
        .send({ name: 'Stiff' })
        .set('Accept', 'application/json')
        .expect(NOT_FOUND)
        .expect('WORKOUT_NOT_FOUND')
        .end(done);
    });
  });

  describe('DELETE /:id', () => {
    it('/:workoutId/splits/1 should be OK', done => {
      workoutRepository.get(validWorkout.id)
        .then(workout => {
          workout.splits = [validSplit];
          return workout.save();
        })
        .then(saved => {
          const split = saved.splits[0];

          authrequest
            .delete(`/workouts/${validWorkout.id}/splits/${split.id}`)
            .expect(RESET_CONTENT)
            .end(() => {
              workoutRepository.get(validWorkout.id)
                .then(found => {
                  assert.equal(found.splits.length, 0);
                  done();
                });
            });
        });
    });

    it('/:workoutId/splits/XPTO should be NOT_FOUND', done => {
      authrequest
        .delete(`/workouts/${validWorkout.id}/splits/000000000000000000000000`)
        .expect(NOT_FOUND)
        .expect('SPLIT_NOT_FOUND')
        .end(done);
    });

    it('/XPTO/splits/XPTO should be NOT_FOUND', done => {
      authrequest
        .delete(`/workouts/000000000000000000000000/splits/000000000000000000000000`)
        .expect(NOT_FOUND)
        .expect('WORKOUT_NOT_FOUND')
        .end(done);
    });
  });
});
