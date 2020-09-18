/**
 * Extending the Prototype - by chizi
 * 原型擴展
*/


/**
 * Extending the prototype of Set
 */
const SetExtendingPrototypeName = [
    'intersection',
    'symmetricDifference',
    'union',
    'subtracting',
    'isSubset',
    'isSuperset',
    'isDisjoint'
];

// 檢查擴展原型名稱是否未被使用 //
function CheckExtensionPrototypeName() {
    for (let proto in SetExtendingPrototypeName) {
        if (Set.hasOwnProperty(proto)) {
            throw `The extending prototype name of ${proto} has been used`;
        }
    }
    return true;
}

// Define error //
const notTypeofSet = new TypeError("Incoming parameter is not type of Set");
const undefinedParameterOfSuperset = new ReferenceError("Undefined a parameter of 'superset', can't compare with it");
const undefinedParameterOfSubset = new ReferenceError("Undefined a parameter of 'subset', can't compare with it");
const notTypeofNumber = new TypeError("Incoming parameter is not type of Number");

// 交集 //
Set.prototype.intersection = function intersection(otherSet = new Set()) {
    if (!(otherSet instanceof Set)) throw notTypeofSet;
    var intersection = new Set();
    for (const element of otherSet) {
        if (this.has(element)) {
            intersection.add(element);
        }
    }
    return intersection;
}

// 對稱差集 //
Set.prototype.symmetricDifference = function symmetricDifference(otherSet = new Set()) {
    if (!(otherSet instanceof Set)) throw notTypeofSet;
    // 聯集減去交集
    return this.union(otherSet).subtracting(this.intersection(otherSet));
}

// 聯集 //
Set.prototype.union = function union(otherSet = new Set()) {
    if (!(otherSet instanceof Set)) throw notTypeofSet;
    return new Set([...this, ...otherSet]);
}

// 減去 //
Set.prototype.subtracting = function subtracting(otherSet = new Set()) {
    if (!(otherSet instanceof Set)) throw notTypeofSet;
    var subtracting = new Set(this);
    for (const element of otherSet) {
        subtracting.delete(element);
    }
    return subtracting;
}

// 前者是否後者的子集 //
Set.prototype.isSubset = function isSubset(superset) {
    if (subset == undefined) throw undefinedParameterOfSuperset;
    if (!(superset instanceof Set)) throw notTypeofSet;
    for (const element of this) {
        if (!superset.has(element)) {
            return false;
        }
    }
    return true;
}

// 前者是否後者的超集 //
Set.prototype.isSuperset = function isSuperset(subset) {
    if (subset == undefined) throw undefinedParameterOfSubset;
    if (!(subset instanceof Set))  throw notTypeofSet;
    for (const element of subset) {
        if (!this.has(element)) {
            return false;
        }
    }
    return true;
}

// 不交集 //
Set.prototype.isDisjoint = function isDisjoint(otherSet = new Set()) {
    if (!(otherSet instanceof Set)) throw notTypeofSet;
    // 優化：減少檢查次數
    const isLoopThis = this.size <= otherSet.size;
    const loopSet = isLoopThis ? this : otherSet;
    const checkSet = isLoopThis ? otherSet : this;
    for (const element of loopSet) {
        if (checkSet.has(element)) {
            return false;
        }
    }
    return true;
}


/**
 * Extanding the prototype of Array 
 */
Array.prototype.copy = function copy() {
    return this.slice();
}

Array.prototype.fillCopy = function fillCopy(value, start = 0, end = this.length) {
    if (value instanceof Array || value instanceof Object) {
        for (let i = start; i < end; i++) {
            this[i] = value.copy();
        }
    } else {
        this.fill(value, start, end);
    }
    return this;
}

// 創建多維矩陣 //
Array.create2d = function create2d(len1, len2) {
    return new Array(len1).fillCopy(len2 == undefined ? [] : new Array(len2));
}
Array.create3d = function create3d(len1, len2, len3) {
    return new Array(len1).fillCopy(new Array(len2).fillCopy(len3 == undefined ? [] : new Array(len3)));
}
Array.create4d = function create4d(len1, len2, len3, len4) {
    return new Array(len1).fillCopy(new Array(len2).fillCopy(new Array(len3).fillCopy(len4 == undefined ? [] : new Array(len4))));
}
Array.create5d = function create4d(len1, len2, len3, len4, len5) {
    return new Array(len1).fillCopy(new Array(len2).fillCopy(new Array(len3).fillCopy(new Array(len4).fillCopy(len5 == undefined ? [] : new Array(len5)))));
}
Array.create6d = function create4d(len1, len2, len3, len4, len5, len6) {
    return new Array(len1).fillCopy(new Array(len2).fillCopy(new Array(len3).fillCopy(new Array(len4).fillCopy(new Array(len5).fillCopy(len6 == undefined ? [] : new Array(len6))))));
}

