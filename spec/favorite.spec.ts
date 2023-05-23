import request from 'supertest';
import app from '../src/api';
import { expect } from 'chai';

describe("Favorite API", () => {
    it("should retrieve favorites", async () => {
        const response: request.Response = await request(app).get("/api/favorite");

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("favorite");
    });
});

describe('GET /api/favorite/:profile_id', () => {
    it('should return favorite data for a given profile_id', async () => {
        const profileId = 'example_existing_profile_id'; // Provide a valid profile_id here
        const response = await request(app).get(`/api/favorite/${profileId}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("favorite");
    });

    it('should return an error if an error occurs while fetching favorite data', async () => {
        const profileId = 'non_existent_profile_id'; // Provide a non-existent profile_id here
        const response = await request(app).get(`/api/favorite/${profileId}`);
        expect(response.status).to.equal(500);
        expect(response.body.error).to.be('An error occurred while fetching the favorite data.');
    });
});