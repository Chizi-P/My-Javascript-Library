/**
 * Extending the Prototype - by chizi
 * 原型擴展
*/


const _ = undefined;
const print = console.log;

// Define error //
const notTypeofSet = new TypeError("Incoming parameter is not type of Set");
const undefinedParameterOfSuperset = new ReferenceError("Undefined a parameter of 'superset', can't compare with it");
const undefinedParameterOfSubset = new ReferenceError("Undefined a parameter of 'subset', can't compare with it");
const notTypeofNumber = new TypeError("Incoming parameter is not type of Number");

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

const extendingPrototype = {
    /**
     * Extand Set
     */
    SetPrototype : {
        // 交集 //
        intersection : function intersection(otherSet = new Set()) {
            if (!(otherSet instanceof Set)) throw notTypeofSet;
            var intersection = new Set();
            for (const element of otherSet) {
                if (this.has(element)) {
                    intersection.add(element);
                }
            }
            return intersection;
        },

        // 對稱差集 //
        symmetricDifference : function symmetricDifference(otherSet = new Set()) {
            if (!(otherSet instanceof Set)) throw notTypeofSet;
            // 聯集減去交集
            return this.union(otherSet).subtracting(this.intersection(otherSet));
        },

        // 聯集 //
        union : function union(otherSet = new Set()) {
            if (!(otherSet instanceof Set)) throw notTypeofSet;
            return new Set([...this, ...otherSet]);
        },

        // 減去 //
        subtracting : function subtracting(otherSet = new Set()) {
            if (!(otherSet instanceof Set)) throw notTypeofSet;
            var subtracting = new Set(this);
            for (const element of otherSet) {
                subtracting.delete(element);
            }
            return subtracting;
        },
        
        // 前者是否後者的子集 //
        isSubset : function isSubset(superset) {
            if (subset == undefined) throw undefinedParameterOfSuperset;
            if (!(superset instanceof Set)) throw notTypeofSet;
            for (const element of this) {
                if (!superset.has(element)) {
                    return false;
                }
            }
            return true;
        },

        // 前者是否後者的超集 //
        isSuperset : function isSuperset(subset) {
            if (subset == undefined) throw undefinedParameterOfSubset;
            if (!(subset instanceof Set))  throw notTypeofSet;
            for (const element of subset) {
                if (!this.has(element)) {
                    return false;
                }
            }
            return true;
        },

        // 不交集 //
        isDisjoint : function isDisjoint(otherSet = new Set()) {
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
    },


    /**
     * Extand Array 
     */
    Array : {
        // 創建多維矩陣 //
        create2d : function create2d(len1, len2) {
            return new Array(len1).fillCopy(len2 == undefined ? [] : new Array(len2));
        },
        create3d : function create3d(len1, len2, len3) {
            return new Array(len1).fillCopy(new Array(len2).fillCopy(len3 == undefined ? [] : new Array(len3)));
        },
        create4d : function create4d(len1, len2, len3, len4) {
            return new Array(len1).fillCopy(new Array(len2).fillCopy(new Array(len3).fillCopy(len4 == undefined ? [] : new Array(len4))));
        },
        create5d : function create4d(len1, len2, len3, len4, len5) {
            return new Array(len1).fillCopy(new Array(len2).fillCopy(new Array(len3).fillCopy(new Array(len4).fillCopy(len5 == undefined ? [] : new Array(len5)))));
        },
        create6d : function create4d(len1, len2, len3, len4, len5, len6) {
            return new Array(len1).fillCopy(new Array(len2).fillCopy(new Array(len3).fillCopy(new Array(len4).fillCopy(new Array(len5).fillCopy(len6 == undefined ? [] : new Array(len6))))));
        }
    },
    
    ArrayPrototype: {
        copy : function copy() {
            return this.slice();
        },
        fillCopy : function fillCopy(value, start = 0, end = this.length) {
            if (value instanceof Array || value instanceof Object) {
                for (let i = start; i < end; i++) {
                    this[i] = value.copy();
                }
            } else {
                this.fill(value, start, end);
            }
            return this;
        },
        // 獲取維度 //
        // 只針對完整的陣列
        // ### 可以的話改成變量 非函數式
        getDim : function getDim() {
            var dim = 0;
            function count(element) {
                if (Array.isArray(element)) {
                    dim++;
                    count(element[0]);
                }
            }
            count(this);
            return dim;
        },
        // 獲取形狀 //
        getShape : function getShape() {
            var shape = [];
            function count(element) {
                if (Array.isArray(element)) {
                    shape.push(element.length);
                    count(element[0]);
                }
            }
            count(this);
            return shape;
        },

        // 重塑 //
        reshape : function reshape() {
            // ### 未完成
        },

        // Four arithmetic of Array
        // 只針對類型是 number 的元素做運算
        // ### 要擴展成可以對矩陣與矩陣運算
        // 加 //
        plus : function plus(value = 0) {
            if (typeof value != "number") throw notTypeofNumber;
            return this.map(element => typeof element == "number" ? element + value : element);
        },
        // 減 //
        minus : function minus(value = 0) {
            if (typeof value != "number") throw notTypeofNumber;
            return this.map(element => typeof element == "number" ? element - value : element);
        },
        // 乘 //
        multiply : function multiply(value = 1) {
            if (typeof value != "number") throw notTypeofNumber;
            return this.map(element => typeof element == "number" ? element * value : element);
        },
        // 除 //
        divide : function divide(value = 1) {
            if (typeof value != "number") throw notTypeofNumber;
            return this.map(element => typeof element == "number" ? element / value : element);
        },
        // 模除 //
        mod : function mod(value = 1) {
            if (typeof value != "number") throw notTypeofNumber;
            return this.map(element => typeof element == "number" ? element % value : element);
        },
        // 次方 //
        pow : function pow(value) {
            if (typeof value != "number") throw notTypeofNumber;
            return this.map(element => typeof element == "number" ? element ** value : element);
        },

        // 直和 //
        directSum : function directSum(array) {
            const thisShape = this.getShape();
            const arrayShape = this.getShape();
            // ### 未完成
            
        },
    },

    
    /**
     * Extand Object
     */
    ObjectPrototype: {
        copy : function copy() {
            return JSON.parse(JSON.stringify(this));
        }
    }
}

// 檢查擴展原型名稱是否未被使用 或 載入擴展原型  //
function preparationForExtendPrototype(option) {
    for (const typeName in extendingPrototype) {
        var Type = undefined;
        switch (typeName) {
            case "Set":
                Type = Set;
                break;
            case "Array":
                Type = Array;
                break;
            case "ArrayPrototype":
                Type = Array.prototype;
                break;
            case "ObjectPrototype":
                Type = Object.prototype;
                break;
            default:
                break;
        }
        if (option == 'check') {
            for (const prototypeName in extendingPrototype[typeName]) {
                if (Type.hasOwnProperty(prototypeName)) {
                    throw `The extending prototype name of ${prototypeName} has been used`;
                }
            }
        }
        if (option == 'load') {
            for (const prototypeName in extendingPrototype[typeName]) {
                Type.prototype[prototypeName] = extendingPrototype[typeName][prototypeName];
            }
        }
        return true;
    }
}
