import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    providers: [MessageService],
})
export class UserListComponent implements OnInit {
    users: User[] = new Array();
    user: User = new User();
    deleteUserDialog: boolean;

    constructor(
        private userService: UserService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.getAllUser();
    }

    getAllUser() {
        this.userService.getAllUser().subscribe((res) => {
            this.users = res;
        });
    }

    priority(){
        this.userService.priority().subscribe(res => {
            this.users = res;
        })
    }

    deleteUser(user: User) {
        this.user = { ...user };
        this.deleteUserDialog = true;
    }

    confirmDelete() {
        this.userService.deleteUser(this.user.id).subscribe(
            (res) => {
                this.getAllUser();
                this.myMessageService(
                    'success',
                    'Başarılı',
                    'Silme işlemi başarılı.'
                );
                this.deleteUserDialog = false;
            },
            (err) => {
                this.myMessageService(
                    'error',
                    'Hata',
                    'Kullanıcı silinirken bir hata meydana geldi.'
                );
                this.deleteUserDialog = false;
            }
        );
    }

    myMessageService(severity: string, summary: string, detail: string) {
        this.messageService.add({
            severity: severity,
            summary: summary,
            detail: detail,
        });
    }
}
