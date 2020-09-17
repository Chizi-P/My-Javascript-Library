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

// 交集 //
Set.prototype.intersection = function intersection(otherSet = new Set()) {
    if (otherSet instanceof Set) {
        var intersection = new Set();
        for (const element of otherSet) {
            if (this.has(element)) {
                intersection.add(element);
            }
        }
        return intersection;
    }
    throw notTypeofSet;
}

// 對稱差集 //
Set.prototype.symmetricDifference = function symmetricDifference(otherSet = new Set()) {
    if (otherSet instanceof Set) {
        // 聯集減去交集
        return this.union(otherSet).subtracting(this.intersection(otherSet));
    } else {
        throw notTypeofSet;
    }
}

// 聯集 //
Set.prototype.union = function union(otherSet = new Set()) {
    if (otherSet instanceof Set) {
        return new Set([...this, ...otherSet]);
    } else {
        throw notTypeofSet;
    }
}

// 減去 //
Set.prototype.subtracting = function subtracting(otherSet = new Set()) {
    if (otherSet instanceof Set) {
        var subtracting = new Set(this);
        for (const element of otherSet) {
            subtracting.delete(element);
        }
        return subtracting;
    } else {
        throw notTypeofSet;
    }
}

// 前者是否後者的子集 //
Set.prototype.isSubset = function isSubset(superset) {
    if (subset == undefined) {
        throw undefinedParameterOfSuperset;
    }
    if (superset instanceof Set) {
        for (const element of this) {
            if (!superset.has(element)) {
                return false;
            }
        }
        return true;
    }
    throw notTypeofSet;
}

// 前者是否後者的超集 //
Set.prototype.isSuperset = function isSuperset(subset) {
    if (subset == undefined) {
        throw undefinedParameterOfSubset;
    }
    if (subset instanceof Set) {
        for (const element of subset) {
            if (!this.has(element)) {
                return false;
            }
        }
        return true;
    }
    throw notTypeofSet;
}

// 不交集
Set.prototype.isDisjoint = function isDisjoint(otherSet = new Set()) {
    if (otherSet instanceof Set) {
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
    throw notTypeofSet;
}

