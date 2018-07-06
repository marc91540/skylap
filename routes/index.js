var express = require('express');
var router = express.Router();
var Papa = require('papaparse');

const fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('landing');
});

/* GET home page. */
router.get('/company/:companyName', function (req, res, next) {
    var file = fs.createReadStream('./public/assets/data_companies.csv')

    let company = req.params.companyName;
    Papa.parse(file, {
        header: true,
        download: true,
        dynamicTyping: true,

        complete: (results) => {
            for (let comp of results.data) {
                if (comp['nom de la compagnie'] == company) {
                    console.log(comp);
                    res.render('company.twig', {
                        companyName: comp['nom de la compagnie'],
                        iata: comp['IATA'],
                        cabinWeight: comp['poid cabine'],
                        luggageWeight:comp['Taille du bagage à main'],
                        holdHeight: comp['taille soute'],
                        maxWeight: comp['Poids max. autorisé des bagages en soute'],
                        wifi: comp['WIFI'],
                        alliance: comp['Alliance'],
                        phone: comp['numéro de téléphone'],
                        nationality: comp['Nationalité'],
                        rootAirport: comp['Aéroport de base'],
                        headquarter: comp['Siège Social '],
                        creationDate: comp['Date de création'],
                        ponctuality: comp['PONCTUALITÉ momondo'],
                        lateFlights: comp['VOLS RETARDÉS momondo'],
                        firstAvion: comp['avion 1'],
                        quantity1: comp['quantité 1'],
                        dateOfCreation: comp['Date de création'],
                        website: comp['Site Web']
                    });

                }
            }
        }
    })


});


/* GET contact page. */
router.get('/contact', function (req, res) {
    res.send('contact');
});

module.exports = router;
