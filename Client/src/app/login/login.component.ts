import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/loginService.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!:FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private http:HttpClient,
    private router:Router,
    private loginService: LoginService
  ){

  }
  ngOnInit(): void {
    this.form=this.formBuilder.group({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    })
  }
  login():void{
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;

    this.loginService.login(username, password)
      .subscribe(
        (response) => {
          localStorage.setItem('loggedUser', JSON.stringify(response));
          this.router.navigate(['/']);
        },
        () => {
          alert('Pogresno korisnicko ime ili sifra');
        }
      );
  }
}
