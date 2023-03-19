const GenerateKey = require("../framework/command/GenerateCommand")
const assert = require("assert");


test("Generate:keyTest", (done) => {
    const c = new GenerateKey(this);
    c.boot()
    c.parse().handle()
    done()
})

