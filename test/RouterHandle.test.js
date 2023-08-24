const RouterHandle = require("../framework/route/RouterHandle")
const assert = require("assert");

const Route = require("../framework/route/Route");

test("routeParse", () => {
    const routerHandle = new RouterHandle({prefix: "test", middlewares: []}, ["post"], "/foo/:id?", () => {
    }, "")
    const res1 = routerHandle.parse("/foo/55")
    const res2 = routerHandle.parse("test/foo/55")
    const res3 = routerHandle.parse("x/test/foo/55")
    const res4 = routerHandle.parse("__test/foo/55")
    assert.equal(res1, false)
    assert.notEqual(res2, false)
    assert.equal(res3, false)
    assert.equal(res4, false)
    console.log(JSON.stringify(res2))
})
test("routeAdd", () => {
    const route = new Route()
    let handle = route.get("/foox/:id", (ctx) => {
    })
    assert.equal(handle.methods.includes("get"), true)

    handle = route.post("/foo2/:id", (ctx) => {
    })
    assert.equal(handle.methods.includes("post"), true)

    handle = route.any("/foo3/:id", (ctx) => {
    })
    assert.equal(handle.methods.length === 5, true)

    handle = route.match(["post"], "/foo4/:id", (ctx) => {
    }).middleware("XXX").middleware(["XXX2"])
    assert.equal(handle.methods.includes("post"), true)
    assert.equal(handle.options.middleware.length === 2, true)

    handle = route.delete("/foo4/:id", (ctx) => {
    }).routeName("TEST")
    route.group("/test/", () => {
        handle = route.put("/foo5/:id", (ctx) => {
        }).routeName("foo5")
        assert.equal(handle.methods.includes("put"), true)
    }, ["GroupX"])
    assert.equal(route.all().length, 6)
    route.loadSet();
    // console.log(route.getRoute("foo5"))
})
