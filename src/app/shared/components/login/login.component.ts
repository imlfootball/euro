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
  
  @Input() modalOn?: boolean;

  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private cookieService = inject(CookieService);
  private stateService = inject(StateService);

  protected loginForm!: FormGroup;
  protected registerForm!: FormGroup;

  protected login: boolean = true;
  protected register: boolean = false;
  protected passType: string = 'password';
  protected visibility: string = 'visibility_off';

  protected otherError!: string;


  ngOnChanges(changes: SimpleChanges) {
    // Detect changes to the showModal input property
    if (changes['modalOn']) {
      // If showModal changed to false, reset the component state
      if (!changes['modalOn'].currentValue) {
        // this.resetForm();
      }
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      pass: ['', [Validators.required, Validators.minLength(4)]]
    });


    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)],
      trigramme: ['', [Validators.required, Validators.pattern(/^(iml-[a-zA-Z]{3}|iml-[a-zA-Z]{2}|[a-zA-Z]{3})$/)]]
    });
  }

  protected verifyLogin(login: string, pass: string):void {
    // console.log(login, pass);
    this.authService.trylogin(login, pass).subscribe(
      response => {
        this.loginFlow(response);
      },
      error => {
        this.loginForm.reset();
        this.otherError = error.error.error.message;
      }
    );
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
    this.login = !this.login;
    this.register = !this.register;
    this.loginForm.reset();
  }

  protected registerAccount(nom: string, trigramme: string): void {
    console.log(nom, trigramme);
  }

  private loginFlow(obj: any){
    let userObj = obj.data.user;
    this.stateService.updateUser(userObj);
    this.modalOn = false;
  }
}
