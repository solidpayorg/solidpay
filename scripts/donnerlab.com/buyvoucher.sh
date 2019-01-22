#!/usr/bin/env bash

# A script to get a voucher from donnerlab.com

set -o errexit
set -o nounset

API_URI="https://donnerlab.com/voucher/api/voucher"

usage() {
  echo "Usage: $0 <amount>" 1>&2
  exit -1
}

if [ $# -ne 1 ] ; then
  usage
fi

AMOUNT="$1"
DATE=$(date +%s%3N)

RESPONSE=$(2>/dev/null curl "${API_URI}/buy/1/${AMOUNT}?_=${DATE}" | sed 's/.*quest":"\([^"]*\)".*/\1/')
echo $RESPONSE