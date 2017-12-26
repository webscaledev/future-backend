#!/bin/bash

echo "deploy go bom stripper"
(cd bom-stripper && gcloud app deploy --quiet --project future-app-backend)

echo "deploy firebase"
(cd functions && npm i && npm run deploy)
