'use strict';

const { OK, CREATED, NO_CONTENT, RESET_CONTENT, BAD_REQUEST, NOT_FOUND } = require('controllers/HttpStatus');
const Workout = require('models/Workout');
const repository = require('repositories/WorkoutRepository');

describe('/workouts', () => {
  const _aWorkout = (name, validSince, validUntil) => ({ name, validSince, validUntil });

  afterEach('cleaning tested data', done => {
    Workout.deleteMany({}, done);
  });

  describe('POST /', () => {
    it('a perfect working payload should be created', done => {
      authrequest
        .post('/workouts')
        .send(_aWorkout('Hipertrofia', new Date(), new Date()))
        .set('Accept', 'application/json')
        .expect(CREATED)
        .end((err, response) => {
          const generatedId = response.body._id;
          assert.ok(!err);
          assert.ok(generatedId);
          assert.equal(response.headers.location, `/workouts/${generatedId}`);
          done();
        });
    });

    const invalidData = [
      _aWorkout(null, new Date(), new Date()),
      _aWorkout('Hipertrofia', null, new Date()),
      _aWorkout('Hipertrofia', new Date(), null)
    ];

    invalidData.forEach(data => {
      it('given required field missing should be a bad request', done => {
        authrequest
          .post('/workouts')
          .send(data)
          .set('Accept', 'application/json')
          .expect(BAD_REQUEST, done);
      });
    });
  });

  describe('GET /:id', () => {
    it('/1 should be OK', done => {
      const sample = _aWorkout('Hipertrofia', new Date(), new Date());

      repository.insert(sample).then(inserted => {
        authrequest
          .get(`/workouts/${inserted._id}`)
          .expect(OK)
          .end(done);
      });
    });

    it('/2 should be NOT FOUND', done => {
      authrequest
        .get('/workouts/000000000000000000000000')
        .expect(NOT_FOUND)
        .end((err, response) => {
          assert.equal(response.error.text, 'WORKOUT_NOT_FOUND');
          done();
        });
    });
  });

  describe('PUT /:id', () => {
    it('/1 should be OK', done => {
      const sample = _aWorkout('Hipertrofia', new Date(), new Date());
      repository.insert(sample).then(inserted => {
        authrequest
          .put(`/workouts/${inserted._id}`)
          .send({ name: 'Definição' })
          .set('Accept', 'application/json')
          .expect(NO_CONTENT)
          .end(() => {
            authrequest
              .get(`/workouts/${inserted._id}`)
              .expect(OK)
              .end((err, response) => {
                const foundWorkout = response.body;
                assert.equal(foundWorkout.name, 'Definição');
                assert.ok(!foundWorkout.validSince);
                assert.ok(!foundWorkout.validUntil);
                done();
              });
          });
      });
    });

    it('/2 should be NOT FOUND', done => {
      authrequest
        .put('/workouts/000000000000000000000000')
        .send({ name: 'Definição' })
        .set('Accept', 'application/json')
        .expect(NOT_FOUND)
        .end((err, response) => {
          assert.equal(response.error.text, 'WORKOUT_NOT_FOUND');
          done();
        });
    });
  });

  describe('DELETE /:id', () => {
    it('/1 should be OK', done => {
      repository.insert(_aWorkout('Hipertrofia', new Date(), new Date())).then(inserted => {
        authrequest
          .delete(`/workouts/${inserted._id}`)
          .expect(RESET_CONTENT)
          .end(done);
      });
    });

    it('/2 should be NOT FOUND', done => {
      authrequest
        .delete('/workouts/000000000000000000000000')
        .expect(NOT_FOUND)
        .end((err, response) => {
          assert.equal(response.error.text, 'WORKOUT_NOT_FOUND');
          done();
        });
    });
  });

  describe('GET /', () => {
    it('when no workout exists then should return an empty array', done => {
      authrequest.get('/workouts')
        .expect(OK, [])
        .end(done);
    });

    it('should list all workouts, most recent first', done => {
      const promises = [
        repository.insert(_aWorkout('Antigo', new Date(2000, 0, 1), new Date())),
        repository.insert(_aWorkout('Novo', new Date(), new Date()))
      ];

      Promise.all(promises).then(() => {
        authrequest.get('/workouts')
          .expect(OK)
          .expect(({ body }) => {
            assert.ok(body);
            assert.equal(body.length, 2);
            assert.equal(body[0].name, 'Novo');
            assert.equal(body[1].name, 'Antigo');
          })
          .end(done);
      });
    });
  });
});
