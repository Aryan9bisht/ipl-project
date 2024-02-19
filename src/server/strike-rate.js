const { log } = require('console');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

function strikeRate() {
  let matches = [];
  let deliveries = [];
  fs.createReadStream(path.join(__dirname, '../data/matches.csv'))
    .pipe(csv({}))
    .on('data', (data) => matches.push(data))
    .on('end', () => {


      fs.createReadStream(path.join(__dirname, '../data/deliveries.csv'))
        .pipe(csv({}))
        .on('data', (data) => deliveries.push(data))
        .on('end', () => {
          const strikeRateBatsman = matches.reduce((acc, match) => {
            const { season } = match;
            acc[season] = acc[season] || {};

            acc[season] = deliveries.reduce((seasonAcc, delivery) => {
              const { batsman, batsman_runs } = delivery;
              seasonAcc[batsman] = seasonAcc[batsman] || { runs: 0, balls: 0 };
              seasonAcc[batsman].runs += Number(batsman_runs);
              seasonAcc[batsman].balls++;
              return seasonAcc;
            }, acc[season]);

            return acc;
          }, {});

          const strikeRate = Object.entries(strikeRateBatsman).reduce((acc, [season, batsmen]) => {
            Object.entries(batsmen).forEach(([batsman, { runs, balls }]) => {
              acc.push({
                season,
                batsman,
                strikeRate1: (runs / balls) * 100
              });
            });
            return acc;
          }, []);





          fs.writeFileSync(path.join(__dirname, "../public/output/strike-rate-per-year.json"), JSON.stringify(strikeRate, null, 2));

        })
        .on('error', (error) => {
          console.error('Error:', error);
        });
    })
    .on('error', (error) => {
      console.error('Error:', error);
    });
}
strikeRate();