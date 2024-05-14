import http from 'k6/http';
import { check } from 'k6';
import encoding from 'k6/encoding';

export default function () {
  const iterations = __ENV.ITERATIONS; // Retrieve iteration count from environment variable
  console.log(`Iteration count: ${iterations}`);
  
  // Construct the URL with the correct parameter syntax
  const url = `http://localhost:8080/job/API_Performance_Monitoring/buildWithParameters?ITERATIONS=${iterations}&token=authvishuapijob`;
	console.log(url);
  // Construct HTTP request headers for basic authentication
  const username = 'username'; // Your Jenkins username
  const apiToken = 'token'; // Your Jenkins API token
  const auth = username + ':' + apiToken;
  const params = {
    headers: {
      "Authorization": "Basic " + encoding.b64encode(auth),
    },
  };

  // Send a POST request to trigger the Jenkins job
  let res = http.post(url, null, params);

  // Check if the response status was 201 (Created)
  check(res, { 'status was 201': (r) => r.status === 201 });
  
}


