var JIT = {};
(function () {
    function calculateDelta(oldDelta, oldNumber, newNumber, indexOfOldNum){
        return((oldDelta * indexOfOldNum) + (newNumber - oldNumber))/(indexOfOldNum + 1)
    }
    function userInterface(input, signifigance, threshhold) {
        const sorted = input.slice().sort((a, b) => { return a[0] - b[0]; })
        var delta = 0;
        var dateDelta = input[0][0]
        var valuableValues
        if (signifigance === undefined) {
            valuableValues = sorted
        }
        else {
            valuableValues = sorted.filter(function(x){
                return x[1] === signifigance
            })
        }

        valuableValues.forEach((x, i, a) => {
            if (i < valuableValues.length - 1){
                delta = calculateDelta(delta, x[2], valuableValues[i+1][2], i)                
//                dateDelta = calculateDelta(delta, x[0].getTime(), sorted[i+1][0].getTime(), i)
            } 
        });
//        sorted.forEach((x, i, a) => {
  //          if (i < sorted.length - 1){
//                delta = calculateDelta(delta, x[2], valuableValues[i+1][2], i)                
    //            dateDelta = calculateDelta(delta, x[0].getTime(), sorted[i+1][0].getTime(), i)
        //    } 
      //  });
        const output = sorted.map((x, i, a) => {
            return [x[0], x[2]]
        })
 //delta = 0;
        sorted.forEach((x, i, a) => {
            if (i < sorted.length - 1){
//                delta = calculateDelta(delta, x[2], valuableValues[i+1][2], i)                
                dateDelta = calculateDelta(dateDelta, x[0].getTime(), sorted[i+1][0].getTime(), i)
            } 
        });

        if (threshhold !== undefined){
            while (output[output.length - 1][1] < threshhold){
                newDate = new Date(output[output.length -1][0].getTime() + dateDelta)
            output.push([newDate, output[output.length - 1][1] + delta])
            }
        }
        return output;
    }


    JIT.userInterface = userInterface;
    JIT.calculateDelta = calculateDelta;
})();
