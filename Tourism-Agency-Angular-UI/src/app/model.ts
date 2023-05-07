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
    description:string = "";
    imageId:string;
    tour:Tour = new Tour();
}