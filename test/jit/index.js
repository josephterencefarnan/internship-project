var expect = chai.expect;
describe("JIT", function () {
    describe("userInterface", function () {
        it("return Hello World", function () {
            expect(JIT.userInterface()).to.equal("Hello World")
        })
    })
})
