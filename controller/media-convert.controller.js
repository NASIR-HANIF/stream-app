import AWS from "aws-sdk";
import videoProcessing from "../module/video-proc.module";
const media = new AWS.MediaConvert({
    region: "ap-south-1",
    endpoint: "https://xnbzilj6c.mediaconvert.ap-south-1.amazonaws.com",
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
})

export const fetch = async (request) => {
    const url = new URL(request.url)
    const token = url.searchParams.get("token")
    const params = {
        //  MaxResults: 5
        NextToken: token
    }

    try {
        const jobs = await media.listJobs(params).promise();
        return {
            data: jobs,
            status: 200
        }

    } catch (error) {
        return {
            data: {
                message: error,
            },
            status: 424
        }
    }

}

export const create = async (request) => {

    try {

        const data = await request.json()
        const params = videoProcessing(data.key);
        params.Role = "arn:aws:iam::237594464081:role/service-role/MediaConvert_Default_Role"
        const job = await media.createJob(params).promise()
        return {
            data: job,
            status: 200
        }
    } catch (error) {

        return {
            data: error,
            status: 424
        }
    }

}


export const fetchById = async (request, param) => {
    try {
        const { id } = param;
        const params = {
            Id: id
        }
        const job = await media.getJob(params).promise();
        return {
            data: job,
            status: 200
        }
    } catch (error) {
        return {
            data: error,
            status: 424
        }
    }

}

export const cancel = async (request, param) => {
    try {
        const { id } = param;
        const params = {
            Id: id
        }
        const job = await media.cancelJob(params).promise();
        return {
            data: job,
            status: 200
        }
    } catch (error) {
        return {
            data: error,
            status: 424
        }
    }

}