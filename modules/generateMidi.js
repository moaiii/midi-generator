"use strict";
const fs = require('fs');
const Midi = require('jsmidgen');

module.exports = (raw_notes, name, midi_type, timestamp) => {

  //
  let parsed_notes = midi_type === "chord" ? 
    JSON.parse(raw_notes) : raw_notes.split(",");
  
  console.log('in generateMidi.js', parsed_notes, typeof parsed_notes);
  
  return new Promise((resolve, reject) => {
    
    // Where to?
    let s3key = `${name}-${timestamp}`; // (e.g.) Emajor-123123123
    let fullPath = `/tmp/${s3key}`; // (e.g.) /tmp/Emajor-123123123

    // Shift notes as the chromatic scale for guitar starts at E not C
    let notes = parsed_notes
      .map(note => {
        let notesToBeShifted = ["C", "C#", "D", "D#"];
        // i.e. shift up an octave 
        let octave = notesToBeShifted.indexOf(note) >= 0 ? 5 : 4; 
        console.log(note, octave);
        return `${note}${octave}`
    });

    console.log(s3key, fullPath, notes);

    // Initialise midi file 
    let midiFile = new Midi.File();
    let track = new Midi.Track();
    midiFile.addTrack(track);
  
    // Print midi information into file
    if(midi_type === "chord") { 
      track.addChord(0, notes, 64); 
    
    } else if (midi_type === "scales") { 
      notes.map(note => track.addNote(0, note, 64)); 
    };

    console.log(track);

    // write midi file into tmp folder
    fs.writeFile(fullPath, midiFile.toBytes(), 'binary', function(err, data) {

      if (err) {
        console.log("ERROR: ", err, err.stack);
        reject(err);

      } else {
        console.log("fs.write = done! = ", data);

        resolve({
          data: data,
          fullPath: fullPath,
          s3key: s3key
        });

      }
    });
  });
};
