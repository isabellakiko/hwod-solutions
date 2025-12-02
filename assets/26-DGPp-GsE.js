const o="26",n="报数游戏",l="A",m=100,e=`100个人围成一圈，每个人有一个编码，编号从1开始到100。
他们从1开始依次报数，报到为M的人自动退出圈圈，然后下一个人接着从1开始报数，直到剩余的人数小于M。
请问最后剩余的人在原先的编号为多少？`,t="输入一个整数参数 M",i=`如果输入参数M小于等于1或者大于等于100，输出“ERROR!”；
否则按照原先的编号从小到大的顺序，以英文逗号分割输出编号字符串`,s=[{input:"3",output:"58,91",explanation:`M=3，100人围成一圈，每报到3的人退出。
不断重复直到剩余人数小于3。
最后剩下的人编号为58和91。`},{input:"4",output:"34,45,97",explanation:`M=4，100人围成一圈，每报到4的人退出。
最后剩下3人，编号为34、45、97。`},{input:"1",output:"ERROR!",explanation:"M=1不满足 1<M<100 的条件，输出ERROR!"}],r=`**解题思路：**

本题是一道**约瑟夫环**问题的变种。

**算法步骤：**

1. **参数校验**：如果 M≤1 或 M≥100，输出 "ERROR!"
2. **模拟过程**：
   - 用列表存储1-100的编号
   - 每次移除第M个人（索引M-1）
   - 从被移除位置开始重新排列队列
3. **终止条件**：剩余人数 < M
4. **输出结果**：按编号升序输出，逗号分隔

**时间复杂度**：O(100/M * 100) ≈ O(n²)`,u={java:`import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

public class Main {

   
    public static List<Integer> find_last_person(List<Integer> numbers, int M) {
        // 遍历numbers数组
        for (int i = 1; i <= numbers.size(); i++) {
            // 当索引i等于M时，执行以下操作
            if (i == M) {
                // 将第M个元素之后的元素放入新的临时列表temp
                List<Integer> temp = new ArrayList<>(numbers.subList(M, numbers.size()));
                // 将原数组从0到M-1的元素加到临时列表的末尾
                temp.addAll(numbers.subList(0, M - 1));
                // 递归调用find_last_person函数，以新的temp列表继续进行处理
                return find_last_person(temp, M);
            }
        }
        // 当数组遍历完成，返回最终的numbers列表
        return numbers;
    }

    public static void main(String[] args) {
       
        Scanner scanner = new Scanner(System.in);
    
        int M = scanner.nextInt();

        // 如果M的值不在1到100之间，输出错误信息
        if (M <= 1 || M >= 100) {
            System.out.println("ERROR!");
        } else {
            // 创建一个存储1到100的列表
            List<Integer> numbers = new ArrayList<>();
            for (int i = 0; i < 100; i++) {
                numbers.add(i + 1);  // 将1到100依次加入numbers列表
            }

            // 调用find_last_person函数，处理numbers列表
            List<Integer> result = find_last_person(numbers, M);
            // 对结果进行排序
            Collections.sort(result);

            // 遍历result列表，按格式输出结果
            for (int i = 0; i < result.size(); i++) {
                System.out.print(result.get(i));
                // 在元素之间添加逗号，最后一个元素后不加逗号
                if (i != result.size() - 1) {
                    System.out.print(",");
                }
            }
            // 输出换行符
            System.out.println();
        }
    }
}`,python:`def find_last_person(numbers, M):
    while len(numbers) >= M:  # 如果当前人数不小于M，则继续执行
        temp = numbers[M:] + numbers[:M-1]  # 将第M个元素以后的部分和前M-1个元素合并
        numbers = temp  # 更新numbers
    return numbers

 
M = int(input())  # 读入整数M

if M <= 1 or M >= 100:
    print("ERROR!")  # 如果M不在规定范围内，输出错误信息
else:
    numbers = list(range(1, 101))  # 生成1到100的列表
    result = find_last_person(numbers, M)  # 获取最后剩下的人
    result.sort()  # 对结果进行排序

    # 打印结果，用逗号分隔
    print(",".join(map(str, result)))`,javascript:`const readline = require('readline');


const rl = readline.createInterface({
  input: process.stdin,   
  output: process.stdout  
});

 
function find_last_person(numbers, M) {
  // 遍历数字数组
  for (let i = 1; i <= numbers.length; i++) {
    // 当索引等于M时，执行操作
    if (i === M) {
        // 构造新数组：从第M个元素开始到数组结束，再拼接从数组开始到第M-1个元素
        const temp = [...numbers.slice(M), ...numbers.slice(0, M - 1)];
        // 递归调用，以新的数组和M为参数
        return find_last_person(temp, M);
    }
  }
  // 当数组遍历完成，返回最终数组
   return numbers;
}

 
rl.on('line', (M) => {
  M = parseInt(M); // 将输入转换为整数

  // 如果输入的M小于等于1或大于等于100，输出错误信息
  if (M <= 1 || M >= 100) {
    console.log("ERROR!");
  } else {
    // 否则，创建一个从1到100的数组
    const numbers = Array.from({length: 100}, (_, i) => i + 1);

    // 调用find_last_person函数处理numbers数组
    const result = find_last_person(numbers, M);
    // 对结果进行排序
    result.sort((a, b) => a - b);

    // 使用逗号将数组元素连接成一个字符串，并打印输出
    console.log(result.join(','));
  }

  // 完成输入后关闭readline接口
  rl.close();
});`,cpp:`#include <iostream>
#include <vector>
#include <algorithm>  

using namespace std;

 
vector<int> find_last_person(vector<int>& numbers, int M) {
    while (numbers.size() >= M) { // 只要人数不小于M，就继续进行
        vector<int> temp; // 创建一个临时向量存储剩余的人
        // 将M位置以后的人加到temp的末尾，并将前M-1个人也加到末尾
        for (size_t i = M; i < numbers.size(); i++) {
            temp.push_back(numbers[i]);
        }
        for (size_t i = 0; i < M - 1; i++) {
            temp.push_back(numbers[i]);
        }
        numbers = temp; // 更新numbers为temp
    }
    return numbers;
}

int main() {
    int M;
    cin >> M; // 读入M值

    if (M <= 1 || M >= 100) {
        cout << "ERROR!" << endl; // 检查M值是否合法
    } else {
        vector<int> numbers(100); // 创建一个向量存放1到100的编号
        for (int i = 0; i < 100; i++) {
            numbers[i] = i + 1;
        }

        vector<int> result = find_last_person(numbers, M);
        sort(result.begin(), result.end()); // 对结果进行排序

        // 输出结果，用逗号分隔
        for (size_t i = 0; i < result.size(); i++) {
            cout << result[i];
            if (i != result.size() - 1) {
                cout << ",";
            }
        }
        cout << endl;
    }
    return 0;
}`,c:`#include <stdio.h>   
#include <stdlib.h> 

 
int* find_last_person(int* numbers, int size, int M, int* result_size) {
    while (size >= M) { // 只要人数不小于M，就继续进行
        int* temp = (int*)malloc(sizeof(int) * size); // 动态分配临时数组
        int temp_size = 0;
        for (int i = M; i < size; i++) {
            temp[temp_size++] = numbers[i]; // 添加M之后的元素到临时数组
        }
        for (int i = 0; i < M - 1; i++) {
            temp[temp_size++] = numbers[i]; // 添加前M-1的元素到临时数组
        }
        free(numbers); // 释放原始数组
        numbers = temp; // 更新指向新数组
        size = temp_size; // 更新大小
    }
    *result_size = size; // 设置返回大小
    return numbers;
}

int cmpfunc(const void* a, const void* b) { // 用于qsort的比较函数
    return (*(int*)a - *(int*)b);
}

int main() {
    int M;
    scanf("%d", &M); // 输入M

    if (M <= 1 || M >= 100) {
        printf("ERROR!\\n"); // 检查M的合法性
    } else {
        int* numbers = (int*)malloc(sizeof(int) * 100); // 动态分配数组
        for (int i = 0; i < 100; i++) {
            numbers[i] = i + 1; // 初始化1到100
        }

        int result_size;
        int* result = find_last_person(numbers, 100, M, &result_size);
        qsort(result, result_size, sizeof(int), cmpfunc); // 对结果排序

        // 输出结果
        for (int i = 0; i < result_size; i++) {
            printf("%d", result[i]);
            if (i != result_size - 1) {
                printf(",");
            }
        }
        printf("\\n");

        free(result); // 释放结果数组
    }
    return 0;
}`},p={id:"26",title:n,examType:"A",score:100,description:e,inputDesc:t,outputDesc:i,examples:s,solution:r,codes:u};export{u as codes,p as default,e as description,l as examType,s as examples,o as id,t as inputDesc,i as outputDesc,m as score,r as solution,n as title};
