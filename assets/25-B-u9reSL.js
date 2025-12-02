const l="25",u="找终点",o="A",p=100,n=`给定一个正整数数组，设为nums，最大为100个成员，求从第一个成员开始，正好走到数组最后一个成员，所使用的最少步骤数。
要求：
第一步必须从第一元素开始，且1<=第一步的步长<len/2;（len为数组的长度，需要自行解析）。从第二步开始，只能以所在成员的数字走相应的步数，不能多也不能少, 如果目标不可达返回**-1**，只输出最少的步骤数量。只能向数组的尾部走，不能往回走。`,e="由正整数组成的数组，以空格分隔，数组长度小于100，请自行解析数据数量。",t="正整数，表示最少的步数，如果不存在输出**-1**",i=[{input:"7 5 9 4 2 6 8 3 5 4 3 9",output:"2",explanation:`数组长度12，第一步步长范围 [1, 5]。
选择步长2：从索引0跳到索引2（值为9）。
第二步：从索引2走9步到索引11（最后一个元素）。
共2步到达终点。`},{input:"1 2 3 7 1 5 9 3 2 1",output:"-1",explanation:`数组长度10，第一步步长范围 [1, 4]。
尝试所有可能的第一步步长，都无法恰好到达最后一个元素，返回-1。`}],s=`**解题思路：**

本题是一道**模拟 + 枚举**问题。

**算法步骤：**

1. **枚举第一步**：步长范围为 [1, len/2)（整除）
2. **模拟后续步骤**：从第一步到达的位置开始，每次按当前位置的值前进
3. **判断终点**：如果恰好到达最后一个元素（index == len-1），记录步数
4. **返回最小值**：所有成功路径中的最小步数，无成功路径返回-1

**注意**：步长条件是 \`1 <= 步长 < len/2\`（整除），不是四舍五入

**时间复杂度**：O(n²)`,r={java:`import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine(); // 读取用户输入的整数字符串，以空格分隔
        String[] numberStrings = input.split(" "); // 将输入的字符串分割成字符串数组
        int[] numbers = new int[numberStrings.length]; // 创建一个与字符串数组长度相同的整型数组
        for (int i = 0; i < numberStrings.length; i++) {
            numbers[i] = Integer.parseInt(numberStrings[i]); // 将字符串数组的每个元素转换为整数，并存入整型数组
        }
        int length = numbers.length; // 获取数组的长度
        List<Integer> result = new ArrayList<>(); // 用于存储所有可能的步数结果
        for (int i = 1; i < length / 2; i++) { // 遍历所有从第一个元素开始的有效步长
            int step = 1; // 初始化步数为1，因为第一步已经走出
            int index = i; // 将索引设为当前步长
            while (index < length - 1) { // 只要没有走到数组的最后一个元素
                index += numbers[index]; // 按照当前索引位置的数字值前进
                step++; // 每走一步，步数加1
            }
            if (index == length - 1) { // 如果恰好到达数组的最后一个元素
                result.add(step); // 将步数结果存入结果列表
            }
        }
        if (result.size() > 0) {
            Integer[] resultArray = result.toArray(new Integer[0]); // 将结果列表转换为数组
            Arrays.sort(resultArray); // 对步数结果进行排序
            System.out.println(resultArray[0]); // 输出最小的步数
        } else {
            System.out.println(-1); // 如果没有结果，输出-1
        }
    }
}`,python:`numbers = list(map(int, input().split())) # 将输入的字符串分割并映射为整数列表
length = len(numbers) # 获取数组的长度
result = [] # 用于存储所有可能的步数结果
for i in range(1, length // 2): # 遍历所有从第一个元素开始的有效步长
    step = 1 # 初始化步数为1，因为第一步已经走出
    index = i # 将索引设为当前步长
    while index < length - 1: # 只要没有走到数组的最后一个元素
        index += numbers[index] # 按照当前索引位置的数字值前进
        step += 1 # 每走一步，步数加1
    if index == length - 1: # 如果恰好到达数组的最后一个元素
        result.append(step) # 将步数结果存入结果列表
if len(result) > 0:
    result.sort() # 对步数结果进行排序
    print(result[0]) # 输出最小的步数
else:
    print(-1) # 如果没有结果，输出-1`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (numbersInput) => {
  const numbers = numbersInput.split(' ').map(Number); // 将输入的字符串分割并映射为整数数组
  const length = numbers.length; // 获取数组的长度
  const result = []; // 用于存储所有可能的步数结果

  for (let i = 1; i < Math.floor(length / 2); i++) { // 遍历所有从第一个元素开始的有效步长
    let step = 1; // 初始化步数为1，因为第一步已经走出
    let index = i; // 将索引设为当前步长

    while (index < length - 1) { // 只要没有走到数组的最后一个元素
      index += numbers[index]; // 按照当前索引位置的数字值前进
      step++; // 每走一步，步数加1
    }

    if (index === length - 1) { // 如果恰好到达数组的最后一个元素
      result.push(step); // 将步数结果存入结果列表
    }
  }

  if (result.length > 0) {
    result.sort(); // 对步数结果进行排序
    console.log(result[0]); // 输出最小的步数
  } else {
    console.log(-1); // 如果没有结果，输出-1
  }

  rl.close();
});`,cpp:`#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers; // 用于存储输入的整数
    int num;
    while(std::cin >> num) {
        numbers.push_back(num); // 将输入的整数存入向量
    }
    int length = numbers.size(); // 获取数组的长度
    std::vector<int> result; // 用于存储所有可能的步数结果
    for(int i = 1; i < length / 2; i++) { // 遍历所有从第一个元素开始的有效步长
        int step = 1; // 初始化步数为1，因为第一步已经走出
        int index = i; // 将索引设为当前步长
        while(index < length - 1) { // 只要没有走到数组的最后一个元素
            index += numbers[index]; // 按照当前索引位置的数字值前进
            step += 1; // 每走一步，步数加1
        }
        if(index == length - 1) { // 如果恰好到达数组的最后一个元素
            result.push_back(step); // 将步数结果存入结果列表
        }
    }
    if(result.size() > 0) {
        std::sort(result.begin(), result.end()); // 对步数结果进行排序
        std::cout << result[0] << std::endl; // 输出最小的步数
    } else {
        std::cout << -1 << std::endl; // 如果没有结果，输出-1
    }
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>

