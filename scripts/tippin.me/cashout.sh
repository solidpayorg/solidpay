#!/usr/bin/env bash

# A script to pay an invoice from your tippin.me account from 
# the command line.  In order to run you must set PHPSESSID which
# can be found in your cookie in your tippin.me session and a 
# pay request which is the destination

set -o errexit
set -o xtrace
set -o nounset

CASHOUT_URI="https://tippin.me/lndreq/cashout.php"

usage() {
  echo "Usage: $0 <phpsessid> <payreq>" 1>&2
  exit -1
}

if [ $# -ne 2 ] ; then
  usage
fi

phpsessid="$1"
payreq="$2"

response=$(2>/dev/null curl 'https://tippin.me/lndreq/cashout.php' -H 'Accept: application/json, text/javascript, */*; q=0.01' -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' -H "Cookie: PHPSESSID=$phpsessid" --data "payreq=$payreq")
echo $response


