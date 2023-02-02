#!/usr/bin/env bash

# Get path for THIS script
pushd $(dirname $0) > /dev/null
SCRIPT_PATH=$(pwd -P)
popd > /dev/null

cd ${SCRIPT_PATH}

APP_PATH=${SCRIPT_PATH}

docker run \
    --name bot-botservice \
    -p 0.0.0.0:3000:3000 \
    -v ${APP_PATH} \
    --env-file ./.env \
    bot-botservice