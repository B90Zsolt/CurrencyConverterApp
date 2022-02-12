import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { equalsValidator, getErrorMsg, hasError, PasswordValidator } from 'src/app/core/extensions/validators';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  regForm: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(8), PasswordValidator.strong]],
    password2: [null, [Validators.required, equalsValidator("password")]]
  });

  error = false;
  submitted = false;

  constructor(private router: Router,
        private formBuilder: FormBuilder,
        private userService: UserService) { }

  ngOnInit(): void {
  }

  save() {
    const data = this.regForm.getRawValue();
    this.error = false;
    this.submitted = true;
    this.regForm.get("email")?.dirty
    this.userService.registration(data.email, data.password).subscribe(() => {
          this.router.navigateByUrl("/");
      },
      () => {
          this.error = true;
          this.submitted = false;
          this.regForm.reset();
      }
    );
  }

  hasError = hasError;
  getErrorMsg = getErrorMsg;
}
