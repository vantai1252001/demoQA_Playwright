import * as fs from 'fs';
import * as path from 'path';

export class JsonHelper {
  static booksFilePath = path.resolve(__dirname, '../test-data/books.json');
  static userDataFilePatch = path.resolve(__dirname, '../test-data/userData.json')

  static readDataJson(): { books: any[] } {
    try {
      const rawData = fs.readFileSync(this.booksFilePath, 'utf-8');
      return JSON.parse(rawData);
    } catch (error) {
      console.error('❌ Error reading books.json:', error);
      return { books: [] };
    }
  }
  static writeDataToJson(fileName: string , data: any): void {
    const filePath = path.resolve(__dirname, '../test-data', fileName);
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
      console.log(`✅ Successfully wrote to ${fileName}`);
    } catch (error) {
      console.error(`❌ Error writing ${fileName}`, error);
    }
  }

  static getRandomBooks(count: number): any[] {
    const { books } = this.readBooksJson();
    const shuffled = books.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
