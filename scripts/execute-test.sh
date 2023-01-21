#!/usr/bin/env bash
# set -eu
# Variables need to execute test
ENV="${1-NA}"
TAG="${2-All}"
HEADLESS="${3-No}"
BROWSER="${4-CHROME}"
BASE_URL="${5-NA}"
REPORT="${6-YES}"

AVAILABLE_ENVS="staging prod"

AVAILABLE_TAG="All 1 2 3"

AVAILABLE_BROWSER="CHROME FIREFOX"

if [[ ! ${AVAILABLE_ENVS} =~ (^|[[:space:]])"$ENV"($|[[:space:]]) ]]; then
    echo "$ENV is not an available environment"
    exit 1
fi

if [[ ! ${AVAILABLE_TAG} =~ (^|[[:space:]])"$TAG"($|[[:space:]]) ]]; then
    echo "$TAG is not an available service to test"
    exit 1
fi

if [[ ! ${AVAILABLE_BROWSER} =~ (^|[[:space:]])"$BROWSER"($|[[:space:]]) ]]; then
    echo "$BROWSER is not an available service to test"
    exit 1
fi


if [ "$BASE_URL" == "NA" ]
then
  BASE_URL="http://tutorialsninja.com/demo/"
elif [ "${ENV}" == "staging" ]
then
  BASE_URL="http://tutorialsninja.com/demo/"
elif [ "${ENV}" == "prod" ]
then
  BASE_URL="https://www.google.com/"
else
  echo "Custom BASE_URL will be used"
fi
# ENVIRONMENT

if [ "$HEADLESS" == "Yes" ]
then
  MODE="HEADLESS"
elif [ "$HEADLESS" == "YES" ]
then
  MODE="HEADLESS"
else
  MODE="HEAD"
fi
#HEAD MODE

if [ "$BROWSER" == "CHROME" ]
then
  BROWSER="CHROME"
elif [ "$BROWSER" == "FIREFOX" ]
then
  BROWSER="FIREFOX"
else
  BROWSER="CHROME"
fi
#BROWSER TYPE


export ENV=${ENV}
export TAG=${TAG}
export MODE=${MODE}
export BROWSER=${BROWSER}
export BASE_URL=${BASE_URL}

echo "***** Test environment: ${ENV} *****"
echo "***** Cucumber Annotation: ${TAG} *****"
echo "***** HEADLESS MODE to be used is : ${HEADLESS} *****"
echo "***** BROWSER MODE to be used is : ${BROWSER} *****"
echo "***** BASE URL to be used is : ${BASE_URL} *****"
echo "***** REPORT to be displayed : ${REPORT} *****"
echo "***** Executing test script started *****"


if [ "$REPORT" == false ]
then
  ENV=${ENV}${MODE}${BROWSER} npm run wdio @${TAG}
else
  ENV=${ENV}${MODE}${BROWSER} npm run wdio @${TAG} && npm run report
fi
# ENV=npm run report

echo "***** Test script execution completed *****"