import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
  providers: [MessageService]
})
export class UserAddComponent implements OnInit {

  user: User = new User();
  submitted: boolean = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id']

    id != undefined ? this.findByUser(id) : false;
  }

  findByUser(id: string) {
    this.userService.findByUser(id).subscribe(res => {
      this.user = { ...res }
    }, err => {
      this.myMessageService('error', 'Hata', 'Kullanıcı bulunamadı.');
    })
  }

  saveUser() {
    this.submitted = true;
    if (this.formControl()) {
      this.submitted = false;
      this.user.fullName = this.user.name.concat(" " + this.user.surname)
      this.userService.saveUser(this.user).subscribe(res => {
        console.log(res);
        this.user = new User();
        this.myMessageService('success', 'Başarılı', 'Kaydetme işlemi başarılı.');
      }, err => {
        this.myMessageService('error', 'Hata', 'Kaydedilirken bir hata meydana geldi.');
      })
    } else {
      this.myMessageService('warn', 'Uyarı', 'Tüm alanları doldurmanız gerekmektedir.');
    }
  }

  formControl() {
    return this.user.name.trim() && this.user.surname.trim() && this.user.phoneNumber.trim() && this.user.tc.trim() && this.user.email.trim() && this.user.username && this.user.password;
  }

  myMessageService(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }

}
