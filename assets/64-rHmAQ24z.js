const u="64",n="MVP争夺战",c="A",o=100,t="在星球争霸篮球赛对抗赛中，最大的宇宙战队希望每个人都能拿到MVP，MVP的条件是单场最高分得分获得者。 可以并列所以宇宙战队决定在比赛中尽可能让更多队员上场，并且让所有得分的选手得分都相同， 然而比赛过程中的每1分钟的得分都只能由某一个人包揽。",r=`输入第一行为一个数字 t ，表示为有得分的分钟数 1 ≤ t ≤ 50
第二行为 t 个数字，代表每一分钟的得分 p， 1 ≤ p ≤ 50`,i="输出有得分的队员都是MVP时，最少得MVP得分。",e=[{input:`3
3 3 3`,output:"3",explanation:"总分9分，可分给3人每人3分，最少MVP得分为3。"},{input:`5
1 2 3 4 5`,output:"5",explanation:"总分15分，可分给3人每人5分(1+4=5, 2+3=5, 5=5)，最少MVP得分为5。"},{input:`4
2 3 5 7`,output:"17",explanation:"总分17，无法均分，只能1人包揽，MVP得分为17。"}],a=`**解题思路：**

本题是一道**回溯+剪枝**问题，类似于将数组分成k个相等和的子集。

**算法步骤：**
1. 计算总分sum
2. 从最大得分开始，尝试将总分分成m份
3. 使用回溯法判断能否分成m个和相等的子集
4. 找到能分成的最小子集和即为答案

**剪枝优化：**
- 总分必须能被m整除
- 子集和必须>=最大元素
- 跳过相同的空桶

**时间复杂度**：O(k^N)`,s={java:`import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        int sum = 0;
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
            sum += arr[i];
        }
        Arrays.sort(arr);
        // 反转为降序
        for (int i = 0; i < n / 2; i++) {
            int tmp = arr[i];
            arr[i] = arr[n - 1 - i];
            arr[n - 1 - i] = tmp;
        }
        
        // 从最大元素开始尝试每个可能的子集和
        for (int target = arr[0]; target <= sum; target++) {
            if (sum % target == 0) {
                int k = sum / target;
                int[] buckets = new int[k];
                if (canPartition(arr, 0, buckets, target)) {
                    System.out.println(target);
                    return;
                }
            }
        }
        System.out.println(sum);
    }
    
    static boolean canPartition(int[] arr, int idx, int[] buckets, int target) {
        if (idx == arr.length) return true;
        for (int i = 0; i < buckets.length; i++) {
            if (i > 0 && buckets[i] == buckets[i-1]) continue;
            if (buckets[i] + arr[idx] <= target) {
                buckets[i] += arr[idx];
                if (canPartition(arr, idx + 1, buckets, target)) return true;
                buckets[i] -= arr[idx];
            }
            if (buckets[i] == 0) break;
        }
        return false;
    }
}`,python:`def dfs(arr, buckets, idx, target):
    if idx == len(arr):
        return True
    for i in range(len(buckets)):
        if i > 0 and buckets[i] == buckets[i-1]:
            continue
        if buckets[i] + arr[idx] <= target:
            buckets[i] += arr[idx]
            if dfs(arr, buckets, idx + 1, target):
                return True
            buckets[i] -= arr[idx]
        if buckets[i] == 0:
            break
    return False

n = int(input())
arr = list(map(int, input().split()))
total = sum(arr)
arr.sort(reverse=True)

for target in range(arr[0], total + 1):
    if total % target == 0:
        k = total // target
        buckets = [0] * k
        if dfs(arr, buckets, 0, target):
            print(target)
            break`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const lines = [];
rl.on('line', (line) => {
    lines.push(line);
    if (lines.length === 2) {
        const n = parseInt(lines[0]);
        const arr = lines[1].split(' ').map(Number);
        console.log(solve(arr));
        rl.close();
    }
});

function solve(arr) {
    const sum = arr.reduce((a, b) => a + b, 0);
    arr.sort((a, b) => b - a);
    
    for (let target = arr[0]; target <= sum; target++) {
        if (sum % target === 0) {
            const k = sum / target;
            const buckets = new Array(k).fill(0);
            if (canPartition(arr, 0, buckets, target)) {
                return target;
            }
        }
    }
    return sum;
}

function canPartition(arr, idx, buckets, target) {
    if (idx === arr.length) return true;
    for (let i = 0; i < buckets.length; i++) {
        if (i > 0 && buckets[i] === buckets[i-1]) continue;
        if (buckets[i] + arr[idx] <= target) {
            buckets[i] += arr[idx];
            if (canPartition(arr, idx + 1, buckets, target)) return true;
            buckets[i] -= arr[idx];
        }
        if (buckets[i] === 0) break;
    }
    return false;
}`,cpp:`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

bool canPartition(vector<int>& arr, int idx, vector<int>& buckets, int target) {
    if (idx == arr.size()) return true;
    for (int i = 0; i < buckets.size(); i++) {
        if (i > 0 && buckets[i] == buckets[i-1]) continue;
        if (buckets[i] + arr[idx] <= target) {
            buckets[i] += arr[idx];
            if (canPartition(arr, idx + 1, buckets, target)) return true;
            buckets[i] -= arr[idx];
        }
        if (buckets[i] == 0) break;
    }
    return false;
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    int sum = 0;
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
        sum += arr[i];
    }
    sort(arr.begin(), arr.end(), greater<int>());
    
    for (int target = arr[0]; target <= sum; target++) {
        if (sum % target == 0) {
            int k = sum / target;
            vector<int> buckets(k, 0);
            if (canPartition(arr, 0, buckets, target)) {
                cout << target << endl;
                return 0;
            }
        }
    }
    cout << sum << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>

int arr[55];
int buckets[55];
int n, k;

int cmp(const void* a, const void* b) {
    return *(int*)b - *(int*)a;
}

int canPartition(int idx, int target) {
    if (idx == n) return 1;
    for (int i = 0; i < k; i++) {
        if (i > 0 && buckets[i] == buckets[i-1]) continue;
        if (buckets[i] + arr[idx] <= target) {
            buckets[i] += arr[idx];
            if (canPartition(idx + 1, target)) return 1;
            buckets[i] -= arr[idx];
        }
        if (buckets[i] == 0) break;
    }
    return 0;
}

int main() {
    scanf("%d", &n);
    int sum = 0;
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
        sum += arr[i];
    }
    qsort(arr, n, sizeof(int), cmp);
    
    for (int target = arr[0]; target <= sum; target++) {
        if (sum % target == 0) {
            k = sum / target;
            for (int i = 0; i < k; i++) buckets[i] = 0;
            if (canPartition(0, target)) {
                printf("%d\\n", target);
                return 0;
            }
        }
    }
    printf("%d\\n", sum);
    return 0;
}`},k={id:"64",title:n,examType:"A",score:100,description:t,inputDesc:r,outputDesc:i,examples:e,solution:a,codes:s};export{s as codes,k as default,t as description,c as examType,e as examples,u as id,r as inputDesc,i as outputDesc,o as score,a as solution,n as title};
