const l="76",n="最大花费金额",u="A",o=100,t=`双十一众多商品进行打折销售，小明想购买自己心仪的一些物品，但由于受购买资金限制，所以他决定从众多心仪商品中购买三件，而且想尽可能的花完资金。
现在请你设计一个程序帮助小明计算尽可能花费的最大资金数额。
`,r=`输入第一行为一维整型数组M，数组长度小于100，数组元素记录单个商品的价格，单个商品价格小于1000。输入第二行为购买资金的额度R，R小于100000。输入格式是正确的，无需考虑格式错误的情况。
`,e="输出尽可能花费的最大资金数额，如果无法购买三件商品则输出-1。",i=[{input:`23,26,36,27
78`,output:"76",explanation:"选择23+26+27=76，最接近且不超过78。"},{input:`10,20,30,40,50
100`,output:"100",explanation:"选择10+40+50=100或20+30+50=100，刚好等于资金额度。"},{input:`100,200
500`,output:"-1",explanation:"商品不足3件，无法购买，返回-1。"}],a=`**解题思路：**

本题是一道**三数之和变形**问题（双指针）。

**算法步骤：**
1. 对价格数组排序
2. 固定第一个数i，用双指针l和r找另外两个数
3. 计算三数之和sum
4. 若sum==target，直接返回
5. 若sum<target，记录答案，l右移尝试更大的和
6. 若sum>target，r左移尝试更小的和

**时间复杂度**：O(N²)`,s={java:`import java.util.Arrays;
import java.util.Scanner;

public class Main {
  // 输入获取
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    Integer[] arrM =
        Arrays.stream(sc.nextLine().split(",")).map(Integer::parseInt).toArray(Integer[]::new);

    int r = Integer.parseInt(sc.nextLine());

    System.out.println(getResult(arrM, r));
  }

  // 算法入口
  public static int getResult(Integer[] arr, int target) {
    // 题目说小明要购买三件，如果商品不足三件直接返回-1
    if (arr.length < 3) return -1;

    // 数组升序
    Arrays.sort(arr);

    int ans = -1;

    for (int i = 0; i < arr.length; i++) {
      int l = i + 1;
      int r = arr.length - 1;

      while (l < r) {
        int sum = arr[i] + arr[l] + arr[r];
        if (sum == target) {
          return sum;
        } else if (sum < target) {
          ans = Math.max(ans, sum);
          l++;
        } else {
          r--;
        }
      }
    }

    return ans;
  }
}`,python:`# 输入获取
arr = list(map(int, input().split(",")))
target = int(input())


# 算法入口
def getResult():
    # 题目说小明要购买三件，如果商品不足三件直接返回-1
    if len(arr) < 3:
        return -1

    # 数组升序
    arr.sort()

    ans = -1

    for i in range(len(arr)):
        l = i + 1
        r = len(arr) - 1

        while l < r:
            total = arr[i] + arr[l] + arr[r]

            if total == target:
                return total
            elif total < target:
                ans = max(ans, total)
                l += 1
            else:
                r -= 1

    return ans


# 算法调用
print(getResult())`,javascript:`/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on("line", (line) => {
  lines.push(line);

  if (lines.length === 2) {
    const arrM = lines[0].split(",").map(Number);
    const r = lines[1] - 0;
    console.log(getResult(arrM, r));
    lines.length = 0;
  }
});

function getResult(arr, target) {
  // 题目说小明要购买三件，如果商品不足三件直接返回-1
  if (arr.length < 3) return -1;

  // 数组升序
  arr.sort((a, b) => a - b);

  let ans = -1;

  for (let i = 0; i < arr.length; i++) {
    let l = i + 1;
    let r = arr.length - 1;

    while (l < r) {
      const sum = arr[i] + arr[l] + arr[r];

      if (sum == target) {
        return sum;
      } else if (sum < target) {
        ans = Math.max(ans, sum);
        l++;
      } else {
        r--;
      }
    }
  }

  return ans;
}`,cpp:`#include <iostream>
#include <vector>
#include <algorithm>
#include <sstream>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    
    vector<int> arr;
    stringstream ss(line);
    string token;
    while (getline(ss, token, ',')) {
        arr.push_back(stoi(token));
    }
    
    int target;
    cin >> target;
    
    if (arr.size() < 3) {
        cout << -1 << endl;
        return 0;
    }
    
    sort(arr.begin(), arr.end());
    int ans = -1;
    
    for (int i = 0; i < arr.size(); i++) {
        int l = i + 1;
        int r = arr.size() - 1;
        
        while (l < r) {
            int sum = arr[i] + arr[l] + arr[r];
            if (sum == target) {
                cout << sum << endl;
                return 0;
            } else if (sum < target) {
                ans = max(ans, sum);
                l++;
            } else {
                r--;
            }
        }
    }
    
    cout << ans << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int cmp(const void* a, const void* b) {
    return *(int*)a - *(int*)b;
}

int main() {
    char line[1000];
    fgets(line, sizeof(line), stdin);
    
    int arr[100];
    int n = 0;
    char* token = strtok(line, ",\\n");
    while (token) {
        arr[n++] = atoi(token);
        token = strtok(NULL, ",\\n");
    }
    
    int target;
    scanf("%d", &target);
    
    if (n < 3) {
        printf("-1\\n");
        return 0;
    }
    
    qsort(arr, n, sizeof(int), cmp);
    int ans = -1;
    
    for (int i = 0; i < n; i++) {
        int l = i + 1;
        int r = n - 1;
        
        while (l < r) {
            int sum = arr[i] + arr[l] + arr[r];
            if (sum == target) {
                printf("%d\\n", sum);
                return 0;
            } else if (sum < target) {
                if (sum > ans) ans = sum;
                l++;
            } else {
                r--;
            }
        }
    }
    
    printf("%d\\n", ans);
    return 0;
}`},c={id:"76",title:n,examType:"A",score:100,description:t,inputDesc:r,outputDesc:e,examples:i,solution:a,codes:s};export{s as codes,c as default,t as description,u as examType,i as examples,l as id,r as inputDesc,e as outputDesc,o as score,a as solution,n as title};
