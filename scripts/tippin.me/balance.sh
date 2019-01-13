#!/usr/bin/env bash

set -e

BALANCE_URI="https://tippin.me/dashboard.php"

usage() {
  echo "Set SESSIONID environment variable to run"
  exit -1
}

if [ -z "$SESSIONID" ]
then
  usage
else
  BALANCE=$(2>/dev/null curl "$BALANCE_URI" -H "Cookie: PHPSESSID=$SESSIONID" | grep 'userBalance =' | tr -dc '0-9')
  echo $BALANCE
fi


