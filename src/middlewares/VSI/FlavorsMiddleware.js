const api = require('../../../config/slApi');
const VsiHelper = require('../../helpers/VSI/VsiHelper');

module.exports = {
  async setPublicFlavors(req, res, next) {
    const groupId = res.locals.groupId;
    const public = await api
      .get(
        '/SoftLayer_Product_Package/835/getActivePresets.json?objectMask=mask[prices[id,item]]'
      )
      .then((res) => {
        let data = [];
        res.data.forEach((element) => {
          let json = VsiHelper.defaultJson();
          const [type, machine] = element.name.split('.');
          const [vCpu, ram, disk] = machine.split('x');
          const device = type + '.' + vCpu + 'x' + ram;
          json.termType = 'OnDemand';
          json.priceDescription = 'Virtual Server Instance ' + device;
          json.productFamily = 'Virtual Server Instance';
          json.location = req.query.location;
          json.leaseContractLength = '0yr';
          json.instanceType = device;
          json.currentGeneration = element.isActive === '1' ? 'Yes' : 'No';
          json.vCPU = vCpu;
          json.memory = ram + ' GB';
          json.tenancy = 'Shared';
          json.licenseModel = 'License Included';
          switch (type) {
            case 'U1':
              if (disk !== '100') {
                json.instanceFamily = 'Variable compute';
                json.storage = disk + 'GB SAN';
                element.prices.forEach((priceElement) => {
                  if (
                    priceElement.item.capacity === vCpu &&
                    priceElement.item.units === 'CORE'
                  )
                    json.vCpuID = priceElement.item.keyName;
                  if (
                    priceElement.item.capacity === ram &&
                    priceElement.item.units === 'GB'
                  )
                    json.ramID = priceElement.item.keyName;
                  if (
                    priceElement.item.itemCategory.categoryCode ===
                    'guest_disk0'
                  ) {
                    json.storageID = priceElement.item.keyName;
                  }
                });
                data[data.length] = json;
              }
              break;
            case 'B1':
              json.instanceFamily = 'Balanced';
              json.storage = disk + 'GB SAN';
              element.prices.forEach((priceElement) => {
                if (
                  priceElement.item.capacity === vCpu &&
                  priceElement.item.units === 'CORE'
                )
                  json.vCpuID = priceElement.item.keyName;
                if (
                  priceElement.item.capacity === ram &&
                  priceElement.item.units === 'GB'
                )
                  json.ramID = priceElement.item.keyName;
                if (
                  priceElement.item.itemCategory.categoryCode === 'guest_disk0'
                ) {
                  json.storageID = priceElement.item.keyName;
                }
              });
              data[data.length] = json;
              break;
            case 'BL2':
              json.instanceFamily = 'Balanced local storage';
              json.storage = '100GB SSD';
              data[data.length] = json;
              element.prices.forEach((priceElement) => {
                if (
                  priceElement.item.capacity === vCpu &&
                  priceElement.item.units === 'CORE'
                )
                  json.vCpuID = priceElement.item.keyName;
                if (
                  priceElement.item.capacity === ram &&
                  priceElement.item.units === 'GB'
                )
                  json.ramID = priceElement.item.keyName;
                if (
                  priceElement.item.itemCategory.categoryCode === 'guest_disk0'
                ) {
                  json.storageID = priceElement.item.keyName;
                }
              });
              break;
            case 'C1':
              json.instanceFamily = 'Compute';
              json.storage = disk + 'GB SAN';
              element.prices.forEach((priceElement) => {
                if (
                  priceElement.item.capacity === vCpu &&
                  priceElement.item.units === 'CORE'
                )
                  json.vCpuID = priceElement.item.keyName;
                if (
                  priceElement.item.capacity === ram &&
                  priceElement.item.units === 'GB'
                )
                  json.ramID = priceElement.item.keyName;
                if (
                  priceElement.item.itemCategory.categoryCode === 'guest_disk0'
                ) {
                  json.storageID = priceElement.item.keyName;
                }
              });
              data[data.length] = json;
              break;
            case 'M1':
              json.instanceFamily = 'Memory';
              json.storage = disk + 'GB SAN';
              element.prices.forEach((priceElement) => {
                if (
                  priceElement.item.capacity === vCpu &&
                  priceElement.item.units === 'CORE'
                )
                  json.vCpuID = priceElement.item.keyName;
                if (
                  priceElement.item.capacity === ram &&
                  priceElement.item.units === 'GB'
                )
                  json.ramID = priceElement.item.keyName;
                if (
                  priceElement.item.itemCategory.categoryCode === 'guest_disk0'
                ) {
                  json.storageID = priceElement.item.keyName;
                }
              });
              data[data.length] = json;
              break;
            default:
              break;
          }
        });
        return data;
      })
      .catch((err) => {
        res.send(err.response.data);
      });

    res.locals.public = public;
    res.locals.groupId = groupId;

    next();
  },

  async setReservedFlavors(req, res, next) {
    const groupId = res.locals.groupId;
    const data = await api
      .get(
        '/SoftLayer_Product_Package/1059/getItems.json?objectMask=mask[prices[pricingLocationGroup[id,description,locations]]]'
      )
      .then((result) => {
        let data = [];
        result.data.forEach((e) => {
          if (e.keyName.includes('1_YEAR')) {
            let json = VsiHelper.defaultJson();
            const [device, term] = e.description.split(' ');
            const [type, machine] = device.split('.');
            const [vCpu, ram] = machine.split('x');
            json.termType = 'Reserved';
            json.priceDescription = 'Virtual Server Instance ' + device;
            json.productFamily = 'Virtual Server Instance';
            json.location = req.query.location;
            json.leaseContractLength = '1yr';
            json.instanceType = device;
            json.currentGeneration = 'Yes';
            json.vCPU = vCpu;
            json.memory = ram + ' GB';
            json.storage = '25 GB SAN';
            json.tenancy = 'Shared';
            json.licenseModel = 'License Included';
            switch (type) {
              case 'B1':
                json.instanceFamily = 'Balanced';
                break;
              case 'M1':
                json.instanceFamily = 'Memory';
                break;
              case 'C1':
                json.instanceFamily = 'Compute';
                break;
              default:
                break;
            }
            e.prices.forEach((price) => {
              if (price.locationGroupId === groupId) {
                json.pricePerUnit += parseFloat(price.recurringFee);
                data[data.length] = json;
              }
            });
          }
        });
        return data;
      })
      .catch((err) => {
        res.send(err.response);
      });
    let reserved = [];

    data.forEach((e) => {
      let json = VsiHelper.newJson(e);
      json.storage = '25GB SAN';
      reserved[reserved.length] = json;
    });

    data.forEach((e) => {
      let json = VsiHelper.newJson(e);
      json.storage = '100GB SAN';
      reserved[reserved.length] = json;
    });

    res.locals.reserved = reserved;
    res.locals.groupId = groupId;
    next();
  },
};
