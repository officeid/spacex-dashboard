const launches = new Map();

const launch = {
    flightNumber: 100,
    mission: 'Kepler',
    rocket: 'Explorer',
    launchDate : new Date('December 27, 2022'),
    target: 'Kepler 2',
    customer: ['NASA', 'Google'],
    upcoming: true,
    success: true
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
    return Array.from(launches.values());
}

module.exports = {
    getAllLaunches,
}