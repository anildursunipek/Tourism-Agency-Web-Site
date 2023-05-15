using Tourism_Agency_AspNet_Web_Api.DTO;

namespace Tourism_Agency_AspNet_Web_Api.DataStructures
{
    public class BinaryNode
    {
        public decimal key;
        public Object data;
        public BinaryNode left;
        public BinaryNode right;
        public BinaryNode(decimal key, Object data)
        {
            this.key = key;
            this.data = data;
        }
    }
    public class BinaryTree
    {

        public BinaryNode root;
        public BinaryTree()
        {
            this.root = null;
        }

        public void add(decimal key, Object data)
        {
            BinaryNode newNode = new BinaryNode(key, data);
            BinaryNode temp = this.root;
            BinaryNode temp2 = null;

            while (temp != null)
            {
                temp2 = temp;
                if (temp.key > key)
                {
                    temp = temp.left;
                }
                else
                {
                    temp = temp.right;
                }
            }

            if (temp2 == null)
            {
                this.root = newNode;
            }
            else
            {
                if (temp2.key > key)
                    temp2.left = newNode;
                else
                    temp2.right = newNode;
            }
        }

        public Object search(decimal key, BinaryNode node)
        {
            if (node == null)
                return null;

            if (node.key == key)
                return node.data;

            else
            {
                if (node.key > key)
                    return search(key, node.left);
                else
                    return search(key, node.right);
            }
        }
        public void inorder(List<TourItemDto> list, BinaryNode node)
        {
            // inorder -> LNR
            if (node == null)
                return;

            if (node.left != null)
                inorder(list, node.left);

            //Console.Write(node.key + " | ");
            list.Add((TourItemDto)node.data);

            if (node.right != null)
                inorder(list, node.right);
        }
        public Object GetMin()
        {
            if(this.root == null)
                return null;

            BinaryNode temp = this.root;
            while(temp.left != null)
                temp = temp.left;

            return temp.data;
        }

        public Object GetMax()
        {
            if (this.root == null)
                return null;

            BinaryNode temp = this.root;

            while (temp.right != null)
                temp = temp.right;

            return temp.data;
        }
    }
}
