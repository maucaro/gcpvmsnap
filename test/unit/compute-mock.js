'use strict';

class Disk {
  constructor(name) {
    this.name = name;
  }

  async createSnapshot() {
    return Promise.resolve();
  }
}

class Zone {
  constructor(name) {
    this.name = name;
  }

  disk(name) {
    return new Disk(name);
  }
}

class Compute {
  constructor() {
    this.name = "Compute Mock";
    this.timestamp = new Date();
  }

  getVMs() {
    const data = [[
      { metadata: { "kind": "compute#instance", "id": "2702505824127948945", "creationTimestamp": "2019-01-16T13:47:43.409-08:00", "name": "test-snap-1", "description": "", "tags": { "fingerprint": "42WmSpB8rSM=" }, "machineType": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/machineTypes/n1-standard-1", "status": "RUNNING", "zone": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b", "canIpForward": false, "networkInterfaces": [{ "kind": "compute#networkInterface", "network": "https://www.googleapis.com/compute/v1/projects/gcp-project/global/networks/default", "subnetwork": "https://www.googleapis.com/compute/v1/projects/gcp-project/regions/us-east1/subnetworks/default", "networkIP": "10.142.0.2", "name": "nic0", "accessConfigs": [{ "kind": "compute#accessConfig", "type": "ONE_TO_ONE_NAT", "name": "External NAT", "natIP": "35.227.93.203", "networkTier": "PREMIUM" }], "fingerprint": "yzIIgByZ-tI=" }], "disks": [{ "kind": "compute#attachedDisk", "type": "PERSISTENT", "mode": "READ_WRITE", "source": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/disks/test-snap-1", "deviceName": "test-snap-1", "index": 0, "boot": true, "autoDelete": true, "licenses": ["https://www.googleapis.com/compute/v1/projects/debian-cloud/global/licenses/debian-9-stretch"], "interface": "SCSI", "guestOsFeatures": [{ "type": "VIRTIO_SCSI_MULTIQUEUE" }] }], "metadata": { "kind": "compute#metadata", "fingerprint": "OH8J5_qAFfA=", "items": [{ "key": "gcpvmsnapfilter", "value": "loquesea" }, { "key": "anotherkey", "value": "anothervalue" }] }, "serviceAccounts": [{ "email": "55555335026-compute@developer.gserviceaccount.com", "scopes": ["https://www.googleapis.com/auth/devstorage.read_only", "https://www.googleapis.com/auth/logging.write", "https://www.googleapis.com/auth/monitoring.write", "https://www.googleapis.com/auth/servicecontrol", "https://www.googleapis.com/auth/service.management.readonly", "https://www.googleapis.com/auth/trace.append"] }], "selfLink": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/instances/test-snap", "scheduling": { "onHostMaintenance": "MIGRATE", "automaticRestart": true, "preemptible": false }, "cpuPlatform": "Intel Haswell", "labelFingerprint": "42WmSpB8rSM=", "startRestricted": false, "deletionProtection": false } },
      { metadata: { "kind": "compute#instance", "id": "2702505824127948946", "creationTimestamp": "2019-01-16T13:47:43.409-08:00", "name": "test-snap-2", "description": "", "tags": { "fingerprint": "42WmSpB8rSM=" }, "machineType": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/machineTypes/n1-standard-1", "status": "RUNNING", "zone": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b", "canIpForward": false, "networkInterfaces": [{ "kind": "compute#networkInterface", "network": "https://www.googleapis.com/compute/v1/projects/gcp-project/global/networks/default", "subnetwork": "https://www.googleapis.com/compute/v1/projects/gcp-project/regions/us-east1/subnetworks/default", "networkIP": "10.142.0.2", "name": "nic0", "accessConfigs": [{ "kind": "compute#accessConfig", "type": "ONE_TO_ONE_NAT", "name": "External NAT", "natIP": "35.227.93.203", "networkTier": "PREMIUM" }], "fingerprint": "yzIIgByZ-tI=" }], "disks": [{ "kind": "compute#attachedDisk", "type": "PERSISTENT", "mode": "READ_WRITE", "source": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/disks/test-snap-2", "deviceName": "test-snap-2", "index": 0, "boot": true, "autoDelete": true, "licenses": ["https://www.googleapis.com/compute/v1/projects/debian-cloud/global/licenses/debian-9-stretch"], "interface": "SCSI", "guestOsFeatures": [{ "type": "VIRTIO_SCSI_MULTIQUEUE" }] }], "metadata": { "kind": "compute#metadata", "fingerprint": "OH8J5_qAFfA=", "items": [] }, "serviceAccounts": [{ "email": "55555335026-compute@developer.gserviceaccount.com", "scopes": ["https://www.googleapis.com/auth/devstorage.read_only", "https://www.googleapis.com/auth/logging.write", "https://www.googleapis.com/auth/monitoring.write", "https://www.googleapis.com/auth/servicecontrol", "https://www.googleapis.com/auth/service.management.readonly", "https://www.googleapis.com/auth/trace.append"] }], "selfLink": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/instances/test-snap", "scheduling": { "onHostMaintenance": "MIGRATE", "automaticRestart": true, "preemptible": false }, "cpuPlatform": "Intel Haswell", "labelFingerprint": "42WmSpB8rSM=", "startRestricted": false, "deletionProtection": false } },
      { metadata: { "kind": "compute#instance", "id": "2702505824127948947", "creationTimestamp": "2019-01-16T13:47:43.409-08:00", "name": "test-snap-3", "description": "", "tags": { "fingerprint": "42WmSpB8rSM=" }, "machineType": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/machineTypes/n1-standard-1", "status": "RUNNING", "zone": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b", "canIpForward": false, "networkInterfaces": [{ "kind": "compute#networkInterface", "network": "https://www.googleapis.com/compute/v1/projects/gcp-project/global/networks/default", "subnetwork": "https://www.googleapis.com/compute/v1/projects/gcp-project/regions/us-east1/subnetworks/default", "networkIP": "10.142.0.2", "name": "nic0", "accessConfigs": [{ "kind": "compute#accessConfig", "type": "ONE_TO_ONE_NAT", "name": "External NAT", "natIP": "35.227.93.203", "networkTier": "PREMIUM" }], "fingerprint": "yzIIgByZ-tI=" }], "disks": [{ "kind": "compute#attachedDisk", "type": "PERSISTENT", "mode": "READ_WRITE", "source": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/disks/test-snap-3", "deviceName": "test-snap-3", "index": 0, "boot": true, "autoDelete": true, "licenses": ["https://www.googleapis.com/compute/v1/projects/debian-cloud/global/licenses/debian-9-stretch"], "interface": "SCSI", "guestOsFeatures": [{ "type": "VIRTIO_SCSI_MULTIQUEUE" }] }], "metadata": { "kind": "compute#metadata", "fingerprint": "OH8J5_qAFfA=", "items": [{ "key": "gcpvmsnapfilter", "value": "loquesea" }] }, "serviceAccounts": [{ "email": "55555335026-compute@developer.gserviceaccount.com", "scopes": ["https://www.googleapis.com/auth/devstorage.read_only", "https://www.googleapis.com/auth/logging.write", "https://www.googleapis.com/auth/monitoring.write", "https://www.googleapis.com/auth/servicecontrol", "https://www.googleapis.com/auth/service.management.readonly", "https://www.googleapis.com/auth/trace.append"] }], "selfLink": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/instances/test-snap", "scheduling": { "onHostMaintenance": "MIGRATE", "automaticRestart": true, "preemptible": false }, "cpuPlatform": "Intel Haswell", "labelFingerprint": "42WmSpB8rSM=", "startRestricted": false, "deletionProtection": false } },
      { metadata: { "kind": "compute#instance", "id": "2702505824127948948", "creationTimestamp": "2019-01-16T13:47:43.409-08:00", "name": "test-snap-4", "description": "", "tags": { "fingerprint": "42WmSpB8rSM=" }, "machineType": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/machineTypes/n1-standard-1", "status": "RUNNING", "zone": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b", "canIpForward": false, "networkInterfaces": [{ "kind": "compute#networkInterface", "network": "https://www.googleapis.com/compute/v1/projects/gcp-project/global/networks/default", "subnetwork": "https://www.googleapis.com/compute/v1/projects/gcp-project/regions/us-east1/subnetworks/default", "networkIP": "10.142.0.2", "name": "nic0", "accessConfigs": [{ "kind": "compute#accessConfig", "type": "ONE_TO_ONE_NAT", "name": "External NAT", "natIP": "35.227.93.203", "networkTier": "PREMIUM" }], "fingerprint": "yzIIgByZ-tI=" }], "disks": [{ "kind": "compute#attachedDisk", "type": "PERSISTENT", "mode": "READ_WRITE", "source": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/disks/test-snap-4", "deviceName": "test-snap-4", "index": 0, "boot": true, "autoDelete": true, "licenses": ["https://www.googleapis.com/compute/v1/projects/debian-cloud/global/licenses/debian-9-stretch"], "interface": "SCSI", "guestOsFeatures": [{ "type": "VIRTIO_SCSI_MULTIQUEUE" }] }], "metadata": { "kind": "compute#metadata", "fingerprint": "OH8J5_qAFfA=", "items": [{ "key": "anotherkey", "value": "anothervalue" }, { "key": "gcpvmsnapfilter", "value": "loquesea" }] }, "serviceAccounts": [{ "email": "55555335026-compute@developer.gserviceaccount.com", "scopes": ["https://www.googleapis.com/auth/devstorage.read_only", "https://www.googleapis.com/auth/logging.write", "https://www.googleapis.com/auth/monitoring.write", "https://www.googleapis.com/auth/servicecontrol", "https://www.googleapis.com/auth/service.management.readonly", "https://www.googleapis.com/auth/trace.append"] }], "selfLink": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/instances/test-snap", "scheduling": { "onHostMaintenance": "MIGRATE", "automaticRestart": true, "preemptible": false }, "cpuPlatform": "Intel Haswell", "labelFingerprint": "42WmSpB8rSM=", "startRestricted": false, "deletionProtection": false } },
      { metadata: { "kind": "compute#instance", "id": "2702505824127948949", "creationTimestamp": "2019-01-16T13:47:43.409-08:00", "name": "test-snap-5", "description": "", "tags": { "fingerprint": "42WmSpB8rSM=" }, "machineType": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/machineTypes/n1-standard-1", "status": "RUNNING", "zone": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b", "canIpForward": false, "networkInterfaces": [{ "kind": "compute#networkInterface", "network": "https://www.googleapis.com/compute/v1/projects/gcp-project/global/networks/default", "subnetwork": "https://www.googleapis.com/compute/v1/projects/gcp-project/regions/us-east1/subnetworks/default", "networkIP": "10.142.0.2", "name": "nic0", "accessConfigs": [{ "kind": "compute#accessConfig", "type": "ONE_TO_ONE_NAT", "name": "External NAT", "natIP": "35.227.93.203", "networkTier": "PREMIUM" }], "fingerprint": "yzIIgByZ-tI=" }], "disks": [{ "kind": "compute#attachedDisk", "type": "PERSISTENT", "mode": "READ_WRITE", "source": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/disks/test-snap-5", "deviceName": "test-snap-5", "index": 0, "boot": true, "autoDelete": true, "licenses": ["https://www.googleapis.com/compute/v1/projects/debian-cloud/global/licenses/debian-9-stretch"], "interface": "SCSI", "guestOsFeatures": [{ "type": "VIRTIO_SCSI_MULTIQUEUE" }] }], "metadata": { "kind": "compute#metadata", "fingerprint": "OH8J5_qAFfA=", "items": [{ "key": "gcpvmsnapfilter", "value": "loquesea2" }] }, "serviceAccounts": [{ "email": "55555335026-compute@developer.gserviceaccount.com", "scopes": ["https://www.googleapis.com/auth/devstorage.read_only", "https://www.googleapis.com/auth/logging.write", "https://www.googleapis.com/auth/monitoring.write", "https://www.googleapis.com/auth/servicecontrol", "https://www.googleapis.com/auth/service.management.readonly", "https://www.googleapis.com/auth/trace.append"] }], "selfLink": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/instances/test-snap", "scheduling": { "onHostMaintenance": "MIGRATE", "automaticRestart": true, "preemptible": false }, "cpuPlatform": "Intel Haswell", "labelFingerprint": "42WmSpB8rSM=", "startRestricted": false, "deletionProtection": false } },
      { metadata: { "kind": "compute#instance", "id": "2702505824127948940", "creationTimestamp": "2019-01-16T13:47:43.409-08:00", "name": "test-snap-6", "description": "", "tags": { "fingerprint": "42WmSpB8rSM=" }, "machineType": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/machineTypes/n1-standard-1", "status": "RUNNING", "zone": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b", "canIpForward": false, "networkInterfaces": [{ "kind": "compute#networkInterface", "network": "https://www.googleapis.com/compute/v1/projects/gcp-project/global/networks/default", "subnetwork": "https://www.googleapis.com/compute/v1/projects/gcp-project/regions/us-east1/subnetworks/default", "networkIP": "10.142.0.2", "name": "nic0", "accessConfigs": [{ "kind": "compute#accessConfig", "type": "ONE_TO_ONE_NAT", "name": "External NAT", "natIP": "35.227.93.203", "networkTier": "PREMIUM" }], "fingerprint": "yzIIgByZ-tI=" }], "disks": [{ "kind": "compute#attachedDisk", "type": "PERSISTENT", "mode": "READ_WRITE", "source": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/disks/test-snap-6", "deviceName": "test-snap-6", "index": 0, "boot": true, "autoDelete": true, "licenses": ["https://www.googleapis.com/compute/v1/projects/debian-cloud/global/licenses/debian-9-stretch"], "interface": "SCSI", "guestOsFeatures": [{ "type": "VIRTIO_SCSI_MULTIQUEUE" }] }], "metadata": { "kind": "compute#metadata", "fingerprint": "OH8J5_qAFfA=", "items": [{ "key": "anotherkey", "value": "anothervalue" }] }, "serviceAccounts": [{ "email": "55555335026-compute@developer.gserviceaccount.com", "scopes": ["https://www.googleapis.com/auth/devstorage.read_only", "https://www.googleapis.com/auth/logging.write", "https://www.googleapis.com/auth/monitoring.write", "https://www.googleapis.com/auth/servicecontrol", "https://www.googleapis.com/auth/service.management.readonly", "https://www.googleapis.com/auth/trace.append"] }], "selfLink": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/instances/test-snap", "scheduling": { "onHostMaintenance": "MIGRATE", "automaticRestart": true, "preemptible": false }, "cpuPlatform": "Intel Haswell", "labelFingerprint": "42WmSpB8rSM=", "startRestricted": false, "deletionProtection": false } },
      { metadata: { "kind": "compute#instance", "id": "2702505824127948941", "creationTimestamp": "2019-01-16T13:47:43.409-08:00", "name": "test-snap-7", "description": "", "tags": { "fingerprint": "42WmSpB8rSM=" }, "machineType": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/machineTypes/n1-standard-1", "status": "RUNNING", "zone": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b", "canIpForward": false, "networkInterfaces": [{ "kind": "compute#networkInterface", "network": "https://www.googleapis.com/compute/v1/projects/gcp-project/global/networks/default", "subnetwork": "https://www.googleapis.com/compute/v1/projects/gcp-project/regions/us-east1/subnetworks/default", "networkIP": "10.142.0.2", "name": "nic0", "accessConfigs": [{ "kind": "compute#accessConfig", "type": "ONE_TO_ONE_NAT", "name": "External NAT", "natIP": "35.227.93.203", "networkTier": "PREMIUM" }], "fingerprint": "yzIIgByZ-tI=" }], "disks": [{ "kind": "compute#attachedDisk", "type": "PERSISTENT", "mode": "READ_WRITE", "source": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/disks/test-snap-7", "deviceName": "test-snap-7", "index": 0, "boot": true, "autoDelete": true, "licenses": ["https://www.googleapis.com/compute/v1/projects/debian-cloud/global/licenses/debian-9-stretch"], "interface": "SCSI", "guestOsFeatures": [{ "type": "VIRTIO_SCSI_MULTIQUEUE" }] }, { "kind": "compute#attachedDisk", "type": "PERSISTENT", "mode": "READ_WRITE", "source": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/disks/test-snap-8", "deviceName": "test-snap-8", "index": 0, "boot": false, "autoDelete": true, "licenses": ["https://www.googleapis.com/compute/v1/projects/debian-cloud/global/licenses/debian-9-stretch"], "interface": "SCSI", "guestOsFeatures": [{ "type": "VIRTIO_SCSI_MULTIQUEUE" }] }], "metadata": { "kind": "compute#metadata", "fingerprint": "OH8J5_qAFfA=", "items": [{ "key": "gcpvmsnapfilter", "value": "loquesea" }, { "key": "anotherkey", "value": "anothervalue" }] }, "serviceAccounts": [{ "email": "55555335026-compute@developer.gserviceaccount.com", "scopes": ["https://www.googleapis.com/auth/devstorage.read_only", "https://www.googleapis.com/auth/logging.write", "https://www.googleapis.com/auth/monitoring.write", "https://www.googleapis.com/auth/servicecontrol", "https://www.googleapis.com/auth/service.management.readonly", "https://www.googleapis.com/auth/trace.append"] }], "selfLink": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/instances/test-snap", "scheduling": { "onHostMaintenance": "MIGRATE", "automaticRestart": true, "preemptible": false }, "cpuPlatform": "Intel Haswell", "labelFingerprint": "42WmSpB8rSM=", "startRestricted": false, "deletionProtection": false } }
    ]]
    return Promise.resolve(data);
  }

  getSubDays(d) {
    //Add 1 second to prevent the equality case when comparing
    return new Date(this.timestamp - ((d * 86400000) - 1000)).toISOString();
  }

  getSnapshots() {
    // All snapshots match the regex except for the fist one; the first snapshot returns the creationTimestamp as the current date, the second one is 1 day old, the third one 2 days old and so forth
    const data = [[
      { metadata: { "kind": "compute#snapshot", "id": "8756477268268592877", "creationTimestamp": "2019-01-19T03:54:43.179-08:00", "name": "x-2702505824127948945-test-snap-20190119115441", "status": "READY", "sourceDisk": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/disks/test-snap", "sourceDiskId": "2037186197084838033", "diskSizeGb": "10", "storageBytes": "1182062272", "storageBytesStatus": "UP_TO_DATE", "licenses": ["https://www.googleapis.com/compute/v1/projects/debian-cloud/global/licenses/debian-9-stretch"], "selfLink": "https://www.googleapis.com/compute/v1/projects/gcp-project/global/snapshots/s-2702505824127948945-test-snap-20190119115441", "labelFingerprint": "42WmSpB8rSM=", "licenseCodes": ["1000205"] } },
      { metadata: { "kind": "compute#snapshot", "id": "8756477268268592878", "creationTimestamp": "2019-01-19T03:54:43.179-08:00", "name": "s-2702505824127948945-test-snap-20190119115441", "status": "READY", "sourceDisk": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/disks/test-snap", "sourceDiskId": "2037186197084838033", "diskSizeGb": "10", "storageBytes": "1182062272", "storageBytesStatus": "UP_TO_DATE", "licenses": ["https://www.googleapis.com/compute/v1/projects/debian-cloud/global/licenses/debian-9-stretch"], "selfLink": "https://www.googleapis.com/compute/v1/projects/gcp-project/global/snapshots/s-2702505824127948945-test-snap-20190119115441", "labelFingerprint": "42WmSpB8rSM=", "licenseCodes": ["1000205"] } },
      { metadata: { "kind": "compute#snapshot", "id": "8756477268268592879", "creationTimestamp": "2019-01-19T03:54:43.179-08:00", "name": "s-2702505824127948945-test-snap-20190119115441", "status": "READY", "sourceDisk": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/disks/test-snap", "sourceDiskId": "2037186197084838033", "diskSizeGb": "10", "storageBytes": "1182062272", "storageBytesStatus": "UP_TO_DATE", "licenses": ["https://www.googleapis.com/compute/v1/projects/debian-cloud/global/licenses/debian-9-stretch"], "selfLink": "https://www.googleapis.com/compute/v1/projects/gcp-project/global/snapshots/s-2702505824127948945-test-snap-20190119115441", "labelFingerprint": "42WmSpB8rSM=", "licenseCodes": ["1000205"] } },
      { metadata: { "kind": "compute#snapshot", "id": "8756477268268592870", "creationTimestamp": "2019-01-19T03:54:43.179-08:00", "name": "s-2702505824127948945-test-snap-20190119115441", "status": "READY", "sourceDisk": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/disks/test-snap", "sourceDiskId": "2037186197084838033", "diskSizeGb": "10", "storageBytes": "1182062272", "storageBytesStatus": "UP_TO_DATE", "licenses": ["https://www.googleapis.com/compute/v1/projects/debian-cloud/global/licenses/debian-9-stretch"], "selfLink": "https://www.googleapis.com/compute/v1/projects/gcp-project/global/snapshots/s-2702505824127948945-test-snap-20190119115441", "labelFingerprint": "42WmSpB8rSM=", "licenseCodes": ["1000205"] } },
      { metadata: { "kind": "compute#snapshot", "id": "8756477268268592871", "creationTimestamp": "2019-01-19T03:54:43.179-08:00", "name": "s-2702505824127948945-test-snap-20190119115441", "status": "READY", "sourceDisk": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/disks/test-snap", "sourceDiskId": "2037186197084838033", "diskSizeGb": "10", "storageBytes": "1182062272", "storageBytesStatus": "UP_TO_DATE", "licenses": ["https://www.googleapis.com/compute/v1/projects/debian-cloud/global/licenses/debian-9-stretch"], "selfLink": "https://www.googleapis.com/compute/v1/projects/gcp-project/global/snapshots/s-2702505824127948945-test-snap-20190119115441", "labelFingerprint": "42WmSpB8rSM=", "licenseCodes": ["1000205"] } },
      { metadata: { "kind": "compute#snapshot", "id": "8756477268268592872", "creationTimestamp": "2019-01-19T03:54:43.179-08:00", "name": "s-2702505824127948945-test-snap-20190119115441", "status": "READY", "sourceDisk": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/disks/test-snap", "sourceDiskId": "2037186197084838033", "diskSizeGb": "10", "storageBytes": "1182062272", "storageBytesStatus": "UP_TO_DATE", "licenses": ["https://www.googleapis.com/compute/v1/projects/debian-cloud/global/licenses/debian-9-stretch"], "selfLink": "https://www.googleapis.com/compute/v1/projects/gcp-project/global/snapshots/s-2702505824127948945-test-snap-20190119115441", "labelFingerprint": "42WmSpB8rSM=", "licenseCodes": ["1000205"] } },
      { metadata: { "kind": "compute#snapshot", "id": "8756477268268592873", "creationTimestamp": "2019-01-19T03:54:43.179-08:00", "name": "s-2702505824127948945-test-snap-20190119115441", "status": "READY", "sourceDisk": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/disks/test-snap", "sourceDiskId": "2037186197084838033", "diskSizeGb": "10", "storageBytes": "1182062272", "storageBytesStatus": "UP_TO_DATE", "licenses": ["https://www.googleapis.com/compute/v1/projects/debian-cloud/global/licenses/debian-9-stretch"], "selfLink": "https://www.googleapis.com/compute/v1/projects/gcp-project/global/snapshots/s-2702505824127948945-test-snap-20190119115441", "labelFingerprint": "42WmSpB8rSM=", "licenseCodes": ["1000205"] } },
      { metadata: { "kind": "compute#snapshot", "id": "8756477268268592874", "creationTimestamp": "2019-01-19T03:54:43.179-08:00", "name": "s-2702505824127948945-test-snap-20190119115441", "status": "READY", "sourceDisk": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/disks/test-snap", "sourceDiskId": "2037186197084838033", "diskSizeGb": "10", "storageBytes": "1182062272", "storageBytesStatus": "UP_TO_DATE", "licenses": ["https://www.googleapis.com/compute/v1/projects/debian-cloud/global/licenses/debian-9-stretch"], "selfLink": "https://www.googleapis.com/compute/v1/projects/gcp-project/global/snapshots/s-2702505824127948945-test-snap-20190119115441", "labelFingerprint": "42WmSpB8rSM=", "licenseCodes": ["1000205"] } },
      { metadata: { "kind": "compute#snapshot", "id": "8756477268268592875", "creationTimestamp": "2019-01-19T03:54:43.179-08:00", "name": "s-2702505824127948945-test-snap-20190119115441", "status": "READY", "sourceDisk": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/disks/test-snap", "sourceDiskId": "2037186197084838033", "diskSizeGb": "10", "storageBytes": "1182062272", "storageBytesStatus": "UP_TO_DATE", "licenses": ["https://www.googleapis.com/compute/v1/projects/debian-cloud/global/licenses/debian-9-stretch"], "selfLink": "https://www.googleapis.com/compute/v1/projects/gcp-project/global/snapshots/s-2702505824127948945-test-snap-20190119115441", "labelFingerprint": "42WmSpB8rSM=", "licenseCodes": ["1000205"] } },
      { metadata: { "kind": "compute#snapshot", "id": "8756477268268592876", "creationTimestamp": "2019-01-19T03:54:43.179-08:00", "name": "s-2702505824127948945-test-snap-20190119115441", "status": "READY", "sourceDisk": "https://www.googleapis.com/compute/v1/projects/gcp-project/zones/us-east1-b/disks/test-snap", "sourceDiskId": "2037186197084838033", "diskSizeGb": "10", "storageBytes": "1182062272", "storageBytesStatus": "UP_TO_DATE", "licenses": ["https://www.googleapis.com/compute/v1/projects/debian-cloud/global/licenses/debian-9-stretch"], "selfLink": "https://www.googleapis.com/compute/v1/projects/gcp-project/global/snapshots/s-2702505824127948945-test-snap-20190119115441", "labelFingerprint": "42WmSpB8rSM=", "licenseCodes": ["1000205"] } }
    ]]

    for (let i = 0; i < data[0].length; i++) {
      data[0][i].metadata.creationTimestamp = this.getSubDays(i);
      data[0][i].delete = () => { return Promise.resolve() };
    }
    return Promise.resolve(data);
  }

  zone(name) {
    return new Zone(name);
  }
}

module.exports = Compute;