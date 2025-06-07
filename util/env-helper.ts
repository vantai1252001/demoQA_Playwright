// utils/env-helper.ts
import * as fs from 'fs';
import * as path from 'path';

/**
 * Replaces (or adds) a key=value pair in the .env file.
 * If the key already exists, its value is replaced; otherwise, a new line is appended.
 *
 * @param key   The environment variable key (e.g. "BASE_USER_ID")
 * @param value The new value to set (e.g. "6e1d6100-2181-44ff-8511-920e86a34144")
 */
export function updateEnvVariable(key: string, value: string): void {
  const envPath = path.resolve(__dirname, '../.env');
  let envContents = '';

  try {
    envContents = fs.readFileSync(envPath, 'utf-8');
  } catch (err) {
    // If .env doesn't exist yet, start with empty string
    envContents = '';
  }

  const lines = envContents.split(/\r?\n/);
  let found = false;

  const newLines = lines.map((line) => {
    // Ignore empty lines or comments
    if (line.startsWith(`${key}=`)) {
      found = true;
      return `${key}=${value}`;
    }
    return line;
  });

  if (!found) {
    // If key was not found, append it
    newLines.push(`${key}=${value}`);
  }

  const updated = newLines.join('\n');
  fs.writeFileSync(envPath, updated, 'utf-8');
}
