var express = require('express');
var router = express.Router();
var fs = require('fs')
var Midi = require('jsmidgen');


router.get('/:chord_name/:notes', function(req, res, next) {

  var notes = getNotesFromParams(req.params.notes);
  var chord_name = req.params.chord_name;

  generateMidiChord(notes, chord_name).then(() => {
    res.send(notes.join(" - "));
  });
});

module.exports = router;


/**
 *
 * @param urlParams
 * @returns {Array}
 */
function getNotesFromParams(urlParams) {

  var re = new RegExp(/[$]/, 'g');
  var raw_params = urlParams.replace(re, "#");

  return raw_params.split("_");
};


/**
 *
 * @param notes
 */
function generateMidiChord(notes, chord_name) {

  return new Promise((resolve, reject) => {
    var file = new Midi.File();
    var track = new Midi.Track();

    file.addTrack(track);

    track.addChord(0, notes, 64);

    fs.writeFileSync(`${chord_name}.mid`, file.toBytes(), 'binary');

  }).then(() => {
    resolve();

  }).catch(e => {
    console.log("Error: ", e);
    reject(e);
  });
};