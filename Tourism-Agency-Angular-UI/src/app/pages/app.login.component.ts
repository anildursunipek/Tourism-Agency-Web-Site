import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Login, User } from '../model';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
  providers: [
    MessageService
  ]
})
export class AppLoginComponent {

  login: Login = new Login();

  constructor(private router: Router, private authService: AuthService, private messageService: MessageService) {

  }

  ngOnInit(): void {

  }
  myMessageService(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }
  loginFunction() {
    this.authService.login(this.login).subscribe(res => {
        if(res == null){
            this.myMessageService('error', 'Başarısız', 'Kullanıcı adı veya şifre yanlış.');
        }else{
            const user: User = res as User;
            this.authService.setUserLoggedIn(user);
            if(user.userType == "ADMIN"){
                this.router.navigate(['/component/map']);
            }else{
                this.router.navigate(['/dashboard']);
            }
        }
    })
  }
}
