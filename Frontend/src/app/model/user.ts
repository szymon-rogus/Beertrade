export class User {

  login: string;

  password: string;

  firstName: string;

  lastName: string;

  email: string;

  phoneNumber: string;

  constructor(login: string, password: string, firstName: string, lastName: string, email: string,
              phoneNumber: string) {
    this.login = login;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }
}
