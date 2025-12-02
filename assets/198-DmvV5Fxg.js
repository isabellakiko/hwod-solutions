const p="198",n="统计射击比赛成绩",o="B",l=100,e=`给定一个射击比赛成绩单，包含多个选手若干次射击的成绩分数，请对每个选手按其最高3个分数之和进行降序排名，输出降序排名后的选手ID序列。

一个选手可以有多个射击成绩的分数，且次序不固定。如果一个选手成绩少于3个，则认为选手的所有成绩无效，排名忽略该选手。如果选手的成绩之和相等，则成绩之和相等的选手按照其ID降序排列。`,t=`输入第一行，一个整数N，表示该场比赛总共进行了N次射击，产生N个成绩分数（2<=N<=100）。输入第二行，一个长度为N整数序列，表示参与每次射击的选手ID（0<=ID<=99）。输入第三行，一个长度为N整数序列，表示参与每次射击的选手对应的成绩（0<=成绩<=100）。
`,s=`符合题设条件的降序排名后的选手ID序列。

13 3,3,7,4,4,4,4,7,7,3,5,5,5 53,80,68,24,39,76,66,16,100,55,53,80,55
该场射击比赛进行了13次
参赛的选手为3,4,5,7
比较各个选手最高3个成绩的和，有3号=5号>7号>4号，由于3号和5号成绩相等且ID号5>3， 所以输出为：5,3,7,4

简答的排序问题，按照题目要求写排序规则即可。
`,r=[{input:`13
3,3,7,4,4,4,4,7,7,3,5,5,5
53,80,68,24,39,76,66,16,100,55,53,80,55`,output:"5,3,7,4",explanation:"3号最高3分和188，5号188，7号184，4号181，5和3成绩相同按ID降序"},{input:`5
1,1,1,2,2
90,80,70,100,50`,output:"1",explanation:"1号有3个成绩，总分240；2号只有2个成绩无效"}],i=`**解题思路：**

本题是一道**排序统计**问题。

**核心思路：**
- 统计每个选手的成绩
- 取最高3个成绩求和
- 按成绩和、ID降序排序

**算法步骤：**
1. 按选手ID分组统计成绩
2. 过滤成绩少于3个的选手
3. 每个选手取最高3分求和
4. 按和降序、ID降序排序输出

**时间复杂度**：O(N*logN)`,a={java:`import java.util.*;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int n = Integer.parseInt(sc.nextLine());

    Integer[] ids =
        Arrays.stream(sc.nextLine().split(",")).map(Integer::parseInt).toArray(Integer[]::new);

    Integer[] scores =
        Arrays.stream(sc.nextLine().split(",")).map(Integer::parseInt).toArray(Integer[]::new);

    System.out.println(getResult(n, ids, scores));
  }

  public static String getResult(int n, Integer[] ids, Integer[] scores) {
    HashMap<Integer, ArrayList<Integer>> players = new HashMap<>();

    for (int i = 0; i < n; i++) {
      players.putIfAbsent(ids[i], new ArrayList<>());
      players.get(ids[i]).add(scores[i]);
    }

    ArrayList<int[]> ans = new ArrayList<>();

    for (int id : players.keySet()) {
      ArrayList<Integer> idScores = players.get(id);
      if (idScores.size() >= 3) {
        int total =
            idScores.stream().sorted((a, b) -> b - a).limit(3).reduce(Integer::sum).orElse(0);

        ans.add(new int[] {id, total});
      }
    }

    ans.sort((a, b) -> a[1] != b[1] ? b[1] - a[1] : b[0] - a[0]);

    StringJoiner sj = new StringJoiner(",");
    for (int[] player : ans) sj.add(player[0] + "");

    return sj.toString();
  }
}`,python:`# 输入获取
n = int(input())
ids = list(map(int, input().split(",")))
scores = list(map(int, input().split(",")))


# 算法入口
def getResult():
    players = {}

    for i in range(n):
        players.setdefault(ids[i], [])
        players.get(ids[i]).append(scores[i])

    ans = []

    for pid in players:
        if len(players[pid]) >= 3:
            players[pid].sort(reverse=True)
            ans.append((pid, sum(players[pid][:3])))

    ans.sort(key=lambda x: (-x[1], -x[0]))

    return ",".join(map(lambda x: str(x[0]), ans))


# 算法调用
print(getResult())`,javascript:"",cpp:"",c:""},c={id:"198",title:n,examType:"B",score:100,description:e,inputDesc:t,outputDesc:s,examples:r,solution:i,codes:a};export{a as codes,c as default,e as description,o as examType,r as examples,p as id,t as inputDesc,s as outputDesc,l as score,i as solution,n as title};
