const { log } = require('console');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

async function economical() {
  let matches = [];

 await fs.createReadStream(path.join(__dirname, '../data/matches.csv'))
    .pipe(csv({}))
    .on('data', (data) => matches.push(data))
    .on('end', () => {
      let obj = {};


      fs.createReadStream(path.join(__dirname, '../data/deliveries.csv'))
        .pipe(csv({}))
        .on('data', (runs) => {
          for (let data of matches) {
            if (data.season === '2015' && data.id === runs.match_id && runs.bowling_team) {
              if (!obj[runs.bowler]) {
                obj[runs.bowler] = { runses: 0, balls: 0 };
              } else {
                obj[runs.bowler].runses += Number(runs.total_runs);
                obj[runs.bowler].balls++;
              }
            }
          }
        })
        .on('end', () => {
          let economyRates = [];
          economyRates = Object.entries(obj).reduce((acc, [bowler, { runses, balls }]) => {
            const economyRate = (runses / balls) * 6;
            acc.push({ bowler, economyRate });
            return acc;
          }, []);

          const topTenEconomy = economyRates.sort((a, b) => a.economyRate - b.economyRate).slice(0, 10);



          fs.writeFileSync(path.join(__dirname, "../public/output/10-economical-bowlers.json"), JSON.stringify(topTenEconomy, null, 2));

        })
        .on('error', (error) => {
          console.error('Error:', error);
        });
    })
    .on('error', (error) => {
      console.error('Error:', error);
    });
}
economical();