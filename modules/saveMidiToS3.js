"use strict";
const AWS = require("aws-sdk");
const fs = require("fs");


module.exports = (s3Bucket, s3Key, midiFilePath) => {
  return new Promise((resolve, reject) => {

    console.log("Inside SAVEMIDITOS3... ", midiFilePath);

    fs.readFile(midiFilePath, function (err, data) {
      if (err) {
          return console.error("ERROR: ", err);
          reject(err);
      }

      console.log("Asynchronous read: " + data.toString());

      const stats = fs.statSync(midiFilePath)
      console.log("size: ", stats.size);

      var s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        // accessKeyId: process.env.KEY,
        // secretAccessKey: process.env.SECRET,
        region: "eu-west-1"
      });
      
      console.log(`Saving ${midiFilePath} to S3 bucket ${s3Bucket}`);

      var params = {
        Body: data, 
        Bucket: s3Bucket, 
        Key: s3Key + ".mid",
        ACL: 'public-read'
      };
  
      // console.log("s3 = ", s3);
      console.log("params = ", params);

      s3.upload(params, (err, data) => {
        if (err) {
          console.log("ERROR: ", err, err.stack);
          reject(err);
        } else {
          console.log("success! =", data);
          resolve(data);
        };
      });
    });
  })
};