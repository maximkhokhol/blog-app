import { check, sleep } from 'k6';
import http from 'k6/http';

export let options = {
  stages: [
    { duration: '30s', target: 50 },
    { duration: '1m', target: 100 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
  },
};

export default function () {
  const routes = [
    '/',
    '/about',
    '/contact',
    '/posts',
    '/register',
    '/login',
    '/post/6775e9835c8518858052e5d5',
    '/write',
    '/settings',
  ];

  routes.forEach((route) => {
    let res = http.get(`http://127.0.0.1:4173${route}`);
    check(res, {
      [`${route} status is 200`]: (r) => r.status === 200,
      [`${route} response time < 500ms`]: (r) => r.timings.duration < 500,
    });
  });

  sleep(1);
}
