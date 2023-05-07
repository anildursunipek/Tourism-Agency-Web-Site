import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Login, User } from '../model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
})
export class AppLoginComponent {

  login: Login = new Login();

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {

  }

  loginFunction() {
    this.authService.login(this.login).subscribe(res => {
      const user: User = res as User;
      this.authService.setUserLoggedIn(user, this.login.password);
      this.router.navigate(['/home']);
    })
  }
}
