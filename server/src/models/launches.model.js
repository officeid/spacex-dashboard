const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler',
    rocket: 'Explorer',
    launchDate : new Date('December 27, 2022'),
    target: 'Kepler 2',
    customers: ['NASA', 'Google'],
    upcoming: true,
    success: true
};

launches.set(latestFlightNumber, launch);

function getAllLaunches() {
    return Array.from(launches.values());
}

function doLaunchExistWithId(launchId) {
    return launches.has(launchId);
}

function abortLaunchById(launchId) {
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber, 
        Object.assign(launch,{
            flightNumber: latestFlightNumber,
            customer: ['NASA', 'Google'],
            upcoming: true,
            success: true,
        })
    );
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    doLaunchExistWithId,
    abortLaunchById,
}