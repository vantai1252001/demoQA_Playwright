import * as fs from 'fs';
import * as path from 'path';

async function globalTeardown() {
    const filePath = path.resolve(__dirname, 'test-data', 'books.json');
    if (fs.existsSync(filePath)) {
        // Write empty JSON structure, e.g. empty list of books
        fs.writeFileSync(filePath, JSON.stringify({ books: [] }, null, 2));
        console.log('Reset books.json to empty books list');
    }
}

export default globalTeardown;
