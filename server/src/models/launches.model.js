const launchesModel = require('./launches.mongo');
const planetsModel = require('./planets.mongo');

const DEFAULT_FLIGHTNUMBER = 100;

async function saveLaunches(launch) {
    const planet = await planetsModel.findOne({
        keplerName: launch.target
    });

    if (!planet) {
        throw new Error('Target planet not found.');
    }

    return await launchesModel.findOneAndUpdate(
        {
            flightNumber: launch.flightNumber
        }, launch, {
        upsert: true
    });
}

async function getAllLaunches() {
    return await launchesModel.find({}, {
        '_id': 0,
        '__v': 0
    })
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
    getAllLaunches,
    addNewLaunch: scheduleNewLaunch,
    doLaunchExistWithId,
    abortLaunchById,
}