int main() {
    int numbers[100];  
    int length = 0; // 实际输入的元素个数
    int num;

    // 从标准输入读取一系列整数，直到遇到非数字或文件结束
    while (scanf("%d", &num) == 1) {
        numbers[length++] = num;
    }

    int result[100]; // 存储所有可能的步数结果
    int result_count = 0; // 记录结果数量

    // 遍历所有从第一个元素开始的有效步长
    for (int i = 1; i < length / 2; i++) {
        int step = 1; // 初始化步数为1，因为第一步已经走出
        int index = i; // 将索引设为当前步长

        // 只要没有走到数组的最后一个元素
        while (index < length - 1) {
            index += numbers[index]; // 按照当前索引位置的数字值前进
            step++; // 每走一步，步数加1
        }

        // 如果恰好到达数组的最后一个元素
        if (index == length - 1) {
            result[result_count++] = step; // 将步数结果存入结果数组
        }
    }

    // 如果有有效的步数结果
    if (result_count > 0) {
        int min_step = result[0];
        // 找出最小的步数
        for (int i = 1; i < result_count; i++) {
            if (result[i] < min_step) {
                min_step = result[i];
            }
        }
        printf("%d\\n", min_step); // 输出最小的步数
    } else {
        printf("-1\\n"); // 如果没有结果，输出-1
    }

    return 0;
}`},d={id:"25",title:"找终点",examType:"A",score:100,description:n,inputDesc:e,outputDesc:t,examples:i,solution:s,codes:r};export{r as codes,d as default,n as description,o as examType,i as examples,l as id,e as inputDesc,t as outputDesc,p as score,s as solution,u as title};
