export class UserUpdateDto {
    id?:number
    ime?:string;
    prezime?:string;
    username?:string;
    email?:string;
    password?:string;
    role?:string
    datumRodjenja?:Date;
    slika?:string;
}