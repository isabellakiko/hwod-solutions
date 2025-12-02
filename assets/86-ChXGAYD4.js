const o="86",n="箱子之字形摆放",c="A",l=100,r=`有一批箱子（形式为字符串，设为str）， 要求将这批箱子按从上到下以之字形的顺序摆放在宽度为 n 的空地，请输出箱子的摆放位置。 例如：箱子ABCDEFG，空地宽度为3，摆放结果如图：

则输出结果为：AFGBECD
`,t=`输入一行字符串，通过空格分隔，前面部分为字母或数字组成的字符串str，表示箱子； 后面部分为数字n，表示空地的宽度。例如：ABCDEFG 3
`,e="箱子摆放结果，每行输出一行的箱子。",i=[{input:"ABCDEFG 3",output:`AFG
BE
CD`,explanation:"之字形摆放：A→B→C（向下），D→E→F（向上），G（向下）。按行输出AFG、BE、CD。"},{input:"12345 2",output:`135
24`,explanation:"宽度为2，奇数位置在第1行，偶数位置在第2行（之字形）。"},{input:"ABC 1",output:"ABC",explanation:"宽度为1，所有箱子都在一行。"}],s=`**解题思路：**

本题是一道**模拟**问题（之字形遍历）。

**算法步骤：**
1. 创建n行的二维矩阵
2. 用reverse标记当前方向（向下/向上）
3. 每当i%n==0时，切换方向
4. 向下时：行号=i%n；向上时：行号=n-1-i%n
5. 按行输出结果

**时间复杂度**：O(N)`,a={java:`import java.util.ArrayList;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    String str = sc.next();
    int n = sc.nextInt();

    getResult(str, n);
  }

  public static void getResult(String str, int n) {
    ArrayList<ArrayList<Character>> matrix = new ArrayList<>();
    for (int i = 0; i < n; i++) matrix.add(new ArrayList<>());

    boolean reverse = true;
    for (int i = 0; i < str.length(); i++) {
      int k = i % n;
      if (k == 0) reverse = !reverse;
      if (reverse) k = n - 1 - k;
      matrix.get(k).add(str.charAt(i));
    }

    for (ArrayList<Character> list : matrix) {
      StringBuilder sb = new StringBuilder();
      for (Character character : list) {
        sb.append(character);
      }
      System.out.println(sb);
    }
  }
}`,python:`# 输入获取
line = input().split()
str_val = line[0]
n = int(line[1])

# 算法入口
def getResult(s, n):
    matrix = [[] for _ in range(n)]
    
    reverse = True
    for i in range(len(s)):
        k = i % n
        if k == 0:
            reverse = not reverse
        if reverse:
            k = n - 1 - k
        matrix[k].append(s[i])
    
    for row in matrix:
        print(''.join(row))

# 算法调用
getResult(str_val, n)`,javascript:`/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const [str, n] = line.split(" ");
  getResult(str, n - 0);
});

function getResult(str, n) {
  const len = str.length;

  const matrix = new Array(n).fill(0).map(() => new Array());

  let reverse = true;
  for (let i = 0; i < len; i++) {
    k = i % n;
    if (k === 0) reverse = !reverse;
    if (reverse) k = n - 1 - k;
    matrix[k].push(str[i]);
  }

  matrix.forEach((arr) => console.log(arr.join("")));
}`,cpp:`#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    string str;
    int n;
    cin >> str >> n;
    
    vector<string> matrix(n);
    bool reverse = true;
    
    for (int i = 0; i < str.length(); i++) {
        int k = i % n;
        if (k == 0) reverse = !reverse;
        if (reverse) k = n - 1 - k;
        matrix[k] += str[i];
    }
    
    for (const string& row : matrix) {
        cout << row << endl;
    }
    
    return 0;
}`,c:`#include <stdio.h>
#include <string.h>

int main() {
    char str[10001];
    int n;
    scanf("%s %d", str, &n);
    
    char matrix[1000][10001];
    int lens[1000] = {0};
    
    int reverse = 1;
    int len = strlen(str);
    
    for (int i = 0; i < len; i++) {
        int k = i % n;
        if (k == 0) reverse = !reverse;
        if (reverse) k = n - 1 - k;
        matrix[k][lens[k]++] = str[i];
    }
    
    for (int i = 0; i < n; i++) {
        matrix[i][lens[i]] = '\\0';
        printf("%s\\n", matrix[i]);
    }
    
    return 0;
}`},u={id:"86",title:n,examType:"A",score:100,description:r,inputDesc:t,outputDesc:e,examples:i,solution:s,codes:a};export{a as codes,u as default,r as description,c as examType,i as examples,o as id,t as inputDesc,e as outputDesc,l as score,s as solution,n as title};
