#!/usr/bin/env bash

# A script to claim a voucher invoice from donnerlab.com

set -o errexit
set -o nounset

API_URI="https://donnerlab.com/voucher/api/voucher"
VOUCHER_URI="https://donnerlab.com/voucher"

usage() {
  echo "Usage: $0 <payreq>" 1>&2
  exit -1
}

if [ $# -ne 1 ] ; then
  usage
fi

PAYREQ="$1"
DATE=$(date +%s%3N)

RESPONSE=$(2>/dev/null curl "${API_URI}/claim/${PAYREQ}?_=${DATE}" | sed 's/.*id":"\([^"]*\)".*/\1/')
echo ${VOUCHER_URI}/${RESPONSE}