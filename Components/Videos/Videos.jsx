
import axios from "axios";
import { Button } from "../../Tailwind/page";
import Link from "next/link";
import { useEffect,useState } from "react";
import { usePathname } from "next/navigation";


const Videos = async ({videos}) => {
 const pathname = usePathname();   
const [Videos , setVideos] = useState(videos);
const [skip , setSkip] = useState(0);

useEffect(()=>{
    if(skip > 0){
        const request = async ()=>{
                const response = await axios({
                    method : "get",
                    url : "/api/movies/active?skip="+skip
                });
                const {movies} = response.data.data;
                setVideos({...Videos,movies : [...Videos.movies,...movies]})
        }
        request();
    }
},[skip])

useEffect(()=>{
    window.onscroll = ()=>{
        if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
           if(skip < Videos.total){
            let add = skip+12;
            let result = Videos.total - add;
            if(result < 0){
                add = (add+result)-1;
            }
            setSkip(add)
           }
        }
    }
},[skip])

    const design = (
        <>
            <div className="container p-8 sm:p-16">
               <h1 className="text-4xl font-bold capitalize mb-5">
                {pathname.slice(1)}
               </h1>
                <div className="grid sm:grid-cols-4 gap-8">
                    {
                        Videos.movies && Videos.movies.map((item,index)=>(
                            <div className="relative" key={index}> 
                                <img src={process.env.NEXT_PUBLIC_CLOUDFRONT+"/"+item.thumbnail} alt={item.title} />
                                <div style={{background : "rgba(0,0,0,0.7)"}}  
                                className="absolute bottom-0 left-0 w-full p-4">
                                   <h1 className="text-white text-lg font-bold capitalize">
                                         {item.title}
                                   </h1>
                                   <p className="text-white">
                                    {item.duration}
                                   </p>
                                        <Link href={{
                                            pathname : "/videos/"+item.title.toLowerCase().split(" ").join("-"),
                                            query : item
                                        }} passHref>
                                            <Button className="mt-2" theme="error">
                                                    Play Now
                                            </Button>
                                        </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
    return design
}

export default Videos