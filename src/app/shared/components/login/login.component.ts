import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/core/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { StateService } from '../../services/core/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private cookieService = inject(CookieService);
  private stateService = inject(StateService);

  protected loginLoader: boolean = false;
  protected loginForm!: FormGroup;
  protected registerForm!: FormGroup;

  protected login: boolean = true;
  protected register: boolean = false;
  protected issueHandling: boolean = false;
  protected passType: string = 'password';
  protected visibility: string = 'visibility_off';
  protected issueMsg: string = '';

  protected otherError!: string;


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      pass: ['', [Validators.required, Validators.minLength(4)]]
    });


    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)],
      trigramme: ['', [Validators.required, Validators.pattern(/^(iml-[a-zA-Z]{3}|iml-[a-zA-Z]{2}|[a-zA-Z]{3})$/)]],
      pass: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  protected verifyLogin(login: string, pass: string):void {
    this.loginLoader = true;

    this.authService.trylogin(login, pass).subscribe({
      next: (response) => {
        this.loginFlow(response);
      },
      error: (error) => {
        this.loginForm.reset();
        this.otherError = error.error.error.message;
        this.loginLoader = false;
      }
    });
  }

  protected toggleType(): void {
    if(this.passType == 'password'){
      this.passType = 'text';
      this.visibility = 'visibility';
    } else {
      this.passType = 'password';
      this.visibility = 'visibility_off'
    }
  }

  protected toggleRegister(): void {
    this.issueHandling = false;
    this.login = !this.login;
    this.register = !this.register;
    this.loginForm.reset();
    this.registerForm.reset();
  }

  protected registerAccount(email: string, trigramme: string, pass: string): void {
    this.loginLoader = true;

    this.authService.tryCreateUser(email, trigramme, pass).subscribe({
      next: (response) => {
        if(response.data.id) {
          this.verifyLogin(email, pass);
        }
      },
      error: (error) => {
        this.loginLoader = false;
        this.login = false;
        this.register = false;
        this.issueHandling = true;
        this.loginForm.reset();
        this.registerForm.reset();

        if(error.error.error.code === 204){
          this.issueMsg = "Ce compte est déjà enregistré sur notre plateforme. Veuillez contacter l'équipe organisatrice pour réinitialiser votre mot de passe ou supprimer le compte."
        } else {
          this.issueMsg = "Nous rencontrons des difficultés techniques pour créer votre compte. Veuillez contacter l'équipe organisatrice ou réessayer plus tard."
        }
      }
    });
  }

  private loginFlow(obj: any){
    let userObj = obj.data.user;
    let token = obj.data.token;

    this.authService.setTokenCookie(token);
    this.authService.setUserCookie(userObj.id);

    this.loginLoader = false;

    location.reload();
  }
}
