import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { Result } from "../../../../Commons/Classes/result";
import { LoginRequest } from "../MethodParameters/loginRequest";
import { AuthenticationFormsService } from "../Services/authentication.form.service";
import { AuthenticationService } from "../Services/authentication.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })  
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    showLoader: boolean = false;
    hasError = false;

    constructor(private authenticationService: AuthenticationService, 
        private authenticationFormsService:AuthenticationFormsService,
        private router: Router){}
    
    ngOnInit() {
        this.loginForm = this.authenticationFormsService.loginForm();
        this.logout();
    }

    logout(){
        localStorage.clear();
        this.router.navigate(['/Login']);
    }

    getBooksFilters(){
        this.hasError = false;
        this.showLoader = true;
        let loginRequest = new LoginRequest();
        loginRequest.Username = this.loginForm.get('Username').value;
        loginRequest.Password = this.loginForm.get('Password').value;
        this.authenticationService.authenticate(loginRequest).subscribe(response => {
            if(response == null || response === ''){
                this.hasError = true;
            }else{
                localStorage.setItem('tokensJWT',response) ;
                this.router.navigate(['Administration/Books']);   
            }
            this.showLoader = false;
        });
    }
}