const {
    getAllLaunches,
    addNewLaunch,
    doLaunchExistWithId,
    abortLaunchById
} = require('../../models/launches.model');

async function httpGetAllLaunches(req, res) {
    return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
    const launch = req.body;

    if(!launch.mission || !launch.rocket || !launch.launchDate
        || !launch.target){

            return res.status(400).json({
                error: 'Launch data is invalid.',
            });
    }

    launch.launchDate = new Date(launch.launchDate);
    
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error: 'Invalid launch date.',
        });
    }

    return res.status(201).json(await addNewLaunch(launch));
}

async function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);

    const doIdExist = await doLaunchExistWithId(launchId);
    if(!doIdExist){
        return res.status(404).json({
            error: 'Launch does not exist!'
        });
    }

    const aborted = await abortLaunchById(launchId);
    if(!aborted.ok){
        return res.status(400).json({
            error: 'Launch do not aborted!'
        });
    }

    return res.status(200).json({ok: true});
}

module.exports={
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}