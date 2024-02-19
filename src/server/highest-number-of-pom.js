const { log } = require('console');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');


function highestNumberOfPOM() {
  let matches = [];
  fs.createReadStream(path.join(__dirname, '../data/matches.csv'))
    .pipe(csv({}))
    .on('data', (data) => matches.push(data))
    .on('end', () => {
   
      let allPOM = matches.reduce((acc, cv) => {
        let season = cv.season;
        let playerOfMatch = cv.player_of_match;
        if (!acc[season]) {
          acc[season] = {};
        }
        if (!acc[season][playerOfMatch]) {
          acc[season][playerOfMatch] = 1;
        } else {
          acc[season][playerOfMatch]++;
        }
        return acc;
      }, {});
      
      let player = Object.keys(allPOM).reduce((acc, season) => {
        let maxPlayer = { player: '', count: 0 };
      
        acc[season] = Object.keys(allPOM[season]).reduce((acc1, playerOfMatch) => {
          const count = allPOM[season][playerOfMatch];
      
          if (count > maxPlayer.count) {
            maxPlayer = { player: playerOfMatch, count };
          }
      
          return maxPlayer;
        }, {});
      
        return acc;
      }, {});
      
     
    fs.writeFileSync(path.join(__dirname, "../public/output/highest-number-of-POM.json"), JSON.stringify(player, null, 2));
    
    })
    .on('error', (error) => {
      console.error('Error:', error);
    });
}
highestNumberOfPOM();