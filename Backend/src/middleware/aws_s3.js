const aws = require("aws-sdk");

const region = "ca-central-1";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.S3_BUCKET;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

async function generateUploadUrl(imageName) {
  try {
    const s3Params = {
      Bucket: bucketName,
      Key: imageName,
      Expires: 120,
    };
    const uploadURL = await s3.getSignedUrlPromise("putObject", s3Params);
    return uploadURL;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  generateUploadUrl,
};
