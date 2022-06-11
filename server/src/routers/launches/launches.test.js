const request = require('supertest');
const app = require('../../app');

describe('TEST GET /launches', ()=> {
    test('It should respond with 200 success', async ()=>{
        const response = await request(app)
            .get('/launches')
            .expect('Content-type', /json/)
            .expect(200);
    });
});

const completeData = {
    mission: 'Kepler',
    rocket: 'Explorer',
    launchDate : 'December 27, 2022',
    target: 'Kepler 2',
}

const dataWithInvalidDate = {
    mission: 'Kepler',
    rocket: 'Explorer',
    launchDate : 'December',
    target: 'Kepler 2',
}

const completeWithoutDate = {
    mission: 'Kepler',
    rocket: 'Explorer',
    target: 'Kepler 2',
}

describe('TEST POST /launches', ()=>{
    test('It should respond with 201 created', async()=>{
        const response= await request(app)
            .post('/launches')
            .send(completeData)
            .expect('Content-type',/json/)
            .expect(201);
        
        const requestDate = new Date(completeData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();
        expect(requestDate).toBe(responseDate);


        expect(response.body).toMatchObject(completeWithoutDate);
    });

    test('It should catch missing properties',async ()=>{
        const response= await request(app)
            .post('/launches')
            .send(completeWithoutDate)
            .expect('Content-type',/json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Launch data is invalid.',
        })    
    });

    test('It should invalid launch date',async ()=>{
        const response= await request(app)
            .post('/launches')
            .send(dataWithInvalidDate)
            .expect('Content-type',/json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Invalid launch date.',
        })    
    });

    
});