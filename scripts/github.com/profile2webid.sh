NICE=$1

2>/dev/null curl https://github.com/${angelo-v} | grep itemprop=\"url | sed 's/.">([^<])<\/a>.*/\1/'