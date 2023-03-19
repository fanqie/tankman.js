const FileCache = require("../framework/cache/FileCache")

const assert = require("assert");


    test("fileCacheTest", (done) => {
        const fileCache = new FileCache()
        fileCache.Store("tank","man",fileCache.TIME_ONE_SECOND)
        assert.equal(fileCache.Get("tank"),"man");
        fileCache.Store("tankPull","pull",fileCache.TIME_ONE_SECOND)
        assert.equal(fileCache.Pull("tankPull"),"pull")
        assert.equal(fileCache.Get("tankPull"),null)
        fileCache.Forever("tankForever","forever")
        fileCache.Add("tankAdd","add",fileCache.TIME_ONE_DAY)
        assert.equal(fileCache.Get("tankPull"),null)
        setTimeout(()=>{
            assert.equal(fileCache.Get("tank"),"man");
            assert.equal(fileCache.Get("tankForever"),"forever");
            fileCache.Forget("tankForever")
        },800)
        setTimeout(()=>{
            assert.notEqual(fileCache.Get("tank"),"man");
            assert.equal(fileCache.Get("tankForever"),null);
            assert.equal(fileCache.Get("tankAdd"),"add");
            done();
        },1100)
    })

