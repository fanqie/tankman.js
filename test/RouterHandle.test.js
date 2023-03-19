const describe = require('mocha').describe;
const RouterHandle = require("../framework/route/RouterHandle")

const assert = require("assert");

const Route = require("../framework/route/Route");

test("routeParse", () => {
    const routerHandle = new RouterHandle({prefix: "test", middlewares: []}, ["post"], "/foo/:id?", () => {
    }, "")
    const res1 = routerHandle.Parse("/foo/55")
    const res2 = routerHandle.Parse("test/foo/55")
    const res3 = routerHandle.Parse("x/test/foo/55")
    const res4 = routerHandle.Parse("__test/foo/55")
    assert.equal(res1, false)
    assert.notEqual(res2, false)
    assert.equal(res3, false)
    assert.equal(res4, false)
    console.log(JSON.stringify(res2))
})
test("routeAdd", () => {
    const route = new Route()
    let handle = route.Get("/foox/:id", (ctx) => {
    })
    assert.equal(handle.methods.includes("get"), true)

    handle = route.Post("/foo2/:id", (ctx) => {
    })
    assert.equal(handle.methods.includes("post"), true)

    handle = route.Any("/foo3/:id", (ctx) => {
    })
    assert.equal(handle.methods.length === 5, true)

    handle = route.Match(["post"], "/foo4/:id", (ctx) => {
    }).Middleware("XXX").Middleware(["XXX2"])
    assert.equal(handle.methods.includes("post"), true)
    assert.equal(handle.options.middlewares.length === 2, true)

    handle = route.Delete("/foo4/:id", (ctx) => {
    }).Name("TEST")
    route.Group("/test/", () => {
        handle = route.Put("/foo5/:id", (ctx) => {
        }).Name("foo5")
        assert.equal(handle.methods.includes("put"), true)
    }, ["GroupX"])
    assert.equal(route.All().length, 6)
    route.LoadSet();
    console.log(route.GetRoute("foo5"))
})
