module.exports = {
    providerOptions: {
      accessKeyId: {
        type: 'string',
        required: true,
      },
      secretAccessKey: {
        type: 'string',
        required: true,
      },
      region: {
        type: 'string',
        required: true,
      },
      bucket: {
        type: 'string',
        required: true,
      },
      basePath: {
        type: 'string',
        required: false,
      },
      // Add more options as needed
    },
  };