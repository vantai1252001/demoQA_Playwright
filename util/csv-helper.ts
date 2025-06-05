import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export class CSVHelper {
    static readcsVFile(fileName: string): any[] {
        console.log(path.resolve(__dirname, '.. / .. '));
        console.log(path.join(path.resolve(__dirname, '../..'), `test-data/${fileName}`));
        let records = parse(fs.readFileSync(path.join(path.resolve(__dirname, '../..'), `test-data/${fileName}`)), {
            columns: true,
            skip_empty_lines: true
        });
        return records;
    }
}