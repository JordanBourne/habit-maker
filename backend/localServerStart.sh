#!/bin/bash
. $(brew --prefix nvm)/nvm.sh
nvm use 14.5.0
export AWS_PROFILE=Personal
source venv/bin/activate
sls wsgi serve