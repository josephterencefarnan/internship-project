const {readFile} = require('fs');

readFile('./shampoo.csv', (err, data) => {
    if (err) {
        console.warn(err);
        return;
    }


    
    let json = data
        .toString('utf8')
        .split(/[\n\r]+/)
        .map((line, i) => {
            if (i === 0) {
                // console.log("headers", line);
                // ignore
            } else {
                const [Month, Sales] = line.split(',');
                let [year, month] = Month.replace(/"/g, '').split('-');
                year = 2000 + parseInt(year, 10);
                let m = new Date(year, month);
                return {month: m, sales: parseFloat(Sales)};
            }
        })
        .filter((reading) => {
            return !!reading
        });
    console.log(JSON.stringify(json));
})

// console.log('After Open');