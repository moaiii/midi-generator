"use strict";
let saveMidiToS3 = require("./modules/saveMidiToS3");
let generateMidi = require("./modules/generateMidi");


exports.handler = (event, context, callback) => {
  console.log('in index.js', event);

  let TIMESTAMP_ID = `${new Date().getTime()}`;
  let S3_BUCKET_NAME = "musicmapper-midifiles";

  generateMidi(event.notes, event.name, event.midi_type, TIMESTAMP_ID)
    .then((response) => {
      
      saveMidiToS3(S3_BUCKET_NAME, response.s3key, response.fullPath)
        .then((response) => {
          
          let downloadLink = response.Location;
          console.log("downloadLink: ", downloadLink);

          let stat_code = {
            statusCode: "200",
            "headers": {
              "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ 
              "result": "success",
              "download-link": downloadLink
            })
          };
        
          context.callbackWaitsForEmptyEventLoop = false;
          callback(null, stat_code);
        })
        .catch((e) => {
          let stat_code = {
            statusCode: "500",
            "headers": {
              "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ 
              "result": "error in S3",
              "error-text": e
            })
          };

          console.log(e)
        });
    })
    .catch((e) => {
      let stat_code = {
        statusCode: "500",
        "headers": {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ 
          "result": "error in gen MIDI",
          "error-text": e
        })
      };

      console.log(e)
    });
};