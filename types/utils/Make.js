/**
 * instance Item list
 * @type {Map<string, any>}
 * @private
 */
const _instanceItems = new Map();
/**
 *  make single instance by class
 * @param ClassPath {string}
 */
const MakeClass = (ClassPath) => {
    if (_instanceItems.has(ClassPath)) {
        return _instanceItems.get(ClassPath);
    }
    const className = require(ClassPath);
    const instance = new className();
    _instanceItems.set(ClassPath, instance);
    return instance;
};
module.exports = MakeClass;
