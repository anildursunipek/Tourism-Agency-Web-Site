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
    let u:User = new User();
    u.name = "Batuhan"
    u.surname = "Arslandaş"
    u.fullName = "Batuhan Arslandaş"
    u.email = "batuhan@hotmail.com"
    u.phoneNumber = "05555555555"
    u.username = "batuhan"
    u.password = "123"
    this.authService.setUserLoggedIn(u);
    this.router.navigate(['/dashboard']);

    this.authService.login(this.login).subscribe(res => {
      const user: User = res as User;
      this.authService.setUserLoggedIn(user);
      this.router.navigate(['/dashboard']);
    })
  }
}
