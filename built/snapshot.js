'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.purgeSnapshots = exports.createSnapshots = void 0;
//Key to use in VM's custom metadata
var VM_TAG_FILTER = 'gcpvmsnapfilter';
var computeLocal = '@google-cloud/compute';
var Compute = require(computeLocal);
var compute = new Compute();
function createSnapshots(tag) {
    return compute.getVMs()
        .then(function (data) {
        var vms = data[0];
        if (tag) {
            //need to filter out VMs whose metadata doesn't match the passed in value
            vms = vms.filter(function (vm) {
                var items = vm.metadata.metadata.items ? vm.metadata.metadata.items : [];
                return (items.find(function (o) { return o.key === VM_TAG_FILTER && o.value === tag; })) ? true : false;
            });
        }
        console.log("VMs to process: " + vms.length);
        var createSnapPromises = [];
        for (var _i = 0, vms_1 = vms; _i < vms_1.length; _i++) {
            var vm = vms_1[_i];
            console.log("Processing VM: " + vm.metadata.name);
            var vmId = vm.metadata.id;
            var disks = vm.metadata.disks;
            for (var _a = 0, disks_1 = disks; _a < disks_1.length; _a++) {
                var d = disks_1[_a];
                var diskSplit = d.source.split('/');
                var diskName = diskSplit[diskSplit.length - 1];
                var diskZone = diskSplit[diskSplit.length - 3];
                var zone = compute.zone(diskZone);
                var disk = zone.disk(diskName);
                // We want to end up with the following format: yyyyMMddHHmmss in UTC
                var dt = new Date().toISOString().replace(/[T\-:]/g, '').replace(/\..+/, '');
                //Snapshot can have a maximum of 62 characters. 
                //Using this name format leaves us with up to 25 characters for the diskName portion of the name.
                //Returned vmId is 19 characters; Use substring in case this changes in the future. 
                var snapName = "s-" + vmId.substring(0, 19) + "-" + diskName.substring(0, 25) + "-" + dt;
                console.log("Processing disk: " + diskName + " in zone: " + diskZone + " snapshot name: " + snapName);
                createSnapPromises.push(disk.createSnapshot(snapName)
                    .catch(function (err) {
                    console.error("Error creating snapshot: " + err.message);
                    throw new Error('One or more snapshot creation requests failed.');
                }));
            }
        }
        return Promise.all(createSnapPromises)
            .then(function () {
            return Promise.resolve(vms.length);
        });
    })
        .catch(function (err) {
        console.error("Error creating snapshots: " + err.message);
        return Promise.reject(err);
    });
}
exports.createSnapshots = createSnapshots;
function purgeSnapshots(days) {
    //only checking that it starts with "s-"; more complex patterns don't seem to be supported 
    return compute.getSnapshots({ filter: "name eq '^s-.*$'" })
        .then(function (data) {
        var snaps = data[0];
        snaps = snaps.filter(function (snap) {
            //filter out the ones that are not older than 'days' days and apply stricter regex expression
            var MILLISECONDS_DAY = 86400000;
            return (snap.metadata.name.search(/s-\d+-.{1,25}-\d{14}/) === 0) && ((Date.now() - Date.parse(snap.metadata.creationTimestamp)) > (days * MILLISECONDS_DAY));
        });
        console.log("Snapshots to process: " + snaps.length);
        var purgePromises = [];
        var _loop_1 = function (snap) {
            purgePromises.push(snap.delete()
                .then(function () {
                console.log("Purged " + snap.metadata.name + " snapshot.");
            })
                .catch(function (err) {
                console.error("Error purging " + snap.metadata.name + " snapshot: " + err.message);
                throw new Error('One or more snapshot purge requests failed.');
            }));
        };
        for (var _i = 0, snaps_1 = snaps; _i < snaps_1.length; _i++) {
            var snap = snaps_1[_i];
            _loop_1(snap);
        }
        return Promise.all(purgePromises)
            .then(function () {
            return Promise.resolve(snaps.length);
        });
    })
        .catch(function (err) {
        console.error("Error purging snapshots: " + err.message);
        return Promise.reject(err);
    });
}
exports.purgeSnapshots = purgeSnapshots;
