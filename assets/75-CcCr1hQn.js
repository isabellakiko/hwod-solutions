const s="75",n="最大矩阵和",u="A",p=100,i=`给定一个二维整数矩阵，要在这个矩阵中选出一个子矩阵，使得这个子矩阵内所有的数字和尽量大，我们把这个子矩阵称为和最大子矩阵，子矩阵的选取原则是原矩阵中一块相互连续的矩形区域。
`,t=`输入的第一行包含2个整数n, m(1 <= n, m <= 10)，表示一个n行m列的矩阵，下面有n行，每行有m个整数，同一行中，每2个数字之间有1个空格，最后一个数字后面没有空格，所有的数字的在[-1000, 1000]之间。
`,r="输出一行一个数字，表示选出的和最大子矩阵内所有的数字和。",e=[{input:`3 4
-3 5 -1 5
2 4 -2 4
-1 3 -1 3`,output:"20",explanation:"选取右边3列2行的子矩阵：5+5+4+4+3+3-1-2-1=20。"},{input:`2 2
1 2
3 4`,output:"10",explanation:"整个矩阵和为1+2+3+4=10。"},{input:`2 3
-1 2 3
4 -5 6`,output:"9",explanation:"选取第三列：3+6=9，或选取2+3+4-5+6=10更大，最大子矩阵和为10。"}],a=`**解题思路：**

本题是一道**动态规划**问题，将二维最大子矩阵和转化为一维最大子数组和。

**算法步骤：**
1. 枚举子矩阵的起始行i和结束行j
2. 将第i行到第j行按列压缩成一维数组
3. 对压缩后的一维数组求最大子数组和
4. 最大子数组和使用DP：dp[i] = max(dp[i-1], 0) + nums[i]
5. 取所有情况的最大值

**时间复杂度**：O(N² × M)`,m={java:`import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int n = sc.nextInt();
    int m = sc.nextInt();

    int[][] matrix = new int[n][m];
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < m; j++) {
        matrix[i][j] = sc.nextInt();
      }
    }

    System.out.println(getResult(n, m, matrix));
  }

  public static int getResult(int n, int m, int[][] matrix) {
    ArrayList<Integer> dp = new ArrayList<>();

    for (int i = 0; i < n; i++) {
      dp.add(maxSubArraySum(matrix[i])); // 一行子矩阵最大和

      for (int j = i + 1; j < n; j++) {
        dp.add(maxSubArraySum(matrixZip(Arrays.copyOfRange(matrix, i, j + 1)))); // 多行子矩阵最大和
      }
    }

    return dp.stream().max((a, b) -> a - b).orElse(0); // 求出最大和
  }

  // 最大子数组和求解
  public static int maxSubArraySum(int[] nums) {
    int[] dp = new int[nums.length];

    int res = dp[0] = nums[0];

    for (int i = 1; i < nums.length; i++) {
      dp[i] = Math.max(dp[i - 1], 0) + nums[i];
      res = Math.max(res, dp[i]);
    }

    return res;
  }

  // 多行子矩阵，压缩为一行子数组
  public static int[] matrixZip(int[][] matrix) {
    int cols = matrix[0].length;
    int rows = matrix.length;
    int[] zip = new int[cols];

    for (int c = 0; c < cols; c++) {
      for (int r = 0; r < rows; r++) {
        zip[c] += matrix[r][c];
      }
    }

    return zip;
  }
}`,python:`# 输入获取
n, m = map(int, input().split())
matrix = [list(map(int, input().split())) for i in range(n)]


# 最大子数组和求解
def maxSubArraySum(nums):
    dp = [0 for i in range(len(nums))]
    res = dp[0] = nums[0]

    for i in range(1, len(nums)):
        dp[i] = max(dp[i - 1], 0) + nums[i]
        res = max(res, dp[i])

    return res


# 将多行子矩阵，压缩为一维数组
def matrixZip(matrix):
    cols = len(matrix[0])
    rows = len(matrix)
    zip = [0 for i in range(cols)]

    for c in range(cols):
        for r in range(rows):
            zip[c] += matrix[r][c]

    return zip


# 算法入口
def getResult(n, m, matrix):
    dp = []

    for i in range(n):
        dp.append(maxSubArraySum(matrix[i]))
        for j in range(i + 1, n):
            dp.append(maxSubArraySum(matrixZip(matrix[i:j + 1])))

    dp.sort()

    return dp[-1]


# 算法调用
print(getResult(n, m, matrix))`,javascript:`/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lines = [];
let n, m;
rl.on("line", (line) => {
  lines.push(line);

  // 输入第一行时，提取出m、n
  if (lines.length === 1) {
    [n, m] = lines[0].split(" ").map((ele) => parseInt(ele));
  }

  // 输入第一行后，再输入n行时，则开始启动算法程序
  if (lines.length - 1 === n) {
    // 干掉第一行输入，即lines中存储的全是就是matrix要素
    lines.shift();

    // matrix是算法程序的入参二维数组
    let matrix = [];
    // 将多行输入的matrix要素提取出来存到二维数组中
    lines.forEach((line) => {
      matrix.push(
        line
          .split(" ")
          .map((ele) => parseInt(ele))
          .slice(0, m)
      );
    });

    // 调用算法程序
    console.log(maxSubMatrixSum(matrix));

    // 将输入归0，重新接收下一轮
    lines.length = 0;
  }
});

function maxSubMatrixSum(matrix) {
  let dp = [];
  for (let i = 0; i < matrix.length; i++) {
    dp.push(maxSubArraySum(matrix[i]));

    for (let j = i + 1; j < matrix.length; j++) {
      dp.push(maxSubArraySum(matrixZip(matrix.slice(i, j + 1))));
    }
  }

  return dp.sort((a, b) => b - a)[0];
}

function maxSubArraySum(nums) {
  let dp = new Array(nums.length);

  let result = (dp[0] = nums[0]);

  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], 0) + nums[i];
    result = Math.max(result, dp[i]);
  }

  return result;
}

function matrixZip(matrix) {
  let cols = matrix[0].length;
  let rows = matrix.length;
  let zip = new Array(cols).fill(0);

  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      zip[c] += matrix[r][c];
    }
  }

  return zip;
}`,cpp:`#include <iostream>
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

int maxSubArraySum(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n);
    int res = dp[0] = nums[0];
    
    for (int i = 1; i < n; i++) {
        dp[i] = max(dp[i-1], 0) + nums[i];
        res = max(res, dp[i]);
    }
    return res;
}

int main() {
    int n, m;
    cin >> n >> m;
    
    vector<vector<int>> matrix(n, vector<int>(m));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> matrix[i][j];
        }
    }
    
    int ans = INT_MIN;
    
    for (int i = 0; i < n; i++) {
        vector<int> zip(m, 0);
        for (int j = i; j < n; j++) {
            for (int k = 0; k < m; k++) {
                zip[k] += matrix[j][k];
            }
            ans = max(ans, maxSubArraySum(zip));
        }
    }
    
    cout << ans << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <limits.h>

int maxSubArraySum(int* nums, int len) {
    int dp[100];
    int res = dp[0] = nums[0];
    
    for (int i = 1; i < len; i++) {
        dp[i] = (dp[i-1] > 0 ? dp[i-1] : 0) + nums[i];
        if (dp[i] > res) res = dp[i];
    }
    return res;
}

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    
    int matrix[10][10];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            scanf("%d", &matrix[i][j]);
        }
    }
    
    int ans = INT_MIN;
    
    for (int i = 0; i < n; i++) {
        int zip[10] = {0};
        for (int j = i; j < n; j++) {
            for (int k = 0; k < m; k++) {
                zip[k] += matrix[j][k];
            }
            int cur = maxSubArraySum(zip, m);
            if (cur > ans) ans = cur;
        }
    }
    
    printf("%d\\n", ans);
    return 0;
}`},l={id:"75",title:n,examType:"A",score:100,description:i,inputDesc:t,outputDesc:r,examples:e,solution:a,codes:m};export{m as codes,l as default,i as description,u as examType,e as examples,s as id,t as inputDesc,r as outputDesc,p as score,a as solution,n as title};