// 獲取維度 //
// 只針對完整的陣列
// ### 可以的話改成變量 非函數式
Array.prototype.getDim = function getDim() {
    var dim = 0;
    function count(element) {
        if (Array.isArray(element)) {
            dim++;
            count(element[0]);
        }
    }
    count(this);
    return dim;
}
// 獲取形狀 //
Array.prototype.getShape = function getShape() {
    var shape = [];
    function count(element) {
        if (Array.isArray(element)) {
            shape.push(element.length);
            count(element[0]);
        }
    }
    count(this);
    return shape;
}

// 重塑 //
Array.prototype.reshape = function reshape() {
    // ### 未完成
}

// Four arithmetic of Array
// 只針對類型是 number 的元素做運算
// ### 要擴展成可以對矩陣與矩陣運算
// 加 //
Array.prototype.plus = function plus(value = 0) {
    if (typeof value != "number") throw notTypeofNumber;
    return this.map(element => typeof element == "number" ? element + value : element);
}
// 減 //
Array.prototype.minus = function minus(value = 0) {
    if (typeof value != "number") throw notTypeofNumber;
    return this.map(element => typeof element == "number" ? element - value : element);
}
// 乘 //
Array.prototype.multiply = function multiply(value = 1) {
    if (typeof value != "number") throw notTypeofNumber;
    return this.map(element => typeof element == "number" ? element * value : element);
}
// 除 //
Array.prototype.divide = function divide(value = 1) {
    if (typeof value != "number") throw notTypeofNumber;
    return this.map(element => typeof element == "number" ? element / value : element);
}
// 模除 //
Array.prototype.mod = function mod(value = 1) {
    if (typeof value != "number") throw notTypeofNumber;
    return this.map(element => typeof element == "number" ? element % value : element);
}
Array.prototype.pow = function pow(value) {
    if (typeof value != "number") throw notTypeofNumber;
    return this.map(element => typeof element == "number" ? element ** value : element);
}

// 直和 //
Array.prototype.directSum = function directSum(array) {
    const thisShape = this.getShape();
    const arrayShape = this.getShape();
    // ### 未完成
    
}


/**
 * Extanding the prototype of Json Object
 */
Object.prototype.copy = function copy() {
    return JSON.parse(JSON.stringify(this));
}


/**
 * Extanding the prototype of String
 */
String.prototype


/**
 * Extanding the prototype of Number
 */
Number.prototype


/**
 * Extanding the prototype of Boolean
 */
Boolean.prototype


/**
 * Type Aliases
 */
// Number.typealias = function typealias(aliases) {
//      
// }


/**
 * Tuple type
 * 
 */
class Tuple {
    constructor(object) {
        if (arguments.length == 1 && typeof object == Object) {
            this.container = object;
            Object.keys(object).forEach(key => {
                this[key] = object[key];
            });
        } else {
            this.container = [...arguments];
        }
    }
    toObject() {
        return this.container;
    }
    toArray() {
        return this.container;
    }
}


const _ = undefined;
const print = console.log;

// 特定範圍的連續值矩陣 //
// 輸入1個變數 返回[0...(param = start)]
// 輸入2個變數 返回[start...end]
function range(start, end) {
    if (arguments.length <= 1) {
        return [...new Array(start).keys()];
    } else {
        return Array.from({length: end - start + 1}, (_, i) => i + start);
    }
}





// ### 修改設計模式
const extendingPrototype = {
    typeName1: {
        prototypeName1 : function prototypeName1() {},
        prototypeName2 : function prototypeName2() {},
        prototypeName3 : function prototypeName3() {},
        // ...
    },
    typeName2: {
        prototypeName1 : function prototypeName1() {},
        prototypeName2 : function prototypeName1() {},
        // ...
    },
    // ...
}

// ### 用switch
function checkExtensionPrototypeName(extendingPrototype) {
    for (const typeName in ExtendingPrototype) {
        if (typeName == "Number") {
            for (const prototypeName in typeName) {
                if (Number.hasOwnProperty(prototypeName)) {
                // ###
                }
            }
        }
        if (typeName == "Boolean") {
            for (const prototypeName in typeName) {
                if (Boolean.hasOwnProperty(prototypeName)) {
                // ###
                }
            }
        }
        // if ...
    }
    
}

// Number.prototype[prototypeName] = prototypeName;