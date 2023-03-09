const describe = require('mocha').describe;
const GenerateKey = require("../framework/command/GenerateCommand")
const assert = require("assert");

describe('CommandTest', () => {

    it("Generate:keyTest", (done) => {
        const c = new GenerateKey(this);
        c.boot()
        c.parse().handle()
        done()
    })

})
