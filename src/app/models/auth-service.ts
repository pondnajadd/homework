export class AuthServiceModel {
  accountId: string;
  fullName: string;
  expiredDate: Date;
  accessToken: string;
  constructor() {
    this.accountId = '';
    this.fullName = '';
    this.expiredDate = new Date();
    this.accessToken = '';
  }
}
