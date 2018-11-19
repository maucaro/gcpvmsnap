'use strict';

const VM_TAG_FILTER = "gcpvmsnapfilter"; //Key to use in VM's custom metadata
const Compute = require('@google-cloud/compute');
const compute = new Compute();

const express = require('express');
const requireHeader = require('require-header');
const app = express();
app.enable('trust proxy');
app.use(requireHeader('X-Appengine-Cron')); //Only allow requests from GAE Cron service

async function createSnapshots(tag) {
    var vms = await compute.getVMs()
        .then(function(data) { 
            return data[0]; 
        })
        .catch(function(err) { 
            console.error ('Error reading VMs.', err); 
            return [];
        });
    if (tag) { //need to filter out VMs whose metadata doesn't match the passed in value
        vms = vms.filter(vm => { 
            const items = vm.metadata.metadata.items ? vm.metadata.metadata.items : [];
            for (var i = 0; i < items.length; i++) {
                if (items[i].key == VM_TAG_FILTER  && items[i].value == tag) {
                    return true;
                }
            }
            return false;
        })
    }
    console.log(`VMs to process: ${vms.length}`)
    for (var i=0; i < vms.length; i++) {
        console.log(`Processing VM: ${vms[i].name}`);
        const vmId = vms[i].metadata.id;
        const disks = await vms[i].metadata.disks;
        for (var j =0; j < disks.length; j++) {
            const diskSplit = disks[j].source.split('/');
            const diskName = diskSplit[diskSplit.length-1];
            const diskZone = diskSplit[diskSplit.length-3];
            const zone = compute.zone(diskZone);
            const disk = zone.disk(diskName);
            const dt = new Date().toISOString().replace(/[T\-:]/g, '').replace(/\..+/, ''); //Format is yyyyMMddHHmmss in UTC
            const snapName = `s-${vmId}-${diskName.substring(0,24)}-${dt}` //Snapshot can have a maximum of 62 characters; using this name format leaves us with up to 25 characters for the diskName portion of the name
            console.log(`Processing disk: ${diskName} in zone: ${diskZone} snapshot name: ${snapName}`);
            disk.createSnapshot(snapName)
                .then()
                .catch(function(error) { console.error (error);});
        }
    }
}

async function purgeSnapshots(days) {
    var snaps = await compute.getSnapshots({filter: "name eq '^s\-.*$'"}) //only checking that it starts with "s-"; more complex patterns don't seem to be supported 
        .then(function(data) { 
            return data[0]; 
        })
        .catch(function(err) { 
            console.error ('Error reading VMs.', err); 
            return [];
        });
    snaps = snaps.filter(snap => { //filter out the ones that are not older than 'days' days and apply stricter regex expression
        const MILLISECONDS_DAY = 86400000;
        if ((snap.metadata.name.search(/s\-\d+\-.{1,24}\-\d{14}/) == 0) && ((Date.now()-Date.parse(snap.metadata.creationTimestamp)) / MILLISECONDS_DAY) > days ) {
            return true;
        }
        else {
            return false;
        }
    })
    console.log(`Snapshots to process: ${snaps.length}`)
    for (var i=0; i < snaps.length; i++) {
        snaps[i].delete()
            .then()
            .catch(function(error) { console.error (error);});
    }
}

app.get('/create_snapshots', (req, res, next) => {
    (async () => {
        await createSnapshots(req.query.tag);
        const recMessage = `Snapshot creation request received at ${new Date().toISOString()}`;
        console.log(recMessage);
        res.send(recMessage).end();
    })();
});

app.get('/purge_snapshots', (req, res, next) => {
    (async () => {
        const days = Math.abs(parseInt(req.query.days)) || 7; //allow only positive integers with default of 7
        await purgeSnapshots(days);
        const recMessage = `Snapshot purge request received at ${new Date().toISOString()}`;
        console.log(recMessage);
        res.send(recMessage).end();
    })();
});

app.use(function (err, req, res, next) {
    res.status(err.status).send({
        message: err.message
    });
});

const PORT = process.env.PORT || 8080;
app.listen(process.env.PORT || 8080, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
