#! /bin/bash

ENV=$1
FUNCTION_NAME="musicmapper_generate_midi"
LOCAL_ZIP="index_js.zip"
S3_LAMBDA_BUCKET="musicmapper-lambda"

echo "Removing existing package"
rm -f $LOCAL_ZIP

# echo "Moving NPM Packages"
# mv node_modules/ node_modules_$ENV/

echo "Updating NPM Packages without dev dependency"
npm install

echo "Creating the package"
zip -q -r -X $LOCAL_ZIP index.js node_modules modules

echo "Getting version from S3 (number of objects +1)"
VERSION="$(aws s3 --profile moaiii ls s3://$S3_LAMBDA_BUCKET/$FUNCTION_NAME/$ENV/ --summarize --recursive | tail -n 2 | sed -n 1p | awk -F" " '{print $3}')"

echo "Uploading version: $VERSION"
aws s3 cp index_js.zip s3://$S3_LAMBDA_BUCKET/$FUNCTION_NAME/$ENV/v$VERSION.zip --profile moaiii

# echo "Updating Removing NPM Packages"
# rm -rf node_modules_dev/

if [[ "$ENV" == "dev" ]];
then
    AWS_ENV="_dev"
    S3_ENV="dev"
    S3_KEY_SOURCE="$FUNCTION_NAME/dev/v$VERSION.zip"
fi

echo "Updating $FUNCTION_NAME$AWS_ENV to version: $VERSION ($S3_KEY_SOURCE)"
aws lambda update-function-code \
--profile moaiii \
--function-name $FUNCTION_NAME$AWS_ENV \
--s3-bucket musicmapper-lambda \
--s3-key $S3_KEY_SOURCE \