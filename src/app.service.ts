import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';

@Injectable()
export class AppService {
  constructor() { }
  async getHello(): Promise<string> {
    const data = await getConnection().query('select CURRENT_TIMESTAMP as date');
    return `DATA FROM THE MYSQL ===> ${data[0].date}`;
  }
}
