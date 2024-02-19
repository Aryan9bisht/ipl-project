const { log } = require('console');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');


function highestDismissal() {
  let deliveries = [];
  fs.createReadStream(path.join(__dirname, '../data/deliveries.csv'))
    .pipe(csv({}))
    .on('data', (data) => deliveries.push(data))
    .on('end', () => {
     
    
      let players = deliveries.reduce((acc,cv)=>{
        if(cv.dismissal_kind){
        let batsman = cv.batsman;
        let bowler = cv.bowler;
        if (!acc[batsman]) {
          acc[batsman] = {}; 
      }
        if(!acc[batsman][bowler]){
          acc[batsman][bowler]=1;
        }
        else{
          acc[batsman][bowler]++;
        }
        }
        return acc;
      },{});
      let playerDismissal = {
        player_dismissed: null,
        bowler_name: null,
        count: 0,
      };
      for (const batsman in players) {
        const bowlerObj = players[batsman];

        for (const bowler in bowlerObj) {
          const outCount = bowlerObj[bowler];

          if (outCount > playerDismissal.count) {
            playerDismissal = {
              player_dismissed: batsman,
              bowler_name: bowler,
              count: outCount,
            };
          }
        }
      }


     

      fs.writeFileSync(path.join(__dirname, "../public/output/highest-dismissal-by-bowler.json"), JSON.stringify(playerDismissal, null, 2));
      //console.log(`Data saved to ${newDataFile}`);
    })
    .on('error', (error) => {
      console.error('Error:', error);
    });
}
highestDismissal();