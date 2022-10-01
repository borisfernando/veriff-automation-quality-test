#!/bin/bash

readonly NPX_COMMAND=$(command -v npx)

TEST=$1

${NPX_COMMAND} playwright test "${TEST}"
