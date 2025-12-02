const o="66",n="勾股数元组",l="A",c=100,i=`如果3个正整数(a,b,c)满足a^2 + b^2 = c^2的关系，则称(a,b,c)为勾股数（著名的勾三股四弦五），
为了探索勾股数的规律，我们定义如果勾股数(a,b,c)之间两两互质（即a与b，a与c，b与c之间均互质，没有公约数），则其为勾股数元组（例如(3,4,5)是勾股数元组，(6,8,10)则不是勾股数元组）。
请求出给定范围[N,M]内，所有的勾股数元组。
`,t=`起始范围N，1 <= N <= 10000
结束范围M，N < M <= 10000
`,e=`1. a,b,c请保证a < b < c，输出格式：a b c
2. 多组勾股数元组按a、b、c升序排序输出
3. 找不到时输出NA`,r=[{input:`1
20`,output:`3 4 5
5 12 13
8 15 17`,explanation:"[1,20]范围内勾股数元组(两两互质)有：(3,4,5)、(5,12,13)、(8,15,17)。"},{input:`5
10`,output:"NA",explanation:"[5,10]范围内勾股数有(6,8,10)，但6和8不互质(公因数2)，所以没有勾股数元组。"},{input:`1
5`,output:"3 4 5",explanation:"[1,5]范围内只有(3,4,5)是勾股数且两两互质。"}],s=`**解题思路：**

本题是一道**枚举+数论**问题。

**算法步骤：**
1. 枚举范围[N,M]内所有可能的(a,b,c)组合
2. 检查是否满足a²+b²=c²
3. 使用辗转相除法(GCD)判断两两是否互质
4. 按a,b,c升序排序输出

**互质判断：**
使用辗转相除法求最大公约数，若GCD=1则互质

**时间复杂度**：O((M-N)³)`,a={java:`import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n = sc.nextInt();
    int m = sc.nextInt();

    getResult(n, m);
  }

  public static void getResult(int n, int m) {
    ArrayList<Integer> arr = new ArrayList<>();

    for (int i = n; i <= m; i++) {
      arr.add(i * i);
    }

    HashSet<Integer> set = new HashSet<>(arr);
    ArrayList<Integer[]> res = new ArrayList<>();

    for (int i = 0; i < arr.size(); i++) {
      for (int j = i + 1; j < arr.size(); j++) {
        // 判断勾股数 a^2 + b^2 = c^2
        int sum = arr.get(i) + arr.get(j);
        if (set.contains(sum)) {
          res.add(
              new Integer[] {
                (int) Math.sqrt(arr.get(i)), (int) Math.sqrt(arr.get(j)), (int) Math.sqrt(sum)
              });
        }
      }
    }

    List<Integer[]> collect =
        res.stream()
            .filter(
                g ->
                    isRelativePrime(g[0], g[1])
                        && isRelativePrime(g[0], g[2])
                        && isRelativePrime(g[1], g[2]))
            .collect(Collectors.toList());

    if (collect.size() == 0) {
      System.out.println("NA");
    } else {
      for (Integer[] g : collect) {
        System.out.println(g[0] + " " + g[1] + " " + g[2]);
      }
    }
  }

  // 判断两个数是否互质，辗转相除
  public static boolean isRelativePrime(int x, int y) {
    while (y > 0) {
      int mod = x % y;
      x = y;
      y = mod;
    }

    return x == 1;
  }
}`,python:`import math

# 输入获取
n = int(input())
m = int(input())


# 判断两个数是否互质，辗转相除
def isRelativePrime(x, y):
    while y > 0:
        mod = x % y
        x = y
        y = mod

    return x == 1


# 算法入口
def getResult():
    arr = []

    for i in range(n, m + 1):
        arr.append(i * i)

    setArr = set(arr)

    res = []
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            # 判断勾股数 a^2 + b^2 = c^2
            sumV = arr[i] + arr[j]
            if sumV in setArr:
                res.append([int(math.sqrt(arr[i])), int(math.sqrt(arr[j])), int(math.sqrt(sumV))])

    ans = list(
        filter(lambda x: isRelativePrime(x[0], x[1]) and isRelativePrime(x[0], x[2]) and isRelativePrime(x[1], x[2]),
               res))

    if len(ans) == 0:
        print("NA")
    else:
        for g in ans:
            print(" ".join(map(str, g)))


# 算法调用
getResult()`,javascript:`/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on("line", (line) => {
  lines.push(line);

  if (lines.length === 2) {
    const [n, m] = lines.map(Number);

    getResult(n, m);

    lines.length = 0;
  }
});

function getResult(n, m) {
  const arr = [];

  for (let i = n; i <= m; i++) {
    arr.push(i * i);
  }

  const set = new Set(arr);

  const res = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      /* 判断勾股数 a^2 + b^2 = c^2 */
      const sum = arr[i] + arr[j];
      if (set.has(sum)) {
        res.push([Math.sqrt(arr[i]), Math.sqrt(arr[j]), Math.sqrt(sum)]);
      }
    }
  }

  const ans = res.filter((group) => {
    const [a, b, c] = group;
    return (
      isRelativePrime(a, b) && isRelativePrime(a, c) && isRelativePrime(b, c)
    );
  });

  if (!ans.length) return console.log("NA");

  ans.forEach((g) => console.log(g.join(" ")));
}

/* 判断两个数是否互质，辗转相除 */
function isRelativePrime(x, y) {
  while (y > 0) {
    let mod = x % y;
    x = y;
    y = mod;
  }

  return x === 1;
}`,cpp:`#include <iostream>
#include <vector>
#include <set>
#include <cmath>
using namespace std;

bool isRelativePrime(int x, int y) {
    while (y > 0) {
        int mod = x % y;
        x = y;
        y = mod;
    }
    return x == 1;
}

int main() {
    int n, m;
    cin >> n >> m;
    
    vector<int> arr;
    for (int i = n; i <= m; i++) {
        arr.push_back(i * i);
    }
    
    set<int> s(arr.begin(), arr.end());
    vector<vector<int>> res;
    
    for (int i = 0; i < arr.size(); i++) {
        for (int j = i + 1; j < arr.size(); j++) {
            int sum = arr[i] + arr[j];
            if (s.count(sum)) {
                res.push_back({(int)sqrt(arr[i]), (int)sqrt(arr[j]), (int)sqrt(sum)});
            }
        }
    }
    
    vector<vector<int>> ans;
    for (auto& g : res) {
        if (isRelativePrime(g[0], g[1]) && isRelativePrime(g[0], g[2]) && isRelativePrime(g[1], g[2])) {
            ans.push_back(g);
        }
    }
    
    if (ans.empty()) {
        cout << "NA" << endl;
    } else {
        for (auto& g : ans) {
            cout << g[0] << " " << g[1] << " " << g[2] << endl;
        }
    }
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <math.h>

int isRelativePrime(int x, int y) {
    while (y > 0) {
        int mod = x % y;
        x = y;
        y = mod;
    }
    return x == 1;
}

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    
    int len = m - n + 1;
    int* arr = (int*)malloc(len * sizeof(int));
    for (int i = 0; i < len; i++) {
        arr[i] = (n + i) * (n + i);
    }
    
    int res[1000][3];
    int resLen = 0;
    
    for (int i = 0; i < len; i++) {
        for (int j = i + 1; j < len; j++) {
            int sum = arr[i] + arr[j];
            // 检查sum是否在arr中
            for (int k = j + 1; k < len; k++) {
                if (arr[k] == sum) {
                    res[resLen][0] = (int)sqrt(arr[i]);
                    res[resLen][1] = (int)sqrt(arr[j]);
                    res[resLen][2] = (int)sqrt(sum);
                    resLen++;
                    break;
                }
            }
        }
    }
    
    int found = 0;
    for (int i = 0; i < resLen; i++) {
        if (isRelativePrime(res[i][0], res[i][1]) && 
            isRelativePrime(res[i][0], res[i][2]) && 
            isRelativePrime(res[i][1], res[i][2])) {
            printf("%d %d %d\\n", res[i][0], res[i][1], res[i][2]);
            found = 1;
        }
    }
    
    if (!found) {
        printf("NA\\n");
    }
    
    free(arr);
    return 0;
}`},m={id:"66",title:n,examType:"A",score:100,description:i,inputDesc:t,outputDesc:e,examples:r,solution:s,codes:a};export{a as codes,m as default,i as description,l as examType,r as examples,o as id,t as inputDesc,e as outputDesc,c as score,s as solution,n as title};
