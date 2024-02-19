const { log } = require('console');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');


function wonTossAndMatch() {
  let matches = [];

  fs.createReadStream(path.join(__dirname, '../data/matches.csv'))
    .pipe(csv({}))
    .on('data', (data) => matches.push(data))
    .on('end', () => {
      // Now 'delivery' contains the parsed data
      //console.log('Parsed data:', delivery);

      // Save the parsed data to a new file
      let obj = {};
      let winnerTossMatch = matches.reduce((acc,cv)=>{
        let tossWinner = cv.toss_winner;
        let winner = cv.winner;
        if(winner===tossWinner){
          if(!acc[winner]){
            acc[winner]=1;
          }
          else{
            acc[winner]++;
          }

        }
        return acc;

      },{})
    

      
  

      fs.writeFileSync(path.join(__dirname, "../public/output/won-toss-and-match.json"), JSON.stringify(winnerTossMatch, null, 2));
      //console.log(`Data saved to ${newDataFile}`);
    })
    .on('error', (error) => {
      console.error('Error:', error);
    });
}
wonTossAndMatch();