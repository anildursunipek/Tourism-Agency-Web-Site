import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Comment, Order, TourItem, User } from 'src/app/model';
import { CommentService } from 'src/app/services/comment/comment.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.scss'],
  providers: [MessageService]
})
export class TourDetailComponent implements OnInit {

  @Input()
  tourItem: TourItem = new TourItem();

  userComment: Comment = new Comment();
  order: Order = new Order()
  comments:Comment[] = new Array();
  user:User = new User();

  galleriaResponsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '960px',
      numVisible: 4
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor(
    private commentService: CommentService,
    private orderService: OrderService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    console.log(this.tourItem);
    this.getCommentsByTourItemId(this.tourItem.id)
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  getCommentsByTourItemId(id:string){
    this.commentService.findByTourItemId(id).subscribe(res => {
      this.comments = res;
    })
  }

  sendComment() {
    this.userComment.user = {...this.user}
    this.userComment.tourItem = { ...this.tourItem };
    if (this.userComment.description.trim()) {
      this.commentService.saveComment(this.userComment).subscribe(res => {
        this.userComment = new Comment();
        this.myMessageService('success', 'Başarılı', 'Yorum yapıldı.');
      }, err => {
        this.myMessageService('error', 'Hata', 'Yorum yaparken bir hata meydana geldi.');
      })
    } else {
      this.myMessageService('warn', 'Uyarı', 'Tüm alanları doldurmanız gerekmektedir.');
    }
  }

  saveOrder() {
    this.order.user = {...this.user}
    this.order.tourItem = { ...this.tourItem };
    if (
      this.order.fullName.trim() &&
      this.order.phoneNumber.trim() &&
      this.order.adult != null &&
      this.order.child != null &&
      this.order.tourTime != null
    ) {
      this.orderService.saveOrder(this.order).subscribe(res => {
        this.order = new Order();
        this.myMessageService('success', 'Başarılı', 'Rezervasyon başarılı.');
      }, err => {
        this.myMessageService('error', 'Hata', 'Rezervasyon yaparken bir hata meydana geldi.');
      })
    } else {
      this.myMessageService('warn', 'Uyarı', 'Tüm alanları doldurmanız gerekmektedir.');
    }
  }

  myMessageService(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }
}