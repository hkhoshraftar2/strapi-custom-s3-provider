
module.exports = () => {
    const strapiCustomS3Provider = require('../../plugins/strapi-custom-s3-provider');
  
    strapi.providers['s3'] = strapiCustomS3Provider;
  };
  