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
    return new Array(len1).fillCopy(new Array(len2).fillCopy(len2 == undefined ? [] : new Array(len3)));
}
Array.create4d = function create4d(len1, len2, len3, len4) {
    return new Array(len1).fillCopy(new Array(len2).fillCopy(new Array(len3).fillCopy(len2 == undefined ? [] : new Array(len4))));
}
Array.create5d = function create4d(len1, len2, len3, len4, len5) {
    return new Array(len1).fillCopy(new Array(len2).fillCopy(new Array(len3).fillCopy(new Array(len4).fillCopy(len2 == undefined ? [] : new Array(len5)))));
}
Array.create6d = function create4d(len1, len2, len3, len4, len5, len6) {
    return new Array(len1).fillCopy(new Array(len2).fillCopy(new Array(len3).fillCopy(new Array(len4).fillCopy(new Array(len5).fillCopy(len2 == undefined ? [] : new Array(len6))))));
}


// Four arithmetic of Array
// 加 //
Array.prototype.plus = function plus(value = 0) {
    if (typeof value != "number") throw notTypeofNumber;
    return this.map(element => element + value);
}
// 減 //
Array.prototype.minus = function minus(value = 0) {
    if (typeof value != "number") throw notTypeofNumber;
    return this.map(element => element - value);
}
// 乘 //
Array.prototype.multiply = function multiply(value = 1) {
    if (typeof value != "number") throw notTypeofNumber;
    return this.map(element => element * value);
}
// 除 //
Array.prototype.divide = function divide(value = 1) {
    if (typeof value != "number") throw notTypeofNumber;
    return this.map(element => element / value);
}
// 模除 //
Array.prototype.mod = function mod(value = 1) {
    if (typeof value != "number") throw notTypeofNumber;
    return this.map(element => element % value);
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


const print = console.log;