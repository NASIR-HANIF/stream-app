import AWS from "aws-sdk"
const s3 = new AWS.S3({
    region: 'ap-south-1',
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
})

const Bucket = "stream-storage-app-pk"

const useS3 = (file , key=file.name) => {
    const upload = async () => {
        const options = {
            Bucket: Bucket,
            Body: file,
            Key: key
        }
        return s3.upload(options)
    }
    return upload
}

export default useS3