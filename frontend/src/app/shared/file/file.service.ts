import { Injectable } from '@angular/core';

import { FileInfo } from './file.model';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor() {}

  readExcelFile(evt: any, fileInfo: FileInfo, callback: (data: Array<any>, error: Error) => void) {
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      let error: Error;
      let data;
      try {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        data = XLSX.utils.sheet_to_json(ws, {
          header: ['userName', 'name', 'group', 'password']
        });
        const header: Array<string> = <Array<string>>data[0];
        for (let i = 0; i < fileInfo.header.length; ++i) {
          if (fileInfo.header[i] !== header[fileInfo.propertys[i]]) {
            throw Error(`表格表头不是“${fileInfo.header.join('、')}”`);
          }
        }
        data.shift();
      } catch (er) {
        error = er;
        if (!error.message.startsWith('表格表头')) {
          error = Error('读取文件失败');
        }
      } finally {
        callback(data, error);
      }
    };
    reader.readAsBinaryString(target.files[0]);
  }
}
