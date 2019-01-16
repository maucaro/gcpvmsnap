#!/bin/bash
VM_PREFIX=test-snap
ZONE=us-central1-a
VM_TAG_FILTER=gcpvmsnapfilter

# No tags
gcloud compute instances create $VM_PREFIX-1 --zone $ZONE

# With tag not related to this tool
gcloud compute instances create $VM_PREFIX-2 --metadata key2=value2 --zone $ZONE

# With tag related to this tool
gcloud compute instances create $VM_PREFIX-3 --metadata $VM_TAG_FILTER=value3 --zone $ZONE

# With 2 tags, one related to this tool
gcloud compute instances create $VM_PREFIX-4 --metadata $VM_TAG_FILTER=value3,key4=value4 --zone $ZONE

# With 2 tags, one related to this tool reversed order
gcloud compute instances create $VM_PREFIX-5 --metadata key5=value5,$VM_TAG_FILTER=value3 --zone $ZONE 

# With tag related to this tool - different value
gcloud compute instances create $VM_PREFIX-6 --metadata $VM_TAG_FILTER=value6 --zone $ZONE

# No tags - 2 disks (1 data disk)
gcloud compute instances create $VM_PREFIX-7 --zone $ZONE --create-disk name=$VM_PREFIX-7-disk,size=10GB,auto-delete=yes
