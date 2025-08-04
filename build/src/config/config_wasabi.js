"use strict";
// Este archivo debe tratarse como js comun
require("dotenv").config();
module.exports = {
    prod: {
        endpoint: process.env.WASABI_ENDPOINT, // p. ej. 'https://s3.us-west-1.wasabisys.com'
        accessKeyId: process.env.WASABI_ACCESS_KEY,
        secretAccessKey: process.env.WASABI_SECRET_KEY,
        bucketName: process.env.WASABI_BUCKET,
        region: process.env.WASABI_REGION || "us-west-1",
    },
    dev: {
        endpoint: process.env.WASABI_ENDPOINT, // p. ej. 'https://s3.us-west-1.wasabisys.com'
        accessKeyId: process.env.WASABI_ACCESS_KEY,
        secretAccessKey: process.env.WASABI_SECRET_KEY,
        bucketName: process.env.WASABI_BUCKET,
        region: process.env.WASABI_REGION || "us-west-1",
    },
    test: {
        endpoint: process.env.WASABI_ENDPOINT, // p. ej. 'https://s3.us-west-1.wasabisys.com'
        accessKeyId: process.env.WASABI_ACCESS_KEY,
        secretAccessKey: process.env.WASABI_SECRET_KEY,
        bucketName: process.env.WASABI_BUCKET,
        region: process.env.WASABI_REGION || "us-west-1",
    },
};
//# sourceMappingURL=config_wasabi.js.map