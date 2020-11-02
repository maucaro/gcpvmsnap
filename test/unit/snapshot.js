const expect = require('chai').expect;

const mockery = require('mockery');
mockery.registerSubstitute('@google-cloud/compute', './compute-mock');
mockery.enable({
  warnOnReplace: false,
  warnOnUnregistered: false
});

const Compute = require('@google-cloud/compute');
const snapshot = require("../../built/snapshot");


describe('Sanpshot Creation', function () {
  before(function () {

  });

  it('naked compute.getVMs', function (done) {
    const compute = new Compute();
    compute.getVMs()
      .then(data => {
        const vms = data[0];
        expect(vms[0].metadata.name).to.equal("test-snap-1");
        done();
      })
      .catch(error => {
        done(error);
      });
  });

  it('No tag - all VMs should be processed', function (done) {
    snapshot.createSnapshots()
      .then(vms => {
        expect(vms).to.equal(7);
        done();
      })
      .catch(error => {
        done(error);
      });
  });

  it('Tag "loquesea"', function (done) {
    snapshot.createSnapshots('loquesea')
      .then(vms => {
        expect(vms).to.equal(4);
        done();
      })
      .catch(error => {
        done(error);
      });
  });

  it('Tag "loquesea2"', function (done) {
    snapshot.createSnapshots('loquesea2')
      .then(vms => {
        expect(vms).to.equal(1);
        done();
      })
      .catch(error => {
        done(error);
      });
  });

  it('Tag "loquesea3" - (does not exist)', function (done) {
    snapshot.createSnapshots('loquesea3')
      .then(vms => {
        expect(vms).to.equal(0);
        done();
      })
      .catch(error => {
        done(error);
      });
  });
});

context('Sanpshot Creation with no application credentials', () => {
  let gac;

  before(function () {
    gac = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    delete process.env.GOOGLE_APPLICATION_CREDENTIALS;
  });

  it('Empty GOOGLE_APPLICATION_CREDENTIALS', function (done) {
    snapshot.createSnapshots()
      .catch(() => {
        done();
      });
  });

  after(function () {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = gac;
  });
});

context('Sanpshot Purge', () => {
  for (let days = 0; days < 10; days++) {
    it(`days = ${days}`, function (done) {
      snapshot.purgeSnapshots(days)
        .then(snaps => {
          expect(snaps).to.equal(9 - days);
          done();
        })
        .catch(error => {
          done(error);
        });
    });
  }
});

context('Sanpshot purge with no application credentials', () => {
  let gac;

  before(function () {
    gac = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    delete process.env.GOOGLE_APPLICATION_CREDENTIALS;
  });

  it('Empty GOOGLE_APPLICATION_CREDENTIAL ', function (done) {
    snapshot.purgeSnapshots()
      .catch(() => {
        done();
      });
  });

  after(function () {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = gac;
  });
});
