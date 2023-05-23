import request from 'supertest';
import app from '../src/api';
import { expect } from 'chai';
import {Simulator} from '../src/models/Simulator'; // Import the Profile model

describe('GET /api/simulator', () => {
    it('should return simulator data', async () => {
        const response: request.Response = await request(app).get('/api/profile');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body.profiles).to.be.an('array');
    });
});


describe('GET /api/simulator/?value=', () => {
    it('should get the profile if it exist', async () => {
        const profileId="existing_profile_id"
        const response: request.Response = await request(app).post(`api/simulator/?value=${profileId}`);
        expect(response.body).to.be.an('array');
    });
});