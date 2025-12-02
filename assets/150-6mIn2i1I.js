const r="150",n="会议接待",u="A",o=200,t=`某组织举行会议，来了多个代表团同时到达，接待处只有一辆汽车，可以同时接待多个代表团，为了提高车辆利用率，请帮接待员计算可以坐满车的接待方案，输出方案数量。
约束:
一个团只能上一辆车，并且代表团人数 (代表团数量小于30，每个代表团人数小于30)小于汽车容量(汽车容量小于100)需要将车辆坐满
一个团只能上一辆车，并且代表团人数 (代表团数量小于30，每个代表团人数小于30)小于汽车容量(汽车容量小于100)
需要将车辆坐满
`,i=`第一行 代表团人数，英文逗号隔开，代表团数量小于30，每个代表团人数小于30 第二行 汽车载客量，汽车容量小于100
`,e="坐满汽车的方案数量 如果无解输出0",p=[{input:`5,4,2,3,2,4
10`,output:"4",explanation:"容量10，可选5+2+3、5+3+2、4+4+2、4+2+4等组合刚好坐满，共4种方案"},{input:`3,3,3
6`,output:"3",explanation:"容量6，可选任意两个代表团(各3人)，共C(3,2)=3种方案"}],s=`**解题思路：**

本题是一道**01背包计数**问题。

**核心思路：**
- 转化为恰好装满背包的方案数问题
- dp[i][j]表示前i个代表团恰好坐满容量j的方案数

**算法步骤：**
1. 初始化dp[0][0]=1（空背包有1种方案）
2. 遍历每个代表团，更新dp数组
3. 对每个容量j：不选当前团dp[i-1][j]，选当前团dp[i-1][j-num]
4. 返回dp[n][bag]

**时间复杂度**：O(N×C)，N为代表团数，C为汽车容量`,a={java:`import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Integer[] nums = Arrays.stream(sc.nextLine().split(",")).map(Integer::parseInt).toArray(Integer[]::new);
        int bag = Integer.parseInt(sc.nextLine());
        System.out.println(getResult(nums, bag));
    }

    private static int getResult(Integer[] nums, int bag) {
        int n = nums.length;
        int[][] dp = new int[n + 1][bag + 1];
        dp[0][0] = 1;

        for (int i = 1; i <= n; i++) {
            int num = nums[i - 1];
            for (int j = 0; j <= bag; j++) {
                if (j < num) {
                    dp[i][j] = dp[i - 1][j];
                } else {
                    dp[i][j] = dp[i - 1][j] + dp[i - 1][j - num];
                }
            }
        }
        return dp[n][bag];
    }
}`,python:`# 输入获取
nums = list(map(int, input().split(",")))
bag = int(input())

# 算法入口
def getResult():
    n = len(nums)
    dp = [[0] * (bag + 1) for _ in range(n + 1)]
    dp[0][0] = 1

    for i in range(1, n + 1):
        num = nums[i - 1]
        for j in range(bag + 1):
            if j < num:
                dp[i][j] = dp[i - 1][j]
            else:
                dp[i][j] = dp[i - 1][j] + dp[i - 1][j - num]

    return dp[n][bag]

# 算法调用
print(getResult())`,javascript:"",cpp:"",c:""},c={id:"150",title:n,examType:"A",score:200,description:t,inputDesc:i,outputDesc:e,examples:p,solution:s,codes:a};export{a as codes,c as default,t as description,u as examType,p as examples,r as id,i as inputDesc,e as outputDesc,o as score,s as solution,n as title};
