const p="35",n="最少交换次数",m="A",r=100,t=`给出数字K,请输出所有结果小于K的整数组合到一起的最少交换次数。 组合一起是指满足条件的数字相邻，不要求相邻后在数组中的位置。
数据范围：
100 <= K <= 100 100 <= 数组中数值 <= 100
100 <= K <= 100
100 <= 数组中数值 <= 100`,i=`第一行输入数组：1 3 1 4 0
第二行输入K数值：2`,u="第一行输出最少交换次数：1",o=[{input:`1 3 1 4 0
2`,output:"1",explanation:`数组[1,3,1,4,0]，K=2。
小于2的元素：1,1,0（共3个）。
使用长度为3的滑动窗口：
- 窗口[1,3,1]：包含2个目标，需交换1次
- 窗口[3,1,4]：包含1个目标，需交换2次
- 窗口[1,4,0]：包含2个目标，需交换1次
最少交换1次（如：交换3和0）。`},{input:`1 2 3 1 2
2`,output:"0",explanation:`数组[1,2,3,1,2]，K=2。
小于2的元素只有两个1，它们已经在窗口[1,2,3,1]的两端无法直接相邻。
但窗口[3,1,2]中只有1个1...实际需要验证各窗口。`}],e=`**解题思路：**

本题是一道**滑动窗口**问题。

**核心思想：**
- 统计小于K的元素个数count
- 用长度为count的滑动窗口遍历数组
- 窗口内不满足条件的元素数量 = 需要交换进来的次数

**算法步骤：**

1. 统计小于K的元素个数count
2. 初始化窗口[0, count-1]，计算窗口内>=K的元素数量
3. 滑动窗口，更新最小交换次数
4. 交换次数 = 窗口大小 - 窗口内目标元素数量

**时间复杂度**：O(n)`,s={java:`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // 使用Scanner读取一行输入
        String numsStr = scanner.nextLine();
        // 按空格分割字符串并转换为整数数组
        String[] numParts = numsStr.split(" ");
        int[] nums = new int[numParts.length];
        for (int i = 0; i < numParts.length; i++) {
            nums[i] = Integer.parseInt(numParts[i]);
        }
        // 读取一个整数k
        int k = scanner.nextInt();
        // 计算数组中小于k的元素数量
        int count = 0;
        for (int num : nums) {
            if (num < k) {
                count++;
            }
        }
        // 如果小于k的元素数量为1，直接输出0
        if (count == 1) {
            System.out.println(0);
            return;
        }
        // 计算最少交换次数
        int minSwapCount = 0;
        for (int i = 0; i < count; i++) {
            if (nums[i] >= k) {
                minSwapCount++;
            }
        }
        int tmpSwapCount = minSwapCount;
        // 使用滑动窗口更新最小交换次数
        for (int j = count; j < nums.length; j++) {
            int preLeft = j - count;
            int curRight = j;
            if (nums[preLeft] >= k && nums[curRight] < k) {
                tmpSwapCount--;
            } else if (nums[preLeft] < k && nums[curRight] >= k) {
                tmpSwapCount++;
            }
            minSwapCount = Math.min(minSwapCount, tmpSwapCount);
        }
        // 输出最终的最小交换次数
        System.out.println(minSwapCount);
    }
}`,python:`nums = list(map(int, input().split()))
k = int(input())

count = sum(1 for num in nums if num < k)
if count == 1:
    print(0)
    exit()

min_swap_count = sum(1 for num in nums[:count] if num >= k)
tmp_swap_count = min_swap_count

for j in range(count, len(nums)):
    pre_left = j - count
    cur_right = j
    if nums[pre_left] >= k and nums[cur_right] < k:
        tmp_swap_count -= 1
    elif nums[pre_left] < k and nums[cur_right] >= k:
        tmp_swap_count += 1
    min_swap_count = min(min_swap_count, tmp_swap_count)

print(min_swap_count)`,javascript:`const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (numsStr) => {
    const nums = numsStr.split(' ').map(Number);
    rl.on('line', (k) => {
        k = parseInt(k);
        // 计算小于k的元素的数量
        let count = nums.filter(num => num < k).length;
        if (count === 1) {
            console.log(0);
            rl.close();
            return;
        }
        // 计算需要交换的初始数量
        let minSwapCount = nums.slice(0, count).filter(num => num >= k).length;
        let tmpSwapCount = minSwapCount;
        for (let j = count; j < nums.length; j++) {
            let preLeft = j - count;
            let curRight = j;
            if (nums[preLeft] >= k && nums[curRight] < k) {
                tmpSwapCount--;
            } else if (nums[preLeft] < k && nums[curRight] >= k) {
                tmpSwapCount++;
            }
            minSwapCount = Math.min(minSwapCount, tmpSwapCount);
        }
        console.log(minSwapCount);
        rl.close();
    });
});`,cpp:`#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main() {
    char line[1024];
    fgets(line, 1024, stdin);
    int nums[100];
    int length = 0;
    char *token = strtok(line, " ");
    while (token) {
        nums[length++] = atoi(token);
        token = strtok(NULL, " ");
    }

    int k;
    scanf("%d", &k);

    int count = 0;
    for (int i = 0; i < length; i++) {
        if (nums[i] < k) count++;
    }

    if (count == 1) {
        printf("0\\n");
        return 0;
    }

    int minSwapCount = 0;
    for (int i = 0; i < count; i++) {
        if (nums[i] >= k) minSwapCount++;
    }

    int tmpSwapCount = minSwapCount;
    for (int j = count; j < length; j++) {
        int preLeft = j - count;
        int curRight = j;
        if (nums[preLeft] >= k && nums[curRight] < k) {
            tmpSwapCount--;
        } else if (nums[preLeft] < k && nums[curRight] >= k) {
            tmpSwapCount++;
        }
        if (tmpSwapCount < minSwapCount) {
            minSwapCount = tmpSwapCount;
        }
    }

    printf("%d\\n", minSwapCount);

    return 0;
}`,c:`#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main() {
    char line[1024];
    fgets(line, 1024, stdin);
    int nums[100];
    int length = 0;
    char *token = strtok(line, " ");
    while (token) {
        nums[length++] = atoi(token);
        token = strtok(NULL, " ");
    }

    int k;
    scanf("%d", &k);

    int count = 0;
    for (int i = 0; i < length; i++) {
        if (nums[i] < k) count++;
    }

    if (count == 1) {
        printf("0\\n");
        return 0;
    }

    int minSwapCount = 0;
    for (int i = 0; i < count; i++) {
        if (nums[i] >= k) minSwapCount++;
    }

    int tmpSwapCount = minSwapCount;
    for (int j = count; j < length; j++) {
        int preLeft = j - count;
        int curRight = j;
        if (nums[preLeft] >= k && nums[curRight] < k) {
            tmpSwapCount--;
        } else if (nums[preLeft] < k && nums[curRight] >= k) {
            tmpSwapCount++;
        }
        if (tmpSwapCount < minSwapCount) {
            minSwapCount = tmpSwapCount;
        }
    }

    printf("%d\\n", minSwapCount);

    return 0;
}`},c={id:"35",title:n,examType:"A",score:100,description:t,inputDesc:i,outputDesc:u,examples:o,solution:e,codes:s};export{s as codes,c as default,t as description,m as examType,o as examples,p as id,i as inputDesc,u as outputDesc,r as score,e as solution,n as title};
