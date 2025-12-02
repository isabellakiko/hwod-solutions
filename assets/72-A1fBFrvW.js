const o="72",n="数组二叉树",p="A",l=100,i=`二叉树也可以用数组来存储，给定一个数组，树的根节点的值存储在下标1，对于存储在下标N的节点，它的左子节点和右子节点分别存储在下标2*N和2*N+1，并且我们用值-1代表一个节点为空。
给定一个数组存储的二叉树，试求从根节点到最小的叶子节点的路径，路径由节点的值组成。
`,t=`输入一行为数组的内容，数组的每个元素都是正整数，元素间用空格分隔。
注意第一个元素即为根节点的值，即数组的第N个元素对应下标N，下标0在树的表示中没有使用，所以我们省略了。
输入的树最多为7层。
`,r="输出从根节点到最小叶子节点的路径上，各个节点的值，由空格分隔。",e=[{input:"3 5 7 -1 -1 2 4",output:"3 7 2",explanation:"树结构：3为根，左子5右子7；7的左子2右子4。叶子节点有5、2、4，最小为2，路径为3→7→2。"},{input:"5 9 8 -1 -1 7 6",output:"5 8 6",explanation:"叶子节点有9、7、6，最小为6，路径为5→8→6。"},{input:"1 2 3",output:"1 2",explanation:"叶子节点有2、3，最小为2，路径为1→2。"}],a=`**解题思路：**

本题是一道**二叉树遍历**问题。

**算法步骤：**
1. 先找到最小叶子节点（没有子节点的节点）
2. 从最小叶子节点向上找父节点，直到根节点
3. 父节点索引公式：f = (i-1)/2（数组从0开始）
4. 将路径反转后输出

**叶子节点判断：**
节点i是叶子节点，当且仅当它的左右子节点都不存在或为-1

**时间复杂度**：O(N)`,s={java:`import java.util.Arrays;
import java.util.LinkedList;
import java.util.Scanner;
import java.util.StringJoiner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    Integer[] arr =
        Arrays.stream(sc.nextLine().split(" ")).map(Integer::parseInt).toArray(Integer[]::new);

    System.out.println(getResult(arr));
  }

  public static String getResult(Integer[] arr) {
    int n = arr.length - 1;

    // 最小叶子节点的值
    int min = Integer.MAX_VALUE;
    // 最小叶子节点的索引
    int minIdx = -1;

    // 求解最小叶子节点的值和索引
    for (int i = n; i >= 1; i--) {
      if (arr[i] != -1) {
        if (i * 2 + 1 <= n && arr[i * 2 + 1] != -1) continue;
        if (i * 2 + 2 <= n && arr[i * 2 + 2] != -1) continue;
        if (min > arr[i]) {
          min = arr[i];
          minIdx = i;
        }
      }
    }

    // path用于缓存最小叶子节点到根的路径
    LinkedList<Integer> path = new LinkedList<>();
    path.addFirst(min);

    // 从最小叶子节点开始向上找父节点，直到树顶
    while (minIdx != 0) {
      int f = (minIdx - 1) / 2;
      path.addFirst(arr[f]);
      minIdx = f;
    }

    StringJoiner sj = new StringJoiner(" ");
    for (Integer val : path) sj.add(val + "");

    return sj.toString();
  }
}`,python:`import sys

# 输入获取
arr = list(map(int, input().split()))


# 算法入口
def getResult(arr):
    # 最小叶子节点的值
    minV = sys.maxsize
    # 最小节点在数组中的索引位置
    minIdx = -1
    n = len(arr) - 1

    for i in range(n, 0, -1):
        if arr[i] != -1:
            if i * 2 + 1 <= n and arr[i * 2 + 1] != -1:
                continue
            if i * 2 + 2 <= n and arr[i * 2 + 2] != -1:
                continue

            if minV > arr[i]:
                minV = arr[i]
                minIdx = i

    # path用于缓存最小叶子节点到根的路径
    path = []
    path.insert(0, str(minV))

    # 从最小值节点开始向上找父节点，直到树顶
    while minIdx != 0:
        f = (minIdx - 1) // 2
        path.insert(0, str(arr[f]))
        minIdx = f

    return " ".join(path)


# 算法调用
print(getResult(arr))`,javascript:`/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const arr = line.split(" ").map(Number);
  let n = arr.length - 1;
  // 最小叶子节点的值
  let min = Infinity;
  // 最小节点在数组中的索引位置
  let minIdx = -1;
  for (let i = n; i >= 0; i--) {
    if (arr[i] != -1) {
      if (i * 2 + 1 <= n && arr[i * 2 + 1] != -1) continue;
      if (i * 2 + 2 <= n && arr[i * 2 + 2] != -1) continue;

      if (min > arr[i]) {
        min = arr[i];
        minIdx = i;
      }
    }
  }

  // path用于缓存最小叶子节点到根的路径
  const path = [];
  path.unshift(min);

  // 从最小值节点开始向上找父节点，直到树顶
  while (minIdx !== 0) {
    let f = Math.floor((minIdx - 1) / 2);
    path.unshift(arr[f]);
    minIdx = f;
  }

  console.log(path.join(" "));
});`,cpp:`#include <iostream>
#include <sstream>
#include <vector>
#include <climits>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    stringstream ss(line);
    
    vector<int> arr;
    int num;
    while (ss >> num) {
        arr.push_back(num);
    }
    
    int n = arr.size() - 1;
    int minVal = INT_MAX;
    int minIdx = -1;
    
    for (int i = n; i >= 0; i--) {
        if (arr[i] != -1) {
            if (i * 2 + 1 <= n && arr[i * 2 + 1] != -1) continue;
            if (i * 2 + 2 <= n && arr[i * 2 + 2] != -1) continue;
            if (minVal > arr[i]) {
                minVal = arr[i];
                minIdx = i;
            }
        }
    }
    
    vector<int> path;
    path.insert(path.begin(), minVal);
    
    while (minIdx != 0) {
        int f = (minIdx - 1) / 2;
        path.insert(path.begin(), arr[f]);
        minIdx = f;
    }
    
    for (int i = 0; i < path.size(); i++) {
        cout << path[i];
        if (i < path.size() - 1) cout << " ";
    }
    cout << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <limits.h>

int main() {
    char line[10000];
    fgets(line, sizeof(line), stdin);
    
    int arr[1000];
    int n = 0;
    char* token = strtok(line, " \\n");
    while (token) {
        arr[n++] = atoi(token);
        token = strtok(NULL, " \\n");
    }
    n--;
    
    int minVal = INT_MAX;
    int minIdx = -1;
    
    for (int i = n; i >= 0; i--) {
        if (arr[i] != -1) {
            if (i * 2 + 1 <= n && arr[i * 2 + 1] != -1) continue;
            if (i * 2 + 2 <= n && arr[i * 2 + 2] != -1) continue;
            if (minVal > arr[i]) {
                minVal = arr[i];
                minIdx = i;
            }
        }
    }
    
    int path[100];
    int pathLen = 0;
    path[pathLen++] = minVal;
    
    while (minIdx != 0) {
        int f = (minIdx - 1) / 2;
        for (int i = pathLen; i > 0; i--) path[i] = path[i-1];
        path[0] = arr[f];
        pathLen++;
        minIdx = f;
    }
    
    for (int i = 0; i < pathLen; i++) {
        printf("%d", path[i]);
        if (i < pathLen - 1) printf(" ");
    }
    printf("\\n");
    return 0;
}`},m={id:"72",title:n,examType:"A",score:100,description:i,inputDesc:t,outputDesc:r,examples:e,solution:a,codes:s};export{s as codes,m as default,i as description,p as examType,e as examples,o as id,t as inputDesc,r as outputDesc,l as score,a as solution,n as title};
