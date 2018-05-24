#!/bin/bash

echo "Running PhantomJs..."

LOGFILE=/tmp/phantomjs.log

exec 6>&1           # Link file descriptor #6 with stdout.
exec > $LOGFILE     # stdout replaced with file "logfile.txt".

# ----------------------------------------------------------- #
# All output from commands in this block sent to file $LOGFILE.

/home/ubuntu/.nvm/versions/node/v6.11.2/bin/phantomjs -w &

# ----------------------------------------------------------- #

exec 1>&6 6>&-      # Restore stdout and close file descriptor #6.

exit 0