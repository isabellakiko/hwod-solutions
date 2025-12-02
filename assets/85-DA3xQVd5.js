const c="85",n="租车骑绿岛",s="A",u=100,t=`部门组织绿岛骑行团建活动。租用公共双人自行车，每辆自行车最多坐两人，最大载重M。 给出部门每个人的体重，请问最多需要租用多少双人自行车。
`,i=`第一行两个数字m、n，分别代表自行车限重，部门总人数。
第二行，n个数字，代表每个人的体重，体重都小于等于自行车限重m。
0<m<=2000<n<=1000000
`,r="最小需要的双人自行车数量。",e=[{input:`100 4
30 40 50 60`,output:"2",explanation:"排序后[30,40,50,60]，30+60=90≤100可配对，40+50=90≤100可配对，需2辆车。"},{input:`100 3
80 50 60`,output:"2",explanation:"排序后[50,60,80]，50+80=130>100不能配对，80单独1辆；50+60=110>100也不能配对，各1辆。共2辆。"},{input:`200 5
100 100 100 100 100`,output:"3",explanation:"每两人100+100=200刚好，2对用2辆，剩1人1辆，共3辆。"}],a=`**解题思路：**

本题是一道**贪心+双指针**问题。

**算法步骤：**
1. 将所有人体重升序排序
2. 双指针i指向最轻，j指向最重
3. 若arr[i]+arr[j]≤m，两人共享一辆车，i++,j--
4. 若超重，重的人单独一辆车，j--
5. 若i==j，剩一人单独一辆车

**时间复杂度**：O(N log N)`,o={java:`import java.util.Arrays;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int m = sc.nextInt();
    int n = sc.nextInt();

    int[] arr = new int[n];
    for (int i = 0; i < n; i++) {
      arr[i] = sc.nextInt();
    }

    System.out.println(getResult(arr, m));
  }

  public static int getResult(int[] arr, int m) {
    Arrays.sort(arr);

    int count = 0;

    int i = 0;
    int j = arr.length - 1;

    while (i < j) {
      if (arr[i] + arr[j] <= m) i++;
      j--;
      count++;
    }

    if (i == j) count++;

    return count;
  }
}`,python:`# 输入获取
m, n = map(int, input().split())
arr = list(map(int, input().split()))


# 算法入口
def getResult(arr, m, n):
    arr.sort()

    count = 0

    i = 0
    j = n - 1

    while i < j:
        if arr[i] + arr[j] <= m:
            i += 1
        j -= 1
        count += 1

    if i == j:
        count += 1

    return count


# 算法调用
print(getResult(arr, m, n))`,javascript:`/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on("line", (line) => {
  lines.push(line);

  if (lines.length === 2) {
    const [m, n] = lines[0].split(" ").map(Number);
    const arr = lines[1].split(" ").map(Number);

    console.log(getResult(arr, m, n));

    lines.length = 0;
  }
});

function getResult(arr, m, n) {
  arr.sort((a, b) => a - b);

  let count = 0;

  // while (arr.at(-1) >= m) {
  //   count++;
  //   arr.pop();
  // }

  let i = 0;
  let j = arr.length - 1;

  while (i < j) {
    if (arr[i] + arr[j] <= m) i++;
    j--;
    count++;
  }

  if (i === j) count++;

  return count;
}`,cpp:`#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int m, n;
    cin >> m >> n;
    
    int arr[n];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    sort(arr, arr + n);
    
    int count = 0;
    int i = 0, j = n - 1;
    
    while (i < j) {
        if (arr[i] + arr[j] <= m) i++;
        j--;
        count++;
    }
    
    if (i == j) count++;
    
    cout << count << endl;
    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>

int cmp(const void* a, const void* b) {
    return *(int*)a - *(int*)b;
}

int main() {
    int m, n;
    scanf("%d %d", &m, &n);
    
    int arr[n];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    
    qsort(arr, n, sizeof(int), cmp);
    
    int count = 0;
    int i = 0, j = n - 1;
    
    while (i < j) {
        if (arr[i] + arr[j] <= m) i++;
        j--;
        count++;
    }
    
    if (i == j) count++;
    
    printf("%d\\n", count);
    return 0;
}`},l={id:"85",title:n,examType:"A",score:100,description:t,inputDesc:i,outputDesc:r,examples:e,solution:a,codes:o};export{o as codes,l as default,t as description,s as examType,e as examples,c as id,i as inputDesc,r as outputDesc,u as score,a as solution,n as title};
