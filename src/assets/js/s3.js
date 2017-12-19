const aws = require('aws-sdk');

module.exports = class S3Client {
  constructor() {
    this.s3 = new aws.S3();
  }

  get(bucket, key) {
    return this.s3.getObject({
      Bucket: bucket,
      Key: key
    }).promise();
  }
};