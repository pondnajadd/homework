export class ResponseModel<T> {
  statusCode: number;
  statusMessage: string;
  isSuccess: boolean;
  data!: T;
  constructor() {
    this.statusCode = 0;
    this.statusMessage = '';
    this.isSuccess = false;
  }
}
