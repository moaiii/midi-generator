// "use strict";
// const fs = require('fs');
// const Midi = require('jsmidgen');


// module.exports = (scales_array, name, timestamp) => {
//   console.log("Generating midi scales.... ", name, filePath);

//   return new Promise((resolve, reject) => {

//     // node will zip all paths in below obj
//     let keyPathObject = [];
    
//     scales_array.forEach((scale, index) => {

//       // where is it all going to go?
//       let fileName = `${scale.root}-${scale.mode}`;
//       let s3key = `${fileName}-${timestamp}`;
//       let fullPath = `/tmp/${s3key}`;
      
//       keyPathObject.push({
//         key: s3key,
//         path: fullPath
//       });

//       // put note info into string form for midi gen
//       let midi_note_strings = scale.notes.map(note => {
//         let notesToBeShifted = ["C", "C#", "D", "D#"];
//         let octave = notesToBeShifted.indexOf(note) >= 0 ? 5 : 4;
//         return `${note}${octave}`
//       });

//       // init midi file information
//       let midiFile = new Midi.File();
//       let track = new Midi.Track();
//       file.addTrack(track);
  
//       // add midi notes to file
//       midi_note_strings.map(note => {
//         track.addNote(0, note, 64);
//       });

//       // write midi file into tmp folder
//       fs.writeFile(fullPath, midiFile.toBytes(), 'binary', function(err, data) {
//         if (err) {
//           console.log("ERROR: ", err, err.stack);
//           reject(err);
//         } else {
//           console.log("DONE!", data);
//         }
//       });
//     });
//   });

//   keyPathObject.length === scales_array.length ? // i.e. all scales have been written out
//     resolve(keyPathObject) : console.error("ERROR IN GEN SCALES");
// };