var expect = chai.expect;
describe("JIT", function () {
    describe("userInterface", function () {
        it.skip("return all readings", function () {
            const result = JIT.userInterface(sampleInput, "1", 13)
            expect(result).to.eql([10, 11, 11, 12, 13])
 //           expect(JIT.userInterface(sampleInput, "0")).to.eql([10, 11, 11, 12, 12])
            expect(JIT.userInterface(sampleInput, undefined, 12.5)).to.eql([10, 11, 11, 12, (12 + 2/3)])
            
        })
        it.skip("projectsToAThreshhold", function(){
            const result = JIT.userInterface(sampleInput, "1", 15)
            expect(result).to.eql([10, 11, 11, 12, 13, 14, 15])
  
        })
        it("addsDates", function(){
            const result = JIT.userInterface(sampleInput, "1", 13)
            expect(result).to.eql([
                [new Date("2020-08-10T15:32:45.123Z"), 10],
                [new Date("2020-08-11T15:32:45.123Z"), 11],
                [new Date("2020-08-12T15:32:45.123Z"), 11],
                [new Date("2020-08-13T15:32:45.123Z"), 12],
                [new Date("2020-08-14T15:32:45.123Z"), 13]
            ])
        })
    })
    describe("calculateDelta", function (){
        it("derivesValue", function () {
            let delta = JIT.calculateDelta(1, 12, 13, 1)
            expect(delta).to.eql(1)
            delta = JIT.calculateDelta(2, 12, 14, 1)
            expect(delta).to.eql(2)
            delta = JIT.calculateDelta(5, 12, 14, 2)
            expect(delta).to.eql(4)            
        })
    })
})
var sampleOutput = [5, 10, 9, 8, 75, 350, 400]
var sampleInput = [
    [new Date("2020-08-10T15:32:45.123Z"), "1", 10],
    [new Date("2020-08-13T15:32:45.123Z"), "1", 12],
    [new Date("2020-08-11T15:32:45.123Z"), "1", 11],
    [new Date("2020-08-12T15:32:45.123Z"), "0", 11]
]