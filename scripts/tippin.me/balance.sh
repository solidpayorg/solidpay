#!/usr/bin/env bash

set -e

BALANCE_URI="https://tippin.me/dashboard.php"

usage() {
  echo "Set the PHPSESSID env variable.  It can be found in your cookie as PHPSESSID"
  exit -1
}

if [ -z "$PHPSESSID" ] ; then
  usage
else
  BALANCE=$(2>/dev/null curl "$BALANCE_URI" -H "Cookie: PHPSESSID=$PHPSESSID" | grep 'userBalance =' | tr -dc '0-9')
  echo $BALANCE
fi


