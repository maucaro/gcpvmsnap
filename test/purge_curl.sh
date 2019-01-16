#!/bin/bash

# If a parameter is passed, use the value as the "days" query parameter value; otherwise don't pass a "days" query parameter.
if [ "$1" != "" ]; then
    curl localhost:8080/purge_snapshots?days=$1 --header "X-Appengine-Cron: true"
else
    curl localhost:8080/purge_snapshots --header "X-Appengine-Cron: true"
fi

echo
