#!/usr/bin/env bash

CASHOUT_URI="https://tippin.me/lndreq/cachout.php"

usage() {
  echo "Set SESSIONID to run"
  exit -1
}

if [ -z "$SESSIONID" ]
then
  usage
else
  BALANCE=$(2>/dev/null curl 'https://tippin.me/lndreq/cashout.php' -H 'Accept: application/json, text/javascript, */*; q=0.01' -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' -H "Cookie: PHPSESSID=$SESSIONID" --data "payreq=$PAYREQ")
  echo $BALANCE
fi


