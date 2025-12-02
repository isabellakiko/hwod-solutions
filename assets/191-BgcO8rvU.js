const s="191",n="整理扑克牌",c="B",m=100,e=`给定一组数字，表示扑克牌的牌面数字，忽略扑克牌的花色，请按如下规则对这一组扑克牌进行整理：
步骤1. 对扑克牌进行分组，形成组合牌，规则如下：
当牌面数字相同张数大于等于4时，组合牌为“炸弹”；3张相同牌面数字 + 2张相同牌面数字，且3张牌与2张牌不相同时，组合牌为“葫芦”；3张相同牌面数字，组合牌为“三张”；2张相同牌面数字，组合牌为“对子”；剩余没有相同的牌，则为“单张”；
步骤2. 对上述组合牌进行由大到小排列，规则如下：
不同类型组合牌之间由大到小排列规则：“炸弹” > “葫芦” > “三张” > “对子” > “单张”；相同类型组合牌之间，除“葫芦”外，按组合牌全部牌面数字加总由大到小排列；“葫芦”则先按3张相同牌面数字加总由大到小排列，3张相同牌面数字加总相同时，再按另外2张牌面数字加总由大到小排列；由于“葫芦”>“三张”，因此如果能形成更大的组合牌，也可以将“三张”拆分为2张和1张，其中的2张可以和其它“三张”重新组合成“葫芦”，剩下的1张为“单张”
步骤3. 当存在多个可能组合方案时，按如下规则排序取最大的一个组合方案：
依次对组合方案中的组合牌进行大小比较，规则同上；当组合方案A中的第n个组合牌大于组合方案B中的第n个组合牌时，组合方案A大于组合方案B；
`,t=`第一行为空格分隔的N个正整数，每个整数取值范围[1,13]，N的取值范围[1,1000]
`,a=`经重新排列后的扑克牌数字列表，每个数字以空格分隔

我的解题思路如下：
首先，将给定牌中，炸弹，三张，对子，单子先统计出来，即先不处理葫芦。
统计逻辑很简单，就是看某个牌面的数量：
统计完后，我们就可以先对炸弹进行排序，排序规则是：全部牌面数字加总由大到小排列
接着可以组合葫芦了，组合逻辑如下：
首先，需要先对三张、对子按照加总降序
然后，选取一个最大的三张，并比较第二大的三张的牌面和第一大的对子的牌面
按照上面规则组合葫芦，直到三张用完。
注意上面逻辑是三张用完结束，而不是对子用完，因为还有一种情况就是对子先用完了，但是三张还有多个，此时我们要继续拆分小的三张来组合大三张为葫芦。
组合完葫芦后。
我们就可以对单张进行加总降序排序了，因为组合葫芦过程中，很可能产生新的单张。
最后，依次将统计并排序后的炸弹、葫芦、三张、对子、单张，打印出来
2023.03.24 补充说明
在看了满分答案后，我发现当前我的代码实现和满分答案的区别仅仅在于炸弹排序有所不同，比如下面用例：
5 5 5 5 4 4 4 4 4
满分答案的输出是：4 4 4 4 4 5 5 5 5
我的答案输出是：5 5 5 5 4 4 4 4 4

对满分答案经过分析后，我发现造成这个差异的原因是，我对题目中“加总”的理解有偏差。
比如，斗地主时，炸弹的张数越多，炸弹越大，因此五个4 在现实中就是要比 四个5 的炸弹大。
但是本题中“加总”这个词比较有迷惑性，我理解是 = 牌面值 * 牌数量，即炸弹的所有牌之和，因此我的逻辑中 五个4 和 四个5 的炸弹是一样大的。
而满分答案的对“加总”的理解和现实生活中一致，就是炸弹的牌数越多，就越大。

因此，本题代码修正非常容易，就是将炸弹的排序规则修改一下，先按照炸弹牌的牌数量降序，如果牌数量一致，则再按照牌面大小降序。
比如下面代码中：
JS的第49行
Java的第58行
Python的第37行

那么其他类型牌，比如葫芦，三张，对子，单张，的排序逻辑是否需要变动呢？
答案是不需要，因为这些类型牌中的牌数量都是固定的，比如葫芦就是3+2，三张就是3，对子就是2，单张就是1。因此这些同类型牌之间的对比就是牌面值得对比。可以沿用之前得逻辑。
`,r=[{input:"1 2 3 3 3 4 4",output:"4 4 3 3 3 2 1",explanation:"对子4>三张3>单张2>单张1"},{input:"5 5 5 4 4 4 3 3",output:"5 5 5 4 4 4 3 3",explanation:"三张5和三张4可组合成两个葫芦：5 5 5 4 4和4 4 4 3 3不如直接两个三张大"}],i=`**解题思路：**

本题是一道**模拟+贪心**问题。

**核心思路：**
- 按规则分组：炸弹>葫芦>三张>对子>单张
- 同类型按牌面值排序
- 三张可拆分为对子组合葫芦

**算法步骤：**
1. 统计各牌面数量，分为炸弹、三张、对子、单张
2. 尝试用三张+对子组合葫芦
3. 各类型按规则排序
4. 依次输出炸弹、葫芦、三张、对子、单张

**时间复杂度**：O(N*logN)`,o={java:`import java.util.*;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    String str = sc.nextLine();
    Integer[] arr = Arrays.stream(str.split(" ")).map(Integer::parseInt).toArray(Integer[]::new);

    System.out.println(getResult(arr));
  }

  public static String getResult(Integer[] arr) {
    HashMap<Integer, Integer> card = new HashMap<>();

    // 统计各种牌面的数量
    for (Integer num : arr) {
      if (card.containsKey(num)) {
        int val = card.get(num);
        card.put(num, ++val);
      } else {
        card.put(num, 1);
      }
    }

    // 统计组合，4代表炸弹，3+2代表葫芦，3代表三张，2代表对子，1代表单张
    HashMap<String, LinkedList<Integer[]>> combine = new HashMap<>();
    combine.put("4", new LinkedList<Integer[]>());
    combine.put("3+2", new LinkedList<Integer[]>());
    combine.put("3", new LinkedList<Integer[]>());
    combine.put("2", new LinkedList<Integer[]>());
    combine.put("1", new LinkedList<Integer[]>());

    // 首先将初始组合统计出来
    Set<Integer> cardKeys = card.keySet();
    for (Integer num : cardKeys) {
      switch (card.get(num)) {
        case 3:
          combine.get("3").add(new Integer[] {num});
          break;
        case 2:
          combine.get("2").add(new Integer[] {num});
          break;
        case 1:
          combine.get("1").add(new Integer[] {num});
          break;
        default:
          combine
              .get("4")
              .add(
                  new Integer[] {
                    num, card.get(num)
                  }); // 由于炸弹可能有4张以上相同牌面组成，因此既需要统计牌面num，也需要统计牌数card[num]
      }
    }

    // 炸弹排序
    combine.get("4").sort((a, b) -> !Objects.equals(a[1], b[1]) ? b[1] - a[1] : b[0] - a[0]);

    // 三张排序，牌面值越大，三张越大
    combine.get("3").sort((a, b) -> b[0] - a[0]);

    // 对子排序，牌面值越大，对子越大
    combine.get("2").sort((a, b) -> b[0] - a[0]);

    // 尝试组合出葫芦
    while (combine.get("3").size() > 0) {
      // 如果对子用完，三张还有一个，那么可以直接结束循环
      if (combine.get("2").size() == 0 && combine.get("3").size() == 1) break;

      // 否则，选取一个最大的三张
      Integer san_top = combine.get("3").removeFirst()[0];

      Integer tmp;
      // 如果此时没有对子了，胡总和第二大的三张的牌面，比最大的对子牌面大，则可以拆分三张，组合出葫芦
      if (combine.get("2").size() == 0
          || (combine.get("3").size() > 0
              && combine.get("3").get(0)[0] > combine.get("2").get(0)[0])) {
        tmp = combine.get("3").removeFirst()[0];
        // 拆分三张为对子的话，会多出一个单张
        combine.get("1").add(new Integer[] {tmp});
      } else {
        // 如果对子牌面比三张大，则不需要拆分三张，直接使用对子组合出葫芦
        tmp = combine.get("2").removeFirst()[0];
      }
      combine.get("3+2").add(new Integer[] {san_top, tmp}); // 葫芦元素含义：[三张牌面，对子牌面]
    }

    // 处理完葫芦后，就可以对单张进行降序了（因为组合葫芦的过程中，可能产生新的单张，因此单张排序要在葫芦组合得到后进行）
    combine.get("1").sort((a, b) -> b[0] - a[0]);

    // ans存放题解
    ArrayList<Integer> ans = new ArrayList<>();

    // 首先将炸弹放到ans中
    for (Integer[] vals : combine.get("4")) {
      int score = vals[0];
      int count = vals[1];
      for (int i = 0; i < count; i++) {
        ans.add(score);
      }
    }

    // 然后将葫芦放大ans中
    for (Integer[] vals : combine.get("3+2")) {
      int san = vals[0];
      int er = vals[1];
      for (int i = 0; i < 3; i++) ans.add(san);
      for (int i = 0; i < 2; i++) ans.add(er);
    }

    // 之后将三张放到ans中
    for (Integer[] vals : combine.get("3")) {
      for (int i = 0; i < 3; i++) ans.add(vals[0]);
    }

    // 接着是对子放到ans中
    for (Integer[] vals : combine.get("2")) {
      for (int i = 0; i < 2; i++) ans.add(vals[0]);
    }

    // 最后是单张放到ans中
    for (Integer[] vals : combine.get("1")) {
      ans.add(vals[0]);
    }

    StringJoiner sj = new StringJoiner(" ");
    for (Integer an : ans) {
      sj.add(an + "");
    }

    return sj.toString();
  }
}`,python:`# 输入获取
arr = input().split()


# 算法入口
def getResult(arr):
    # card统计各种牌面的数量
    card = {}
    for num in arr:
        if card.get(num) is None:
            card[num] = 1
        else:
            card[num] += 1

    # combine统计组合，4代表炸弹，3+2代表葫芦，3代表三张，2代表对子，1代表单张
    combine = {
        "4": [],
        "3+2": [],
        "3": [],
        "2": [],
        "1": []
    }

    # 首先将初始组合统计出来
    for num in card.keys():
        if card[num] == 3:
            combine["3"].append(int(num))
        elif card[num] == 2:
            combine["2"].append(int(num))
        elif card[num] == 1:
            combine["1"].append(int(num))
        else:
            # 由于炸弹可能有4张以上相同牌面组成，因此既需要统计牌面num，也需要统计牌数card[num]
            combine["4"].append([int(num), card[num]])

    # 炸弹排序
    combine["4"].sort(key=lambda x: (-x[1], -x[0]))

    # 三张排序，牌面值越大，三张越大
    combine["3"].sort(reverse=True)

    # 对子降序，牌面值越大，对子越大
    combine["2"].sort(reverse=True)

    # 尝试组合出葫芦
    while len(combine["3"]) > 0:
        # 如果对子用完，三张还有一个，那么可以直接结束循环
        if len(combine["2"]) == 0 and len(combine["3"]) == 1:
            break

        # 选取一个最大的三张
        san_top = combine["3"].pop(0)

        tmp = None

        #  如果第二大的三张的牌面，比最大的对子牌面大，或者没有对子了，则可以拆分三张，组合出葫芦
        if len(combine["2"]) == 0 or (len(combine["3"]) >= 1 and combine["3"][0] > combine["2"][0]):
            tmp = combine["3"].pop(0)
            # 拆分三张为对子的话，会多出一个单张
            combine["1"].append(tmp)
        else:
            # 如果对子牌面比三张大，则不需要拆分三张，直接使用对子组合出葫芦
            tmp = combine["2"].pop(0)

        combine["3+2"].append([san_top, tmp])  # 葫芦元素含义：[三张牌面，对子牌面]

    # 处理完葫芦后，就可以对单张进行降序了（因为组合葫芦的过程中，可能产生新的单张，因此单张排序要在葫芦组合得到后进行）
    combine["1"].sort(reverse=True)

    # ans存放题解
    ans = []

    # 首先将炸弹放到ans中
    for score, count in combine["4"]:
        ans += [score] * count

    # 然后将葫芦放大ans中
    for san, er in combine["3+2"]:
        ans += [san] * 3 + [er] * 2

    # 之后将三张放到ans中
    for san in combine["3"]:
        ans += [san] * 3

    # 接着是对子放到ans中
    for er in combine["2"]:
        ans += [er] * 2

    # 最后是单张放到ans中
    for dan in combine["1"]:
        ans += [dan]

    return " ".join(map(str, ans))


# 算法调用
print(getResult(arr))`,javascript:`/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const arr = line.split(" ").map(Number);
  console.log(getResult(arr));
});

function getResult(arr) {
  const card = {};

  // 统计各种牌面的数量
  for (let num of arr) {
    card[num] ? card[num]++ : (card[num] = 1);
  }

  // 统计组合，4代表炸弹，3+2代表葫芦，3代表三张，2代表对子，1代表单张
  const combine = {
    4: [],
    "3+2": [],
    3: [],
    2: [],
    1: [],
  };

  // 首先将初始组合统计出来
  for (let num in card) {
    switch (card[num]) {
      case 3:
        combine[3].push(num - 0);
        break;
      case 2:
        combine[2].push(num - 0);
        break;
      case 1:
        combine[1].push(num - 0);
        break;
      default:
        combine[4].push([num - 0, card[num]]); // 由于炸弹可能有4张以上相同牌面组成，因此既需要统计牌面num，也需要统计牌数card[num]
    }
  }

  // 炸弹排序
  combine[4].sort((a, b) => (a[1] != b[1] ? b[1] - a[1] : b[0] - a[0]));

  // 三张排序，牌面值越大，三张越大
  combine[3].sort((a, b) => b - a);

  // 对子降序，牌面值越大，对子越大
  combine[2].sort((a, b) => b - a);

  // 尝试组合出葫芦
  while (combine[3].length) {
    // 如果对子用完，三张还有一个，那么可以直接结束循环
    if (combine[2].length === 0 && combine[3].length === 1) break;

    // 选取一个最大的三张
    const san_top = combine[3].shift();

    let tmp;
    // 如果第二大的三张的牌面，比最大的对子牌面大，或者没有对子了，则可以拆分三张，组合出葫芦
    if (
      combine[2].length === 0 ||
      (combine[3].length >= 1 && combine[3][0] > combine[2][0])
    ) {
      tmp = combine[3].shift();
      // 拆分三张为对子的话，会多出一个单张
      combine[1].push(tmp);
    } else {
      // 如果对子牌面比三张大，则不需要拆分三张，直接使用对子组合出葫芦
      tmp = combine[2].shift();
    }
    combine["3+2"].push([san_top, tmp]); // 葫芦元素含义：[三张牌面，对子牌面]
  }

  // 处理完葫芦后，就可以对单张进行降序了（因为组合葫芦的过程中，可能产生新的单张，因此单张排序要在葫芦组合得到后进行）
  combine[1].sort((a, b) => b - a);

  // ans存放题解
  const ans = [];

  // 首先将炸弹放到ans中
  for (let card of combine[4]) {
    const [score, count] = card;
    ans.push(...new Array(count).fill(score));
  }

  // 然后将葫芦放大ans中
  for (let card of combine["3+2"]) {
    const [san, er] = card;
    ans.push(...new Array(3).fill(san), ...new Array(2).fill(er));
  }

  // 之后将三张放到ans中
  for (let san of combine[3]) {
    ans.push(...new Array(3).fill(san));
  }

  // 接着是对子放到ans中
  for (let er of combine[2]) {
    ans.push(...new Array(2).fill(er));
  }

  // 最后是单张放到ans中
  ans.push(...combine[1]);

  return ans.join(" ");
}`,cpp:"",c:""},b={id:"191",title:n,examType:"B",score:100,description:e,inputDesc:t,outputDesc:a,examples:r,solution:i,codes:o};export{o as codes,b as default,e as description,c as examType,r as examples,s as id,t as inputDesc,a as outputDesc,m as score,i as solution,n as title};
