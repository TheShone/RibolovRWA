export interface User{
    id?:number,
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
    id?: number;
    ime?: string;
    prezime?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: string;
    datumRodjenja?: Date;
    slika?: string;
  
    constructor(
      id?: number,
      ime?: string,
      prezime?: string,
      username?: string,
      email?: string,
      password?: string,
      datumRodjenja?: Date,
      slika?: string
    ) {
      this.id=id;
      this.ime = ime;
      this.prezime = prezime;
      this.username = username;
      this.email = email;
      this.password = password;
      this.role = "user";
      this.datumRodjenja = datumRodjenja;
      this.slika = slika;
    }
  }