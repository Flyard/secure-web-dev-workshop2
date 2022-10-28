require('dotenv').config();
const mongoose = require('mongoose');
const filmingLocation = require('./lieux-de-tournage-a-paris.json');
 //Promesse

//async fun -> met tout dans une promesse
//await -> rendre les fun synchrones
const locationScheme = new mongoose.Schema({
    
    filmType: String,
    filmProducerName: String,
    endDate: Date,
    filmName: String,
    district: Number,
    geolocation: {
        //required: ['type', 'coordinates'],
        type: {
            type: String,
            enum: ['Point'],
            //required: true
        },
        coordinates: {
            type: [Number],
            //required: true
        }
    },
    sourcelocationId: String,
    filmDirectorName: String,
    address: String,
    startDate: Date,
    year: Number

});
const Location = mongoose.model('Location', locationScheme);
//module.exports = Location;

async function popu() {

    Location.find().remove();

    for(let i = 0; i < filmingLocation.length; i++){
        await new Location({
            filmType: filmingLocation[i].fields.type_tournage,
            filmProducerName: filmingLocation[i].fields.nom_producteur,
            endDate: filmingLocation[i].fields.date_fin,
            filmName: filmingLocation[i].fields.nom_tournage,
            district: filmingLocation[i].fields.ardt_lieu,
            geolocation: {
                coordinates : filmingLocation[i].fields.geo_shape.coordinates,
                type: filmingLocation[i].fields.geo_shape.type,
            },
            sourcelocationId: filmingLocation[i].fields.id_lieu,
            filmDirectorName: filmingLocation[i].fields.nom_realisateur,
            address: filmingLocation[i].fields.adresse_lieu,
            startDate: filmingLocation[i].fields.date_debut,
            year: filmingLocation[i].fields.annee_tournage
        }).save();        
    }
}



//id: {"$oid":"63485580dd0e7ff131c2cf6e"}

async function querybyID(_id) {
    Location.findById( {_id} , function (err, data) {
        if(err){
            console.log(err);
        }
        else {
            console.log(data);
        }
    }
    )
}
async function queryFilmName(filmName) {
    Location.find({filmName : filmName}, (err, data) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log(data);
        }
    }
    )
}

async function deleteByID(_id) {
    Location.findByIdAndDelete( {_id}, (err, data) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log(data);
        }
    }
    )
}

async function updateDocument(_id) {
    Location.findByIdAndUpdate(_id, {filmName : 'Hello World'},  (err, data) => {
        if(err){
            console.log(err);
        }
        else {
            console.log(data);
        }
    })
}
async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        //await querybyID('634d2e70709abf30cbfb264c');
        //await queryFilmName("JOUR J");
        //await deleteByID('634d2e70709abf30cbfb2658');
        await updateDocument('634d2e70709abf30cbfb264c');
    } catch {
        console.error(error);
    }
    //await popu();

    //await queryFilmName();
    mongoose.connection.close();
}

main();
