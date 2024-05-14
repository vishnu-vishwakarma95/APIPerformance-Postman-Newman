import http from 'k6/http';
import { check } from 'k6';
import encoding from 'k6/encoding';

export default function () {
  var username = 'vishnu_vishwakarma'; // Your Jenkins username
  var apiToken = '116c69db5a11cccf3e05b65d98a385c344'; // Your Jenkins API token
  var auth = username + ':' + apiToken;
  var params = {
    headers: {
      "Authorization": "Basic " + encoding.b64encode(auth),
    },
  };

  var url = 'http://localhost:8080/job/API_Performance_Monitoring/build?token=authvishuapijob'; // Update this URL with your Jenkins job URL

  let res = http.post(url, null, params);

  check(res, { 'status was 201': (r) => r.status === 201 });
}

