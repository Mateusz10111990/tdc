#!/usr/bin/env bash

export ARCHIVE_LOCAL=tdc.zip

# CREATE CONTAINER
echo '[info] Creating container'
curl -i -X PUT \
    -u "cloud.admin:uNkeMpt@2WoLf" \
    "https://gse00010793.storage.oraclecloud.com/v1/Storage-gse00010793/tdcDemoCurl"

# PUT ARCHIVE IN STORAGE CONTAINER
echo '[info] Uploading application to storage'
curl -i -X PUT \
  -u "cloud.admin:uNkeMpt@2WoLf" \
  "https://gse00010793.storage.oraclecloud.com/v1/Storage-gse00010793/tdcDemoCurl/tdc.zip" \
      -T "$ARCHIVE_LOCAL"

# See if application exists
export httpCode=$(curl -i -X GET  \
  -u "cloud.admin:uNkeMpt@2WoLf" \
  -H "X-ID-TENANT-NAME:gse00010793" \
  -H "Content-Type: multipart/form-data" \
  -sL -w "%{http_code}" \
  "https://apaas.europe.oraclecloud.com/paas/service/apaas/api/v1.1/apps/gse00010793/tdcDemoCurl" \
  -o /dev/null)

# If application exists...
if [ "$httpCode" == 200 ]
then
  # Update application
  echo '[info] Updating application...'
  curl -i -X PUT  \
    -u "cloud.admin:uNkeMpt@2WoLf" \
    -H "X-ID-TENANT-NAME:gse00010793" \
    -H "Content-Type: multipart/form-data" \
    -F "archiveURL=https://gse00010793.storage.oraclecloud.com/v1/Storage-gse00010793/tdcDemoCurl/tdc.zip" \
    "https://apaas.europe.oraclecloud.com/paas/service/apaas/api/v1.1/apps/gse00010793/tdcDemoCurl"
else
  # Create application and deploy
  echo '[info] Creating application...'
  curl -i -X POST  \
    -u "cloud.admin:uNkeMpt@2WoLf" \
    -H "X-ID-TENANT-NAME:gse00010793" \
    -H "Content-Type: multipart/form-data" \
    -F "name=tdcDemoCurl" \
    -F "runtime=node" \
    -F "subscription=Hourly" \
    -F "archiveURL=tdcDemoCurl/tdc.zip" \
    "https://apaas.europe.oraclecloud.com/paas/service/apaas/api/v1.1/apps/gse00010793"
fi

echo '[info] Deployment complete'

