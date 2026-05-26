import request from 'supertest';
import express from 'express';

const app = express();
app.get('/', (req, res) => {
  res.send('CHOOSEEASY API is running');
});

describe('GET /', () => {
  it('should return API status', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('CHOOSEEASY API is running');
  });
});
