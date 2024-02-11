// plugins/strapi-provider-s3/index.js

'use strict';

const AWS = require('aws-sdk');
const { Readable } = require('stream');

module.exports = {
  init(providerOptions) {
    this.providerOptions = providerOptions;
    this.s3 = new AWS.S3({
      accessKeyId: providerOptions.accessKeyId,
      secretAccessKey: providerOptions.secretAccessKey,
      region: providerOptions.region,
    });
  },

  async upload(file, customParams = {}) {
    const params = {
      Bucket: this.providerOptions.bucket,
      Key: file.hash + '-' + file.name,
      Body: file.buffer instanceof Buffer ? file.buffer : Buffer.from(file.buffer, 'binary'),
      ACL: 'public-read', // or 'private' if preferred
      ...customParams,
    };

    const response = await this.s3.upload(params).promise();

    return {
      url: response.Location,
      provider_metadata: {
        ...response,
      },
    };
  },

  async delete(file) {
    const params = {
      Bucket: this.providerOptions.bucket,
      Key: file.hash + '-' + file.name,
    };

    await this.s3.deleteObject(params).promise();

    return;
  },

  async update(file, customParams = {}) {
    await this.delete(file);
    return await this.upload(file, customParams);
  },

  async download(file) {
    const params = {
      Bucket: this.providerOptions.bucket,
      Key: file.hash + '-' + file.name,
    };

    const response = await this.s3.getObject(params).promise();
    const stream = new Readable();
    stream.push(response.Body);
    stream.push(null);

    return {
      stream,
    };
  },
};
