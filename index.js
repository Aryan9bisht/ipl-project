const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
/*
const bestEconomy = require('./src/server/best-economy');
const economicalBowler = require('./src/server/economical-bowler');
const extras = require('./src/server/extras');
const highestDismissal = require('./src/server/highest-dismissal');
const highestNumOfPOM = require('./src/server/highest-number-of-pom');
const matchesPerYear = require('./src/server/matches-per-year');
const matchWonPerYear = require('./src/server/matches-won-per-year');
const strikeRate = require('./src/server/strike-rate');
const tossResult = require('./src/server/won-toss-and-match');
*/
//app.use('.',require('./routes'));
app.set('view engine', 'ejs');
app.get('/home',async (req,res)=>{
    try {
      return  res.render('index.ejs',{portNumber : port});
    } catch (error) {
        console.log('error caught',error);
    }
})
app.get('/bestEconomy', async (req, res) => {
    try {
        const result = require('./src/public/output/best-economy-in-super-over.json');
        console.log(result);

        res.send(`<!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" type="text/css" href="style.css">
            <script src="https://code.highcharts.com/highcharts.js"></script>
        </head>
        
        <body>
            <div id="chart-container" class="ipl-styling" style="text-align: center;">
                ${result.playerName} : ${result.economy} 
            </div>
            
            <script>
                document.addEventListener('DOMContentLoaded', function () {
                    Highcharts.chart('chart-container', {
                        chart: {
                            type: 'column',
                        },
                        title: {
                            text: "Best Economy Bowler",
                        },
                        xAxis: {
                            categories: ['${result.playerName}'],
                            title: {
                                text: "${result.playerName}",
                            },
                        },
                        yAxis: {
                            title: {
                                text: "Bowler Economy",
                            },
                        },
                        series: [{
                            name: "Bowler Economy",
                            data: [${result.economy}],
                        }],
                    });
                });
            </script>
        </body>
        </html>`);
    } catch (error) {
        console.log('caught error ', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/economicalBowler', (req, res) => {
    try {
        const bowlers = require('./src/public/output/10-economical-bowlers.json');
        
        // Extracting categories and data
        const categories = bowlers.map(bowler => bowler.bowler);
        const data = bowlers.map(bowler => bowler.economyRate);

        // HTML content with Highcharts chart
        const htmlContent = `<!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" type="text/css" href="style.css">
            <script src="https://code.highcharts.com/highcharts.js"></script>
        </head>
        
        <body>
            <div id="chart-container" class="ipl-styling" style="text-align: center;"></div>
            
            <script>
            document.addEventListener('DOMContentLoaded', function () {
                // Extract data from the dataset
                const categories = ${JSON.stringify(categories)};
                const data = ${JSON.stringify(data)};
    
                // Create the Highcharts chart
                Highcharts.chart('chart-container', {
                    chart: {
                        type: 'column',
                    },
                    title: {
                        text: 'Economical Bowler',
                    },
                    xAxis: {
                        categories: categories,
                        title: {
                            text: 'Bowler name',
                        },
                    },
                    yAxis: {
                        title: {
                            text: 'Bowler Economy',
                        },
                    },
                    series: [{
                        name: 'Bowler Economy',
                        data: data,
                    }],
                });
            });
            </script>
        </body>
        </html>`;

        // Send the HTML content
        res.send(htmlContent);
    } catch (error) {
        console.log('caught error ', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/extras', (req,res)=>{
    try {
         
        const data = require('./src/public/output/extra-runs-concede-per-year.json');
        const categories = Object.keys(data);
const scores = Object.values(data);
        const htmlContent= ` <!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" type="text/css" href="style.css">
            <script src="https://code.highcharts.com/highcharts.js"></script>
        </head>
        
        <body>
            <div id="chart-container" class="ipl-styling" style="text-align: center;"></div>
            
            <script>
            document.addEventListener('DOMContentLoaded', function () {
                // Extract data from the dataset
                const categories = ${JSON.stringify(categories)};
                const data = ${JSON.stringify(scores)};
    
                // Create the Highcharts chart
                Highcharts.chart('chart-container', {
                    chart: {
                        type: 'column',
                    },
                    title: {
                        text: 'Extras Runs ',
                    },
                    xAxis: {
                        categories: categories,
                        title: {
                            text: 'Teams',
                        },
                    },
                    yAxis: {
                        title: {
                            text: 'Extras',
                        },
                    },
                    series: [{
                        name: 'Extras',
                        data: data,
                    }],
                });
            });
            </script>
        </body>
        </html>`
        res.send(htmlContent);

    } catch (error) {
        console.log('caught error ',error);
    }
   

});app.get('/highestdismissal', (req, res) => {
    try {
        let result = {
            "player_dismissed": "MS Dhoni",
            "bowler_name": "Z Khan",
            "count": 7
        };

        let htmlContent = `<!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" type="text/css" href="style.css">
            <script src="https://code.highcharts.com/highcharts.js"></script>
        </head>
        
        <body>
            <div id="chart-container" class="ipl-styling" style="text-align: center;"></div>
            
            <script>
            document.addEventListener('DOMContentLoaded', function () {
                // Create the Highcharts chart
                Highcharts.chart('chart-container', {
                    chart: {
                        type: 'column',
                    },
                    title: {
                        text: 'Most dismissals',
                    },
                    xAxis: {
                        categories: ['Player Dismissed'],
                        title: {
                            text: '${result.player_dismissed}',
                        },
                    },
                    yAxis: {
                        title: {
                            text: 'Count',
                        },
                    },
                    series: [{
                        name: '${result.bowler_name}',
                        data: [${result.count}],
                    }],
                });
            });
            </script>
        </body>
        </html>`;

        return res.send(htmlContent);
    } catch (error) {
        console.log('caught error ', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/mostNumberOfPOM', (req, res) => {
    try {
        const data = require('./src/public/output/highest-number-of-POM.json');

        // Extracting years and counts from the data object
        const years = Object.keys(data).map(year => `${year}: ${data[year].player}`);
        const counts = Object.values(data).map(entry => entry.count);

        let htmlContent = `<!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" type="text/css" href="style.css">
            <script src="https://code.highcharts.com/highcharts.js"></script>
        </head>
        
        <body>
            <div id="chart-container" class="ipl-styling" style="text-align: center;"></div>
            
            <script>
            document.addEventListener('DOMContentLoaded', function () {
                // Create the Highcharts chart
                Highcharts.chart('chart-container', {
                    chart: {
                        type: 'column',
                    },
                    title: {
                        text: 'Most Player of the Match',
                    },
                    xAxis: {
                        categories: ${JSON.stringify(years)},
                        title: {
                            text: 'Year',
                        },
                    },
                    yAxis: {
                        title: {
                            text: 'POM count',
                        },
                    },
                    series: [{
                        name: \`POM's\`,
                        data: ${JSON.stringify(counts)},
                    }],
                });
            });
            </script>
        </body>
        </html>`;

        return res.send(htmlContent);
    } catch (error) {
        console.log('caught error ', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/matchesPerYear', (req,res)=>{
    try {
         
         const result = require('./src/public/output/matches-per-year.json');
         let categories = Object.keys(result);
         let data = Object.values(result);
 
         let htmlContent = ` <!DOCTYPE html>
         <html>
         <head>
             <link rel="stylesheet" type="text/css" href="style.css">
             <script src="https://code.highcharts.com/highcharts.js"></script>
         </head>
         
         <body>
             <div id="chart-container" class="ipl-styling" style="text-align: center;"></div>
             
             <script>
             document.addEventListener('DOMContentLoaded', function () {
                 // Extract data from the dataset
                 const categories = ${JSON.stringify(categories)};
                 const data = ${JSON.stringify(data)};
     
                 // Create the Highcharts chart
                 Highcharts.chart('chart-container', {
                     chart: {
                         type: 'column',
                     },
                     title: {
                         text: 'Matches per year ',
                     },
                     xAxis: {
                         categories: categories,
                         title: {
                             text: 'matches',
                         },
                     },
                     yAxis: {
                         title: {
                             text: 'matches',
                         },
                     },
                     series: [{
                         name: 'year',
                         data: data,
                     }],
                 });
             });
             </script>
         </body>
         </html>`
         res.send(htmlContent);
    } catch (error) {
        console.log('caught error ',error);
    }
   

});
app.get('/matchwonperyear', (req, res) => {
    try {
        const data = require('./src/public/output/matches-won-per-year.json');

        // Extracting years, teams, and wins from the data object
        const years = Object.keys(data);
        const teams = Object.keys(data[years[0]]);
        const seriesData = teams.map(team => ({
            name: team,
            data: years.map(year => data[year][team] || 0) // Filling missing data with 0
        }));

        let htmlContent = `<!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" type="text/css" href="style.css">
            <script src="https://code.highcharts.com/highcharts.js"></script>
        </head>
        
        <body>
            <div id="chart-container" class="ipl-styling" style="text-align: center;"></div>
            
            <script>
            document.addEventListener('DOMContentLoaded', function () {
                // Create the Highcharts chart
                Highcharts.chart('chart-container', {
                    chart: {
                        type: 'column',
                    },
                    title: {
                        text: 'Team Wins by Year',
                    },
                    xAxis: {
                        categories: ${JSON.stringify(years)},
                        title: {
                            text: 'Year',
                        },
                    },
                    yAxis: {
                        title: {
                            text: 'Wins',
                        },
                    },
                    series: ${JSON.stringify(seriesData)},
                });
            });
            </script>
        </body>
        </html>`;

        return res.send(htmlContent);
    } catch (error) {
        console.log('caught error ', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/strikerate', (req, res) => {
    try {
        const data = require('./src/public/output/strike-rate-per-year.json');

        // Extracting batsmen, seasons, and strike rates from the data object
        const batsmen = [];
        const seasons = [];
        const seriesData = [];

        data.forEach(entry => {
            if (!batsmen.includes(entry.batsman)) batsmen.push(entry.batsman);
            if (!seasons.includes(entry.season)) seasons.push(entry.season);
        });

        batsmen.forEach(batsman => {
            const batsmanData = {
                name: batsman,
                data: seasons.map(season => {
                    const record = data.find(entry => entry.batsman === batsman && entry.season === season);
                    return record ? record.strikeRate1 : null;
                })
            };
            seriesData.push(batsmanData);
        });

        let htmlContent = `<!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" type="text/css" href="style.css">
            <script src="https://code.highcharts.com/highcharts.js"></script>
        </head>
        
        <body>
            <div id="chart-container" class="ipl-styling" style="text-align: center;"></div>
            
            <script>
            document.addEventListener('DOMContentLoaded', function () {
                // Create the Highcharts chart
                Highcharts.chart('chart-container', {
                    chart: {
                        type: 'line',
                    },
                    title: {
                        text: 'Batsman Strike Rate by Season',
                    },
                    xAxis: {
                        categories: ${JSON.stringify(seasons)},
                        title: {
                            text: 'Season',
                        },
                    },
                    yAxis: {
                        title: {
                            text: 'Strike Rate',
                        },
                    },
                    series: ${JSON.stringify(seriesData)},
                });
            });
            </script>
        </body>
        </html>`;

        return res.send(htmlContent);
    } catch (error) {
        console.log('caught error ', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/wonToss', (req,res)=>{
    try {
         
        const result = require('./src/public/output/won-toss-and-match.json');
        const categories = Object.keys(result);
        const data = Object.values(result);
        let htmlContent=` <!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" type="text/css" href="style.css">
            <script src="https://code.highcharts.com/highcharts.js"></script>
        </head>
        
        <body>
            <div id="chart-container" class="ipl-styling" style="text-align: center;"></div>
            
            <script>
            document.addEventListener('DOMContentLoaded', function () {
                // Extract data from the dataset
                const categories = ${JSON.stringify(categories)};
                const data = ${JSON.stringify(data)};
    
                // Create the Highcharts chart
                Highcharts.chart('chart-container', {
                    chart: {
                        type: 'column',
                    },
                    title: {
                        text: 'WON TOSS AND MATCH ',
                    },
                    xAxis: {
                        categories: categories,
                        title: {
                            text: 'Team name',
                        },
                    },
                    yAxis: {
                        title: {
                            text: 'Number of matches and toss won',
                        },
                    },
                    series: [{
                        name: 'year',
                        data: data,
                    }],
                });
            });
            </script>
        </body>
        </html>`
        res.send(htmlContent);
   } 
catch (error) {
        console.log('caught error ',err);
    }
   

});

app.listen(port,(err)=>{
    if(err){
        console.log(`error in running port ${err}`);
    }
    else{
        console.log(`port is running on ${port}`);
    }
})



/*
\

src/
server/
    ipl.js
    index.js
public/
    output
        matchesPerYear.json
        ...
    index.html
    style.css
data/
    matches.csv
    deliveries.csv
package.json
package-lock.json
.gitignore
*/