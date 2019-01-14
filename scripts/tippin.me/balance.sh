#!/usr/bin/env bash

# A script to get your tippin.me balance from the command line
# In order to run you must set PHPSESSID which can be found in
# your cookie in your tippin.me session

set -o errexit
set -o xtrace
set -o nounset

BALANCE_URI="https://tippin.me/dashboard.php"

usage() {
  echo "Usage: $0 <phpsessid>" 1>&2
  exit -1
}

if [ $# -ne 1 ] ; then
  usage
fi

phpsessid="$1"

BALANCE=$(2>/dev/null curl "$BALANCE_URI" -H "Cookie: PHPSESSID=${phpsessid}" | grep 'userBalance =' | tr -dc '0-9')
echo $BALANCE


