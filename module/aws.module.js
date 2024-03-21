import AWS from "aws-sdk";
const config = new AWS.Config()
config.update({
    region : 'ap-south-1',
    accessKeyId : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
})
export default AWS