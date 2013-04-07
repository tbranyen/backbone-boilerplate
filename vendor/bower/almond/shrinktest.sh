#!/bin/sh
rm almond.min.js.gz
~/scripts/closure.sh almond.js almond.min.js
gzip almond.min.js
ls -la almond.min.js.gz

