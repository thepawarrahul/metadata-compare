import { readdirSync, readFileSync } from 'fs';

var obj = JSON.parse(readFileSync('./uitls/dirConfig.json', 'utf8'));
const profileDirPath = obj.profile;

const readFiles = (directoryPath) => {
    try {
        return readdirSync(directoryPath);
    } catch (error) {
        console.error('Error reading directory : ', error);
    }
}

export default readFiles;