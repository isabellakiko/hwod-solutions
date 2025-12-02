const i="32",n="智能成绩表",a="A",u=100,t="小明来到学校当老师，需要将学生按考试总分或单科分数进行排名，你能帮帮他吗？",e=`第 1 行输入两个整数，学生人数 n 和科目数量 m。
0 < n < 1000 < m < 10
第 2 行输入 m 个科目名称，彼此之间用空格隔开。
科目名称只由英文字母构成，单个长度不超过10个字符。科目的出现顺序和后续输入的学生成绩一一对应。不会出现重复的科目名称。
第 3 行开始的 n 行，每行包含一个学生的姓名和该生 m 个科目的成绩（空格隔开）
学生不会重名。学生姓名只由英文字母构成，长度不超过10个字符。成绩是0~100的整数，依次对应第2行种输入的科目。
第n+2行，输入用作排名的科目名称。若科目不存在，则按总分进行排序。`,s="输出一行，按成绩排序后的学生名字，空格隔开。成绩相同的按照学生姓名字典顺序排序。",c=[{input:`3 2
yuwen shuxue
fangfang 95 90
xiaohua 88 98
minmin 100 82
shuxue`,output:"xiaohua fangfang minmin",explanation:`3个学生，2门科目。
按shuxue（数学）成绩排序：xiaohua(98) > fangfang(90) > minmin(82)`},{input:`3 2
yuwen shuxue
fangfang 95 90
xiaohua 88 95
minmin 90 95
zongfen`,output:"fangfang minmin xiaohua",explanation:`排序科目"zongfen"不存在，按总分排序。
fangfang(185)、minmin(185)、xiaohua(183)
fangfang和minmin总分相同，按姓名字典序，fangfang在前。`}],r=`**解题思路：**

本题是一道**排序**问题。

**算法步骤：**

1. 读取学生人数n和科目数量m
2. 读取m个科目名称
3. 读取n个学生的姓名和各科成绩，同时计算总分
4. 读取排序依据的科目名称
5. 判断科目是否存在：
   - 存在：按该科目成绩降序排序
   - 不存在：按总分降序排序
6. 成绩相同时，按姓名字典序升序排序

**时间复杂度**：O(n log n)`,o={java:`import java.util.*;

public class Main {
    // 定义学生类
    static class Student {
        String name; // 学生姓名
        int totalScore; // 学生总分
        Map<String, Integer> scores; // 存储学生各科成绩的映射

        // 构造函数，初始化学生姓名、成绩映射和总分
        Student(String name) {
            this.name = name;
            this.scores = new HashMap<>();
            this.totalScore = 0;
        }

        // 添加成绩的方法，同时累加到总分
        void addScore(String subject, int score) {
            scores.put(subject, score);
            totalScore += score;
        }

        // 获取指定科目的成绩，若没有则返回0
        int getScore(String subject) {
            return scores.getOrDefault(subject, 0);
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // 读取学生人数和科目数量
        int n = scanner.nextInt();
        int m = scanner.nextInt();
        scanner.nextLine(); // 读取并忽略换行符

        // 读取科目名称
        String[] subjects = scanner.nextLine().split(" ");
        List<Student> students = new ArrayList<>();

        // 读取每个学生的姓名和成绩
        for (int i = 0; i < n; i++) {
            String[] tokens = scanner.nextLine().split(" ");
            Student student = new Student(tokens[0]);
            for (int j = 0; j < m; j++) {
                student.addScore(subjects[j], Integer.parseInt(tokens[j + 1]));
            }
            students.add(student);
        }

        // 读取用作排名的科目名称
        String rankSubject = scanner.nextLine();
        // 关闭扫描器
        scanner.close();

        // 对学生列表进行排序
        students.sort((s1, s2) -> {
            // 根据指定科目或总分进行比较
            int score1 = rankSubject.equals("") ? s1.totalScore : s1.getScore(rankSubject);
            int score2 = rankSubject.equals("") ? s2.totalScore : s2.getScore(rankSubject);
            if (score1 != score2) {
                return score2 - score1; // 降序排序
            } else {
                return s1.name.compareTo(s2.name); // 成绩相同则按姓名升序排序
            }
        });

        // 输出排序后的学生姓名
        students.forEach(student -> System.out.print(student.name + " "));
    }
}`,python:`# 导入必要的库
from collections import defaultdict

# 定义学生类
class Student:
    def __init__(self, name):
        self.name = name  # 学生姓名
        self.total_score = 0  # 学生总分
        self.scores = defaultdict(int)  # 存储学生各科成绩的字典，默认值为0

    # 添加成绩的方法，同时累加到总分
    def add_score(self, subject, score):
        self.scores[subject] = score
        self.total_score += score

    # 获取指定科目的成绩
    def get_score(self, subject):
        return self.scores[subject]

# 主函数
def main():
    # 读取学生人数和科目数量
    n, m = map(int, input().split())
    
    # 读取科目名称
    subjects = input().split()
    students = []

    # 读取每个学生的姓名和成绩
    for _ in range(n):
        tokens = input().split()
        student = Student(tokens[0])
        for j in range(m):
            student.add_score(subjects[j], int(tokens[j + 1]))
        students.append(student)

    # 读取用作排名的科目名称
    rank_subject = input()

    # 对学生列表进行排序
    students.sort(key=lambda s: (-s.get_score(rank_subject) if rank_subject else -s.total_score, s.name))

    # 输出排序后的学生姓名
    for student in students:
        print(student.name, end=' ')

# 调用主函数
if __name__ == "__main__":
    main()`,javascript:`// 引入 readline 模块用于读取命令行输入
const readline = require('readline');

// 创建 readline 接口实例
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 定义学生类
class Student {
  constructor(name) {
    this.name = name; // 学生姓名
    this.totalScore = 0; // 学生总分
    this.scores = {}; // 存储学生各科成绩的映射
  }

  // 添加成绩的方法，同时累加到总分
  addScore(subject, score) {
    this.scores[subject] = score;
    this.totalScore += score;
  }

  // 获取指定科目的成绩，若没有则返回0
  getScore(subject) {
    return this.scores[subject] || 0;
  }
}

// 创建一个异步处理函数
async function processInput() {
  // 通过 readline 逐行读取输入
  const lines = [];
  for await (const line of rl) {
    lines.push(line);
  }

  // 解析输入数据
  const [n, m] = lines[0].split(' ').map(Number);
  const subjects = lines[1].split(' ');
  const students = [];

  // 读取每个学生的姓名和成绩
  for (let i = 0; i < n; i++) {
    const tokens = lines[i + 2].split(' ');
    const student = new Student(tokens[0]);
    for (let j = 0; j < m; j++) {
      student.addScore(subjects[j], parseInt(tokens[j + 1], 10));
    }
    students.push(student);
  }

  // 读取用作排名的科目名称
  const rankSubject = lines[n + 2];

  // 对学生列表进行排序
  students.sort((s1, s2) => {
    const score1 = rankSubject === '' ? s1.totalScore : s1.getScore(rankSubject);
    const score2 = rankSubject === '' ? s2.totalScore : s2.getScore(rankSubject);
    if (score1 !== score2) {
      return score2 - score1; // 降序排序
    } else {
      return s1.name.localeCompare(s2.name); // 成绩相同则按姓名升序排序
    }
  });

  // 输出排序后的学生姓名
  students.forEach(student => process.stdout.write(\`\${student.name} \`));
  process.stdout.write('\\n');

  // 关闭 readline 接口
  rl.close();
}

// 调用异步处理函数
processInput();`,cpp:`#include <iostream>
#include <vector>
#include <map>
#include <algorithm>

using namespace std;

// 定义学生类
class Student {
public:
    string name; // 学生姓名
    int totalScore; // 学生总分
    map<string, int> scores; // 存储学生各科成绩的映射

    // 构造函数，初始化学生姓名和总分
    Student(const string& name) : name(name), totalScore(0) {}

    // 添加成绩的方法，同时累加到总分
    void addScore(const string& subject, int score) {
        scores[subject] = score; // 设置指定科目的成绩
        totalScore += score; // 累加到总分
    }

    // 获取指定科目的成绩
    int getScore(const string& subject) const {
        auto it = scores.find(subject); // 查找科目对应的成绩
        return it != scores.end() ? it->second : 0; // 如果找到，则返回成绩，否则返回0
    }
};

int main() {
    int n, m; // n为学生数量，m为科目数量
    cin >> n >> m;
    vector<string> subjects(m); // 存储科目名称的向量
    for (int i = 0; i < m; ++i) {
        cin >> subjects[i]; // 输入科目名称
    }
    vector<Student> students; // 存储学生对象的向量

    for (int i = 0; i < n; ++i) {
        string name; // 学生姓名
        cin >> name; // 输入学生姓名
        Student student(name); // 创建学生对象
        for (int j = 0; j < m; ++j) {
            int score; // 成绩
            cin >> score; // 输入成绩
            student.addScore(subjects[j], score); // 添加成绩到学生对象
        }
        students.push_back(student); // 将学生对象添加到向量中
    }

    string rankSubject; // 用作排名的科目名称
    cin >> rankSubject; // 输入排名科目

    // 对学生进行排序
    sort(students.begin(), students.end(), [&](const Student& a, const Student& b) {
        int scoreA = rankSubject.empty() ? a.totalScore : a.getScore(rankSubject); // 获取a的排名科目成绩或总分
        int scoreB = rankSubject.empty() ? b.totalScore : b.getScore(rankSubject); // 获取b的排名科目成绩或总分
        if (scoreA != scoreB) {
            return scoreA > scoreB; // 成绩高的排前面
        }
        return a.name < b.name; // 成绩相同则按姓名字典序排列
    });

    // 输出排序后的学生姓名
    for (const auto& student : students) {
        cout << student.name << ' ';
    }
    cout << endl;

    return 0;
}`,c:`#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define MAX_STUDENTS 100
#define MAX_SUBJECTS 10
#define MAX_NAME_LEN 11

// 定义学生结构体
typedef struct {
    char name[MAX_NAME_LEN]; // 学生姓名
    int totalScore; // 学生总分
    int scores[MAX_SUBJECTS]; // 存储学生各科成绩的数组
} Student;

// 定义全局变量
int n, m; // n为学生数量，m为科目数量
char subjects[MAX_SUBJECTS][MAX_NAME_LEN]; // 存储科目名称的数组
Student students[MAX_STUDENTS]; // 存储学生对象的数组
char rankSubject[MAX_NAME_LEN]; // 用作排名的科目名称

// 定义比较函数，用于 qsort 函数
int cmp(const void *a, const void *b) {
    Student *studentA = (Student *)a;
    Student *studentB = (Student *)b;
    int scoreA = studentA->totalScore;
    int scoreB = studentB->totalScore;
    if (strcmp(rankSubject, "") != 0) {
        for (int i = 0; i < m; ++i) {
            if (strcmp(rankSubject, subjects[i]) == 0) {
                scoreA = studentA->scores[i];
                scoreB = studentB->scores[i];
                break;
            }
        }
    }
    if (scoreA != scoreB) {
        return scoreB - scoreA; // 成绩高的排前面
    }
    return strcmp(studentA->name, studentB->name); // 成绩相同则按姓名字典序排列
}

int main() {
    scanf("%d%d", &n, &m);
    for (int i = 0; i < m; ++i) {
        scanf("%s", subjects[i]);
    }

    for (int i = 0; i < n; ++i) {
        scanf("%s", students[i].name);
        students[i].totalScore = 0;
        for (int j = 0; j < m; ++j) {
            scanf("%d", &students[i].scores[j]);
            students[i].totalScore += students[i].scores[j];
        }
    }

    scanf("%s", rankSubject);

    // 对学生进行排序
    qsort(students, n, sizeof(Student), cmp);

    // 输出排序后的学生姓名
    for (int i = 0; i < n; ++i) {
        printf("%s ", students[i].name);
    }
    printf("\\n");

    return 0;
}`},d={id:"32",title:n,examType:"A",score:100,description:t,inputDesc:e,outputDesc:s,examples:c,solution:r,codes:o};export{o as codes,d as default,t as description,a as examType,c as examples,i as id,e as inputDesc,s as outputDesc,u as score,r as solution,n as title};
