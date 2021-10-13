const parse = require('csv-parse');
const fs = require('fs');

let results = [];

const isHabitable = (planet) => {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 
    && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

function loadPlanets(){
    return new Promise((resolve, reject) => {
        fs.createReadStream('./data/kepler_data.csv')
    .pipe(parse({
      comment: '#',
      columns: true,
    }))
    .on('data', (data) => {
      if (isHabitable(data)) {
        results.push(data);
      }
    })
    .on('error', (err)=>{
        console.log(err);
        reject(err);
    })
    .on('end', ()=>{
        // console.log( results.map(planet => {
        //   return planet['kepoi_name']
        // }));
        console.log('Possible Habitable Planets: '+ results.length);
        console.log("DONE!!");
        resolve();
    });
    });
}

module.exports = {
    loadPlanets : loadPlanets,
    planets : results
};