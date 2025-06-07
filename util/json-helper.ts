import * as fs from 'fs';
import * as path from 'path';

export class JsonHelper {
  static readDataJson(fileName: string): any {
    const filePath = path.resolve(__dirname, '../test-data', fileName);
    try {
      const rawData = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(rawData);
    } catch (error) {
      console.error(`❌ Error reading ${fileName}:`, error);
      return {};
    }
  }
  static writeDataToJson(fileName: string, data: any): void {
    const filePath = path.resolve(__dirname, '../test-data', fileName);
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
      console.log(`✅ Successfully wrote to ${fileName}`);
    } catch (error) {
      console.error(`❌ Error writing ${fileName}`, error);
    }
  }
  static getRandomItem(fileName: string, key: string, count: number): any[] {
    const json = this.readDataJson(fileName);
    const items = json[key] || [];
    const shuffled = items.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
