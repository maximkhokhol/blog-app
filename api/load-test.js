import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '20s', target: 50 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const BASE_URL = 'http://localhost:5000';

  const urlsGet = [
    '/api/users/678e3275aa1d7bdee5984698',
    '/api/posts/678e32bf21362878cc4fa35f',
    '/api/posts',
    '/api/categories',
  ];

  const urlsPost = [
    { url: '/auth/login', payload: { username: 'test', password: 'test123' } },
    { url: '/api/categories', payload: { name: 'New Category' } },
    {
      url: '/auth/register',
      payload: {
        username: 'testUser',
        email: 'test@example.com',
        password: 'test123',
      },
    },
    {
      url: '/api/users/678e3275aa1d7bdee5984698',
      payload: { name: 'Updated User' },
    },
  ];

  const urlsPut = [
    {
      url: '/api/users/678e3275aa1d7bdee5984698',
      payload: { name: 'Updated Name' },
    },
    {
      url: '/api/posts/678e32bf21362878cc4fa35f',
      payload: { title: 'Updated Post', content: 'Updated content' },
    },
  ];

  const urlsDelete = [
    '/api/users/678e3275aa1d7bdee5984698',
    '/api/posts/678e32bf21362878cc4fa35f',
  ];

  urlsGet.forEach((endpoint) => {
    const res = http.get(`${BASE_URL}${endpoint}`);
    check(res, {
      'GET: status is 200': (r) => r.status === 200,
      'GET: response time < 500ms': (r) => r.timings.duration < 500,
    });
  });

  urlsPost.forEach((item) => {
    const res = http.post(
      `${BASE_URL}${item.url}`,
      JSON.stringify(item.payload),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    check(res, {
      'POST: status is 200 or 201': (r) => r.status === 200 || r.status === 201,
      'POST: response time < 500ms': (r) => r.timings.duration < 500,
    });
  });

  urlsPut.forEach((item) => {
    const res = http.put(
      `${BASE_URL}${item.url}`,
      JSON.stringify(item.payload),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    check(res, {
      'PUT: status is 200': (r) => r.status === 200,
      'PUT: response time < 500ms': (r) => r.timings.duration < 500,
    });
  });

  urlsDelete.forEach((endpoint) => {
    const res = http.del(`${BASE_URL}${endpoint}`);
    check(res, {
      'DELETE: status is 200 or 204': (r) =>
        r.status === 200 || r.status === 204,
      'DELETE: response time < 500ms': (r) => r.timings.duration < 500,
    });
  });

  sleep(1);
}
