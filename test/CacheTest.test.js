const FileCache = require("../framework/cache/adapter/FileCacheAdapter")

const assert = require("assert");


    test("fileCacheTest", (done) => {
        const fileCache = new FileCache()
        fileCache.store("tank","man",fileCache.TIME_ONE_SECOND)
        assert.equal(fileCache.get("tank"),"man");
        fileCache.store("tankPull","pull",fileCache.TIME_ONE_SECOND)
        assert.equal(fileCache.pull("tankPull"),"pull")
        assert.equal(fileCache.get("tankPull"),null)
        fileCache.forever("tankForever","forever")
        fileCache.add("tankAdd","add",fileCache.TIME_ONE_DAY)
        assert.equal(fileCache.get("tankPull"),null)
        setTimeout(()=>{
            assert.equal(fileCache.get("tank"),"man");
            assert.equal(fileCache.get("tankForever"),"forever");
            fileCache.forget("tankForever")
        },800)
        setTimeout(()=>{
            assert.notEqual(fileCache.get("tank"),"man");
            assert.equal(fileCache.get("tankForever"),null);
            assert.equal(fileCache.get("tankAdd"),"add");
            done();
        },1100)
    })

