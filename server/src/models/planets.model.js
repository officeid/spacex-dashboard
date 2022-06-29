const parse = require('csv-parse');
const fs = require('fs');

const planetsModel = require('./planets.mongo');

// let habitablePlanets = [];

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
    .on('data', async (data) => {
      if (isHabitable(data)) {
        // habitablePlanets.push(data);
         await savePlanet(data);
      }
    })
    .on('error', (err)=>{
        console.log(err);
        reject(err);
    })
    .on('end', async ()=>{
        const planetsCount = (await getAllPlanets()).length;
        console.info('Possible Habitable Planets: '+ planetsCount);
        resolve();
    });
    });
}

async function getAllPlanets() {
  // return habitablePlanets;
  return await planetsModel.find({},{
    '_id':0,
    '__v':0
  });
}

async function savePlanet(planet) {
  try {
    await planetsModel.updateOne({
      keplerName: planet.kepler_name,
    }, {
      keplerName: planet.kepler_name,
    }, {
      upsert: true,
    }
    );
  } catch (error) {
    console.error('Could not save planets.');
  }
}

module.exports = {
    loadPlanets : loadPlanets,
    getAllPlanets,
};