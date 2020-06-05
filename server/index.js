require('newrelic');
const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const bodyParser = require('body-parser');
const axios = require('axios');


const app = express();
const PORT = process.env.PORT || 8000;
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public')));

const room = `http://54.189.142.212/`,
    booking = `http://54.189.142.212/`,
    listings = `http://54.186.187.224/`,
    photos = `http://54.149.5.250/`;

app.get('/api/:id', (req, res) => {
    const { id } = req.params;

    const promise1 = axios.get(`${room}booking?id=${id}`);
    const promise2 = axios.get(`${booking}room?id=${id}`);
    const promise3 = axios.get(`${listings}listings/${id}`);
    const promise4 = axios.get(`${photos}photos/${id}`);

    Promise.all([promise1, promise2, promise3, promise4])
    .then((result) => {
        // console.log(result);
        res.send(result[0].data);
    })
    .catch((err) => {
        res.status(500).send(err);
    })
});



app.all('/room*', (req, res) => {
// console.log('redirecting to booking service');
apiProxy.web(req, res, {target: room});
});

app.all('/booking*', (req, res) => {
// console.log('redirecting to booking service');
apiProxy.web(req, res, {target: booking});
});

app.all('/listings/*', (req, res) => {
// console.log('redirecting to reservation service');
apiProxy.web(req, res, {target: listings});
});

app.all('/photos/*', (req, res) => {
// console.log('redirecting to description service');
apiProxy.web(req, res, {target: photos});
});

app.use('/:id', express.static('public'));

app.listen(PORT, () => {
  console.log('Proxy listening on port 8000');
});