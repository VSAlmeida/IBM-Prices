const express = require('express');
const VsiController = require('./controllers/VsiController');
const DbController = require('./controllers/DbController');

//Importação de Middlewares genericos
const DcMiddleware = require('./middlewares/DcMiddleware');

//Importação dos Middlewares das VSI
const FlavorsMiddleware = require('./middlewares/VSI/FlavorsMiddleware');
const PriceMiddleware = require('./middlewares/VSI/PriceMiddleware');
const OsMiddleware = require('./middlewares/VSI/OsMiddleware');
const NetworkMiddleware = require('./middlewares/VSI/NetworkMiddleware');
const SoftwareMiddleware = require('./middlewares/VSI/SoftwareMiddleware');

//Importação dos Middlewares dos DBs
const EdbMiddleware = require('./middlewares/DB/EdbMiddleware');
const DbMiddleware = require('./middlewares/DB/DbMiddleware');
const PostgreMiddleware = require('./middlewares/DB/PostgreMiddleware');

//Declaração das Rotas
const routes = express.Router();

//Middlewares das VSI
routes.use('/vsi', DcMiddleware.verifyVSIParms);
routes.use('/vsi', FlavorsMiddleware.setPublicFlavors);
routes.use('/vsi', FlavorsMiddleware.setReservedFlavors);
routes.use('/vsi', NetworkMiddleware.setNetwork);
routes.use('/vsi', OsMiddleware.setOS);
routes.use('/vsi', SoftwareMiddleware.setSoftware);
routes.use('/vsi', PriceMiddleware.setPrice);

//Rota das VSI
routes.get('/vsi/all', VsiController.getAll);

//Middlewares dos BDs
routes.use('/db/all', DcMiddleware.verifyDBParms);
routes.use('/db/all', DbMiddleware.setOffering);
routes.use('/db/all', EdbMiddleware.setPrice);
routes.use('/db/all', PostgreMiddleware.setPrice);

//Rotas dos BD
routes.get('/db/all', DbController.getAll);
routes.get('/db/locations', DbController.getLocations);

module.exports = routes;
