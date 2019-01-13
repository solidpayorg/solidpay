#!/usr/bin/env bash

NEWINVOICE_URI="https://tippin.me/lndreq/newinvoice.php"
USERID=1213
USERNAME=melvincarvalho


usage() {
  echo "Set SESSIONID to run"
  exit -1
}

if [ -z "$SESSIONID" ]
then
  usage
else
  BALANCE=$(2>/dev/null curl "$NEWINVOICE_URI" -H "Cookie: PHPSESSID=$SESSIONID" --data "userid=$USERID&username=$USERNAME&istaco=0&customAmnt=0&customMemo=" | sed 's/.*"\(ln[^"]*\)".*/\1/')
  echo $BALANCE
fi


