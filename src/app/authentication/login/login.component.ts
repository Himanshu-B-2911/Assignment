import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/Model/login.model';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router,
              private authService : AuthenticationService) {             
  }

  ngOnInit(): void {
  }

  onLogin(LoginForm:any){
    
   console.log(LoginForm.value);
   const userDetails: Login = {
         email: LoginForm.value.userName,
         password: LoginForm.value.userPassword
   };      
   this.authService.login(userDetails).subscribe((result)=>{
       console.log(result);
       if (result.token) {
           localStorage.setItem('token', result.token);
       }
       this.router.navigate(['/home']);
   });
  }
}
