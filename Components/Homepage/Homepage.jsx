import Header from "./Header/Header";
import LatestMovies from "./LatestMovies/LatestMovies";
import TopTenMovies from "./TopTenMovies/TopTenMovies";
import UpcomingMovies from "./UpcomingMovies/UpcomingMovies";
import TrendingMovies from "./TrendingMovies/TrendingMovies";

const Homepage = ({latestMovies}) => {
   
    const design = (
        <>
            <Header latest={latestMovies} />
            <div className="bg-slate-800 p-8 sm:p-16">
                <div className="flex flex-col gap-8 sm:gap-16">
                    <LatestMovies latest={latestMovies} title="LATEST MOVIES" />
                    <UpcomingMovies latest={latestMovies} title="UPCOMING MOVIES"  />
                    <TopTenMovies latest={latestMovies} />
                    <TrendingMovies latest={latestMovies} title="TRENDING MOVIES"  />
                </div>
            </div>

        </>
    );
    return design
}
export default Homepage