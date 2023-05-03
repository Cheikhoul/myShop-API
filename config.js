const config = {
    port: process.env.NODE_ENV === 'test' ? 4000 : 3000
  };
  
  module.exports = config;
  