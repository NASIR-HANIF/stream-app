import "../module/db.module"
import planSchema from "../schema/plan.schema";
import { secureAdminMiddleware } from "../middleware/secure-admin-api-middleware";


export const fetch = async (request) => {
    try {
        const plan = await planSchema.find()
        if (plan.length > 0) {
            return {
                data: plan,
                status: 200
            }
        } else {
            return {
                data: "Data Not Found",
                status: 404
            }
        }

    } catch (error) {
        return {
            data: error,
            status: 424
        }
    }

}

export const fetchById = async (request, params) => {

    try {
        await secureAdminMiddleware(request);

        try {
            const { id } = params
            const plan = await planSchema.findById(id)
            if (plan) {
                return {
                    data: plan,
                    status: 200
                }
            } else {
                return {
                    data: "Data Not Found",
                    status: 404
                }
            }

        } catch (error) {
            return {
                data: error,
                status: 424
            }
        }

    } catch (error) {
        return {
            data: { message: "Invalid User" },
            status: 401
        }
    }

}


export const create = async (request) => {
    try {
        await secureAdminMiddleware(request);

        try {

            const data = await request.json();
            const response = await new planSchema(data).save()
            return {
                data: response,
                status: 200
            }

        } catch (error) {
            return {
                data: error,
                status: 424
            }
        }

    } catch (error) {
        return {
            data: { message: "Invalid User" },
            status: 401
        }
    }


}

export const trash = async (request, params) => {

    try {
        await secureAdminMiddleware(request);
        try {
            const { id } = params
            const deleteRes = await planSchema.findByIdAndDelete(id)
            return {
                data: deleteRes,
                status: 200
            }

        } catch (error) {
            return {
                data: error,
                status: 424
            }
        }

    } catch (error) {
        return {
            data: { message: "Invalid User" },
            status: 401
        }
    }


}

export const update = async (request, params) => {

    try {
        await secureAdminMiddleware(request);
        try {
            const { id } = params
            const data = await request.json()
            const updateRes = await planSchema.findByIdAndUpdate(id, data, { new: true })

            return {
                data: updateRes,
                status: 200
            }

        } catch (error) {
            return {
                data: error,
                status: 424
            }
        }

    } catch (error) {
        return {
            data: { message: "Invalid User" },
            status: 401
        }
    }


}