const l="47",n="简单的自动曝光平均像素值",_="A",m=100,i=`一个图像有n个像素点，存储在一个长度为n的数组img里，每个像素点的取值范围[0,255]的正整数。
请你给图像每个像素点值加上一个整数k（可以是负数），得到新图newImg，使得新图newImg的所有像素平均值最接近中位值128。
请输出这个整数k。`,e=`n个整数，中间用空格分开
• 1 <= n <= 100 • 如有多个整数k都满足，输出小的那个k； • 新图的像素值会自动截取到[0,255]范围。当新像素值<0，其值会更改为0；当新像素值>255，其值会更改为255；
例如newImg=”-1 -2 256″,会自动更改为”0 0 255″`,s="一个整数k",t=[{input:"130 129 130",output:"-2",explanation:`原均值=(130+129+130)/3=129.67
k=-1时：新值129,128,129，均值=128.67，差0.67
k=-2时：新值128,127,128，均值=127.67，差0.33
两者距离128相同(0.67和0.33)...实际-2更接近。输出较小的-2。`},{input:"0 0 0",output:"128",explanation:`三个像素值都为0。
k=128时：新值都是128，均值=128，完美匹配中位值。`},{input:"255 255 255",output:"-127",explanation:`三个像素值都为255。
k=-127时：新值都是128，均值=128。`}],a=`**解题思路：**

本题是一道**枚举+模拟**问题。

**目标：**
- 找整数k，使新图像平均值最接近128
- 新像素值需截取到[0,255]范围

**算法步骤：**

1. 枚举k从-127到128（或更大范围）
2. 对每个k，计算所有新像素值：
   - new_val = max(0, min(img[i]+k, 255))
3. 计算新图像平均值
4. 计算与128的差值绝对值
5. 记录使差值最小的k
6. 若多个k差值相同，输出较小的k

**时间复杂度**：O(256×n)`,f={java:`import java.util.Scanner; // 导入Scanner类

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in); // 创建Scanner对象
        String input_str = sc.nextLine(); // 读取一行输入
        Scanner ss = new Scanner(input_str); // 将输入转换为Scanner对象
        int val, len = 0;
        int[] img = new int[110];
        while (ss.hasNextInt()) { // 判断Scanner对象中是否还有整数
            val = ss.nextInt(); // 读取下一个整数
            img[len++] = val;
        }
        double min_diff = Integer.MAX_VALUE; // 定义双精度浮点型变量min_diff，并初始化为整型最大值
        int k_ans = 0; // 定义整型变量k_ans，并初始化为0

        for (int k = -127; k <= 128; k++) { // 循环k的值从-127到128
            double sum = 0; // 定义双精度浮点型变量sum，并初始化为0
            for (int i = 0; i < len; i++) { // 循环i的值从0到len-1
                int new_val = img[i] + k; // 定义整型变量new_val，值为img[i]+k
                new_val = Math.max(0, Math.min(new_val, 255)); // 将new_val的值限制在0到255之间
                sum += new_val; // 将new_val的值加入sum中
            }

            double diff = Math.abs(sum / len - 128); // 计算sum/len-128的绝对值

            if (diff < min_diff) { // 如果diff小于min_diff
                min_diff = diff; // 将min_diff的值更新为diff
                k_ans = k; // 将k_ans的值更新为k
            } else if (diff == min_diff && k_ans != 0) { // 如果diff等于min_diff且k_ans不等于0
                k_ans = Math.min(k_ans, k); // 将k_ans的值更新为k和k_ans中的最小值
            }
        }

        System.out.println(k_ans); // 输出k_ans的值，并换行
    }
}`,python:`import sys
input_str = sys.stdin.readline().strip()
img = list(map(int, input_str.split()))
len = len(img)
min_diff = sys.maxsize
k_ans = 0

for k in range(-127, 129):
    sum = 0
    for i in range(len):
        new_val = img[i] + k
        new_val = max(0, min(new_val, 255))
        sum += new_val
    diff = abs(sum / len - 128)
    if diff < min_diff:
        min_diff = diff
        k_ans = k
    elif diff == min_diff and k_ans != 0:
        k_ans = min(k_ans, k)

print(k_ans)`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input_str = '';

// 监听输入，将输入存入input_str中
rl.on('line', (line) => {
  input_str += line + ' ';
}).on('close', () => {
  const img = [];
  const input_arr = input_str.trim().split(' ');
  const len = input_arr.length;

  // 将输入的字符串转为数字并存入数组img中
  for (let i = 0; i < len; i++) {
    img.push(parseInt(input_arr[i]));
  }

  // 初始化最小差值和答案k
  let min_diff = Number.MAX_SAFE_INTEGER;
  let k_ans = 0;

  // 枚举k的取值范围
  for (let k = -127; k <= 128; k++) {
    let sum = 0;

    // 计算新图的所有像素点的值之和
    for (let i = 0; i < len; i++) {
      let new_val = img[i] + k;
      // 将新像素值截取到[0,255]范围
      new_val = Math.max(0, Math.min(new_val, 255));
      sum += new_val;
    }

    // 计算新图的所有像素点的平均值与中位值128的差值
    const diff = Math.abs(sum / len - 128);

    // 更新最小差值和答案k
    if (diff < min_diff) {
      min_diff = diff;
      k_ans = k;
    } else if (diff === min_diff && k_ans !== 0) {
      k_ans = Math.min(k_ans, k);
    }
  }

  // 输出答案k
  console.log(k_ans);
});`,cpp:`#include <iostream> // 标准输入输出流
#include <algorithm> 
#include <string> 
#include <sstream> 
#include <cmath> 
#include <climits> 

using namespace std;

int main() {
    string input_str; 
    getline(cin, input_str); 
    stringstream ss(input_str); 
    int val, len = 0; 
    int img[110]; 
    while (ss >> val) {
        img[len++] = val; 
    }
    double min_diff = INT_MAX; // 定义双精度浮点型变量min_diff，并初始化为整型最大值
    int k_ans = 0; // 定义整型变量k_ans，并初始化为0

    for (int k = -127; k <= 128; k++) { // 循环k的值从-127到128
        double sum = 0; // 定义双精度浮点型变量sum，并初始化为0
        for (int i = 0; i < len; i++) { // 循环i的值从0到len-1
            int new_val = img[i] + k; // 定义整型变量new_val，值为img[i]+k
            new_val = max(0, min(new_val, 255)); // 将new_val的值限制在0到255之间
            sum += new_val; // 将new_val的值加入sum中
        }

        double diff = abs(sum / len - 128); // 计算sum/len-128的绝对值

        if (diff < min_diff) { // 如果diff小于min_diff
            min_diff = diff; // 将min_diff的值更新为diff
            k_ans = k; // 将k_ans的值更新为k
        }
        else if (diff == min_diff && k_ans != 0) { // 如果diff等于min_diff且k_ans不等于0
            k_ans = min(k_ans, k); // 将k_ans的值更新为k和k_ans中的最小值
        }
    }

    cout << k_ans << endl; // 输出k_ans的值，并换行

    return 0; // 返回0，表示程序正常结束
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <limits.h>
#include <math.h>

int main() {
    char input_str[1000]; // 定义字符数组用于存储输入的字符串
    fgets(input_str, 1000, stdin); // 读取一行输入并存储在input_str中

    int val, len = 0; // 定义整型变量val和len，len用于记录数组长度
    int img[110]; // 定义整型数组img，用于存储输入的像素值

    // 用于解析输入字符串中的整数
    char *token = strtok(input_str, " ");
    while (token != NULL) { // 当token不为NULL时继续循环
        val = atoi(token); // 将token转换为整数
        img[len++] = val; // 将整数存入数组img中，并增加数组长度len
        token = strtok(NULL, " "); // 获取下一个token
    }

    double min_diff = INT_MAX; // 定义双精度浮点型变量min_diff，并初始化为整型最大值
    int k_ans = 0; // 定义整型变量k_ans，并初始化为0

    // 枚举k值从-127到128
    for (int k = -127; k <= 128; k++) {
        double sum = 0; // 定义双精度浮点型变量sum，并初始化为0

        // 遍历img数组中的每一个像素值
        for (int i = 0; i < len; i++) {
            int new_val = img[i] + k; // 定义整型变量new_val，值为img[i]+k

            // 将new_val的值限制在0到255之间
            if (new_val < 0) {
                new_val = 0; // 如果new_val小于0，则将new_val设为0
            } else if (new_val > 255) {
                new_val = 255; // 如果new_val大于255，则将new_val设为255
            }

            sum += new_val; // 将new_val的值加入sum中
        }

        // 计算新图像的平均值与中位值128的差的绝对值
        double diff = fabs(sum / len - 128);

        // 如果当前diff小于min_diff，更新min_diff和k_ans
        if (diff < min_diff) {
            min_diff = diff;
            k_ans = k;
        } 
        // 如果当前diff等于min_diff且k_ans不等于0，更新k_ans为k和k_ans中的较小值
        else if (diff == min_diff && k_ans != 0) {
            k_ans = (k_ans < k) ? k_ans : k;
        }
    }

    // 输出最终的k_ans值
    printf("%d\\n", k_ans);

    return 0;
}`},k={id:"47",title:n,examType:"A",score:100,description:i,inputDesc:e,outputDesc:s,examples:t,solution:a,codes:f};export{f as codes,k as default,i as description,_ as examType,t as examples,l as id,e as inputDesc,s as outputDesc,m as score,a as solution,n as title};
