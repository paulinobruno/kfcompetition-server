'use strict';

const mongoose = require('mongoose');
const debugRef = sinon.stub();
const debugStub = sinon.stub().returns(debugRef);
const mongoConfig = proxyquire('config/mongo', {
  'mongoose': mongoose,
  'debug': debugStub
});

describe('mongo config', () => {
  beforeEach(() => {
    sinon.stub(mongoose, 'connect');
  });

  afterEach(() => {
    mongoose.connect.restore();
  });

  it('given error trying to connect then must print', () => {
    const connectionURI = 'mongodb://connectionURI';
    const err = new Error('AnyError');

    debugRef.callsFake((message, object) => {
      assert.equal(typeof message, 'string');
      assert.equal(typeof object, 'object');
      assert.deepEqual(object, {
        connectionURI,
        err
      });
    });

    mongoose.connect.rejects(err);

    mongoConfig(connectionURI)
      .catch(reason => assert.deepEqual(reason, err));
  });
});
