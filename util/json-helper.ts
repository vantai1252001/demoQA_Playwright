import * as fs from 'fs';
import * as path from 'path';

export class JsonHelper {
  static booksFilePath = path.resolve(__dirname, '../test-data/books.json');

  static readBooksJson(): { books: any[] } {
    try {
      const rawData = fs.readFileSync(this.booksFilePath, 'utf-8');
      return JSON.parse(rawData);
    } catch (error) {
      console.error('❌ Error reading books.json:', error);
      return { books: [] };
    }
  }

  static writeBooksJson(data: any): void {
    try {
      fs.writeFileSync(this.booksFilePath, JSON.stringify(data, null, 2), 'utf-8');
      console.log('✅ Successfully wrote to books.json');
    } catch (error) {
      console.error('❌ Error writing books.json:', error);
    }
  }

  static getRandomBooks(count: number): any[] {
    const { books } = this.readBooksJson();
    const shuffled = books.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
