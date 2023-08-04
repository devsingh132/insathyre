const https = require('https');

async function Apply(jobId, referer) {
  // Build the post string from an object
//   var post_data = querystring.stringify({"id":null,"is_interested":true,"job_id":271569,"is_activity_page_job":false});
  var post_data = JSON.stringify({"id":null,"is_interested":true,"job_id":jobId,"is_activity_page_job":false});

  // An object of options to indicate where to post to
  var post_options = {
      host: 'www.instahyre.com',
      path: '/api/v1/candidate_opportunity/apply',
      method: 'POST',
      headers: {
          'content-Type': 'application/json',
          'cookie': '_ga=GA1.2.471952549.1691141881; _gid=GA1.2.1233134157.1691141881; ln_or=eyIxNzM3NjMiOiJkIn0%3D; csrftoken=45RNsc3RIEFN9gwyvgq7mR0h41jEDtQijYG69q8lOTJR0vKuYzyu0d5Wf82esnK8; sessionid=dywdtj81gwt3d2xfhtpad46q8frpr6qr; _clck=8iozoi|2|fdv|0|1311; _gat_UA-45611607-3=1; _clsk=swxfaw|1691142350231|7|1|r.clarity.ms/collect; _ga_0PQL61K7YN=GS1.2.1691141881.1.1.1691142356.0.0.0',
          'referer': referer,
          'x-csrftoken': '45RNsc3RIEFN9gwyvgq7mR0h41jEDtQijYG69q8lOTJR0vKuYzyu0d5Wf82esnK8'
      }
  };

  // Set up the request
  var post_req = https.request(post_options, function(res) {
      res.setEncoding('utf8');
      if (res.statusCode !== 200) {
        console.log(jobId, res.statusCode)
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
      }
  });

  // post the data
  post_req.write(post_data);
  post_req.end();

}

async function Get(year) {
    // Build the post string from an object
  //   var post_data = querystring.stringify({"id":null,"is_interested":true,"job_id":271569,"is_activity_page_job":false});
    // var post_data = JSON.stringify({"id":null,"is_interested":true,"job_id":jobId,"is_activity_page_job":false});
  
    // An object of options to indicate where to post to
    var post_options = {
        host: 'www.instahyre.com',
        path: `/api/v1/job_search?company_size=0&job_functions=10&skills=JavaScript&skills=C%2B%2B&skills=Ruby&skills=Ruby+on+Rails&skills=node&skills=Node.js&skills=Git&skills=graphql&skills=Kubernetes&skills=Docker&skills=Ansible&skills=Prometheus&skills=Grafana&skills=Linux&skills=Windows&status=0&years=${year}&limit=1000`,
        method: 'GET',
        headers: {
            'content-Type': 'application/json',
            'cookie': '_ga=GA1.2.471952549.1691141881; _gid=GA1.2.1233134157.1691141881; ln_or=eyIxNzM3NjMiOiJkIn0%3D; csrftoken=45RNsc3RIEFN9gwyvgq7mR0h41jEDtQijYG69q8lOTJR0vKuYzyu0d5Wf82esnK8; sessionid=dywdtj81gwt3d2xfhtpad46q8frpr6qr; _clck=8iozoi|2|fdv|0|1311; _gat_UA-45611607-3=1; _clsk=swxfaw|1691142350231|7|1|r.clarity.ms/collect; _ga_0PQL61K7YN=GS1.2.1691141881.1.1.1691142356.0.0.0',
            'x-csrftoken': '45RNsc3RIEFN9gwyvgq7mR0h41jEDtQijYG69q8lOTJR0vKuYzyu0d5Wf82esnK8'
        }
    };
  
    // Set up the request
    var req = https.request(post_options, function(res) {
        console.log('statusCode:', res.statusCode);
        // console.log('headers:', res.headers);
        let data = '';
        res.on('data', (d) => {
            data += d;
        });
        res.on('end', async function() {
            const resp = JSON.parse(data);
            for (let index = 0; index < resp['objects'].length; index++) {
                const job = resp['objects'][index];
                // console.log(job['id'])
                await Apply(job['id'],`https://www.instahyre.com/api/v1/job_search?company_size=0&job_functions=10&skills=Ruby&skills=Ruby+on+Rails&skills=node&skills=Node.js&skills=Git&skills=graphql&skills=Kubernetes&skills=Docker&skills=Ansible&skills=Prometheus&skills=Grafana&skills=Linux&skills=Windows&status=0&years=${year}&limit=1000`)
            }

        })
    });
  
    req.on('error', (e) => {
        console.error(e);
      });
      req.end(); 
  
}
for (let years = 1; years < 4; years++) {
    setTimeout(() => {
        Get(years)
    }, 2000);
}