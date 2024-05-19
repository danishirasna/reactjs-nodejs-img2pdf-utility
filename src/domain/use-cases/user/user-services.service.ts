import { Injectable } from '@nestjs/common';

@Injectable()
export class UserServices {
  constructor() {}

  getUser(query): boolean {
    if (query.username === 'admin' || query.email === 'admin@admin.com') {
      return true;
    }
    return false;
  }

  getUserPassword(query): boolean {
    if (query.password === 'admin') {
      return true;
    }
    return false;
  }
}
