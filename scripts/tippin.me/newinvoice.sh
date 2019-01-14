#!/usr/bin/env bash

# A script to get your tippin.me new invoice
# In order to run you must supply your username and userid

set -o errexit
set -o xtrace

NEWINVOICE_URI="https://tippin.me/lndreq/newinvoice.php"

usage() {
  echo "Usage: $0 <username> <userid>" 1>&2
  exit -1
}

if [ $# -ne 2 ] ; then
  usage
fi

USERNAME="$1"
USERID="$2"

NEWINVOICE=$(2>/dev/null curl "$NEWINVOICE_URI" --data "userid=${USERID}&username=${USERNAME}&istaco=0&customAmnt=0&customMemo=" | sed 's/.*"\(ln[^"]*\)".*/\1/')
echo $NEWINVOICE

