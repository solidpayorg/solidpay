#!/usr/bin/env bash

# A script to get your tippin.me balance from the command line
# In order to run you must set PHPSESSID which can be found in
# your cookie in your tippin.me session

set -o errexit

BALANCE_URI="https://tippin.me/dashboard.php"

usage() {
  echo "Set the PHPSESSID env variable.  It can be found in your tippin.me cookie." 1>&2
  exit -1
}

if [ -z "$PHPSESSID" ] ; then
  usage
else
  BALANCE=$(2>/dev/null curl "$BALANCE_URI" -H "Cookie: PHPSESSID=$PHPSESSID" | grep 'userBalance =' | tr -dc '0-9')
  echo $BALANCE
fi


