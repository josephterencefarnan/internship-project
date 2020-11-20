let JIT;
(function () {
    var deltaTwo = 0;
    
    function calculateDelta(oldDelta, oldNumber, newNumber, indexOfOldNum, secondorder) {
        let delta = ((oldDelta * indexOfOldNum) + (newNumber - oldNumber))/(indexOfOldNum + 1);
//I beleive this assumes that the delta is changing at a constant rate
        if (secondorder && indexOfOldNum > 0){
            deltaTwo = calculateDelta(deltaTwo, oldDelta, (2*delta - oldDelta), indexOfOldNum - 1, false);               
            delta = (2*delta - oldDelta) + deltaTwo;
        }
        return delta
        
    }
    function userInterface(input, signifigance, threshhold, secondorder) {
        const sorted = input.slice().sort((a, b) => { return a[0] - b[0]; })
        var delta = 0;
        
        var dateDelta = input[0][0];
        var valuableValues;
        if (signifigance === undefined) {
            sorted.forEach((x, i, a) => {
                if (x[2] === undefined){
                    x[2] = x[1]
                } 
            })
            valuableValues = sorted

        }
        else {
            valuableValues = sorted.filter(function(x){
                return x[1] === signifigance
            })
        }

        valuableValues.forEach((x, i, a) => {
            if (i < valuableValues.length - 1){
                delta = calculateDelta(delta, x[2], valuableValues[i+1][2], i, secondorder);
            } 
        });
        const output = sorted.map((x, i, a) => {
            return [x[0], x[2]]
        })
        sorted.forEach((x, i, a) => {
            if (i < sorted.length - 1){
//                delta = calculateDelta(delta, x[2], valuableValues[i+1][2], i)                
                dateDelta = calculateDelta(dateDelta, x[0].getTime(), sorted[i+1][0].getTime(), i)
            } 
        });

        if (threshhold !== undefined){
            while ((output[output.length - 1][1] < threshhold) && delta > 0){
                newDate = new Date(output[output.length -1][0].getTime() + dateDelta)
            output.push([newDate, output[output.length - 1][1] + delta])
            if (secondorder){
                delta = delta + deltaTwo;
            }
            }
        }
        return output;
    }


    JIT = Object.freeze({
        userInterface,
        calculateDelta
    });
})();
