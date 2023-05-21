export class Node{
    url:string;
    next:Node;

    constructor(url:string){
        this.url = url;
        this.next = null;
    }
}
