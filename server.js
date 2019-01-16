'use strict';

const snapshot = require('./snapshot');
const createSnapshots = snapshot.createSnapshots;
const purgeSnapshots = snapshot.purgeSnapshots;

const express = require('express');
const requireHeader = require('require-header');
const app = express();

//Only allow requests from GAE Cron service
app.use(requireHeader('X-Appengine-Cron'));

app.get('/create_snapshots', (req, res) => {
  const recMessage = `Snapshot creation request received at ${new Date().toISOString()}`;
  console.log(recMessage);
  createSnapshots(req.query.tag)
    .then(vms => {
      const procMessage = `VMs to process: ${vms}`;
      res.send(recMessage + '\n' + procMessage).end();
    })
    .catch(err => {
      res.status(500).send(`Error: ${err.message}`)
    });
});

app.get('/purge_snapshots', (req, res) => {
  //days should allow only integers greater than or equal to 0 and defaults to 7
  const days = Number.isNaN(parseInt(req.query.days)) ? 7 : Math.abs(parseInt(req.query.days));
  const recMessage = `Snapshot purge request received to delete snapshots older than ${days} day(s) at ${new Date().toISOString()}`;
  console.log(recMessage);
  purgeSnapshots(days)
    .then(snaps => {
      const procMessage = `Snapshots to process: ${snaps}`
      res.send(recMessage + '\n' + procMessage).end();
    })
    .catch(err => {
      res.status(500).send(`Error: ${err.message}`)
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
