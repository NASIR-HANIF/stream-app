import { Slider } from "../../../Tailwind/page";

const UpcomingMovies =()=>{
const data = [
    {
        thumbnail : "sanddust2.jpg",
        title : "JUST STREAM",
        duration : "02:05:25"
    },
    {
        thumbnail : "movie-abc.png",
        title : "JUST STREAM",
        duration : "02:05:25"
    },
    {
        thumbnail : "movie-xyz.png",
        title : "STREAM JUST",
        duration : "02:05:25"
    },
    {
        thumbnail : "sanddust2.jpg",
        title : "JUST STREAM",
        duration : "02:05:25"
    },
    {
        thumbnail : "sanddust2.jpg",
        title : "JUST STREAM",
        duration : "02:05:25"
    },
    {
        thumbnail : "sanddust2.jpg",
        title : "JUST STREAM",
        duration : "02:05:25"
    },
    {
        thumbnail : "sanddust2.jpg",
        title : "JUST STREAM",
        duration : "02:05:25"
    },
]

    const design =(
        <>
           <div>
                <h1 className="text-3xl mb-4 text-white">Upcoming Movies</h1>

                    <Slider data={data} /> 
            </div>  
        </>
    );
    return design
}
export default UpcomingMovies