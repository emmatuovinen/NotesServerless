import {Storage} from "aws-amplify";

//this method takes a file object as a parameter, generates a unique file name using 
// current timestamp and uploads the file to the user's folder in S3. And returns the object's key
export async function s3Upload(file) {
    const filename = `${Date.now()}-${file.name}`;

    const stored = await Storage.vault.put(filename, file, {
        contentType: file.type
    });

    return stored.key;
}