#!/bin/bash
VM_PREFIX=test-snap
ZONE=us-west2-a

gcloud compute instances delete $VM_PREFIX-1 --zone $ZONE -q
gcloud compute instances delete $VM_PREFIX-2 --zone $ZONE -q
gcloud compute instances delete $VM_PREFIX-3 --zone $ZONE -q
gcloud compute instances delete $VM_PREFIX-4 --zone $ZONE -q
gcloud compute instances delete $VM_PREFIX-5 --zone $ZONE -q
gcloud compute instances delete $VM_PREFIX-6 --zone $ZONE -q
gcloud compute instances delete $VM_PREFIX-7 --zone $ZONE -q
