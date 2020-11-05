module.exports = {
  //Método responsável por retornar todas as possíveis opções de core, ram e disco do PostgreSQL
  options() {
    return {
      cores: [
        {
          description: '3 dedicated cores/member (9 vCores Total)',
          cores: 3,
        },
        {
          description: '4 dedicated cores/member (12 vCores Total)',
          cores: 4,
        },
        {
          description: '5 dedicated cores/member (15 vCores Total)',
          cores: 5,
        },
        {
          description: '6 dedicated cores/member (18 vCores Total)',
          cores: 6,
        },
        {
          description: '9 dedicated cores/member (27 vCores Total)',
          cores: 9,
        },
        {
          description: '12 dedicated cores/member (36 vCores Total)',
          cores: 12,
        },
        {
          description: '15 dedicated cores/member (45 vCores Total)',
          cores: 15,
        },
        {
          description: '20 dedicated cores/member (60 vCores Total)',
          cores: 20,
        },
        {
          description: '25 dedicated cores/member (75 vCores Total)',
          cores: 25,
        },
        {
          description: '28 dedicated cores/member (84 vCores Total)',
          cores: 28,
        },
      ],
      ram: [
        {
          description: '1GB/member',
          value: 1,
        },
        {
          description: '2GB/member',
          value: 2,
        },
        {
          description: '3GB/member',
          value: 3,
        },
        {
          description: '4GB/member',
          value: 4,
        },
        {
          description: '5GB/member',
          value: 5,
        },
        {
          description: '8GB/member',
          value: 8,
        },
        {
          description: '12GB/member',
          value: 12,
        },
        {
          description: '16GB/member',
          value: 16,
        },
        {
          description: '24GB/member',
          value: 24,
        },
        {
          description: '32GB/member',
          value: 32,
        },
        {
          description: '64GB/member',
          value: 64,
        },
        {
          description: '96GB/member',
          value: 96,
        },
        {
          description: '112GB/member',
          value: 112,
        },
      ],
      disk: [
        {
          description: '5GB/member',
          value: 5,
        },
        {
          description: '8GB/member',
          value: 8,
        },
        {
          description: '16GB/member',
          value: 16,
        },
        {
          description: '24GB/member',
          value: 24,
        },
        {
          description: '32GB/member',
          value: 32,
        },
        {
          description: '64GB/member',
          value: 64,
        },
        {
          description: '128GB/member',
          value: 128,
        },
        {
          description: '256GB/member',
          value: 256,
        },
        {
          description: '512GB/member',
          value: 512,
        },
        {
          description: '1000GB/member',
          value: 1000,
        },
        {
          description: '1500GB/member',
          value: 1500,
        },
        {
          description: '2000GB/member',
          value: 2000,
        },
        {
          description: '2500GB/member',
          value: 2500,
        },
        {
          description: '3000GB/member',
          value: 3000,
        },
        {
          description: '3500GB/member',
          value: 3500,
        },
      ],
    };
  },
};
