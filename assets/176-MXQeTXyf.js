const c="176",n="通过软盘拷贝文件",a="A",p=200,i=`有一名科学家想要从一台古董电脑中拷贝文件到自己的电脑中加以研究。
但此电脑除了有一个3.5寸软盘驱动器以外，没有任何手段可以将文件持贝出来，而且只有一张软盘可以使用。
因此这一张软盘是唯一可以用来拷贝文件的载体。
科学家想要尽可能多地将计算机中的信息拷贝到软盘中，做到软盘中文件内容总大小最大。
已知该软盘容量为1474560字节。文件占用的软盘空间都是按块分配的，每个块大小为512个字节。一个块只能被一个文件使用。拷贝到软盘中的文件必须是完整的，且不能采取任何压缩技术。`,t=`第1行为一个整数N，表示计算机中的文件数量。1 ≤ N ≤ 1000. 接下来的第2行到第N+1行(共N行)，每行为一个整数，表示每个文件的大小Si，单位为字节。
0 ≤ i < N,0 ≤ Si
为了充分利用软盘空间，将每个文件在软盘上占用的块记录到本子上。即真正占用软盘空间的只有文件内容本身。`,e="科学家最多能拷贝的文件总大小",o=[{input:`3
737280
737280
737280`,output:"1474560",explanation:"软盘容量1474560字节，每个文件737280字节占用1440块，选择2个文件刚好填满软盘"},{input:`5
400000
200000
300000
500000
100000`,output:"1400000",explanation:"选择500000+400000+300000+200000=1400000字节的文件组合"}],r=`**解题思路：**

本题是一道**01背包**问题。

**核心思路：**
- 软盘按块分配，每块512字节，总共2880块
- 文件占用块数需向上取整
- 求最大文件内容总大小

**算法步骤：**
1. 计算软盘可用块数(1474560/512=2880块)
2. 每个文件的重量为ceil(size/512)块，价值为实际字节数
3. 使用01背包DP，dp[j]表示j块空间能存储的最大字节数
4. 返回dp[2880]

**时间复杂度**：O(N*2880)

该题可以采用背包问题的思想进行求解。
首先，根据输入的文件数量和每个文件的大小，将文件大小存储在一个数组中。
然后，计算软盘可以存放的块数，即将软盘总容量除以每个块的大小。
接下来，创建一个动态规划数组dp，其中dp[i]表示容量为i的背包可以存储的最大文件大小。
对于每个文件，将文件大小转换成块数，并将文件大小作为价值存储在worth中。
然后，从背包容量为blockCount开始向前遍历，对于每个背包容量，计算选择当前文件和不选择当前文件两种情况下的最大值。
最后，输出dp[blockCount]，即可得到科学家最多能拷贝的文件总大小。`,l={java:`import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);

    int n = scanner.nextInt();

    int[] fileSizeArray = new int[n];
    for (int i = 0; i < n; i++) {
        fileSizeArray[i] = scanner.nextInt();
    }

    // 计算软盘可以存放的块数
    int blockCount = 1474560 / 512; 

    // 动态规划数组，dp[i] 表示容量为 i 的背包可以存储的最大文件大小
    int[] dp = new int[blockCount + 1];

    for (int fileSize : fileSizeArray) {
        // 把文件大小转换成块数
        int weight = (int) Math.ceil(fileSize / 512.0);  
        int worth = fileSize; 
        for (int j = blockCount; j >= weight; j--) {
            dp[j] = Math.max(dp[j], dp[j - weight] + worth);
        }
    }

    System.out.println(dp[blockCount]);
  }
}`,python:`import math

n = int(input())

fileSizeArray = []
for i in range(n):
    fileSizeArray.append(int(input()))

blockCount = 1474560 // 512

dp = [0] * (blockCount + 1)

for fileSize in fileSizeArray:
    weight = math.ceil(fileSize / 512)
    worth = fileSize
    for j in range(blockCount, weight - 1, -1):
        dp[j] = max(dp[j], dp[j - weight] + worth)

print(dp[blockCount])`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let n;
let fileSizeArray = [];

rl.on('line', (input) => {
  if (!n) {
    n = parseInt(input);
  } else {
    fileSizeArray.push(parseInt(input));
    if (fileSizeArray.length === n) {
      rl.close();
      const blockCount = 1474560 / 512;
      const dp = new Array(blockCount + 1).fill(0);
      fileSizeArray.forEach((fileSize) => {
        const weight = Math.ceil(fileSize / 512);
        const worth = fileSize;
        for (let j = blockCount; j >= weight; j--) {
          dp[j] = Math.max(dp[j], dp[j - weight] + worth);
        }
      });
      console.log(dp[blockCount]);
    }
  }
});`,cpp:`#include <iostream>
#include <cmath>
using namespace std;

int main() {
    int n;
    cin >> n;

    int fileSizeArray[n];
    for (int i = 0; i < n; i++) {
        cin >> fileSizeArray[i];
    }

    // 计算软盘可以存放的块数
    int blockCount = 1474560 / 512; 

    // 动态规划数组，dp[i] 表示容量为 i 的背包可以存储的最大文件大小
    int dp[blockCount + 1] = {0};

    for (int i = 0; i < n; i++) {
        // 把文件大小转换成块数
        int weight = ceil(fileSizeArray[i] / 512.0);  
        int worth = fileSizeArray[i]; 
        for (int j = blockCount; j >= weight; j--) {
            dp[j] = max(dp[j], dp[j - weight] + worth);
        }
    }

    cout << dp[blockCount] << endl;

    return 0;
}`,c:`#include <stdio.h>
#include <math.h>
#include <stdlib.h>

// 定义一个返回较大值的函数
int max(int a, int b) {
    return (a > b) ? a : b;
}

int main() {
    int n;
    
    // 输入文件数量
    scanf("%d", &n);

    // 动态分配存储文件大小的数组
    int *fileSizeArray = (int *)malloc(n * sizeof(int));
    // 输入每个文件的大小
    for (int i = 0; i < n; i++) {
        scanf("%d", &fileSizeArray[i]);
    }

    // 计算软盘可以存放的块数
    int blockCount = 1474560 / 512;

    // 动态规划数组，dp[i] 表示容量为 i 的背包可以存储的最大文件大小
    int *dp = (int *)malloc((blockCount + 1) * sizeof(int));
    // 初始化 dp 数组，将其所有元素置为0
    for (int i = 0; i <= blockCount; i++) {
        dp[i] = 0;
    }

    // 处理每个文件，计算在给定块数内能够存储的最大文件大小
    for (int i = 0; i < n; i++) {
        // 把文件大小转换成块数
        int weight = (int)ceil(fileSizeArray[i] / 512.0);  
        int worth = fileSizeArray[i];
        
        // 从后向前遍历，更新动态规划数组
        for (int j = blockCount; j >= weight; j--) {
            dp[j] = max(dp[j], dp[j - weight] + worth);
        }
    }

    // 输出最大可以存储的文件大小
    printf("%d\\n", dp[blockCount]);

    return 0;
}`},d={id:"176",title:n,examType:"A",score:200,description:i,inputDesc:t,outputDesc:e,examples:o,solution:r,codes:l};export{l as codes,d as default,i as description,a as examType,o as examples,c as id,t as inputDesc,e as outputDesc,p as score,r as solution,n as title};
