const a="187",n="打印机队列",o="B",l=100,t=`有5台打印机打印文件，每台打印机有自己的待打印队列。
因为打印的文件内容有轻重缓急之分，所以队列中的文件有1~10不同的代先级，其中数字越大优先级越高。
打印机会从自己的待打印队列中选择优先级最高的文件来打印。
如果存在两个优先级一样的文件，则选择最早进入队列的那个文件。
现在请你来模拟这5台打印机的打印过程。
`,i=`每个输入包含1个测试用例，
每个测试用例第一行给出发生事件的数量N（0 < N < 1000）。
接下来有 N 行，分别表示发生的事件。共有如下两种事件：
“IN P NUM”，表示有一个拥有优先级 NUM 的文件放到了打印机 P 的待打印队列中。（0< P <= 5, 0 < NUM <= 10)；“OUT P”，表示打印机 P 进行了一次文件打印，同时该文件从待打印队列中取出。（0 < P <= 5）。
`,r=`本题可以基于优先队列实现打印机总是打印优先级最高的文件。
优先队列，如果想简单一点的话，则可以基于有序数组实现，但是有序数组是整体有序，每次有新任务入队，都需要O(n)时间复杂度维持。
优先队列最好是基于堆结构实现，所谓堆结构，即一颗完全二叉树。本题是优先级数值越大，优先级越高，因此我们可以使用大顶堆。
关于基于堆结构实现优先队列，可以参考
LeetCode - 1705 吃苹果的最大数目_伏城之外的博客-CSDN博客
`,e=[{input:`7
IN 1 1
IN 1 2
IN 1 3
OUT 1
OUT 1
OUT 2
IN 2 1`,output:`3
2
NULL`,explanation:"打印机1按优先级3>2>1输出文件编号3、2；打印机2队列为空输出NULL"},{input:`4
IN 1 5
IN 1 5
OUT 1
OUT 1`,output:`1
2`,explanation:"优先级相同，按入队顺序先输出编号1再输出编号2"}],s=`**解题思路：**

本题是一道**优先队列模拟**问题。

**核心思路：**
- 每台打印机维护一个优先队列
- 优先级高的先打印，相同优先级按入队顺序

**算法步骤：**
1. 为每台打印机创建优先队列
2. IN操作：将任务(编号,优先级,顺序)入队
3. OUT操作：弹出优先级最高的任务
4. 队列为空时输出NULL

**时间复杂度**：O(N*logN)`,p={java:`import java.util.HashMap;
import java.util.PriorityQueue;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int n = Integer.parseInt(sc.nextLine());
    String[][] tasks = new String[n][];

    for (int i = 0; i < n; i++) {
      String[] s = sc.nextLine().split(" ");
      tasks[i] = s;
    }

    getResult(tasks);
  }

  public static void getResult(String[][] tasks) {
    // print中存放每台打印机的等待队列
    HashMap<String, PriorityQueue<int[]>> print = new HashMap<>();

    // 文件的编号定义为”IN P NUM”事件发生第 x 次，此处待打印文件的编号为x。编号从1开始。
    int x = 1;
    for (int i = 0; i < tasks.length; i++) {
      String[] task = tasks[i];
      // IN,OUT都有type和printId
      String type = task[0];
      String printId = task[1];

      if ("IN".equals(type)) {
        // IN还有priority
        String priority = task[2];
        // arr是打印任务
        int[] arr = {x, Integer.parseInt(priority), i}; // i代表先来后到的顺序
        // 为打印机printId设置打印优先级，打印任务的priority越大，优先级越高
        print.putIfAbsent(
            printId,
            new PriorityQueue<>(
                (a, b) ->
                    a[1] != b[1] ? b[1] - a[1] : a[2] - b[2])); // 优先按priority，如果priority相同，按先来后到i
        // 将打印任务加入对应打印机
        print.get(printId).offer(arr);
        x++;
      } else {
        // 打印机等待队列中取出优先级最高的打印任务arr
        if (!print.containsKey(printId) || print.get(printId).isEmpty()) {
          // 如果此时没有文件可以打印，请输出”NULL“。
          System.out.println("NULL");
        } else {
          int[] arr = print.get(printId).poll();
          if (arr != null) System.out.println(arr[0]); // arr[0]是x
          else System.out.println("NULL");
        }
      }
    }
  }
}`,python:`import queue

# 输入获取
n = int(input())

tasks = []
for i in range(n):
    tasks.append(input().split())


class Task:
    def __init__(self, taskId, priority, index):
        """
        :param taskId: 任务ID
        :param priority: 任务优先级
        :param index: 任务到达顺序
        """
        self.taskId = taskId
        self.priority = priority
        self.index = index

    def __lt__(self, other):
        if self.priority != other.priority:
            return self.priority > other.priority
        else:
            return self.index < other.index


# 算法入口
def getResult(tasks):
    printer = {}

    taskId = 1
    for i in range(len(tasks)):
        task = tasks[i]

        type = task[0]
        printerId = task[1]

        if type == "IN":
            priority = task[2]
            if printer.get(printerId) is None:
                printer[printerId] = queue.PriorityQueue()
            printer[printerId].put(Task(taskId, int(priority), i))
            taskId += 1
        else:
            if printer.get(printerId) is None or printer[printerId].qsize() == 0:
                print("NULL")
            else:
                t = printer[printerId].get()
                print(t.taskId)


getResult(tasks)`,javascript:`/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
let n;
rl.on("line", (line) => {
  lines.push(line);

  if (lines.length === 1) {
    n = parseInt(lines[0]);
  }

  if (n && lines.length === n + 1) {
    lines.shift();

    const tasks = lines.map((line) => line.split(" "));

    getResult(tasks);

    lines.length = 0;
  }
});

function getResult(tasks) {
  const print = {};

  let taskId = 1;
  for (let i = 0; i < tasks.length; i++) {
    const [type, printId, priority] = tasks[i];

    if (type === "IN") {
      const arr = [taskId, priority, i]; // i 是先来后到的顺序
      if (!print[printId]) {
        print[printId] = []; // 基于数组实现优先队列
      }
      print[printId].push(arr);
      print[printId].sort((a, b) => (a[1] != b[1] ? b[1] - a[1] : a[2] - b[2])); // 维持高优先级在头部，如果优先级相同，则按先来后到
      taskId++;
    } else {
      if (!print[printId] || print[printId].length == 0) {
        console.log("NULL");
      } else {
        const arr = print[printId].shift();
        console.log(arr ? arr[0] : "NULL");
      }
    }
  }
}`,cpp:"",c:""},d={id:"187",title:n,examType:"B",score:100,description:t,inputDesc:i,outputDesc:r,examples:e,solution:s,codes:p};export{p as codes,d as default,t as description,o as examType,e as examples,a as id,i as inputDesc,r as outputDesc,l as score,s as solution,n as title};
