export class User{
    id:string;
    name:string = "";
    surname:string = "";
    fullName:string = "";
    phoneNumber:string = "";
    email:string = "";
    tc:string = "";
    username:string = "";
    password:string = "";
}

export class Login {
    username:string = "";
    password:string = "";
}

export class Tour {
    id:string;
    name:string = "";
    categoryTourId:string; // tour id gelecek
}

export class TourItem {
    id:string;
    name:string = "";
    address:string = "";
    price:number;
    shortDescription:string = "";
    longDescription:string = "";
    imageUrls:any[] = new Array();
    tour:Tour = new Tour();
}

export class Comment {
    id:string;
    description:string = "";
    tourItem:TourItem = new TourItem();
    user:User = new User();
}

export class Order{
    id:string;
    user:User = new User();
    tourItem:TourItem = new TourItem();
    fullName:string = "";
    phoneNumber:string = "";
    date:Date = new Date();
    tourTime:number = 1;
    adult:number = 1;
    child:number = 1;
}