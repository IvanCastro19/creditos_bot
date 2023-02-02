#!/usr/bin/env bash
# ==============================================
# evpl auth
# ==============================================

# Get path for THIS script
pushd $(dirname $0) > /dev/null
SCRIPT_PATH=$(pwd -P)/
popd > /dev/null

cd ${SCRIPT_PATH}

docker build -f Dockerfile -t bot .