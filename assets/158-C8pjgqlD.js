const o="158",n="目录删除",l="A",c=200,e=`某文件系统中有 N 个目录，每个目录都有一个独一无二的 ID。
每个目录只有一个父目录，但每个父目录下可以有零个或者多个子目录，目录结构呈树状结构。
假设，根目录的 ID 为 0，且根目录没有父目录，其他所有目录的 ID 用唯一的正整数表示，并统一编号。
现给定目录 ID 和其父目录 ID 的对应父子关系表[子目录 ID，父目录 ID]，以及一个待删除的目录 ID，请计算并返回一个 ID 序列，表示因为删除指定目录后剩下的所有目录，返回的ID序列以递增序输出。
注意
1、被删除的目录或文件编号一定在输入的 ID 序列中；
2、当一个目录删除时，它所有的子目录都会被删除。
`,t=`输入的第一行为父子关系表的长度 m；
接下来的 m 行为 m 个父子关系对；
最后一行为待删除的 ID。
序列中的元素以空格分割，参见样例。
`,r=`输出一个序列，表示因为删除指定目录后，剩余的目录 ID。


本题咋看上去是让模拟N叉树结构，然后做节点删除操作，最后遍历N叉树。
但是这样的话思考的话，就太复杂了。
本题其实并不需要删除节点，也不需要遍历N叉树，我们可以在模拟N叉树的过程中，就统计节点，并排除要删除的节点的插入。
我首先，统计了所有父节点下的子节点，比如
8 6 10 8 6 0 20 8 2 6
可以统计为：
然后从根节点0开始遍历N叉树
`,i=[{input:`5
8 6
10 8
6 0
20 8
2 6
8`,output:"2 6 10 20",explanation:"删除目录8后，其子目录10、20也被删除，剩余2、6"},{input:`3
1 0
2 1
3 1
1`,output:"",explanation:"删除目录1后，子目录2、3也被删除，根目录0不输出"}],s=`**解题思路：**

本题是一道**树遍历**问题。

**核心思路：**
- 构建父子关系的树结构
- DFS遍历时跳过要删除的节点及其子树

**算法步骤：**
1. 构建父节点->子节点的映射
2. 从根节点0开始DFS遍历
3. 遇到要删除的节点则跳过（不递归其子树）
4. 收集未被删除的节点并排序输出

**时间复杂度**：O(N)`,a={java:`import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner;
import java.util.StringJoiner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int m = sc.nextInt();

    int[][] relations = new int[m][2];
    for (int i = 0; i < m; i++) {
      relations[i][0] = sc.nextInt();
      relations[i][1] = sc.nextInt();
    }

    int del = sc.nextInt();

    System.out.println(getResult(m, relations, del));
  }

  public static String getResult(int m, int[][] relations, int del) {
    HashMap<Integer, ArrayList<Integer>> tree = new HashMap<>();

    for (int[] relation : relations) {
      int child = relation[0];
      int father = relation[1];
      tree.putIfAbsent(father, new ArrayList<>());
      tree.get(father).add(child);
    }

    if (del == 0) {
      return "";
    }

    ArrayList<Integer> res = new ArrayList<>();
    dfs(tree, 0, del, res);

    res.sort((a, b) -> a - b);
    StringJoiner sj = new StringJoiner(" ");
    for (Integer v : res) {
      sj.add(v + "");
    }
    return sj.toString();
  }

  public static void dfs(
      HashMap<Integer, ArrayList<Integer>> tree, int node, int del, ArrayList<Integer> res) {
    if (tree.containsKey(node)) {
      ArrayList<Integer> children = tree.get(node);
      for (Integer child : children) {
        if (child != del) {
          res.add(child);
          dfs(tree, child, del, res);
        }
      }
    }
  }
}`,python:`# 输入获取
m = int(input())
relations = [list(map(int, input().split())) for _ in range(m)]
remove = int(input())


def dfs(tree, node, remove, res):
    if tree.get(node) is not None:
        children = tree[node]
        for child in children:
            if child != remove:
                res.append(child)
                dfs(tree, child, remove, res)


# 算法入口
def getResult():
    tree = {}

    for child, father in relations:
        if tree.get(father) is None:
            tree[father] = []
        tree[father].append(child)

    if remove == 0:
        return ""

    res = []
    dfs(tree, 0, remove, res)

    res.sort()
    return " ".join(map(str, res))


# 调用算法
print(getResult())`,javascript:"",cpp:"",c:""},d={id:"158",title:n,examType:"A",score:200,description:e,inputDesc:t,outputDesc:r,examples:i,solution:s,codes:a};export{a as codes,d as default,e as description,l as examType,i as examples,o as id,t as inputDesc,r as outputDesc,c as score,s as solution,n as title};
