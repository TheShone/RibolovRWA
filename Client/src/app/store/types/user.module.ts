export interface User{
    ime?:string;
    prezime?:string;
    username?:string;
    email?:string;
    password?:string;
    role?:string
    datumRodjenja?:Date;
    slika?:string;
}
export class UserModel implements User {
    ime?: string;
    prezime?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: string;
    datumRodjenja?: Date;
    slika?: string;
  
    constructor(
      ime?: string,
      prezime?: string,
      username?: string,
      email?: string,
      password?: string,
      role?: string,
      datumRodjenja?: Date,
      slika?: string
    ) {
      this.ime = ime;
      this.prezime = prezime;
      this.username = username;
      this.email = email;
      this.password = password;
      this.role = role;
      this.datumRodjenja = datumRodjenja;
      this.slika = slika;
    }
  }