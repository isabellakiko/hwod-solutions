const a="111",n="绘图机器",r="A",c=100,t=`绘图机器的绘图笔初始位置在原点(0,0)机器启动后按照以下规则来进行绘制直线。
1. 尝试沿着横线坐标正向绘制直线直到给定的终点E
2. 期间可以通过指令在纵坐标轴方向进行偏移，offsetY为正数表示正向偏移,为负数表示负向偏移
给定的横坐标终点值E 以及若干条绘制指令，
请计算绘制的直线和横坐标轴以及x=E的直线组成的图形面积。`,e=`首行为两个整数 N 和 E表示有N条指令,机器运行的横坐标终点值E接下来N行 每行两个整数表示一条绘制指令x offsetY用例保证横坐标x以递增排序的方式出现且不会出现相同横坐标x
取值范围
0<N<=100000<=x<=E<=20000-10000<=offsetY<=10000`,s="一个整数表示计算得到的面积 用例保证结果范围在0到4294967295之内。",i=[{input:`4 10
1 1
2 1
3 1
4 -2`,output:"12",explanation:"4条指令，终点10。y轴偏移累计后计算与x轴围成的面积"},{input:`2 4
0 1
2 -2`,output:"4",explanation:"2条指令，终点4。计算各段与x轴围成的面积绝对值之和"}],o=`**解题思路：**

本题是一道**前缀和+模拟**问题。

**核心思路：**
- 记录每个x坐标的y偏移量
- 计算累计y值（前缀和）
- 面积 = 各段|y|值之和

**算法步骤：**
1. 读取指令，记录每个x位置的offsetY
2. 计算前缀和得到每个位置的实际y值
3. 累加所有y值的绝对值作为面积

**时间复杂度**：O(E)`,f={java:`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int n = scanner.nextInt(); // 输入指令的数量
        int e = scanner.nextInt(); // 终点横坐标

        if (e == 0) { // 如果终点横坐标为0
            System.out.println(0); // 输出面积为0
            return;
        }

        int[] offsets = new int[e]; // 创建一个长度为终点横坐标的整数数组，用于存储纵坐标偏移量

        for (int i = 0; i < n; i++) {
            int cur_x = scanner.nextInt(); // 当前点的横坐标
            int offset_y = scanner.nextInt(); // 当前点纵坐标相较于上一个点纵坐标的偏移量
            offsets[cur_x] = offset_y; // 将偏移量存储在对应横坐标位置上
        }

        int[] dp = new int[e]; // 创建一个长度为终点横坐标的整数数组，用于存储每个横坐标位置的纵坐标偏移量之和
        dp[0] = offsets[0]; // 第一个位置的纵坐标偏移量为指令中的纵坐标偏移量
        for (int i = 1; i < e; i++) { // 从第二个位置开始遍历
            dp[i] = offsets[i] + dp[i - 1]; // 当前位置的纵坐标偏移量为指令中的纵坐标偏移量加上前一个位置的纵坐标偏移量之和
        }

        int ans = 0; // 初始化面积为0
        for (int num : dp) { // 遍历每个横坐标位置的纵坐标偏移量之和
            ans += Math.abs(num); // 将绝对值加到面积中
        }
        System.out.println(ans); // 输出面积

        scanner.close(); // 关闭输入流
    }
}`,python:`n , e = map(int, input().split())


if e == 0: # 如果终点横坐标为0
    print(0) # 输出面积为0
    exit()

offsets = [0] * e # 创建一个长度为终点横坐标的整数数组，用于存储纵坐标偏移量

for _ in range(n):
    cur_x , offset_y = map(int, input().split())
    offsets[cur_x] = offset_y # 将偏移量存储在对应横坐标位置上

dp = [0] * e # 创建一个长度为终点横坐标的整数数组，用于存储每个横坐标位置的纵坐标偏移量之和
dp[0] = offsets[0] # 第一个位置的纵坐标偏移量为指令中的纵坐标偏移量
for i in range(1, e): # 从第二个位置开始遍历
    dp[i] = offsets[i] + dp[i - 1] # 当前位置的纵坐标偏移量为指令中的纵坐标偏移量加上前一个位置的纵坐标偏移量之和

ans = 0 # 初始化面积为0
for num in dp: # 遍历每个横坐标位置的纵坐标偏移量之和
    ans += abs(num) # 将绝对值加到面积中
print(ans) # 输出面积`,javascript:`const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let lines = [];
let n = 0, e = 0;

rl.on('line', (line) => {
  lines.push(line);

  if (lines.length === 1) {
    [n, e] = line.split(' ').map(Number);
    if (e === 0) {
      console.log(0);
      lines = [];
    }
  }
  if (e !== 0 && n !== 0 && lines.length === n + 1) {
    lines.shift();

    // 求出每个横轴单位上的offsetY偏移值，如果输入未给定offsetY，则相当于offsetY=0
    const offsets = new Array(e).fill(0);
    for (const line of lines) {
      const [x, offsetY] = line.split(' ').map(Number);
      offsets[x] = offsetY;
    }

    const dp = new Array(e).fill(0);
    dp[0] = offsets[0];
    for (let i = 1; i < e; i++) {
      dp[i] = offsets[i] + dp[i - 1];
    }

    let ans = 0;
    for (const num of dp) {
      ans += Math.abs(num);
    }
    console.log(ans);

    lines = [];
  }
});`,cpp:`#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

int main() {
    int n, e;
    cin >> n >> e;
    
    if (e == 0) {
        cout << 0 << endl;
        return 0;
    }
    
    vector<int> offsets(e);
    
    for (int i = 0; i < n; i++) {
        int cur_x, offset_y;
        cin >> cur_x >> offset_y;
        offsets[cur_x] = offset_y;
    }
    
    vector<int> dp(e);
    dp[0] = offsets[0];
    for (int i = 1; i < e; i++) {
        dp[i] = offsets[i] + dp[i - 1];
    }
    
    int ans = 0;
    for (int num : dp) {
        ans += abs(num);
    }
    cout << ans << endl;
    
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>

// 定义绘图指令的结构体
typedef struct {
    int x;       // 横坐标
    int offsetY; // 纵坐标偏移
} Command;

int main() {
    int N, E;
    scanf("%d %d", &N, &E); // 读取指令数量和终点横坐标E

    Command commands[N + 1]; // 存储绘图指令，多一个位置用于终点

    for (int i = 0; i < N; i++) {
        scanf("%d %d", &commands[i].x, &commands[i].offsetY); // 读取每条指令
    }

    // 添加终点作为最后一条指令
    commands[N].x = E;
    commands[N].offsetY = 0;

    unsigned long area = 0; // 总面积
    int currentY = 0;       // 当前纵坐标偏移

    for (int i = 0; i < N; i++) {
        int base = commands[i + 1].x - commands[i].x;      // 底边长度
        int height = currentY + commands[i].offsetY;       // 高度
        area += base * abs(height);                        // 计算梯形面积

        currentY += commands[i].offsetY; // 更新当前纵坐标偏移
    }

    printf("%lu\\n", area); // 输出总面积
    return 0;
}`},p={id:"111",title:n,examType:"A",score:100,description:t,inputDesc:e,outputDesc:s,examples:i,solution:o,codes:f};export{f as codes,p as default,t as description,r as examType,i as examples,a as id,e as inputDesc,s as outputDesc,c as score,o as solution,n as title};
