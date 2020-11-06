const api = require('../../../config/slApi');

function removeDuplicates(array) {
  return array.filter((a, b) => array.indexOf(a) === b);
}

module.exports = {
  async setPrice(req, res, next) {
    const groupId = res.locals.groupId;
    const data = await api
      .get(
        '/SoftLayer_Product_Package/835/getItems.json?objectMask=filteredMask[id,keyName,description,prices[id,hourlyRecurringFee,recurringFee,locationGroupId,pricingLocationGroup[id,description,locations]]]'
      )
      .then((result) => {
        //Pega as maquinas de uma variavel local
        const data = res.locals.data;
        //Percorre o array de maquinas 1 item por vez, colocando na variavel dataElement
        data.forEach((dataElement) => {
          //Pega os items que a api retorna e percorre item por item, colocando na variavel resultElement
          result.data.forEach((resultElement) => {
            //Adiciona o preço das vCPUs / Ram / Rede
            //Verifica se o ID da vCPU é igual ao keyName(ID) do item corrente, do resultElement
            if (
              dataElement.vCpuID === resultElement.keyName ||
              //Verifica se o ID da Ram é igual ao keyName(ID) do item corrente, do resultElement
              dataElement.ramID === resultElement.keyName ||
              //Verifica se o nome da Rede é igual ao nome da rede do item corrente, do resultElement
              dataElement.networkPerformance === resultElement.description
            ) {
              //Os preços vem em uma lista separados por regioes
              //Percorre a lista de preços 1 por vez, colocando na variavel priceElement
              resultElement.prices.forEach((priceElement) => {
                //Verifica se o ID da Regiao é igual ao ID da regiao que veio da request
                if (priceElement.locationGroupId === groupId) {
                  //Verifica se a maquina corrente é do tipo OnDemand
                  if (dataElement.termType === 'OnDemand') {
                    dataElement.pricePerUnit += parseFloat(
                      priceElement.hourlyRecurringFee
                    );
                  }
                  //Verifica se a maquina corrente é do tipo Reserved
                  if (dataElement.termType === 'Reserved') {
                    dataElement.pricePerUnit += parseFloat(
                      priceElement.recurringFee
                    );
                  }
                }
              });
            }
            //Adiciona o preço do Disco
            //Verifica se o ID do storage é igual ao keyName(ID) do item corrente, do resultElement
            if (dataElement.storageID === resultElement.keyName) {
              //Os preços vem em uma lista separados por regioes
              //Percorre a lista de preços 1 por vez, colocando na variavel priceElement
              resultElement.prices.forEach((priceElement) => {
                //Verifica se o ID da Regiao é igual ao ID da regiao que veio da request
                if (priceElement.locationGroupId === groupId) {
                  //Verifica se a maquina corrente é do tipo OnDemand
                  if (dataElement.termType === 'OnDemand') {
                    dataElement.diskPrice += parseFloat(
                      priceElement.hourlyRecurringFee
                    );
                  }
                  //Verifica se a maquina corrente é do tipo Reserved
                  if (dataElement.termType === 'Reserved') {
                    dataElement.diskPrice += parseFloat(
                      priceElement.recurringFee
                    );
                  }
                }
              });
            }

            //Set OS prices
            switch (dataElement.operatingSystem.shortName) {
              case 'Ubuntu':
                if (
                  resultElement.keyName.includes('UBUNTU_18') ||
                  resultElement.keyName.includes('UBUNTU_16')
                ) {
                  dataElement.operatingSystem.version[
                    dataElement.operatingSystem.version.length
                  ] = resultElement.description;
                  dataElement.operatingSystem.version = removeDuplicates(
                    dataElement.operatingSystem.version
                  );
                }
                if (
                  resultElement.keyName.includes('MYSQL') &&
                  resultElement.keyName.includes('LINUX') &&
                  dataElement.preInstaledSoftware !== 'None'
                ) {
                  dataElement.preInstaledSoftware.version[
                    dataElement.preInstaledSoftware.version.length
                  ] = resultElement.description;
                }
                break;
              case 'Debian':
                if (
                  resultElement.keyName.includes('DEBIAN_10') ||
                  resultElement.keyName.includes('DEBIAN_9') ||
                  resultElement.keyName.includes('DEBIAN_7')
                ) {
                  dataElement.operatingSystem.version[
                    dataElement.operatingSystem.version.length
                  ] = resultElement.description;
                  dataElement.operatingSystem.version = removeDuplicates(
                    dataElement.operatingSystem.version
                  );
                }
                if (
                  resultElement.keyName.includes('MYSQL') &&
                  resultElement.keyName.includes('LINUX') &&
                  dataElement.preInstaledSoftware !== 'None'
                ) {
                  dataElement.preInstaledSoftware.version[
                    dataElement.preInstaledSoftware.version.length
                  ] = resultElement.description;
                }
                break;
              case 'CentOS':
                if (
                  resultElement.keyName.includes('CENTOS_8') ||
                  resultElement.keyName.includes('CENTOS_7')
                ) {
                  dataElement.operatingSystem.version[
                    dataElement.operatingSystem.version.length
                  ] = resultElement.description;
                  dataElement.operatingSystem.version = removeDuplicates(
                    dataElement.operatingSystem.version
                  );
                }
                if (
                  resultElement.keyName.includes('MYSQL') &&
                  resultElement.keyName.includes('LINUX') &&
                  dataElement.preInstaledSoftware !== 'None'
                ) {
                  dataElement.preInstaledSoftware.version[
                    dataElement.preInstaledSoftware.version.length
                  ] = resultElement.description;
                }
                break;
              case 'Red Hat Enterprise Linux':
                if (
                  resultElement.keyName.includes('RHEL_8') ||
                  resultElement.keyName.includes('RHEL_7') ||
                  resultElement.keyName.includes('RHEL_6')
                ) {
                  if (!dataElement.operatingSystemPrice) {
                    priceIndex = dataElement.vCPU >= 8 ? 1 : 0;
                    dataElement.pricePerUnit += parseFloat(
                      resultElement.prices[priceIndex].hourlyRecurringFee
                    );
                    dataElement.operatingSystemPrice = true;
                  }
                  dataElement.operatingSystem.version[
                    dataElement.operatingSystem.version.length
                  ] = resultElement.description;
                  dataElement.operatingSystem.version = removeDuplicates(
                    dataElement.operatingSystem.version
                  );
                }
                if (
                  resultElement.keyName.includes('MYSQL') &&
                  resultElement.keyName.includes('LINUX') &&
                  dataElement.preInstaledSoftware !== 'None'
                ) {
                  dataElement.preInstaledSoftware.version[
                    dataElement.preInstaledSoftware.version.length
                  ] = resultElement.description;
                }
                break;
              case 'Windows':
                if (
                  resultElement.keyName.includes('WINDOWS_SERVER_2019') ||
                  resultElement.keyName.includes('WINDOWS_2012') ||
                  resultElement.keyName.includes('WINDOWS_2016')
                ) {
                  if (!dataElement.operatingSystemPrice) {
                    if (dataElement.termType === 'OnDemand') {
                      dataElement.pricePerUnit += parseFloat(
                        dataElement.vCPU * 0.04
                      );
                      dataElement.operatingSystemPrice = true;
                    }
                    if (dataElement.termType === 'Reserved') {
                      dataElement.pricePerUnit += parseFloat(
                        dataElement.vCPU * 26.55
                      );
                      dataElement.operatingSystemPrice = true;
                    }
                  }
                  dataElement.operatingSystem.version[
                    dataElement.operatingSystem.version.length
                  ] = resultElement.description;
                  dataElement.operatingSystem.version = removeDuplicates(
                    dataElement.operatingSystem.version
                  );
                }
                if (
                  resultElement.keyName.includes('MYSQL') &&
                  resultElement.keyName.includes('WINDOWS') &&
                  dataElement.preInstaledSoftware !== 'None'
                ) {
                  dataElement.preInstaledSoftware.version[
                    dataElement.preInstaledSoftware.version.length
                  ] = resultElement.description;
                }
                break;
            }
          });
          //Arredonda o preço final com 3 casas depois da virgula (se necessario)
          dataElement.pricePerUnit =
            Math.round(dataElement.pricePerUnit * 1000) / 1000;
          //Depois de adicionar os preços removemos os ID utilizados para auxiliar no processo
          delete dataElement['vCpuID'];
          delete dataElement['ramID'];
          delete dataElement['storageID'];
          delete dataElement['operatingSystemPrice'];
        });
        return data;
      })
      .catch((err) => {
        console.log(err);
      });

    res.locals.data = data;
    res.locals.groupId = groupId;
    next();
  },
};
