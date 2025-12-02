const a="80",n="比赛的冠亚季军",p="A",g=100,t=`有N（3 ≤ N < 10000）个运动员，他们的id为0到N-1,他们的实力由一组整数表示。他们之间进行比赛，需要决出冠亚军。比赛的规则是0号和1号比赛，2号和3号比赛，以此类推，每一轮，相邻的运动员进行比赛，获胜的进入下一轮；实力值大的获胜，实力值相等的情况，id小的情况下获胜；轮空的直接进入下一轮。
`,i=`输入一行N个数字代表N的运动员的实力值(0<=实力值<=10000000000)。
`,s="输出冠亚季军的id，用空格隔开。",r=[{input:"2 3 4 5",output:"3 1 2",explanation:"第一轮：0vs1(1胜)，2vs3(3胜)；决赛：1vs3(3胜)；季军赛：0vs2(2胜)。冠军3，亚军1，季军2。"},{input:"1 2 3",output:"2 0 1",explanation:"第一轮：0vs1(1胜)，2轮空；决赛：1vs2(2胜)；季军赛：0vs1(1胜但0更小id)或直接0。"},{input:"5 4 3 2 1",output:"0 2 4",explanation:"实力递减排列，id小的运动员逐轮获胜。"}],o=`**解题思路：**

本题是一道**模拟**问题（淘汰赛制）。

**算法步骤：**
1. 每轮相邻运动员两两比赛，胜者进入获胜组
2. 奇数个运动员时，最后一个直接晋级
3. 用链表保存获胜组、失败组，只保留3组
4. 重复直到产生冠军（获胜组只剩1人）
5. 季军在第三组中选实力最强者

**时间复杂度**：O(N log N)`,e={java:`import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.Scanner;

public class Main {
  // 运动员类
  static class Sport {
    int id; // 运动员的id
    long strength; // 运动员的实力

    public Sport(int id, long strength) {
      this.id = id;
      this.strength = strength;
    }
  }

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    long[] strengths = Arrays.stream(sc.nextLine().split(" ")).mapToLong(Long::parseLong).toArray();

    System.out.println(getResult(strengths));
  }

  public static String getResult(long[] strength) {
    // ans只记录三个组，冠军组，亚军组，季军组
    LinkedList<ArrayList<Sport>> ans = new LinkedList<>();

    // 将输入的实力值，转化为运动员集合
    ArrayList<Sport> sports = new ArrayList<>();
    for (int i = 0; i < strength.length; i++) sports.add(new Sport(i, strength[i]));

    // 晋级赛
    promote(sports, ans);

    // 冠军组如果不是一个人，那么还需要取出冠军组继续进行晋级赛
    while (ans.getFirst().size() > 1) {
      promote(ans.removeFirst(), ans);
    }

    // 冠军
    int first = ans.get(0).get(0).id;

    // 亚军
    int second = ans.get(1).get(0).id;

    // 季军
    ans.get(2)
        .sort(
            (a, b) ->
                a.strength != b.strength ? b.strength - a.strength > 0 ? 1 : -1 : a.id - b.id);
    int third = ans.get(2).get(0).id;

    return first + " " + second + " " + third;
  }

  public static void promote(ArrayList<Sport> sports, LinkedList<ArrayList<Sport>> ans) {
    // 记录获胜组
    ArrayList<Sport> win = new ArrayList<>();
    // 记录失败组
    ArrayList<Sport> fail = new ArrayList<>();

    for (int i = 1; i < sports.size(); i += 2) {
      // 序号大的运动员
      Sport major = sports.get(i);
      // 序号小的运动员
      Sport minor = sports.get(i - 1);

      if (major.strength > minor.strength) {
        win.add(major);
        fail.add(minor);
      } else {
        // 如果序号大的运动员的实力 <= 序号小的运动员，则序号小的运动员获胜
        win.add(minor);
        fail.add(major);
      }
    }

    // 如果晋级赛中运动员个数是奇数个，那么最后一个运动员直接晋级
    if (sports.size() % 2 != 0) {
      win.add(sports.get(sports.size() - 1));
    }

    // 依次头部压入失败组，获胜组，保证头部是获胜组
    ans.addFirst(fail);
    ans.addFirst(win);

    // 如果保留组个数超过3个，那么需要将超过部分的组去掉，因为这部分人已经无缘季军
    while (ans.size() > 3) ans.removeLast();
  }
}`,python:`# 输入获取
tmp = list(map(int, input().split()))


class Sport:
    def __init__(self, idx, strength):
        self.idx = idx  # 运动员的id
        self.strength = strength    # 运动员的实力


# 将输入的实力值，转化为运动员集合
sports = []
for i in range(len(tmp)):
    sports.append(Sport(i, tmp[i]))


def promote(sports, ans):
    # 记录获胜组
    win = []
    # 记录失败组
    fail = []

    for i in range(1, len(sports), 2):
        # 序号大的运动员
        major = sports[i]
        # 序号小的运动员
        minor = sports[i-1]

        if major.strength > minor.strength:
            win.append(major)
            fail.append(minor)
        else:
            # 如果序号大的运动员的实力 <= 序号小的运动员，则序号小的运动员获胜
            win.append(minor)
            fail.append(major)

    # 如果晋级赛中运动员个数是奇数个，那么最后一个运动员直接晋级
    if len(sports) % 2 != 0:
        win.append(sports[-1])

    # 依次头部压入失败组，获胜组，保证头部是获胜组
    ans.insert(0, fail)
    ans.insert(0, win)

    # 如果保留组个数超过3个，那么需要将超过部分的组去掉，因为这部分人已经无缘季军
    while len(ans) > 3:
        ans.pop()


# 算法入口
def getResult():
    # ans只记录三个组，冠军组，亚军组，季军组
    ans = []

    # 晋级赛
    promote(sports, ans)

    # 冠军组如果不是一个人，那么还需要取出冠军组继续进行晋级赛
    while len(ans[0]) > 1:
        promote(ans.pop(0), ans)

    # 冠军
    first = ans[0][0].idx

    # 亚军
    second = ans[1][0].idx

    # 季军
    ans[2].sort(key=lambda x: (-x.strength, x.idx))
    third = ans[2][0].idx

    return f"{first} {second} {third}"


# 算法调用
print(getResult())`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    const strengths = line.split(' ').map(Number);
    const sports = strengths.map((s, i) => ({ id: i, strength: s }));
    
    const ans = [];
    
    function promote(group) {
        const win = [], fail = [];
        for (let i = 1; i < group.length; i += 2) {
            if (group[i].strength > group[i-1].strength) {
                win.push(group[i]);
                fail.push(group[i-1]);
            } else {
                win.push(group[i-1]);
                fail.push(group[i]);
            }
        }
        if (group.length % 2 !== 0) win.push(group[group.length - 1]);
        ans.unshift(fail);
        ans.unshift(win);
        while (ans.length > 3) ans.pop();
    }
    
    promote(sports);
    while (ans[0].length > 1) {
        promote(ans.shift());
    }
    
    const first = ans[0][0].id;
    const second = ans[1][0].id;
    ans[2].sort((a, b) => a.strength !== b.strength ? b.strength - a.strength : a.id - b.id);
    const third = ans[2][0].id;
    
    console.log(\`\${first} \${second} \${third}\`);
    rl.close();
});`,cpp:`#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
#include <deque>
using namespace std;

struct Sport {
    int id;
    long long strength;
};

deque<vector<Sport>> ans;

void promote(vector<Sport>& group) {
    vector<Sport> win, fail;
    for (int i = 1; i < group.size(); i += 2) {
        if (group[i].strength > group[i-1].strength) {
            win.push_back(group[i]);
            fail.push_back(group[i-1]);
        } else {
            win.push_back(group[i-1]);
            fail.push_back(group[i]);
        }
    }
    if (group.size() % 2 != 0) win.push_back(group[group.size() - 1]);
    ans.push_front(fail);
    ans.push_front(win);
    while (ans.size() > 3) ans.pop_back();
}

int main() {
    string line;
    getline(cin, line);
    stringstream ss(line);
    
    vector<Sport> sports;
    long long s;
    int id = 0;
    while (ss >> s) {
        sports.push_back({id++, s});
    }
    
    promote(sports);
    while (ans[0].size() > 1) {
        vector<Sport> tmp = ans[0];
        ans.pop_front();
        promote(tmp);
    }
    
    int first = ans[0][0].id;
    int second = ans[1][0].id;
    sort(ans[2].begin(), ans[2].end(), [](const Sport& a, const Sport& b) {
        if (a.strength != b.strength) return a.strength > b.strength;
        return a.id < b.id;
    });
    int third = ans[2][0].id;
    
    cout << first << " " << second << " " << third << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    int id;
    long long strength;
} Sport;

typedef struct {
    Sport* data;
    int size;
} Group;

Group groups[10];
int groupCount = 0;

void promote(Group* g) {
    Group win = {malloc(sizeof(Sport) * g->size), 0};
    Group fail = {malloc(sizeof(Sport) * g->size), 0};
    
    for (int i = 1; i < g->size; i += 2) {
        if (g->data[i].strength > g->data[i-1].strength) {
            win.data[win.size++] = g->data[i];
            fail.data[fail.size++] = g->data[i-1];
        } else {
            win.data[win.size++] = g->data[i-1];
            fail.data[fail.size++] = g->data[i];
        }
    }
    if (g->size % 2 != 0) win.data[win.size++] = g->data[g->size - 1];
    
    for (int i = groupCount; i > 0; i--) groups[i] = groups[i-1];
    groups[0] = fail;
    groupCount++;
    for (int i = groupCount; i > 0; i--) groups[i] = groups[i-1];
    groups[0] = win;
    groupCount++;
    while (groupCount > 3) groupCount--;
}

int cmp(const void* a, const void* b) {
    Sport* sa = (Sport*)a;
    Sport* sb = (Sport*)b;
    if (sa->strength != sb->strength) return sb->strength > sa->strength ? 1 : -1;
    return sa->id - sb->id;
}

int main() {
    char line[100000];
    fgets(line, sizeof(line), stdin);
    
    Sport sports[10000];
    int n = 0;
    char* token = strtok(line, " \\n");
    while (token) {
        sports[n].id = n;
        sports[n].strength = atoll(token);
        n++;
        token = strtok(NULL, " \\n");
    }
    
    Group initial = {sports, n};
    promote(&initial);
    while (groups[0].size > 1) {
        Group tmp = groups[0];
        for (int i = 0; i < groupCount - 1; i++) groups[i] = groups[i+1];
        groupCount--;
        promote(&tmp);
    }
    
    int first = groups[0].data[0].id;
    int second = groups[1].data[0].id;
    qsort(groups[2].data, groups[2].size, sizeof(Sport), cmp);
    int third = groups[2].data[0].id;
    
    printf("%d %d %d\\n", first, second, third);
    return 0;
}`},d={id:"80",title:n,examType:"A",score:100,description:t,inputDesc:i,outputDesc:s,examples:r,solution:o,codes:e};export{e as codes,d as default,t as description,p as examType,r as examples,a as id,i as inputDesc,s as outputDesc,g as score,o as solution,n as title};
