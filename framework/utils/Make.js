/**
 * instance Item list
 * @type {Map<string, any>}
 * @private
 */
const _instanceItems=new Map();
/**
 *  make single instance by class
 * @param {string} ClassPath
 * @return {*}
 */
const makeClass=(ClassPath)=>{
    if (_instanceItems.has(ClassPath)) {
        return _instanceItems.get(ClassPath);
    }
    const ClassName = require(ClassPath);
    const instance=new ClassName();
    _instanceItems.set(ClassPath, instance);
    return instance;
};
module.exports=makeClass;
