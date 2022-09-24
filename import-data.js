require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);


const locationScheme = new mongoose.Schema({
    film_type: String,
    filmProduction: String,
    endDate: Date,
    filmName: String,
    district: Number,
    geolocation: {

        coordinates: {
            type: [Number],
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    sourcelocationId: String,
    filmDirectorName: String,
    adress: String,
    startDate: Date,
    year: Number

});

const location = mongoose.model('location', locationScheme);
module.exports = location;