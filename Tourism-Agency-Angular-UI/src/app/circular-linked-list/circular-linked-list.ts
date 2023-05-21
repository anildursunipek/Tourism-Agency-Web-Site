import { Node } from "./node";

export class CircularLinkedList{
    head:Node;

    public add(url:string){
        var node = new Node(url);

        if(this.head == null){
            this.head = node;
            node.next = this.head;
            return;
        }

        var temp = this.head;
        while(temp.next != this.head){
            temp = temp.next;
        }
        temp.next = node;
        node.next = this.head;
    }
}
