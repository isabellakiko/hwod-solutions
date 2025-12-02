const p="58",n="预订酒店",o="A",a=100,i="放暑假了，小明决定到某旅游景点游玩，他在网上搜索到了各种价位的酒店（长度为n的数组A），他的心理价位是x元，请帮他筛选出k个最接近x元的酒店（n>=k>0）,并由低到高打印酒店的价格。",e="第一行：n, k, x 第二行：A[0] A[1] A[2]…A[n-1]",t="从低到高打印筛选出的酒店价格",r=[{input:`10 5 6
1 2 3 4 5 6 7 8 9 10`,output:"4 5 6 7 8",explanation:`心理价位6，各价格与6的差距：5,4,3,2,1,0,1,2,3,4
最接近的5个：4,5,6,7,8（差距分别为2,1,0,1,2）`},{input:`6 3 1000
30 30 200 500 70 300`,output:"200 300 500",explanation:`心理价位1000，各价格与1000的差距：970,970,800,500,930,700
最接近的3个：500(差500)、300(差700)、200(差800)`},{input:`5 2 200
100 150 200 250 300`,output:"150 200",explanation:`心理价位200，差距分别为100,50,0,50,100
最接近的2个：200和150（差距相同时选价格低的）`}],c=`**解题思路：**

本题是一道**排序+筛选**问题。

**算法步骤：**

1. 计算每个酒店价格与心理价位x的差距
2. 先按价格排序（保证差距相同时价格低的优先）
3. 再按差距排序，取前k个
4. 将选出的k个价格升序排列输出

**注意事项：**
- 差距相同时优先选价格低的
- 酒店价格可能重复

**时间复杂度**：O(N log N)`,s={java:`import java.util.Scanner;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

class Main {
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 输入酒店数量、需要选择的酒店数量、心理价位
        int n = scanner.nextInt(); // 酒店的数量
        int k = scanner.nextInt(); // 需要选择的最接近心理价位的酒店数量
        int x = scanner.nextInt(); // 心理价位
        
        // 输入酒店价格并存入数组
        int[] A = new int[n]; // 酒店价格数组
        for (int i = 0; i < n; i++) {
            A[i] = scanner.nextInt(); // 读取每一个酒店价格
        }
        
        // 将酒店价格数组从小到大排序
        Arrays.sort(A);
 
        // 创建一个二维数组，存储每个酒店价格以及它与心理价位的差距
        int[][] priceDiff = new int[n][2]; // 二维数组，第一列是酒店价格，第二列是与心理价位的差值
        for (int i = 0; i < n; i++) {
            int price = A[i]; // 获取当前酒店的价格
            priceDiff[i][0] = price; // 存储酒店价格
            priceDiff[i][1] = Math.abs(price - x); // 计算并存储酒店价格与心理价位的绝对差值
        }
 
        // 使用 Java 流进行排序，根据差值从小到大排序
        List<int[]> sortedPrices = Arrays.stream(priceDiff)
            .sorted(Comparator.comparingInt(h -> h[1])) // 按与心理价位的差值进行排序
            .collect(Collectors.toList()); // 将排序结果转化为 List
 
        // 创建一个列表，存储前 k 个最接近心理价位的酒店价格
        List<Integer> selectedPrices = new ArrayList<>();
        for (int i = 0; i < k; i++) {
            selectedPrices.add(sortedPrices.get(i)[0]); // 选取排序后的前 k 个酒店价格
        }
 
        // 将挑选出的酒店价格从小到大排序
        selectedPrices.sort(Integer::compareTo); // 按照酒店价格从小到大排序
 
        // 按顺序打印 k 个酒店价格，并用空格分隔
        for (int i = 0; i < selectedPrices.size(); i++) {
            System.out.print(selectedPrices.get(i)); // 打印酒店价格
            if (i != selectedPrices.size() - 1) { // 如果不是最后一个元素，则打印空格
                System.out.print(" ");
            }
        }
    }
}`,python:`n, k, x = map(int, input().split())
prices = list(map(int, input().split()))

sorted_prices = sorted(prices)
price_rating = sorted([(price, abs(price - x)) for price in sorted_prices], key=lambda item: item[1])
picked_price = sorted(item[0] for item in price_rating[:k])

print(' '.join(map(str, picked_price)))`,javascript:`const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  const [n, k, x] = input.split(' ').map(Number);
  let prices = [];
  rl.on('line', (input) => {
    prices = input.split(' ').map(Number);
    const sortedPrices = prices.sort((a, b) => a - b);
    const priceRating = sortedPrices.map(price => [price, Math.abs(price - x)]).sort((a, b) => a[1] - b[1]);
    const pickedPrice = priceRating.slice(0, k).map(item => item[0]).sort((a, b) => a - b);
    console.log(pickedPrice.join(' '));
  });
});`,cpp:`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

/* 自定义排序函数，按照酒店价格与目标价位的差值从小到大排序 */
bool cmp(pair<int, int> x, pair<int, int> y)
{
    return x.second < y.second;
}

int main()
{
    int n, k, x;
    cin >> n >> k >> x; // 输入酒店数量n、需要选择的酒店数量k和目标价位x
    vector<int> prices(n);
    for (int i = 0; i < n; i++)
    {
        cin >> prices[i]; // 输入每个酒店的价格
    }
    sort(prices.begin(), prices.end()); // 将酒店价格从小到大排序
    vector<pair<int, int>> price_rating;
    for (int i = 0; i < prices.size(); i++)
    {
        price_rating.push_back(make_pair(prices[i], abs(prices[i] - x))); // 计算每个酒店价格与目标价位的差值，并存入pair中
    }
    sort(price_rating.begin(), price_rating.end(), cmp); // 按照差值从小到大排序

    vector<int> picked_price;
    for (int i = 0; i < k; i++)
    {
        picked_price.push_back(price_rating[i].first); // 取出差值最小的k个酒店的价格
    }
    sort(picked_price.begin(), picked_price.end()); // 将选出的酒店价格从小到大排序

    for (int i = 0; i < picked_price.size(); i++)
    {
        cout << picked_price[i]; // 输出选出的酒店价格
        if (i != picked_price.size() - 1)
        {
            cout << " "; // 输出空格，除了最后一个酒店价格
        }
    }

    return 0;
}`,c:`#include <stdio.h>
#include <stdlib.h>

#define MAX_N 1000 // 假设酒店数量的最大值为1000

// 定义结构体来存储酒店价格与目标价位差值
typedef struct {
    int price;   // 酒店价格
    int diff;    // 酒店价格与目标价位的差值
} Hotel;

// 自定义排序函数，按照酒店价格与目标价位的差值从小到大排序
int cmp(const void* a, const void* b) {
    Hotel* hotelA = (Hotel*)a;
    Hotel* hotelB = (Hotel*)b;
    return hotelA->diff - hotelB->diff;
}

// 比较函数，用于排序酒店价格从小到大
int cmp_price(const void* a, const void* b) {
    return (*(int*)a) - (*(int*)b);
}

int main() {
    int n, k, x;
    scanf("%d %d %d", &n, &k, &x); // 输入酒店数量n、需要选择的酒店数量k和目标价位x

    int prices[MAX_N]; // 酒店价格数组
    for (int i = 0; i < n; i++) {
        scanf("%d", &prices[i]); // 输入每个酒店的价格
    }

    // 对酒店价格从小到大排序
    qsort(prices, n, sizeof(int), cmp_price);

    Hotel price_rating[MAX_N]; // 存储酒店价格和与目标价位的差值的数组
    for (int i = 0; i < n; i++) {
        price_rating[i].price = prices[i]; // 存储酒店价格
        price_rating[i].diff = abs(prices[i] - x); // 计算酒店价格与目标价位的差值
    }

    // 根据差值对酒店价格进行排序
    qsort(price_rating, n, sizeof(Hotel), cmp);

    int picked_price[MAX_N]; // 选出的k个酒店价格
    for (int i = 0; i < k; i++) {
        picked_price[i] = price_rating[i].price; // 取出差值最小的k个酒店的价格
    }

    // 将选出的k个酒店价格从小到大排序
    qsort(picked_price, k, sizeof(int), cmp_price);

    // 输出选出的酒店价格
    for (int i = 0; i < k; i++) {
        printf("%d", picked_price[i]);
        if (i != k - 1) {
            printf(" "); // 输出空格，除了最后一个酒店价格
        }
    }

    return 0;
}`},d={id:"58",title:n,examType:"A",score:100,description:i,inputDesc:e,outputDesc:t,examples:r,solution:c,codes:s};export{s as codes,d as default,i as description,o as examType,r as examples,p as id,e as inputDesc,t as outputDesc,a as score,c as solution,n as title};
