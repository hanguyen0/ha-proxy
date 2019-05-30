const express = require('express');
const path = require('path');
const app = express();
var cors = require('cors')
app.use(cors())

app.use(express.static(__dirname + '/../public'));

// app.get('/:id', function(req, res) {
//     res.sendFile(path.join(__dirname, '/../public/index.html'));
// });


app.get('/photos/:listingID', (req, res) => {
    const { listingID } = req.params;
    res.redirect(`http://localhost:3001/photos/${listingID}`);
});

app.get('/listings/:id', (req, res) => {
    const { id} = req.params;
    res.redirect(`http://localhost:3002/listings/${id}`);
});

app.get('/room/:id', (req, res) => {
    const { id} = req.params;
    res.redirect(`http://localhost:3003/room/${id}`);
});

app.get('/booking/:id', (req, res) => {
    const { id} = req.params;
    res.redirect(`http://localhost:3003/booking/${id}`);
});

app.get('/reviews/:room_id', (req, res) => {
    const { room_id} = req.params;
    res.redirect(`http://localhost:3004/reviews/${room_id}`);
});

app.get('/MoreHomes/:listingID', (req, res) => {
    const { listingID} = req.params;
    res.redirect(`http://localhost:3005/MoreHomes/${listingID}`);
});


app.listen(3010, function() {
    console.log('listening on port 3010!');
  }); 