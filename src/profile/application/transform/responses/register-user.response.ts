export class RegisterUserResponse {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public password: string,
  ) {}
}
