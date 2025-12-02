const l="62",n="AI面板识别",h="A",g=100,i=`AI识别到面板上有N（1 ≤ N ≤ 100）个指示灯，灯大小一样，任意两个之间无重叠。
由于AI识别误差，每次别到的指示灯位置可能有差异，以4个坐标值描述AI识别的指示灯的大小和位置(左上角x1,y1，右下角x2,y2)，
请输出先行后列排序的指示灯的编号，排序规则：
每次在尚未排序的灯中挑选最高的灯作为的基准灯，找出和基准灯属于同一行所有的灯进行排序。两个灯高低偏差不超过灯半径算同一行（即两个灯坐标的差 ≤ 灯高度的一半）。
`,t=`第一行为N，表示灯的个数 接下来N行，每行为1个灯的坐标信息，格式为：
编号 x1 y1 x2 y2
编号全局唯一1 ≤ 编号 ≤ 1000 ≤ x1 < x2 ≤ 10000 ≤ y1 < y2 ≤ 1000
`,s="排序后的编号列表，编号之间以空格分隔",e=[{input:`5
1 0 0 10 10
2 20 5 30 15
3 50 2 60 12
4 25 30 35 40
5 60 35 70 45`,output:"1 2 3 4 5",explanation:"灯1圆心(5,5)、灯2圆心(25,10)、灯3圆心(55,7)，y坐标差<=半径5，同一行按x排；灯4、5为第二行。"},{input:`3
2 10 0 20 10
1 0 0 10 10
3 30 5 40 15`,output:"1 2 3",explanation:"三个灯y坐标相近(5,5,10)，差值都<=半径5，视为同一行，按x坐标升序。"},{input:`4
1 0 0 10 10
2 0 20 10 30
3 0 40 10 50
4 0 60 10 70`,output:"1 2 3 4",explanation:"四个灯y坐标分别为5,25,45,65，各自独立成行，每行只有一个灯。"}],a=`**解题思路：**

本题是一道**排序+分组**问题。

**关键点：**
- 将矩形灯转换为圆心坐标和半径
- y坐标差不超过半径视为同一行

**算法步骤：**
1. 计算每个灯的圆心(x,y)和半径r
2. 按y坐标升序排列所有灯
3. 从最高灯开始，找出所有y坐标差<=半径的灯作为同一行
4. 同一行内按x坐标升序排列
5. 继续处理剩余未分组的灯

**时间复杂度**：O(N log N)`,o={java:`import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;
import java.util.StringJoiner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int n = sc.nextInt();

    Light[] lights = new Light[n];
    for (int i = 0; i < n; i++) {
      int id = sc.nextInt();
      int x1 = sc.nextInt();
      int y1 = sc.nextInt();
      int x2 = sc.nextInt();
      int y2 = sc.nextInt();
      lights[i] = new Light(id, (x1 + x2) / 2, (y1 + y2) / 2, (x2 - x1) / 2);
    }

    System.out.println(getResult(lights));
  }

  public static String getResult(Light[] lights) {
    // 按照圆心y坐标升序
    Arrays.sort(lights, (a, b) -> a.y - b.y);

    // ans记录题解
    StringJoiner ans = new StringJoiner(" ");

    // sameRowLights记录同一行的灯
    ArrayList<Light> sameRowLights = new ArrayList<>();
    Light base = lights[0];
    sameRowLights.add(base);

    for (int i = 1; i < lights.length; i++) {
      Light light = lights[i];

      // 如果lights[i]的纵坐标和base的纵坐标相差不超过半径，则视为同一行
      if (light.y - base.y <= base.r) {
        sameRowLights.add(light);
      } else {
        // 否则，不是同一行
        // 针对同一行的灯，再按照横坐标升序
        sameRowLights.sort((a, b) -> a.x - b.x);
        sameRowLights.forEach(a -> ans.add(a.id + ""));
        sameRowLights.clear();

        // 开始新的一行记录
        base = light;
        sameRowLights.add(base);
      }
    }

    // 注意不要漏了最后一行
    if (sameRowLights.size() > 0) {
      sameRowLights.sort((a, b) -> a.x - b.x);
      sameRowLights.forEach(a -> ans.add(a.id + ""));
    }

    return ans.toString();
  }
}

class Light {
  int id; // 编号
  int x; // 圆心横坐标
  int y; // 圆心纵坐标
  int r; // 圆半径

  public Light(int id, int x, int y, int r) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r;
  }
}`,python:`class Light:
    def __init__(self, id, x, y, r):
        self.id = id  # 编号
        self.x = x  # 圆心横坐标
        self.y = y  # 圆心纵坐标
        self.r = r  # 圆半径


# 输入获取
n = int(input())
arr = [list(map(int, input().split())) for _ in range(n)]
lights = list(map(lambda ele: Light(ele[0], (ele[1] + ele[3]) // 2, (ele[2] + ele[4]) // 2, (ele[3] - ele[1]) // 2), arr))


# 算法入口
def getResult():
    # 按照圆心y坐标升序
    lights.sort(key=lambda l: l.y)

    # ans记录题解
    ans = []

    # sameRowLights记录同一行的灯
    sameRowLights = []
    base = lights[0]
    sameRowLights.append(base)

    for i in range(1, len(lights)):
        light = lights[i]

        # 如果lights[i]的纵坐标和base的纵坐标相差不超过半径，则视为同一行
        if light.y - base.y <= base.r:
            sameRowLights.append(light)
        else:
            # 否则，不是同一行
            # 针对同一行的灯，再按照横坐标升序
            sameRowLights.sort(key=lambda l: l.x)
            for l in sameRowLights:
                ans.append(l.id)
            sameRowLights.clear()

            # 开始新的一行记录
            base = light
            sameRowLights.append(base)

    # 注意不要漏了最后一行
    if len(sameRowLights) > 0:
        sameRowLights.sort(key=lambda l: l.x)
        for l in sameRowLights:
            ans.append(l.id)

    return " ".join(map(str, ans))


# 算法调用
print(getResult())`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const lines = [];
rl.on('line', (line) => {
    lines.push(line);
}).on('close', () => {
    const n = parseInt(lines[0]);
    const lights = [];
    
    for (let i = 1; i <= n; i++) {
        const [id, x1, y1, x2, y2] = lines[i].split(' ').map(Number);
        lights.push({
            id,
            x: Math.floor((x1 + x2) / 2),
            y: Math.floor((y1 + y2) / 2),
            r: Math.floor((x2 - x1) / 2)
        });
    }
    
    // 按y坐标升序排序
    lights.sort((a, b) => a.y - b.y);
    
    const ans = [];
    let sameRowLights = [];
    let base = lights[0];
    sameRowLights.push(base);
    
    for (let i = 1; i < lights.length; i++) {
        const light = lights[i];
        if (light.y - base.y <= base.r) {
            sameRowLights.push(light);
        } else {
            sameRowLights.sort((a, b) => a.x - b.x);
            sameRowLights.forEach(l => ans.push(l.id));
            sameRowLights = [];
            base = light;
            sameRowLights.push(base);
        }
    }
    
    if (sameRowLights.length > 0) {
        sameRowLights.sort((a, b) => a.x - b.x);
        sameRowLights.forEach(l => ans.push(l.id));
    }
    
    console.log(ans.join(' '));
});`,cpp:`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Light {
    int id, x, y, r;
};

int main() {
    int n;
    cin >> n;
    
    vector<Light> lights(n);
    for (int i = 0; i < n; i++) {
        int id, x1, y1, x2, y2;
        cin >> id >> x1 >> y1 >> x2 >> y2;
        lights[i] = {id, (x1 + x2) / 2, (y1 + y2) / 2, (x2 - x1) / 2};
    }
    
    // 按y坐标升序
    sort(lights.begin(), lights.end(), [](const Light& a, const Light& b) {
        return a.y < b.y;
    });
    
    vector<int> ans;
    vector<Light> sameRowLights;
    Light base = lights[0];
    sameRowLights.push_back(base);
    
    for (int i = 1; i < n; i++) {
        Light& light = lights[i];
        if (light.y - base.y <= base.r) {
            sameRowLights.push_back(light);
        } else {
            sort(sameRowLights.begin(), sameRowLights.end(), [](const Light& a, const Light& b) {
                return a.x < b.x;
            });
            for (const auto& l : sameRowLights) ans.push_back(l.id);
            sameRowLights.clear();
            base = light;
            sameRowLights.push_back(base);
        }
    }
    
    if (!sameRowLights.empty()) {
        sort(sameRowLights.begin(), sameRowLights.end(), [](const Light& a, const Light& b) {
            return a.x < b.x;
        });
        for (const auto& l : sameRowLights) ans.push_back(l.id);
    }
    
    for (int i = 0; i < ans.size(); i++) {
        cout << ans[i];
        if (i < ans.size() - 1) cout << " ";
    }
    cout << endl;
    
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int id, x, y, r;
} Light;

int cmpByY(const void* a, const void* b) {
    return ((Light*)a)->y - ((Light*)b)->y;
}

int cmpByX(const void* a, const void* b) {
    return ((Light*)a)->x - ((Light*)b)->x;
}

int main() {
    int n;
    scanf("%d", &n);
    
    Light* lights = (Light*)malloc(n * sizeof(Light));
    for (int i = 0; i < n; i++) {
        int id, x1, y1, x2, y2;
        scanf("%d %d %d %d %d", &id, &x1, &y1, &x2, &y2);
        lights[i].id = id;
        lights[i].x = (x1 + x2) / 2;
        lights[i].y = (y1 + y2) / 2;
        lights[i].r = (x2 - x1) / 2;
    }
    
    qsort(lights, n, sizeof(Light), cmpByY);
    
    int* ans = (int*)malloc(n * sizeof(int));
    int ansLen = 0;
    
    Light* sameRow = (Light*)malloc(n * sizeof(Light));
    int rowLen = 0;
    Light base = lights[0];
    sameRow[rowLen++] = base;
    
    for (int i = 1; i < n; i++) {
        if (lights[i].y - base.y <= base.r) {
            sameRow[rowLen++] = lights[i];
        } else {
            qsort(sameRow, rowLen, sizeof(Light), cmpByX);
            for (int j = 0; j < rowLen; j++) ans[ansLen++] = sameRow[j].id;
            rowLen = 0;
            base = lights[i];
            sameRow[rowLen++] = base;
        }
    }
    
    if (rowLen > 0) {
        qsort(sameRow, rowLen, sizeof(Light), cmpByX);
        for (int j = 0; j < rowLen; j++) ans[ansLen++] = sameRow[j].id;
    }
    
    for (int i = 0; i < ansLen; i++) {
        printf("%d", ans[i]);
        if (i < ansLen - 1) printf(" ");
    }
    printf("\\n");
    
    free(lights);
    free(ans);
    free(sameRow);
    return 0;
}`},r={id:"62",title:n,examType:"A",score:100,description:i,inputDesc:t,outputDesc:s,examples:e,solution:a,codes:o};export{o as codes,r as default,i as description,h as examType,e as examples,l as id,t as inputDesc,s as outputDesc,g as score,a as solution,n as title};
