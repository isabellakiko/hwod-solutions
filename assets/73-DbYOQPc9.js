const a="73",n="数组连续和",o="A",p=100,r=`给定一个含有N个正整数的数组, 求出有多少个连续区间（包括单个正整数）, 它们的和大于等于x。
`,i=`第一行两个整数N x（0 < N <= 100000, 0 <= x <= 10000000)
第二行有N个正整数（每个正整数小于等于100)。
`,e="输出一个整数，表示所求的区间个数。",t=[{input:`3 7
3 4 7`,output:"4",explanation:"区间[3,4,7]和14>=7，[4,7]和11>=7，[7]和7>=7，[3,4]和7>=7，共4个区间。"},{input:`5 5
1 2 3 4 5`,output:"6",explanation:"满足条件的区间：[1,2,3]、[2,3]、[1,2,3,4]、[2,3,4]、[3,4]等共6个。"},{input:`4 10
1 2 3 4`,output:"1",explanation:"只有整个数组[1,2,3,4]的和为10，满足>=10。"}],l=`**解题思路：**

本题是一道**前缀和+双指针**问题。

**算法步骤：**
1. 计算前缀和数组preSum，preSum[i]表示arr[0..i-1]的和
2. 由于数组元素都是正整数，前缀和数组单调递增
3. 使用双指针l和r，当preSum[r]-preSum[l]>=x时
4. 由于单调性，所有r之后的位置都满足条件，个数为n-r+1
5. 左指针右移，继续寻找下一个满足条件的区间

**时间复杂度**：O(N)`,s={java:`import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int n = sc.nextInt();
    int x = sc.nextInt();

    int[] arr = new int[n];
    for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
    System.out.println(getResult(n, x, arr));
  }

  public static long getResult(int n, int x, int[] arr) {
    int[] preSum = new int[n + 1];

    for (int i = 1; i <= n; i++) {
      preSum[i] = preSum[i - 1] + arr[i - 1];
    }

    int l = 0;
    int r = 1;
    long ans = 0;

    while (r <= n) {
      if (preSum[r] - preSum[l] >= x) {
        ans += n - r + 1;
        l++;
        r = l + 1;
      } else {
        r++;
      }
    }

    return ans;
  }
}`,python:`import sys

# 输入获取
n, x = map(int, input().split())
arr = list(map(int, sys.stdin.readline().split()))
 
 
# 算法入口
def getResult():
    preSum = [0]*(n+1)
 
    for i in range(1, n+1):
        preSum[i] = preSum[i-1] + arr[i-1]
 
    l = 0
    r = 1
    ans = 0
 
    while r <= n:
        if preSum[r] - preSum[l] >= x:
            ans += n - r + 1
            l += 1
            r = l + 1
        else:
            r += 1
 
    return ans
 
 
# 算法调用
print(getResult())`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const lines = [];
rl.on('line', (line) => {
    lines.push(line);
    if (lines.length === 2) {
        const [n, x] = lines[0].split(' ').map(Number);
        const arr = lines[1].split(' ').map(Number);
        
        const preSum = new Array(n + 1).fill(0);
        for (let i = 1; i <= n; i++) {
            preSum[i] = preSum[i - 1] + arr[i - 1];
        }
        
        let l = 0, r = 1, ans = 0;
        while (r <= n) {
            if (preSum[r] - preSum[l] >= x) {
                ans += n - r + 1;
                l++;
                r = l + 1;
            } else {
                r++;
            }
        }
        
        console.log(ans);
        rl.close();
    }
});`,cpp:`#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, x;
    cin >> n >> x;
    
    vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    vector<long long> preSum(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        preSum[i] = preSum[i - 1] + arr[i - 1];
    }
    
    int l = 0, r = 1;
    long long ans = 0;
    
    while (r <= n) {
        if (preSum[r] - preSum[l] >= x) {
            ans += n - r + 1;
            l++;
            r = l + 1;
        } else {
            r++;
        }
    }
    
    cout << ans << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>

int main() {
    int n, x;
    scanf("%d %d", &n, &x);
    
    int* arr = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    
    long long* preSum = (long long*)calloc(n + 1, sizeof(long long));
    for (int i = 1; i <= n; i++) {
        preSum[i] = preSum[i - 1] + arr[i - 1];
    }
    
    int l = 0, r = 1;
    long long ans = 0;
    
    while (r <= n) {
        if (preSum[r] - preSum[l] >= x) {
            ans += n - r + 1;
            l++;
            r = l + 1;
        } else {
            r++;
        }
    }
    
    printf("%lld\\n", ans);
    
    free(arr);
    free(preSum);
    return 0;
}`},u={id:"73",title:n,examType:"A",score:100,description:r,inputDesc:i,outputDesc:e,examples:t,solution:l,codes:s};export{s as codes,u as default,r as description,o as examType,t as examples,a as id,i as inputDesc,e as outputDesc,p as score,l as solution,n as title};
