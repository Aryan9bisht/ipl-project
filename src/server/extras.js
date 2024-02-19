const { log } = require('console');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

function extras() {
  let start,end;
  let matches = [];
  
  fs.createReadStream(path.join(__dirname, '../data/matches.csv'))
    .pipe(csv({}))
    .on('data', function (datarowMatches) {
      if (datarowMatches.season === '2016') {
          if (!start) {
              start = +datarowMatches.id;
          } else {
              end = +datarowMatches.id;
          }
      }
  }).on('end', () => {
    let seasonal = [];


      fs.createReadStream(path.join(__dirname, '../data/deliveries.csv')).pipe(csv({}))
      .on('data', function (data) {

        if (data.match_id >= start && data.match_id <= end) {
            seasonal.push(data);
        }

    }).on('end', () => {
        let extras = seasonal.reduce((acc,cv)=>{
          if (acc[cv.bowling_team] !== undefined){
              acc[cv.bowling_team] += Number(cv.extra_runs);
          }else{
              acc[cv.bowling_team] = Number(cv.extra_runs);
          }
          return acc;
      },{})

          fs.writeFileSync(path.join(__dirname, "../public/output/extra-runs-concede-per-year.json"), JSON.stringify(extras, null, 2));

        })
        .on('error', (error) => {
          console.error('Error:', error);
        });
    })
    .on('error', (error) => {
      console.error('Error:', error);
    });

}
extras();