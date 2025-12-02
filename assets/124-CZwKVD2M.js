const a="124",n="打印任务排序",p="A",c=200,t=`某个打印机根据打印队列执行打印任务。打印任务分为九个优先级，分别用数字1-9表示，数字越大优先级越高。打印机每次从队列头部取出第一个任务A，
然后检查队列余下任务中有没有比A优先级更高的任务，如果有比A优先级高的任务，则将任务A放到队列尾部，否则就执行任务A的打印。
请编写一个程序，根据输入的打印队列，输出实际的打印顺序。`,i="输入一行，为每个任务的优先级，优先级之间用逗号隔开，优先级取值范围是1~9。",r="输出一行，为每个任务的打印顺序，打印顺序从0开始，用逗号隔开",s=[{input:"9,3,5",output:"0,2,1",explanation:"9最高先打印(序号0)，然后5(序号1)，最后3(序号2)"},{input:"1,2,2",output:"2,0,1",explanation:"1被移到队尾，先打印两个2(序号0,1)，最后打印1(序号2)"}],e=`**解题思路：**

本题是一道**队列模拟**问题。

**核心思路：**
- 模拟打印机处理过程
- 队首任务若非最高优先级则移到队尾
- 记录每个任务的实际打印顺序

**简化方法：**
- 按优先级降序排序（保持稳定排序）
- 排序后的位置即为打印顺序
- 原位置映射到新位置

**时间复杂度**：O(N²) 或 O(NlogN)`,o={java:`import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
 
        String input = scanner.nextLine();
        
        // 将输入的字符串按逗号分隔，转换为字符串数组
        String[] priorityListString = input.split(",");
        
        // 将字符串数组转换为整型数组，存储每个任务的优先级
        int[] priorityList = new int[priorityListString.length];
        for (int i = 0; i < priorityListString.length; i++) {
            priorityList[i] = Integer.parseInt(priorityListString[i]);
        }
        
        // 创建一个列表，存储任务的初始索引和优先级
        List<int[]> taskList = new ArrayList<>();
        for (int i = 0; i < priorityList.length; i++) {
            taskList.add(new int[]{i, priorityList[i]});  // 任务格式为 {索引, 优先级}
        }
        
        // 按照优先级从大到小排序任务，优先级高的任务在前面
        taskList.sort(Comparator.comparingInt(x -> -x[1]));
        
        // currentTask 变量用于记录当前处理的任务序号
        int currentTask = 0;
        List<Integer> printOrder = new ArrayList<>();
        
        // 按任务顺序检查并记录每个任务的打印顺序
        while (currentTask < taskList.size()) {
            for (int i = 0; i < taskList.size(); i++) {
                if (taskList.get(i)[0] == currentTask) {  // 如果找到任务的原始索引等于当前处理的任务
                    printOrder.add(i);  // 将任务在排序后的位置记录为打印顺序
                }
            }
            currentTask++;  // 处理下一个任务
        }
        
        // 构建输出字符串，将每个打印顺序用逗号隔开输出
        String output = "";
        for (int i = 0; i < printOrder.size(); i++) {
            output += printOrder.get(i);
            if (i < printOrder.size() - 1) {
                output += ",";
            }
        }
        
        // 输出最终的打印顺序
        System.out.println(output);
    }
}`,python:`priority_list = list(map(int, input().split(',')))

# 创建任务列表，每个任务用 (原始索引, 优先级) 表示
task_list = [(i, priority_list[i]) for i in range(len(priority_list))]

# 按照任务的优先级从大到小排序，优先级高的排在前面
task_list.sort(key=lambda x: -x[1])

# 初始化当前任务索引，记录打印顺序
current_task = 0
print_order = []

# 遍历任务列表，按照当前任务的原始索引找到其在排序后的位置
while current_task < len(task_list):
    for i in range(len(task_list)):
        if task_list[i][0] == current_task:  # 如果找到原始索引等于当前任务
            print_order.append(i)  # 记录排序后的任务位置
    current_task += 1  # 处理下一个任务

# 将打印顺序列表转换为逗号分隔的字符串输出
print(','.join(map(str, print_order)))`,javascript:`const readline = require('readline');

 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

 
rl.on('line', (input) => {
  // 将输入的字符串按逗号分隔并转换为数字列表
  const priority_list = input.split(',').map(Number);

  // 创建任务列表，包含任务的原始索引和优先级
  const task_list = priority_list.map((priority, index) => [index, priority]);

  // 按照优先级从高到低排序任务
  task_list.sort((a, b) => b[1] - a[1]);

  let current_task = 0;
  const print_order = [];

  // 遍历任务列表，按照原始顺序查找任务的打印顺序
  while (current_task < task_list.length) {
    for (let i = 0; i < task_list.length; i++) {
      if (task_list[i][0] === current_task) {  // 找到原始索引为当前任务的
        print_order.push(i);  // 记录其在排序后的位置
      }
    }
    current_task++;  // 处理下一个任务
  }

  // 打印最终的打印顺序，使用逗号分隔
  console.log(print_order.join(','));

  // 关闭输入接口
  rl.close()
});`,cpp:`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    string input;
    getline(cin, input);  // 读取用户输入的任务优先级字符串
    
    vector<int> priority_list;  // 用于存储任务优先级的列表
    size_t pos = 0;
    string token;

    // 将输入的字符串按照逗号分隔，依次存入 priority_list 中
    while ((pos = input.find(',')) != string::npos) {
        token = input.substr(0, pos);
        priority_list.push_back(stoi(token));  // 转换为整数并存入列表
        input.erase(0, pos + 1);
    }
    priority_list.push_back(stoi(input));  // 最后一个任务的优先级加入列表
    
    // 创建任务列表，包含任务的原始索引和优先级
    vector<pair<int, int>> task_list;
    for (int i = 0; i < priority_list.size(); i++) {
        task_list.push_back(make_pair(i, priority_list[i]));
    }

    // 按优先级从大到小排序任务列表
    sort(task_list.begin(), task_list.end(), [](pair<int, int> a, pair<int, int> b) {
        return a.second > b.second;
    });
    
    int current_task = 0;  // 当前要处理的任务索引
    vector<int> print_order;  // 存储打印顺序

    // 查找排序后每个任务的打印顺序
    while (current_task < task_list.size()) {
        for (int i = 0; i < task_list.size(); i++) {
            if (task_list[i].first == current_task) {  // 找到原始索引为当前任务的
                print_order.push_back(i);  // 记录排序后的位置
            }
        }
        current_task++;  // 处理下一个任务
    }
    
 
    for (int i = 0; i < print_order.size(); i++) {
        cout << print_order[i];
        if (i != print_order.size() - 1) {
            cout << ",";
        }
    }
    
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 比较函数，用于按照优先级从大到小排序
int compare(const void *a, const void *b) {
    // 将参数强制转换为指向整数数组的指针
    int *taskA = *(int **)a;
    int *taskB = *(int **)b;
    return taskB[1] - taskA[1];  // 按照优先级从大到小排序
}

int main() {
    char input[256];
    
 
    fgets(input, sizeof(input), stdin);

    // 去除输入中的换行符
    input[strcspn(input, "\\n")] = '\\0';

    // 按照逗号分割输入字符串，计算优先级个数
    char *token = strtok(input, ",");
    int count = 0;
    int *priorityList = NULL;

    // 分割并转换为整数，存储到priorityList数组中
    while (token != NULL) {
        priorityList = realloc(priorityList, sizeof(int) * (count + 1));
        priorityList[count] = atoi(token);  // 将字符串转换为整数
        count++;
        token = strtok(NULL, ",");
    }

    // 创建一个二维数组，存储每个任务的初始索引和优先级
    int **taskList = (int **)malloc(count * sizeof(int *));
    for (int i = 0; i < count; i++) {
        taskList[i] = (int *)malloc(2 * sizeof(int));
        taskList[i][0] = i;             // 存储任务的初始索引
        taskList[i][1] = priorityList[i]; // 存储任务的优先级
    }

    // 使用qsort对任务列表按照优先级从大到小进行排序
    qsort(taskList, count, sizeof(int *), compare);

    // currentTask 变量用于记录当前处理的任务序号
    int currentTask = 0;
    int *printOrder = (int *)malloc(count * sizeof(int)); // 用于存储最终的打印顺序
    int orderIndex = 0;

    // 按任务顺序检查并记录每个任务的打印顺序
    while (currentTask < count) {
        for (int i = 0; i < count; i++) {
            if (taskList[i][0] == currentTask) {  // 如果找到任务的原始索引等于当前处理的任务
                printOrder[orderIndex++] = i;     // 将任务在排序后的位置记录为打印顺序
                break;
            }
        }
        currentTask++;  // 处理下一个任务
    }

    // 输出最终的打印顺序
    for (int i = 0; i < orderIndex; i++) {
        printf("%d", printOrder[i]);
        if (i < orderIndex - 1) {
            printf(",");  // 用逗号分隔
        }
    }
    printf("\\n");

    return 0;
}`},u={id:"124",title:n,examType:"A",score:200,description:t,inputDesc:i,outputDesc:r,examples:s,solution:e,codes:o};export{o as codes,u as default,t as description,p as examType,s as examples,a as id,i as inputDesc,r as outputDesc,c as score,e as solution,n as title};
