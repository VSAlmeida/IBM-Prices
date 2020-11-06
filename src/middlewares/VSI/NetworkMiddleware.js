const VsiHelper = require('../../helpers/VSI/VsiHelper');

//Função genérica responsável por setar a rede
//Essa função espera receber os parâmetros:
//dataNetwork - lista de objetos onde iremos armazenar as vsi depois de adicionar a rede
//dataElement - elemento corrente da lista anterior com as vsi
//network - tipo de rede que sera adicionado na vsi
function setNetwork(dataNetwork, dataElement, network) {
  let json = VsiHelper.newJson(dataElement);
  json.priceDescription += ', ' + network;
  json.networkPerformance = network;
  dataNetwork[dataNetwork.length] = json;
}

module.exports = {
  //Método responsável por setar a rede das VSI
  async setNetwork(req, res, next) {
    const public = res.locals.public;
    const reserved = res.locals.reserved;
    let data = [...public, ...reserved];
    let dataNetwork = [];
    data.forEach((dataElement) => {
      setNetwork(
        dataNetwork,
        dataElement,
        '1 Gbps Public & Private Network Uplinks'
      );
      setNetwork(
        dataNetwork,
        dataElement,
        '100 Mbps Public & Private Network Uplinks'
      );
    });

    res.locals.data = dataNetwork;
    next();
  },
};
