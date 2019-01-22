#!/usr/bin/env bash

# A script to get a voucher from donnerlab.com

set -o errexit
set -o nounset

LNCLI="lncli"

usage() {
  echo "Usage: $0 <amount>" 1>&2
  exit -1
}

if [ $# -ne 1 ] ; then
  usage
fi

AMOUNT="$1"

cd "$(dirname "$0")"

PAY_REQ=$(./buyvoucher.sh "$AMOUNT")



DECODE=$($LNCLI decodepayreq $PAY_REQ)
PRICE=$( echo $DECODE | grep num_satoshis | sed 's/.*num_satoshis": "\([0-9]*\).*/\1/' )

# TODO : allow non 100 amounts
TOTAL=$(( ($AMOUNT * 105) / 100 ))
if [ $TOTAL -ne $PRICE ] ; then
  echo "wrong amount $PRICE returned, $TOTAL expected"
  exit
fi

$LNCLI sendpayment -f --pay_req=$PAY_REQ

./claimvoucher.sh $PAY_REQ
