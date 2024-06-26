const Model = {
    success : false,
    image : null
}

const AnimationReducer = (state=Model,action)=>{
    switch (action.type) {
        case "PREVIEW_IMAGE" : return {
            success : true,
            image : process.env.NEXT_PUBLIC_CLOUDFRONT+"/"+action.payload.thumbnail
        }
        default:return state;
         
    }
}

export default AnimationReducer