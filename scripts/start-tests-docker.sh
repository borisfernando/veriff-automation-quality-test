#!/bin/bash

# Getting actual directory path.
export REPO_PATH
REPO_PATH="$(cd -- "$(dirname "$0")" >/dev/null 2>&1 || true ; pwd -P )/.."

readonly DOCKER_COMMAND=$(command -v docker)

readonly DOCKER_IMAGE_NAME="test-task"
readonly DOCKER_IMAGE_VERSION="1.0"
readonly DOCKER_IMAGE="${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_VERSION}"

if ! ${DOCKER_COMMAND} images --format "{{.Repository}}" | grep "${DOCKER_IMAGE_NAME}" > /dev/null; then
    ${DOCKER_COMMAND} build -t ${DOCKER_IMAGE} .
fi

echo "- Running tests using ${REPO_PATH} path."
rm -rf "${REPO_PATH}/playwright-report"

TEST_PATH=$1
${DOCKER_COMMAND} run -v "${REPO_PATH}:/tests" "${DOCKER_IMAGE}" "${TEST_PATH}"
${DOCKER_COMMAND} system prune -f > /dev/null 2>&1

open "${REPO_PATH}/playwright-report/index.html"
