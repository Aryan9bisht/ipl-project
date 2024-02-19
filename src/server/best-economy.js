const { log } = require('console');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');
async function bestEconomy() {
    let deliveries = [];


    fs.createReadStream(path.join(__dirname, '../data/deliveries.csv'))
        .pipe(csv({}))
        .on('data', (data) => deliveries.push(data))
        .on('end', async () => {
           
            let ballsInSO = deliveries.reduce((acc,cv)=>{
                if(cv.is_super_over!=0){
                    let playerName = cv.bowler;
                    if(!acc[playerName]){
                        acc[playerName]=1;
                    }
                    else{
                        acc[playerName]++;
                    }
                }
                return acc;
            },{});
            let runsInSO = deliveries.reduce((acc,cv)=>{
                if(cv.is_super_over!=0){
                  
                    let runs = Number(cv.total_runs)+Number(cv.extra_runs);
                    let playerName = cv.bowler;
                    if(!acc[playerName]){
                        acc[playerName]=runs;
                    }
                    else{
                        acc[playerName]+=runs;;
                    }
                }
                return acc;
            },{});
            

            // Calculate economy rate for each bowler in the super over
            const economyInSO = Object.keys(runsInSO).reduce((acc, playerName) => {
              acc[playerName] = (runsInSO[playerName] * 6) / ballsInSO[playerName];
              return acc;
            }, {});
         //   log(economyInSO)
            // Find the bowler with the lowest economy rate in the super over
            let lowestEconomyBowler;
            let lowestEconomy = 100;
            let lowestBowler ;
            
            Object.keys(economyInSO).forEach((playerName) => {
              const economy = economyInSO[playerName];
              if (economy < lowestEconomy) {
               lowestBowler = playerName;
                lowestEconomy = economy;
              }
            });
           lowestEconomyBowler ={
            playerName : lowestBowler,
            economy:lowestEconomy
           }

            fs.writeFileSync(path.join(__dirname, "../public/output/best-economy-in-super-over.json"), JSON.stringify(lowestEconomyBowler, null, 2));

        })
        .on('error', (error) => {
            console.error('Error:', error);
        });
}

 bestEconomy();
module.exports = {bestEconomy};