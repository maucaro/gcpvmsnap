'use strict';

import { createSnapshots, purgeSnapshots } from './snapshot';

import express from 'express';
const app = express();

import requireHeader from 'require-header';

if (process.env.HTTP_HEADER) {
  //Only allow requests from GAE Cron service or Cloud Scheduler by checking 
  //for the presence of the corresponding header ('X-Appengine-Cron' or 'X-CloudScheduler') 
  app.use(requireHeader(process.env.HTTP_HEADER));
}

app.get('/create_snapshots', function (req, res) {
    const recMessage = `Snapshot creation request received at ${new Date().toISOString()}`;
    console.log(recMessage);
    createSnapshots(req.query.tag ? req.query.tag.toString() : null)
      .then((vms: any) => {
        const procMessage = `VMs to process: ${vms}`;
        res.send(recMessage + '\n' + procMessage).end();
      })
      .catch(function (err: { message: any; }) {
          res.status(500).send(`Error: ${err.message}`);
        });
  });

app.get('/purge_snapshots', function (req, res) {
    //days should allow only integers greater than or equal to 0 and defaults to 7
    const days = req.query.days && Number.isInteger(parseInt(req.query.days.toString())) ? Math.abs(parseInt(req.query.days.toString())) : 7;
    const recMessage = `Snapshot purge request received to delete snapshots older than ${days} day(s) at ${new Date().toISOString()}`;
    console.log(recMessage);
    purgeSnapshots(days)
      .then((snaps: any) => {
        const procMessage = `Snapshots to process: ${snaps}`;
        res.send(recMessage + '\n' + procMessage).end();
      })
      .catch((err: { message: any; }) => {
        res.status(500).send(`Error: ${err.message}`);
      });
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
