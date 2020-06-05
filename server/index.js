require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');


const app = express();
const PORT = process.env.PORT || 8000;
app.use(bodyParser.json());

app.use('/',express.static(path.join(__dirname, '../public')));


app.get('/api/:id', (req, res) => {
    const { id } = req.params;
    // console.log(id);
    let room = `http://54.189.142.212/booking/?id=${id}`,
        booking = `http://54.189.142.212/room/?id=${id}`,
        listings = `http://54.186.187.224/listings/${id}`,
        photos = `http://54.149.5.250/photos/${id}`;

    const promise1 = axios.get(room);
    const promise2 = axios.get(booking);
    const promise3 = axios.get(listings);
    const promise4 = axios.get(photos);

    Promise.all([promise1, promise2, promise3, promise4])
    .then((result) => {
        // console.log(result);
        res.send(result[0].data);
    })
    .catch((err) => {
        res.status(500).send(err);
    })
});



app.listen(PORT, () => {
  console.log('Proxy listening on port 8000');
});