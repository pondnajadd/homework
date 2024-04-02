export class AuthServiceModel {
  accountId: string;
  fullName: string;
  expiredDate: string;
  accessToken: string;
  constructor() {
    this.accountId = '';
    this.fullName = '';
    this.expiredDate = '';
    this.accessToken = '';
  }
}
