import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import compareFiles from './uitls/permissionCompare.js';
import readFiles from './uitls/readFiles.js';

import { readFileSync } from 'fs';


// this is test commit.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 4000;

let router = express.Router();
app.use(express.json());
app.use(express.static('public'))
app.use('/static', express.static(path.join(__dirname, 'public')))

router.get('/', function(req, res) {
    res.render('public/index.html');
});

app.get('/getFileNames', (req, res) => {
    let jsonFileData = JSON.parse(readFileSync('./uitls/dirConfig.json', 'utf8'));
    const files = readFiles(jsonFileData.profile);
    res.json({ "files" : files });
})

app.get('/compareFile', async (req, res) => {
    console.log('Inside the compare files');
    let dirName = req.query.dirname;
    let filename = req.query.filename;

    let stagingFilePath = `./repo/staging/src/${dirName}/${filename}`;
    let prodFilePath = `./repo/prod/src/${dirName}/${filename}`;
    
    const compareResult = await compareFiles(stagingFilePath, prodFilePath);
    
    res.send(compareResult);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})