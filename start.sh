#!/bin/sh

# Start Sendmail MTA locally
sendmail -bd -q1m

# Start Apache in the foreground
exec apache2-foreground