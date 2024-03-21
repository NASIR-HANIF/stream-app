import AWS from "../module/aws.module";

const s3 = new AWS.S3();
const options = {
    Bucket: "stream-storage-app-pk"
}

export const fetch = async (request) => {
    const query = {}
    const { searchParams } = new URL(request.url)
    for (const [key, value] of searchParams) {
        query[key] = value
    }
    options.MaxKeys = query.limit ? query.limit : null;
    options.Prefix = query.folder ? query.folder : null;

    try {
        // options.Delimiter = "/"
        // options.Prefix = 'demo'
        const objects = await s3.listObjects(options).promise();
        return {
            data: {
                message: "success",
                data: objects.Contents
            },
            status: 200
        }
    } catch (error) {

        return {
            data: {
                message: "Failed !",
                error: error
            },
            status: 424
        }

    }
    // return {
    //     data : "get requested",
    //     status : 200
    // }  

}

export const fetchById = async (request, params) => {
    const { keys } = params;
    const path = keys.join("/");
    options.Key = path;

    try {
        await s3.headObject(options).promise();
        options.Expires = 60
        const url = s3.getSignedUrl('getObject', options)
        return {
            data: {
                data: url,
                message: "success"
            },
            status: 200
        }
    } catch (error) {
        return {
            data: {
                message: "Failed !",
                error: error
            },
            status: 404
        }
    }


}

export const create = async (request) => {
    return {
        data: "Post requested",
        status: 200
    }
}

export const update = async (request, params) => {
    const data = await request.json();
    return {
        data: {
            data,
            params
        },
        status: 200
    }
}

export const trash = async (request, params) => {
    const { keys } = params;
    const path = keys.join("/");
    options.Key = path;

    try {
        await s3.headObject(options).promise();
        const deleteRes = await s3.deleteObject(options).promise();
        return {
            data: {
                message: "success",
                data : deleteRes
            },
            status: 200
        }
    } catch (error) {
        return {
            data: {
                message: "Failed !",
                error: error
            },
            status: 404
        }
    }
}