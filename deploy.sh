#!/bin/bash

echo "deploy go bom stripper"
(cd appengine && gcloud app deploy --quiet --project future-app-backend)

echo "deploy firebase"
(cd firebase/functions && npm i && npm run deploy)
