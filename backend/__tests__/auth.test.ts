const request  = require ('supertest');
import app from '../src/app'; 
import { AppDataSource } from '../src/data-source';
import { Users } from '../src/entity/User';
import { RefreshTokens } from '../src/entity/RefreshToken';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

describe('Authentication Routes', () => {
  let user: any;
  let refreshToken: string;


  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
  });


  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
  });


  it('should register a new user (POST /api/sign-up)', async () => {
    const response = await request(app)
      .post('/api/sign-up')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        profileImage: 'image.jpg',
      })
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User created');
  });


  it('should log in a user (POST /api/sign-in)', async () => {

    const userData = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      password: 'password123',
      profileImage: 'image.jpg',
    };

    await request(app)
      .post('/api/sign-up')
      .send(userData)
      .set('Accept', 'application/json');

    // Prijava korisnika
    const response = await request(app)
      .post('/api/sign-in')
      .send({
        email: userData.email,
        password: userData.password,
      })
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.accessToken).toBeDefined();
    refreshToken = response.headers['set-cookie'][0]
  });


  it('should refresh access token (POST /api/refreshToken)', async () => {
    const response = await request(app)
      .post('/api/refreshToken')
      .set('Cookie', refreshToken) 
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.accessToken).toBeDefined();
  });


  it('should access protected route (GET /api/protected)', async () => {
    const user = await request(app)
      .post('/api/sign-in')
      .send({ email: 'john@example.com', password: 'password123' })
      .set('Accept', 'application/json');

    const accessToken = user.body.accessToken; 

    const response = await request(app)
      .get('/api/protected')
      .set('Authorization', `Bearer ${accessToken}`) 
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.text).toBe('gas');
  });
});
