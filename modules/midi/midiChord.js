// "use strict";
// const fs = require('fs');
// const Midi = require('jsmidgen');


// module.exports = (rawNotes, name, midi_type, timestamp) => {
//   return new Promise((resolve, reject) => {
    
//     console.log("Generating midi chord.... ", name, filePath);

//     // where is it all going to go?
//     let s3key = `${name}-${timestamp}`;
//     let fullPath = `/tmp/${s3key}`;
    
//     let notes = rawNotes.map(note => {
//       let notesToBeShifted = ["C", "C#", "D", "D#"];
//       let octave = notesToBeShifted.indexOf(note) >= 0 ? 5 : 4;
//       return `${note}${octave}`
//     });
  
//     // init midi file information
//     let midiFile = new Midi.File();
//     let track = new Midi.Track();
//     file.addTrack(track);

//     // add midi notes to file
//     track.addChord(0, notes, 64);
  
//     console.log("Writing to file sync");
//     fs.writeFile(fullPath, midiFile.toBytes(), 'binary', function(err, data) {
//       if (err) {
//         console.log(err, err.stack);
//         reject(err);
//       } else {
//         console.log("DONE!", data);
//         resolve(data);
//       }
//     });
//   });
// };
