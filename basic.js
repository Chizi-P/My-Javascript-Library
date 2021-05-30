function log(string) {
    console.log(string[0]);
}

log `Hello World`;

function summation(a, b, func) {
    let result = 0;
    for (let i = a; i < b; i++) {
        result += func(i);
    }
    return result;
}

function randomFrom(min = 0, max = 1) {
    return Math.random() * (max - min) + min;
}

// 測試執行時間
function executionTime(func) {
    const t0 = new Date().getTime();
    func();
    const t1 = new Date().getTime();
    console.log(`執行了 ${t1 - t0} 毫秒`);
    return t1 - t0;
}


/**阿達馬乘積 entrywise product
 * @param {array} array1
 * @param {array} array2 
 */
function entrywiseProduct(array1, array2) {
    if (array1.length != array2.length) {
        throw '矩陣的長度不一';
    }
    return array1.map((element, i) => element * array2[i]);
}
// 陣列點積
function arrayDotProduct(array1, array2) {
    
}

// 區間
const openInterval = (x, a, b) => a < x && x < b;
const closedInterval = (x, a, b) => a <= x && x <= b;
const halfOpenInterval = (x, a, b) => a < x && x <= b;
const halfClosedInterval = (x, a, b) => a <= x && x < b;
const unboundedInterval = x => -Infinity < x && x < Infinity;

function range(start, end, step = 1) {
    const l = (end - start) / step;
    if (l % 1) throw '';
    let result = new Array(l);
    for (let i = 0, k = start; i <= l; i++, k += step) {
        result[i] = k;
    }
    return result;
}

function charRange(startChar, endChar) {
    return String.fromCharCode(...range(startChar.charCodeAt(0), endChar.charCodeAt(0)));
}