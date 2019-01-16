'use strict';

//Key to use in VM's custom metadata
const VM_TAG_FILTER = 'gcpvmsnapfilter';

const Compute = require('@google-cloud/compute');
const compute = new Compute();

function createSnapshots(tag) {
  return compute.getVMs()
    .then(data => {
      let vms = data[0];
      if (tag) {
        //need to filter out VMs whose metadata doesn't match the passed in value
        vms = vms.filter(vm => {
          const items = vm.metadata.metadata.items ? vm.metadata.metadata.items : [];
          return (items.find(o => o.key === VM_TAG_FILTER && o.value === tag)) ? true : false;
        });
      }
      console.log(`VMs to process: ${vms.length}`);
      const createSnapPromises = [];
      for (const vm of vms) {
        console.log(`Processing VM: ${vm.metadata.name}`);
        const vmId = vm.metadata.id;
        const disks = vm.metadata.disks;
        for (const d of disks) {
          const diskSplit = d.source.split('/');
          const diskName = diskSplit[diskSplit.length - 1];
          const diskZone = diskSplit[diskSplit.length - 3];
          const zone = compute.zone(diskZone);
          const disk = zone.disk(diskName);

          // We want to end up with the following format: yyyyMMddHHmmss in UTC
          const dt = new Date().toISOString().replace(/[T\-:]/g, '').replace(/\..+/, '');

          //Snapshot can have a maximum of 62 characters. 
          //Using this name format leaves us with up to 25 characters for the diskName portion of the name.
          //Returned vmId is 19 characters; Use substring in case this changes in the future. 
          const snapName = `s-${vmId.substring(0, 19)}-${diskName.substring(0, 25)}-${dt}`;
          console.log(`Processing disk: ${diskName} in zone: ${diskZone} snapshot name: ${snapName}`);
          createSnapPromises.push(
            disk.createSnapshot(snapName)
              .catch(err => {
                console.error(`Error creating snapshot: ${err.message}`);
                throw new Error('One or more snapshot creation requests failed.');
              })
          );
        }
      }
      return Promise.all(createSnapPromises)
        .then(() => {
          return Promise.resolve(vms.length);
        });
    })
    .catch(err => {
      console.error(`Error creating snapshots: ${err.message}`);
      return Promise.reject(err);
    });
}

function purgeSnapshots(days) {
  //only checking that it starts with "s-"; more complex patterns don't seem to be supported 
  return compute.getSnapshots({ filter: "name eq '^s-.*$'" })
    .then(data => {
      let snaps = data[0];
      snaps = snaps.filter(snap => {
        //filter out the ones that are not older than 'days' days and apply stricter regex expression
        const MILLISECONDS_DAY = 86400000;
        return (snap.metadata.name.search(/s-\d+-.{1,24}-\d{14}/) === 0) && ((Date.now() - Date.parse(snap.metadata.creationTimestamp)) > (days * MILLISECONDS_DAY));
      });
      console.log(`Snapshots to process: ${snaps.length}`);
      const purgePromises = [];
      for (const snap of snaps) {
        purgePromises.push(
          snap.delete()
            .then(() => {
              console.log(`Purged ${snap.metadata.name} snapshot.`);
            })
            .catch(err => {
              console.error(`Error purging ${snap.metadata.name} snapshot: ${err.message}`);
              throw new Error('One or more snapshot purge requests failed.');
            })
        );
      }
      return Promise.all(purgePromises)
        .then(() => {
          return Promise.resolve(snaps.length);
        });
    })
    .catch(err => {
      console.error(`Error purging snapshots: ${err.message}`);
      return Promise.reject(err);
    });
}

module.exports.createSnapshots = createSnapshots;
module.exports.purgeSnapshots = purgeSnapshots;
