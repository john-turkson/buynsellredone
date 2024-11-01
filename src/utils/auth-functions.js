import Busboy from 'busboy';
import bcrypt from 'bcrypt';

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function comparePasswords(plainPassword, hashedPassword) {
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  return match;
}

export function parseMultipartForm(event) {
  return new Promise((resolve, reject) => {
    const fields = {};
    const busboy = new Busboy({
      headers: event.headers,
    });

    busboy.on('file', (fieldname, filestream, filename, transferEncoding, mimeType) => {
      const chunks = [];
      filestream.on('data', (data) => {
        chunks.push(data); 
      });

      filestream.on('end', () => {
        fields[fieldname] = {
          filename,
          type: mimeType,
          content: Buffer.concat(chunks),  // Safe to use Buffer.concat
        };
      });
    });

    busboy.on('field', (fieldName, value) => {
      fields[fieldName] = value; 
    });

    busboy.on('finish', () => {
      resolve(fields);
    });

    busboy.on('error', (error) => {
      reject(error);
    });

    // Decoding the base64 event.body using Buffer.from(), which is correct
    busboy.end(Buffer.from(event.body, 'base64')); 
  });
}