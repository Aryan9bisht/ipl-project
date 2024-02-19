const { log } = require('console');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');


function matchesWonPerYear() {
  let matches = [];
  fs.createReadStream(path.join(__dirname, '../data/matches.csv'))
    .pipe(csv({}))
    .on('data', (data) => matches.push(data))
    .on('end', () => {
      // Now 'delivery' contains the parsed data
      //console.log('Parsed data:', delivery);

      // Save the parsed data to a new file
      let matchesWon = matches.reduce((acc,cv)=> {
        let season = cv.season;
        let winner = cv.winner;
        if(!acc[season]){
          acc[season]={};
        }
        if(!acc[season][winner]){
          acc[season][winner]=1;
        }
        else{
          acc[season][winner]++;
        }
        return acc;

      },{}) ;
    
   //   const newDataFile = 'obj1.json';
    fs.writeFileSync(path.join(__dirname, "../public/output/matches-won-per-year.json"), JSON.stringify(matchesWon, null, 2));
      //console.log(`Data saved to ${newDataFile}`);
    })
    .on('error', (error) => {
      console.error('Error:', error);
    });
}
matchesWonPerYear();