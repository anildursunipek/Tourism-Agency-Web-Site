using Tourism_Agency_AspNet_Web_Api.Models;

namespace Tourism_Agency_AspNet_Web_Api.DataStructures
{
    class HashNode
    {
        public string userName;
        public User user;
        public HashNode(User user)
        {
            this.userName = user.Username.ToString();
            this.user = user;
        }
    }
    class MyHash
    {
        HashNode[] hashTable;
        int N; // Hash table size
        public MyHash(int N)
        {
            this.hashTable = new HashNode[N];
            this.N = N;
        }
        public int HashCode(string userName)
        {
            int position = 0;
            foreach (char c in userName)
            {
                //Console.WriteLine("c -> " + c);
                //Console.WriteLine("(int)c -> " + (int)c);
                position += (int)c;
            }
            Console.WriteLine(position);
            return position % N;
        }

        //public int HashCode(int key)
        //{
        //    return key % this.N;
        //}
        public void Insert(User user)
        {
            HashNode node = new HashNode(user);
            int idx = this.HashCode(node.userName);
            int temp = idx;
            int count = 1;
            while (this.hashTable[temp] != null)
            {
                temp = (int)((idx + Math.Pow(count, 2)) % this.N); // Quadratic Hash
                count++;
            }
            this.hashTable[temp] = node;
        }
        public User FindUser(string userName)
        {
            int idx = this.HashCode(userName);
            Console.WriteLine(idx);
            int temp = idx;
            int count = 1;
            while (this.hashTable[temp] != null)
            {
                if (this.hashTable[temp] != null)
                {
                    if (this.hashTable[temp].userName == userName)
                    {
                        break;
                    }
                }
                temp = (int)((idx + Math.Pow(count, 2)) % this.N);
                count++;
            }
            if (this.hashTable[temp] != null)
            {
                return this.hashTable[temp].user;
            }
            return null;
        }
        public void PrintHash()
        {
            Console.Write(" | ");
            for (int i = 0; i < this.hashTable.Length; i++)
            {
                if (this.hashTable[i] == null)
                {
                    Console.Write("null | ");
                    continue;
                }
                Console.Write(this.hashTable[i].userName + " | ");
            }
            Console.WriteLine();
        }
    }
}
