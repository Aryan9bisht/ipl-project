const { log } = require('console');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

function matchesPerYear() {
  let matches = [];
  fs.createReadStream(path.join(__dirname, '../data/matches.csv'))
    .pipe(csv({}))
    .on('data', (data) => matches.push(data))
    .on('end', () => {
      // Now 'delivery' contains the parsed data
      //console.log('Parsed data:', delivery);

      // Save the parsed data to a new file
      let matchesPerSeason = matches.reduce((acc, cv) => {
        if (!acc[cv.season]) {
          acc[cv.season] = 1;
        }
        else {
          acc[cv.season]++;
        }
          return acc;
      },{})

      fs.writeFileSync(path.join(__dirname, "../public/output/matches-per-year.json"), JSON.stringify(matchesPerSeason, null, 2));
      //console.log(`Data saved to ${newDataFile}`);
    })
    .on('error', (error) => {
      console.error('Error:', error);
    });
}
matchesPerYear();