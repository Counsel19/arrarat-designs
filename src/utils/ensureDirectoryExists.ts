import fs from 'fs';
import path from 'path';

export const ensureDirectoryExists = (directoryPath: string) => {
  const normalizedPath = path.normalize(directoryPath);
  if (!fs.existsSync(normalizedPath)) {
    fs.mkdirSync(normalizedPath, { recursive: true });
  }
  return normalizedPath;
};

export default ensureDirectoryExists;

