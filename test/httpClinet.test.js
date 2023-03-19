const thc = require("tank-http-client.js")
thc.setBaseUrl("http://localhost:3008")

test('httpClient get', (done) => {
    //function query == function searchParams
    thc.get("/test").query({id: 1}).send().then((res) => {
        expect(res).toStrictEqual({code: 200, method: 'GET', data: 'get_test', search: '1'})
        done()
    })

});
