import { useEffect } from "react";
import { Slider } from "../../../Tailwind/page";
import { useSelector } from "react-redux";



const TopTenMovies = ({latest})=>{

    const AnimationReducer = useSelector(response => response.AnimationReducer);
    const {image} = AnimationReducer

  
    const design = (
        <>
            <div  style={{
                transition : "0.5s",
                height : 600,
                background : `url(${image ? image : "sanddust2.jpg"})`,
                backgroundSize : "cover"
            }}>
                <div className="h-full p-8 overflow-hidden" 
                style={{
                    background : "linear-gradient(to right,rgba(0,0,0,0.9),transparent)"
                    }}>
                        <h1 className="text-white text-3xl mb-4">Top Ten Movies</h1>
                        <div 
                        className="relative"
                        style={{
                            width : 330,
                            height : 516
                        }}>
                            <Slider 
                            vertical={true}
                            data={latest} />
                        </div>
                </div>
            </div>
        </>
    );
    return design
}
export default TopTenMovies