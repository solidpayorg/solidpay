#!/bin/bash

NICK=$1

2>/dev/null curl https://github.com/${NICK} | grep itemprop=\"url | sed 's/.">([^<])<\/a>.*/\1/'