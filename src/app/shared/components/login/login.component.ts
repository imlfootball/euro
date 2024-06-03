import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  @Input() modalOn?: boolean;

  public loginForm!: FormGroup;
  public registerForm!: FormGroup;

  protected login: boolean = true;
  protected register: boolean = false;
  protected passType: string = 'password';
  public visibility: string = 'visibility_off';

  constructor(private formBuilder: FormBuilder) { }

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
      login: ['', [Validators.required, Validators.pattern(/^(iml-[a-zA-Z]{3}|iml-[a-zA-Z]{2}|[a-zA-Z]{3})$/)]],
      pass: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      trigramme: ['', [Validators.required, Validators.pattern(/^(iml-[a-zA-Z]{3}|iml-[a-zA-Z]{2}|[a-zA-Z]{3})$/)]]
    });
  }

  verifyLogin(login: string, pass: string):void {
    console.log(login, pass);
  }

  toggleType(): void {
    if(this.passType == 'password'){
      this.passType = 'text';
      this.visibility = 'visibility';
    } else {
      this.passType = 'password';
      this.visibility = 'visibility_off'
    }
  }

  toggleRegister(): void {
    this.login = !this.login;
    this.register = !this.register;
    this.loginForm.reset();
  }


  registerAccount(nom: string, trigramme: string): void {
    console.log(nom, trigramme);
  }

  // resetForm():void {
  //   this.loginForm.reset();
  //   this.registerForm.reset();
  //   this.login = true;
  //   this.register = false;
  //   this.passType = 'password';
  //   this.visibility = 'visibility_off';
  // }
}
