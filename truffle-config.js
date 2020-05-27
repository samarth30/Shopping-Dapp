require('babel-register');
require('babel-polyfill');
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    loc_development_development: {
      network_id: "*",
      port: 854,
      host: "127.0.0.1"
    },
    loc_developer_developer: {
      network_id: "*",
      port: 8545,
      host: "127.0.0.1"
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
