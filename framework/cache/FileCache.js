const Facades = require("../facades/Facades");
const path = require("path");
const fs = require("fs");
const Cache = require("./Cache");
const DS = require("ds").DS;
module.exports = class FileCache extends Cache {
    config = {
        saveFile: ".runtime/cache.json"
    }
    data = new DS();

    dirPath = ""

    //Facades.Config.Get("cache")?.file
    constructor(config) {

        super();
        this.config = config || this.config;
        if (!path.isAbsolute(this.config.saveFile)) {
            this.dirPath = path.join(process.cwd(), this.config.saveFile)
        } else {
            this.dirPath = this.config.saveFile
        }
        if (!fs.existsSync(this.dirPath)) {
            fs.mkdirSync(path.dirname(this.dirPath))
            // throw new Error("not found cache.saveFile：" + this.dirPath)
        }


    }

    Has(key) {
        return this.data.hasOwnProperty(key)
    }

    /**
     * Get Retrieve an item from the cache by key.
     * @param key
     * @param defaultVal?
     * @return {string|null}
     * @Function
     */
    Get(key, defaultVal = null) {
        let val = null
        let obj = this.data[key]
        if (obj) {
            if (obj.expires === 0 || this._Now() < obj.expires) {
                val = obj.val;
            } else {
                val = null;
                this._Nuke(key);
            }
        }
        return val || defaultVal;
    }

    Forever(key, val) {
        this.Store(key, val, 0)
    }

    /**
     * Forget Remove an item from the cache.
     * @param key
     * @return {null|*}
     * @Function
     */
    Forget(key) {
        if (this.Has(key)) {
            this._Nuke(key)
        }
        return null;
    }

    /**
     * Pull Retrieve an item from the cache and delete it.
     * @param key
     * @Function
     */
    Pull(key) {
        if (this.Has(key)) {
            const oldValue = this.Get(key)
            this._Nuke(key)
            return oldValue
        }
        return null;
    }

    _Now() {
        return (new Date()).getTime()
    }

    /**
     * Set Store an item in the cache for a given number of seconds.
     * @param key
     * @param val
     * @param ttl Second
     * @return {*}
     * @Function
     */
    Store(key, val = null, ttl = 0) {
        let expires = ttl === 0 ? 0 : (this._Now() + ttl * 1000);
        if (val !== null) {
            this.data[key] = {
                expires,
                val,
            }
            this._Save()
        }
    }

    /**
     * Set Store an item in the cache for a given number of seconds. as same Store function
     * @param key
     * @param val
     * @param ttl Second
     * @return {*}
     * @Function
     */
    Set(key, val = null, ttl = 0) {
        this.Store(key, val, ttl)
    }

    /**
     * The Add method will only store data that does not exist in the cache. If the storage is successful, it will return true, otherwise it will return false:
     * @param key
     * @param val
     * @param ttl
     * @return {boolean}
     * @Function
     */
    Add(key, val = null, ttl = 0) {
        //if existed
        if (!this.Has(key)) {
            this.Store(key, val, ttl)
            return true
        }
        return false
    }

    Flush() {
        this.data = {}
        this._Save()
    }

    /**
     *
     * @private
     */
    _Nuke(key) {
        delete this.data[key]
        this._Save()
    }

    /**
     *
     * @private
     */
    _Save() {
        this.data.save(this.dirPath);
    }
}
