import request from 'supertest';
import app from '../src/api';
import { expect } from 'chai';
import {Profile} from '../src/models/Profile'; // Import the Profile model

describe('GET /api/profile', () => {
    it('should return profile data', async () => {
        const response: request.Response = await request(app).get('/api/profile');

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body.profiles).to.be.an('array');
    });
});


describe('POST /api/profile', () => {
    it('should create a new profile if it does not exist', async () => {
        const profileData = {
            email: 'test@example.com',
            name: 'John Doe',
            nickname: 'johndoe',
        };
        const response: request.Response = await request(app).post('/api/profile').send(profileData);
        expect(response.body).to.be.an('object');
        expect(response.body.name).to.equal(profileData.name);
        expect(response.body.email).to.equal(profileData.email);
        expect(response.body.nickname).to.equal(profileData.nickname);
    });

    it('should fetch an existing profile if it already exists', async () => {
        const sampleProfile = {
            name: 'Existing Profile name',
            email: 'existingProfileName@example.com',
            nickname: 'existingProfileNick',
        };
        await Profile.create(sampleProfile);
        const response: request.Response = await request(app).post('/api/profile').send(sampleProfile);
        expect(response.body).to.be.an('object');
        expect(response.body.name).to.equal(sampleProfile.name);
        expect(response.body.email).to.equal(sampleProfile.email);
        expect(response.body.nickname).to.equal(sampleProfile.nickname);
    });

});