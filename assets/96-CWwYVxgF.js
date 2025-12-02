const o="96",e="报文响应时间",t="A",x=100,n=`IGMP 协议中，有一个字段称作最大响应时间 (Max Response Time) ，HOST收到查询报文，解折出 MaxResponsetime 字段后，需要在 (0，MaxResponseTime] 时间 (s) 内选取随机时间回应一个响应报文，如果在随机时间内收到一个新的查询报文，则会根据两者时间的大小，选取小的一方刷新回应时间。
最大响应时间有如下计算方式：
当 Max Resp Code < 128, Max Resp Time = Max Resp Code；当 Max Resp Code ≥ 128, Max Resp Time = (mant | 0x10) << (exp + 3)；

注: exp最大响应时间的高5~7位: mant 为最大响应时间的低4位。
其中接收到的MaxRespCode 最大值为 255，以上出现所有字段均为无符号数。
现在我们认为 HOST收到查询报文时，选取的随机时间必定为最大值，现给出 HOST 收到查询报文个数 C，HOST 收到该报文的时间T，以及查询报文的最大响应时间字段值 M，请计算出HOST 发送响应报文的时间。`,i="第一行为查询报文个数 C，后续每行分别为 HOST 收到报文时间 T，及最大响应时间M，以空格分割。",s=`HOST 发送响应报文的时间。
用例确定只会发送一个响应报文， 不存在计时结束后依然收到查询报文的情况。`,m=[{input:`3
0 20
1 10
8 20`,output:"11",explanation:"3个报文：0+20=20秒，1+10=11秒，8+20=28秒。最小响应时间为11秒。"},{input:`2
0 255
200 60`,output:"260",explanation:"255>=128，计算得31744秒。200+60=260秒。最小为260秒。"}],a=`**解题思路：**

本题是一道**模拟+位运算**问题。

**核心思路：**
- 计算每个报文的响应时间 = 到达时间 + MaxRespTime
- 取所有响应时间的最小值

**MaxRespTime计算：**
- 若 code < 128：直接使用code
- 若 code >= 128：
  - exp = (code & 0x70) >> 4（高5-7位）
  - mant = code & 0x0F（低4位）
  - MaxRespTime = (mant | 0x10) << (exp + 3)

**时间复杂度**：O(N)`,p={java:`import java.util.Scanner;

public class Main{
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int numQueries = in.nextInt(); // 查询报文个数
        int[] arrivalTime = new int[numQueries]; // HOST收到报文时间
        int[] maxRespCode = new int[numQueries]; // 最大响应时间字段值

        for (int i = 0; i < numQueries; i++) {
            arrivalTime[i] = in.nextInt();
            maxRespCode[i] = in.nextInt();
        }

        int minResponseTime = Integer.MAX_VALUE; // HOST发送响应报文的时间
        for (int i = 0; i < numQueries; i++) {
            int maxRespTime = 0;
            if (maxRespCode[i] < 128) { // 当MaxRespCode < 128 ,MaxRespTime = MaxRespCode
                maxRespTime = maxRespCode[i];
            } else { // 当MaxRespCode >= 128 ,MaxRespTime = (mant | 0x10) << (exp + 3)
                int exp = (maxRespCode[i] & 0x70) >> 4; // exp 最大响应时间的 高5~7位
                int mant = maxRespCode[i] & 0x0F; // mant 为最大响应时间的 低4位
                maxRespTime = (mant | 0x10) << (exp + 3);
            }
            int responseTime = arrivalTime[i] + maxRespTime; // HOST发送响应报文的时间
            minResponseTime = Math.min(minResponseTime, responseTime); // 更新最小的 HOST发送响应报文的时间
        }
        System.out.println(minResponseTime);    
    }
}`,python:`import sys

numQueries = int(input()) # 查询报文个数
arrivalTime = [0] * numQueries # HOST收到报文时间
maxRespCode = [0] * numQueries # 最大响应时间字段值

for i in range(numQueries):
    arrivalTime[i], maxRespCode[i] = map(int, input().split())

minResponseTime = sys.maxsize # HOST发送响应报文的时间
for i in range(numQueries):
    maxRespTime = 0
    if maxRespCode[i] < 128: # 当MaxRespCode < 128 ,MaxRespTime = MaxRespCode
        maxRespTime = maxRespCode[i]
    else: # 当MaxRespCode >= 128 ,MaxRespTime = (mant | 0x10) << (exp + 3)
        exp = (maxRespCode[i] & 0x70) >> 4 # exp 最大响应时间的 高5~7位
        mant = maxRespCode[i] & 0x0F # mant 为最大响应时间的 低4位
        maxRespTime = (mant | 0x10) << (exp + 3)
    responseTime = arrivalTime[i] + maxRespTime # HOST发送响应报文的时间
    minResponseTime = min(minResponseTime, responseTime) # 更新最小的 HOST发送响应报文的时间

print(minResponseTime)`,javascript:`const readline = require('readline');  

 
const rl = readline.createInterface({
  input: process.stdin,  
  output: process.stdout  
});

let numQueries; // 存储查询的数量
let arrivalTime = []; // 存储每次查询的到达时间
let maxRespCode = []; // 存储每次查询的最大响应码

 
rl.on('line', (input) => {
  // 首次输入，用于获取查询的数量
  if (!numQueries) {
    numQueries = parseInt(input); // 解析输入为整数，并存储到 numQueries
  } else {
    // 分割输入的两个数值，并将其转换为数字类型
    const [a, b] = input.split(' ').map(Number);
    arrivalTime.push(a); // 将到达时间存入 arrivalTime 数组
    maxRespCode.push(b); // 将最大响应码存入 maxRespCode 数组

    // 当输入的查询数达到指定的数量时，开始处理计算
    if (arrivalTime.length === numQueries) {
      let minResponseTime = Number.MAX_SAFE_INTEGER; // 初始化最小响应时间为一个很大的值
      for (let i = 0; i < numQueries; i++) { // 遍历每个查询
        let maxRespTime = 0; // 用于存储当前查询的最大响应时间

        // 根据 maxRespCode 的值决定计算方式
        if (maxRespCode[i] < 128) {
          maxRespTime = maxRespCode[i]; // 如果 maxRespCode 小于 128，直接使用其值作为 maxRespTime
        } else {
          // 如果 maxRespCode 大于等于 128，进行复杂计算
          const exp = (maxRespCode[i] & 0x70) >> 4; // 提取 maxRespCode 的第 4 至 6 位作为 exp
          const mant = maxRespCode[i] & 0x0F; // 提取 maxRespCode 的第 1 至 3 位作为 mant
          maxRespTime = (mant | 0x10) << (exp + 3); // 计算 maxRespTime 的实际值
        }

        // 计算当前查询的响应时间
        const responseTime = arrivalTime[i] + maxRespTime;
        // 更新最小响应时间
        minResponseTime = Math.min(minResponseTime, responseTime);
      }
      console.log(minResponseTime); // 输出最小响应时间
      rl.close(); // 关闭 readline 接口
    }
  }
});`,cpp:`#include <iostream>
#include <climits>

using namespace std;

int main() {
    int numQueries;
    cin >> numQueries; // 查询报文个数
    int arrivalTime[numQueries]; // HOST收到报文时间
    int maxRespCode[numQueries]; // 最大响应时间字段值

    for (int i = 0; i < numQueries; i++) {
        cin >> arrivalTime[i];
        cin >> maxRespCode[i];
    }

    int minResponseTime = INT_MAX; // HOST发送响应报文的时间
    for (int i = 0; i < numQueries; i++) {
        int maxRespTime = 0;
        if (maxRespCode[i] < 128) { // 当MaxRespCode < 128 ,MaxRespTime = MaxRespCode
            maxRespTime = maxRespCode[i];
        } else { // 当MaxRespCode >= 128 ,MaxRespTime = (mant | 0x10) << (exp + 3)
            int exp = (maxRespCode[i] & 0x70) >> 4; // exp 最大响应时间的 高5~7位
            int mant = maxRespCode[i] & 0x0F; // mant 为最大响应时间的 低4位
            maxRespTime = (mant | 0x10) << (exp + 3);
        }
        int responseTime = arrivalTime[i] + maxRespTime; // HOST发送响应报文的时间
        minResponseTime = min(minResponseTime, responseTime); // 更新最小的 HOST发送响应报文的时间
    }
    cout << minResponseTime << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <limits.h> 

int main() {
    int numQueries;
    scanf("%d", &numQueries);  

    int arrivalTime[numQueries]; // 定义数组存储 HOST 收到报文的时间
    int maxRespCode[numQueries]; // 定义数组存储最大响应时间字段值

    // 读取每个查询的到达时间和最大响应码
    for (int i = 0; i < numQueries; i++) {
        scanf("%d", &arrivalTime[i]); // 读取到达时间
        scanf("%d", &maxRespCode[i]); // 读取最大响应码
    }

    int minResponseTime = INT_MAX; // 初始化最小响应时间为最大整数值

    // 遍历所有查询，计算最小的响应时间
    for (int i = 0; i < numQueries; i++) {
        int maxRespTime = 0; // 初始化最大响应时间为0

        // 判断 maxRespCode 的值以决定如何计算最大响应时间
        if (maxRespCode[i] < 128) {
            // 如果 maxRespCode 小于 128，直接将其作为 maxRespTime
            maxRespTime = maxRespCode[i];
        } else {
            // 如果 maxRespCode 大于等于 128，根据给定的公式计算 maxRespTime
            int exp = (maxRespCode[i] & 0x70) >> 4; // 提取 maxRespCode 的第 4 至 6 位作为 exp
            int mant = maxRespCode[i] & 0x0F; // 提取 maxRespCode 的第 1 至 3 位作为 mant
            maxRespTime = (mant | 0x10) << (exp + 3); // 计算 maxRespTime 的实际值
        }

        // 计算当前查询的响应时间
        int responseTime = arrivalTime[i] + maxRespTime;

        // 更新最小的响应时间
        if (responseTime < minResponseTime) {
            minResponseTime = responseTime;
        }
    }

    // 输出最小的响应时间
    printf("%d\\n", minResponseTime);

    return 0; // 程序正常结束
}`},r={id:"96",title:e,examType:"A",score:100,description:n,inputDesc:i,outputDesc:s,examples:m,solution:a,codes:p};export{p as codes,r as default,n as description,t as examType,m as examples,o as id,i as inputDesc,s as outputDesc,x as score,a as solution,e as title};
