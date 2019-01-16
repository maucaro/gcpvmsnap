# gcpvmsnap

Google App Engine Node project that creates periodic (cron-based) snapshots of VM's persistent disks. Periodic purges of old snapshots is also supported. 

### Description

cron.yaml is used to set the cron schedule. Documentation can be found here: https://cloud.google.com/appengine/docs/standard/nodejs/scheduling-jobs-with-cron-yaml

/create_snapshots can take a "tag" query parameter
- If ommitted, all VMs in the project are processed
- If included, only VMs with custom metadata defined with an entry with key="gcpvmsnapfilter" and value equal to value passed in "tag" query parameter

The snapshots will have the following name convention:
s-{GCP Instance Id}-{Source Disk Name}-{yyyyMMddHHmmss}
Note: If the disk name is longer than 24 characters, only the first 24 characters will be used in order to fall within the 62 character limit for snapshot names.

Examples:
- /create_snapshots - all VMs will be processed
- /create_snapshots?tag=backup - only VMs with a custom metadata entry with key and value of "gcpvmsnapfilter" and "backup" respectively will be processed

/purge_snapshots can take a "days" query parameter
- If ommitted, snapshots older than 7 days are purged. Snapshots are tested against the following regex expression to ensure only snapshots created by this tool are affected: /s-\d+-.{1,24}-\d{14}/
- If included, only snapshots (that meet the regex expression) that are older than "days" are purged

Examples:
- /purge_snapshots - purges snapshots older than 7 days
- /purge_snapshots?days=2 - purges snapshots older than 2 days

### Prerequisites

- Access to a Google Cloud Platform (GCP) project with sufficient permissions to deploy to Google App Engine Flexible Environment.

- Google Cloud SDK.

### Installing

- Download project

- Modify cron.yaml per your needs

- Optionally tag your VMs according to your needs

- gcluod app deploy - deploys to GAE

- gcloud app deploy cron.yaml - deploys only cron.yaml; use this if modifying the schedule

### Testing

All testing artifacts are in the ./test directory.

Mocha, Chai and Mockery are used for unit testing (access to Google Cloud is mocked). 

Included curl-based shell scripts can be used for local integration testing (accessing Google Cloud).

Included Google Cloud SDK-based shell scripts can be used to prepare an environment for end-to-end testing.  

### License 

This project is licensed under the Apache 2.0 license.

Enjoy!
