require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');


const app = express();
const PORT = process.env.PORT || 8000;
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public')));

const room = 'http://54.191.38.196',
    booking = 'http://54.191.38.196',
    listings = 'http://18.237.95.59',
    photos = 'http://34.214.44.203';

app.get('/api/', (req, res) => {
    const { id } = req.query;
    const promise1 = axios.get(room.concat(`/?id=${id}`));
    const promise2 = axios.get(booking.concat(`/?id=${id}`));
    const promise3 = axios.get(listings.concat(`/?id=${id}`));
    const promise4 = axios.get(photos.concat(`/?id=${id}`));
    Promise.all([promise1, promise2, promise3, promise4])
    .then((values) => {
        console.log(values);
        res.send(values);
    })
    .catch((err) => {
        res.status(500).send(err);
    });
});





// app.get('/:id', (req, res) => {
//     const { id } = req.params;
//     // console.log(id);
//     const listings = `http://34.214.44.203/photos/${id}`;
//     const description = axios.get(listings);
    
//     Promise.all([description])
//     .then((result) => {
//         console.log(result.status);
//         res.send(result.data);
//     })
    
// });
// app.get('/:id', (req, res) => {
//     const room = 'http://54.191.38.196',
//     //   booking = 'http://54.191.38.196',
//       listings = `http://35.162.174.32/listings/${id}`;
//     //   photos = 'http://34.214.44.203';

//     // const photos = axios.get(photos);
//     // const booking = axios.get(booking);
//     const description = axios.get(listings);

//     Promise.all([description])
//     .then((result) => {
//         console.log(result);
//         res.send(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// });


app.listen(PORT, () => {
  console.log('Proxy listening on port 8000');
});