using System.Xml.Linq;
using Tourism_Agency_AspNet_Web_Api.DTO;

namespace Tourism_Agency_AspNet_Web_Api.DataStructures
{
    public class PriorityQueue
    {
        Node head;

        public void enqueue(int priority, Object data)
        {
            Node node = new Node(priority, data);

            if (this.head == null) // İf head is null, Add new node to head
            {
                this.head = node;
                return;
            }
            if (this.head.priority > node.priority) // If New node has a more priority queue, Prepend the new node
            {
                node.next = this.head;
                this.head = node;
                return;
            }

            Node temp = this.head;
            while (temp.next != null && temp.next.priority <= node.priority)
            {
                // Find the available place for new node
                temp = temp.next;
            }

            node.next = temp.next;
            temp.next = node;
        }

        public object dequeue()
        {
            if (this.head != null)
            {
                Node temp = this.head;
                this.head = this.head.next;
                return temp.data;
            }
            return null;
        }

        public bool isEmpty()
        {
            if (this.head == null)
            {
                return true;
            }
            return false;
        }

        public List<UserDto> transferToList(List<UserDto> list)
        {
            Node temp = this.head;
            while (temp != null)
            {
                list.Add((UserDto)temp.data);
                temp = temp.next;
            }
            return list;
        }
        public List<CommentDto> transferToList(List<CommentDto> list)
        {
            Node temp = this.head;
            while (temp != null)
            {
                list.Add((CommentDto)temp.data);
                temp = temp.next;
            }
            return list;
        }
    }

    public class Node
    {
        public int priority;
        public Object data;
        public Node next;
        public Node(int priority, Object data)
        {
            this.priority = priority;
            // Priorty order
            // 0 is the highest priority.
            // 0 -> 1 -> 2 -> ...
            this.data = data;
        }
    }

}
