const express = require('express');
const VsiController = require('./controllers/VsiController');
const DatacenterMiddleware = require('./middlewares/DatacenterMiddleware');
const FlavorsMiddleware = require('./middlewares/FlavorsMiddleware');
const PriceMiddleware = require('./middlewares/PriceMiddleware');
const OsMiddleware = require('./middlewares/OsMiddleware')
const NetworkMiddleware = require('./middlewares/NetworkMiddleware')
const SoftwareMiddleware = require('./middlewares/SoftwareMiddleware')

const routes = express.Router();

routes.use('/vsi', DatacenterMiddleware.verifyDT);
routes.use('/vsi', FlavorsMiddleware.setPublicFlavors);
routes.use('/vsi', FlavorsMiddleware.setReservedFlavors);
routes.use('/vsi', NetworkMiddleware.setNetwork);
routes.use('/vsi', OsMiddleware.setOS);
routes.use('/vsi', SoftwareMiddleware.setSoftware);
routes.use('/vsi', PriceMiddleware.setPrice);

routes.get('/vsi/all', VsiController.getAll);

module.exports = routes;
