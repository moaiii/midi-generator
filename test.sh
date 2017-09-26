#!/usr/bin/env bash

FUNCTION_NAME="musicmapper_generate_midi"
AWS_ENV="_dev"

S3_LAMBDA_BUCKET="musicmapper-lambda"

echo "Invoking the $FUNCTION_NAME$AWS_ENV lambda function.."

aws lambda invoke \
--invocation-type RequestResponse \
--function-name $FUNCTION_NAME$AWS_ENV \
--region eu-west-1 \
--log-type Tail \
--payload '{notes: "["E","B","G#"]", name: "Emaj", midi_type: "chord"}' \
--profile moaiii \
# --payload '{notes: "["E","B","G#"]", name: "B-Dorian", midi_type: "scale"}' \
/dev/null | jq -r '.LogResult' | base64 --decode 