const h="54",n="计算三叉搜索树的高度",s="A",g=100,t=`定义构造三叉搜索树规则如下：
每个节点都存有一个数，当插入一个新的数时，从根节点向下寻找，直到找到一个合适的空节点插入。查找的规则是：
如果数小于节点的数减去500，则将数插入节点的左子树 如果数大于节点的数加上500，则将数插入节点的右子树 否则，将数插入节点的中子树
如果数小于节点的数减去500，则将数插入节点的左子树
如果数大于节点的数加上500，则将数插入节点的右子树
否则，将数插入节点的中子树
给你一系列数，请按以上规则，按顺序将数插入树中，构建出一棵三叉搜索树，最后输出树的高度。`,e=`第一行为一个数 N，表示有 N 个数，1 ≤ N ≤ 10000
第二行为 N 个空格分隔的整数，每个数的范围为[1,10000]`,i="输出树的高度（根节点的高度为1）",r=[{input:`4
2000 5000 8000 1800`,output:"3",explanation:`插入过程：
2000→根节点
5000→5000>2500，插入右子树
8000→8000>5500，插入右-右
1800→1800在[1500,2500]，插入中子树
最大深度为3。`},{input:`2
4000 3000`,output:"2",explanation:`插入过程：
4000→根节点
3000→3000在[3500,4500]，插入中子树
最大深度为2。`},{input:`8
2000 5000 8000 1800 7500 4500 1400 8100`,output:"4",explanation:`插入过程形成较深的树结构。
路径：根(2000)→右(5000)→中(4500)→中
或：根→右→右(8000)→中(8100)
最大深度为4。`}],o=`**解题思路：**

本题是一道**树的构建与遍历**问题。

**三叉搜索树插入规则：**
- 左子树：新数 < 节点值 - 500
- 右子树：新数 > 节点值 + 500
- 中子树：其他情况（差值在500以内）

**算法步骤：**

1. 按顺序插入每个数，构建三叉搜索树
2. 递归计算树的高度：max(左高度, 中高度, 右高度) + 1

**时间复杂度**：O(N × H)，H为树高
**空间复杂度**：O(N)`,l={java:`import java.util.Scanner;

// 主类
public class Main {
  
    // 静态内部类：树
    static class Tree {
        // 插入方法：向树中插入值
        public TreeNode insert(TreeNode root, int val) {
            if (root == null) {
                return new TreeNode(val); // 如果根节点为空，创建新节点作为根节点
            }
            if (val < root.val - 500) {
                root.left = insert(root.left, val); // 如果值小于根节点值减500，插入到左子树
            } else if (val > root.val + 500) {
                root.right = insert(root.right, val); // 如果值大于根节点值加500，插入到右子树
            } else {
                root.mid = insert(root.mid, val); // 如果值在根节点值加减500范围内，插入到中间子树
            }
            return root; // 返回根节点
        }

        // 获取树的高度
        public int getHeight(TreeNode root) {
            if (root == null) {
                return 0; // 如果根节点为空，高度为0
            }
            int leftHeight = getHeight(root.left); // 计算左子树的高度
            int midHeight = getHeight(root.mid); // 计算中间子树的高度
            int rightHeight = getHeight(root.right); // 计算右子树的高度
            return Math.max(Math.max(leftHeight, midHeight), rightHeight) + 1; // 返回三者中最大的高度加1
        }
    }

    // 静态内部类：树节点
    static class TreeNode {
        int val; // 节点值
        TreeNode left, mid, right; // 左子节点、中间子节点、右子节点
        TreeNode(int x) { val = x; } // 构造方法，初始化节点值
    }

     
    public static void main(String[] args) {
        Tree tree = new Tree(); // 创建树对象
        Scanner scanner = new Scanner(System.in); // 创建扫描器读取输入
        int N = scanner.nextInt();  // 读取第一个整数作为后续要输入的节点数量
        TreeNode root = null; // 初始化根节点为null
        for (int i = 0; i < N; i++) {
            int num = scanner.nextInt();  // 循环读取N个整数作为节点值
            root = tree.insert(root, num);  // 将每个整数插入树中
        }
        scanner.close(); // 关闭扫描器
        int height = tree.getHeight(root);  // 获取树的高度
        System.out.println(height);  // 输出树的高度
    }
}`,python:`class TreeNode:
    def __init__(self, val):
        self.val = val  # 节点值
        self.left = self.mid = self.right = None  # 左、中、右子节点

class Tree:
    # 插入方法：向树中插入值
    def insert(self, root, val):
        if root is None:
            return TreeNode(val)  # 如果根节点为空，创建新节点作为根节点
        if val < root.val - 500:
            root.left = self.insert(root.left, val)  # 如果值小于根节点值减500，插入到左子树
        elif val > root.val + 500:
            root.right = self.insert(root.right, val)  # 如果值大于根节点值加500，插入到右子树
        else:
            root.mid = self.insert(root.mid, val)  # 如果值在根节点值加减500范围内，插入到中间子树
        return root  # 返回根节点

    # 获取树的高度
    def get_height(self, root):
        if root is None:
            return 0  # 如果根节点为空，高度为0
        left_height = self.get_height(root.left)  # 计算左子树的高度
        mid_height = self.get_height(root.mid)  # 计算中间子树的高度
        right_height = self.get_height(root.right)  # 计算右子树的高度
        return max(left_height, mid_height, right_height) + 1  # 返回三者中最大的高度加1

if __name__ == '__main__':
    tree = Tree()  # 创建树对象
    N = int(input())  # 读取节点数量
    root = None  # 初始化根节点为None
    nums = list(map(int, input().split()))
    for num in nums:
        root = tree.insert(root, num)  # 将每个整数插入树中     
    height = tree.get_height(root)  # 获取树的高度
    print(height)  # 输出树的高度`,javascript:`class TreeNode {
    // 构造函数：创建树节点
    constructor(val) {
        this.val = val; // 节点值
        this.left = this.mid = this.right = null; // 初始化左、中、右子节点为null
    }
}

class Tree {
    // 插入方法：向树中插入值
    insert(root, val) {
        if (root === null) {
            return new TreeNode(val); // 如果根节点为空，创建新节点作为根节点
        }
        if (val < root.val - 500) {
            root.left = this.insert(root.left, val); // 如果值小于根节点值减500，插入到左子树
        } else if (val > root.val + 500) {
            root.right = this.insert(root.right, val); // 如果值大于根节点值加500，插入到右子树
        } else {
            root.mid = this.insert(root.mid, val); // 如果值在根节点值加减500范围内，插入到中间子树
        }
        return root; // 返回根节点
    }

    // 获取树的高度
    getHeight(root) {
        if (root === null) {
            return 0; // 如果根节点为空，高度为0
        }
        let leftHeight = this.getHeight(root.left); // 计算左子树的高度
        let midHeight = this.getHeight(root.mid); // 计算中间子树的高度
        let rightHeight = this.getHeight(root.right); // 计算右子树的高度
        return Math.max(leftHeight, midHeight, rightHeight) + 1; // 返回三者中最大的高度加1
    }
}

// 主程序
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const tree = new Tree();
let root = null;

readline.on('line', N => {
    N = parseInt(N);
    readline.on('line', nums => {
        nums.split(' ').forEach(num => {
            root = tree.insert(root, parseInt(num)); // 将每个整数插入树中
        });
        const height = tree.getHeight(root); // 获取树的高度
        console.log(height); // 输出树的高度
        readline.close();
    });
});`,cpp:`#include <iostream>
#include <algorithm>
using namespace std;
// 树节点结构体
struct TreeNode {
    int val; // 节点值
    TreeNode *left, *mid, *right; // 左、中、右子节点指针
    TreeNode(int x) : val(x), left(nullptr), mid(nullptr), right(nullptr) {} // 构造函数
};

// 树类
class Tree {
public:
    // 插入方法：向树中插入值
    TreeNode* insert(TreeNode* root, int val) {
        if (root == nullptr) {
            return new TreeNode(val); // 如果根节点为空，创建新节点作为根节点
        }
        if (val < root->val - 500) {
            root->left = insert(root->left, val); // 如果值小于根节点值减500，插入到左子树
        } else if (val > root->val + 500) {
            root->right = insert(root->right, val); // 如果值大于根节点值加500，插入到右子树
        } else {
            root->mid = insert(root->mid, val); // 如果值在根节点值加减500范围内，插入到中间子树
        }
        return root; // 返回根节点
    }

    // 获取树的高度
    int getHeight(TreeNode* root) {
        if (root == nullptr) {
            return 0; // 如果根节点为空，高度为0
        }
        int leftHeight = getHeight(root->left); // 计算左子树的高度
        int midHeight = getHeight(root->mid); // 计算中间子树的高度
        int rightHeight = getHeight(root->right); // 计算右子树的高度
        return max({leftHeight, midHeight, rightHeight}) + 1; // 返回三者中最大的高度加1
    }
};

int main() {
    Tree tree; // 创建树对象
    int N;
    cin >> N; // 读取节点数量
    TreeNode* root = nullptr; // 初始化根节点为null
    for (int i = 0; i < N; ++i) {
        int num;
        cin >> num; // 循环读取节点值
        root = tree.insert(root, num); // 将每个整数插入树中
    }
    int height = tree.getHeight(root); // 获取树的高度
    cout << height << endl; // 输出树的高度
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>

// 树节点结构体
typedef struct TreeNode {
    int val; // 节点值
    struct TreeNode *left, *mid, *right; // 左、中、右子节点指针
} TreeNode;

// 创建新节点
TreeNode* createNode(int val) {
    TreeNode* node = (TreeNode*)malloc(sizeof(TreeNode)); // 分配内存
    node->val = val; // 设置节点值
    node->left = node->mid = node->right = NULL; // 初始化子节点为NULL
    return node; // 返回新创建的节点
}

// 向树中插入值
TreeNode* insert(TreeNode* root, int val) {
    if (root == NULL) {
        return createNode(val); // 如果根节点为空，创建新节点作为根节点
    }
    if (val < root->val - 500) {
        root->left = insert(root->left, val); // 如果值小于根节点值减500，插入到左子树
    } else if (val > root->val + 500) {
        root->right = insert(root->right, val); // 如果值大于根节点值加500，插入到右子树
    } else {
        root->mid = insert(root->mid, val); // 如果值在根节点值加减500范围内，插入到中间子树
    }
    return root; // 返回根节点
}

// 获取树的高度
int getHeight(TreeNode* root) {
    if (root == NULL) {
        return 0; // 如果根节点为空，高度为0
    }
    int leftHeight = getHeight(root->left); // 计算左子树的高度
    int midHeight = getHeight(root->mid); // 计算中间子树的高度
    int rightHeight = getHeight(root->right); // 计算右子树的高度
    int maxHeight = leftHeight > midHeight ? leftHeight : midHeight; // 计算左子树和中间子树的最大高度
    maxHeight = maxHeight > rightHeight ? maxHeight : rightHeight; // 计算最大高度
    return maxHeight + 1; // 返回最大高度加1
}

int main() {
    int N, num;
    scanf("%d", &N); // 读取节点数量
    TreeNode* root = NULL; // 初始化根节点为NULL
    for (int i = 0; i < N; ++i) {
        scanf("%d", &num); // 循环读取节点值
        root = insert(root, num); // 将每个整数插入树中
    }
    int height = getHeight(root); // 获取树的高度
    printf("%d\\n", height); // 输出树的高度
    return 0;
}`},a={id:"54",title:n,examType:"A",score:100,description:t,inputDesc:e,outputDesc:i,examples:r,solution:o,codes:l};export{l as codes,a as default,t as description,s as examType,r as examples,h as id,e as inputDesc,i as outputDesc,g as score,o as solution,n as title};
