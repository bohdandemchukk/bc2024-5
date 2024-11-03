const express = require('express');
const fs = require('fs');
const path = require('path');
const {program} = require('commander');

program
  .requiredOption('-h, --host <host>', 'server host')
  .requiredOption('-p, --port <port>', 'server port')
  .requiredOption('-c, --cache <cachePath>', 'cache directory');
program.parse(process.argv);

const options = program.opts();
const lab5 = express();
lab5.use(express.json());

lab5.get('/notes/:note_name', (req, res) => {
  const path_to_note = path.join(options.cache, `${req.params.note_name}.txt`);
  fs.readFile(path_to_note, null, (err, data) => {
    if (err) {
      return res.status(404).send('Not found');
    }
    res.send(data);
  });
});

lab5.listen(options.port, options.host, () => {
  console.log(`Server running at http://${options.host}:${options.port}`);
});