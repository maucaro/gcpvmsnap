#!/bin/bash

# If a parameter is passed, use the value as the "tag" query parameter value; otherwise don't pass a "tag" query parameter.
if [ "$1" != "" ]; then
    curl localhost:8080/create_snapshots?tag=$1 --header "X-Appengine-Cron: true"
else
    curl localhost:8080/create_snapshots --header "X-Appengine-Cron: true"
fi

echo
