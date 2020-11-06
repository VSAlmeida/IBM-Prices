const VsiHelper = require('../../helpers/VSI/VsiHelper');

//Função genérica responsável por setar software pre instalado
//Essa função espera receber os parâmetros:
//dataSoftware - lista de objetos onde iremos armazenar as vsi depois de adicionar o software
//dataElement - elemento corrente da lista anterior com as vsi
//storageType1 - primeiro tipo de storage presente na vsi
//storageType2 - segundo tipo de storage presente na vsi
//softwareName - nome do software
function setSoftware(
  dataSoftware,
  dataElement,
  storageType1,
  storageType2,
  softwareName
) {
  if (
    dataElement.storage === storageType1 ||
    dataElement.storage === storageType2
  ) {
    let json = VsiHelper.newJson(dataElement);
    json.priceDescription += ', ' + softwareName;
    json.preInstaledSoftware = {
      shortName: softwareName,
      version: [],
    };
    dataSoftware[dataSoftware.length] = json;
  }
}

module.exports = {
  //Método responsável por setar o software pre instalado das VSI
  async setSoftware(req, res, next) {
    let data = res.locals.data;
    let dataSoftware = [];

    data.forEach((dataElement) => {
      let json = VsiHelper.newJson(dataElement);
      json.preInstaledSoftware = 'None';
      dataSoftware[dataSoftware.length] = json;

      setSoftware(
        dataSoftware,
        dataElement,
        '25GB SAN',
        '100GB SSD',
        'MySQL for Linux'
      );
      setSoftware(
        dataSoftware,
        dataElement,
        '100GB SAN',
        '100GB SSD',
        'MySQL for Windows'
      );
    });

    res.locals.data = dataSoftware;
    next();
  },
};
