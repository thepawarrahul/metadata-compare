import fs from 'fs/promises';
import { diffLines, diffChars } from 'diff';

const stagingAdminFilePath = "./repo/staging/src/profiles/Admin.profile";
const prodAdminFilePath = "./repo/prod/src/profiles/Admin.profile";

// Function to read file content
async function readFileContent(filePath) {
    try {
        return await fs.readFile(filePath, 'utf8');
    } catch (err) {
        console.error('Error reading file:', filePath, err);
        return null;
    }
}

// Function to compare two files
async function compareFiles(file1, file2) {
    const content1 = await readFileContent(file1);
    const content2 = await readFileContent(file2);

    if (content1 && content2) {
        return diffChars(content1, content2);
    } else {
        return null;
    }
}

export default compareFiles;

