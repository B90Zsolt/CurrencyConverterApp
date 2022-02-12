import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getErrorMsg, hasError } from 'src/app/core/extensions/validators';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required]
  });

  returnUrl: string = '';
  error = false;
  submitted = false;

  constructor(private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private userService: UserService) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  login() {
    const data = this.loginForm.getRawValue();
    this.error = false;
    this.submitted = true;

    this.userService.login(data.email, data.password).subscribe(() => {
          this.router.navigateByUrl(this.returnUrl);
      },
      () => {
          this.error = true;
          this.submitted = false;
          this.loginForm.reset();
      }
    );
  }

  hasError = hasError;
  getErrorMsg = getErrorMsg;
}
