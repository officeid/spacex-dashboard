const axois = require('axios');

const launchesModel = require('./launches.mongo');
const planetsModel = require('./planets.mongo');

const DEFAULT_FLIGHTNUMBER = 100;
const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

async function populateLaunches() {
    const response = await axois.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        customers: 1
                    }
                }
            ],
        }
    });

    if(response.status !== 200){
        throw new Error('Launch data from SpaceXAPI not loaded.');
    }

    const launchDocs = response.data.docs;

    for(const launchDoc of launchDocs){
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload)=>{
            return payload['customers'];
        });
        const launch = {
            flightNumber : launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket : launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers,
        }
        console.log(`${launch.flightNumber} ${launch.mission}`);
        saveLaunches(launch);
    }
}

async function loadLaunches() {

    const firstLaunch = await findLaunch({
        flightNumber: 1,
        mission: 'FalconSat',
        rocket: 'Falcon 1'
    });

    if(firstLaunch){
        console.info('Launch data exist in the database.');
    }else {
        await populateLaunches();
    }
}

async function saveLaunches(launch) {
    

    return await launchesModel.findOneAndUpdate(
        {
            flightNumber: launch.flightNumber
        }, launch, {
        upsert: true
    });
}

async function getAllLaunches(skip, limit) {
    return await launchesModel.find({}, {
        '_id': 0,
        '__v': 0
    })
    .sort({flightNumber: 1})
    .skip(skip)
    .limit(limit);
}

async function findLaunch(filter){
    return await launchesModel.findOne(filter);
}


async function doLaunchExistWithId(launchId) {
    return await launchesModel.findOne({
        flightNumber: launchId
    });
}

async function abortLaunchById(launchId) {
    const aborted = await launchesModel.updateOne({
        flightNumber: launchId,
        },{
            success: false,
            upcoming: false
    });
    
    return aborted.ok === 1 && aborted.nModified === 1;
}


async function getLatestFlightNumber() {
    const latestLaunch = await launchesModel
        .findOne()
        .sort('-flightNumber');

    if (!latestLaunch) {
        return DEFAULT_FLIGHTNUMBER;
    }
    return latestLaunch.flightNumber;
}

async function scheduleNewLaunch(launch) {

    const planet = await planetsModel.findOne({
        keplerName: launch.target
    });

    if (!planet) {
        throw new Error('Target planet not found.');
    }

    const latestFlightNumber = await getLatestFlightNumber() + 1;

    const launchObject = Object.assign(launch, {
        flightNumber: latestFlightNumber,
        customers: [
            'Google',
            'Facebook'
        ],
    });

    saveLaunches(launchObject);
    return launchObject;
}

module.exports = {
    loadLaunches,
    getAllLaunches,
    addNewLaunch: scheduleNewLaunch,
    doLaunchExistWithId,
    abortLaunchById,
}