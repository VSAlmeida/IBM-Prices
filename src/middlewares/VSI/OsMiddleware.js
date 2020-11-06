const VsiHelper = require('../../helpers/VSI/VsiHelper');

//Função genérica responsável por setar os sistemas operacionais
//Essa função espera receber os parâmetros:
//dataOS - lista de objetos onde iremos armazenar as vsi depois de adicionar o SO
//dataElement - elemento corrente da lista anterior com as vsi
//storageType1 - primeiro tipo de storage presente na vsi
//storageType2 - segundo tipo de storage presente na vsi
//osName - nome do sistema operacional
function setOs(dataOS, dataElement, storageType1, storageType2, osName) {
  if (
    dataElement.storage === storageType1 ||
    dataElement.storage === storageType2
  ) {
    let json = VsiHelper.newJson(dataElement);
    json.priceDescription += ', Operating System ' + osName;
    json.operatingSystem = { shortName: osName, version: [] };
    dataOS[dataOS.length] = json;
  }
}

module.exports = {
  //Método responsável por setar os sistemas operacionais das VSI
  async setOS(req, res, next) {
    let data = res.locals.data;
    let dataOS = [];
    data.forEach((dataElement) => {
      setOs(dataOS, dataElement, '25GB SAN', '100GB SSD', 'Ubuntu');
      setOs(dataOS, dataElement, '25GB SAN', '100GB SSD', 'CentOS');
      setOs(dataOS, dataElement, '25GB SAN', '100GB SSD', 'Debian');
      setOs(
        dataOS,
        dataElement,
        '25GB SAN',
        '100GB SSD',
        'Red Hat Enterprise Linux'
      );
      setOs(dataOS, dataElement, '100GB SAN', '100GB SSD', 'Windows');
    });
    res.locals.data = dataOS;
    next();
  },
};
