const sleep = require('util').promisify(setTimeout);

(async()=>{

    for (let index = 0; index < 100 ; index++) {
        await sleep(5000)
        console.log(index);
    }
    
})();