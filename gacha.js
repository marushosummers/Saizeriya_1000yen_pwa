let getResult = document.getElementById('getResult');
let result = document.getElementById('result');

let text = "サイゼリヤ1000円ガチャを回したよ！" + "\n\n"
let budget = 1000
let totalPrice = 0
let totalCalorie = 0
let totalSalt = 0

var sql = 'SELECT * FROM ? d WHERE d.price <= ?';

while (budget <= 1000) {
    var candidates = alasql(sql, [MENUS, budget]);
    if (candidates.length == 0) {
        break;
    }
    var randNum = Math.floor(Math.random() * candidates.length);
    var food = candidates[randNum];
    result.innerHTML += '<div class="box menu"><h3 class="ribbon">' + food.order_code + '</h3><h2>' + food.name + '</h2><p>' + food.price + '円　' + food.calorie + 'kcal　塩分 ' + Math.round(food.salt * 10) / 10 + 'g</p></div></div>';
    // add text for tweet
    text += food.name + "\n"
    totalPrice += food.price
    totalCalorie += food.calorie
    totalSalt += food.salt
    budget -= candidates[randNum].price
}
result.innerHTML += '<div class="box rst"><h2>計 ' + totalPrice + '円　' + totalCalorie + 'kcal　塩分' + Math.round(totalSalt * 10) / 10 + 'g</h2></div>';
// tweet result
text += "\n計 " + totalPrice + "円 " + totalCalorie + "kcal 塩分 " + Math.round(totalSalt * 10) / 10 + "g" + "\n\n"

document.getElementById('result').innerHTML += '<div class="footer"><a href="https://twitter.com/share" class="twitter-share-button" data-url="https://saizeriya-1000yen.marusho.io" data-text="' + text + '" data-lang="ja" data-count="horizontal" data-hashtags="サイゼリヤガチャ" data-size="large">Tweet</a></div>'
