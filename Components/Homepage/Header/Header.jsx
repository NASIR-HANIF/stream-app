import { Carousel, Button, Icon } from "../../../Tailwind/page";
const Header = () => {
    const Caption = ({ data }) => {
        const cap = (
            <>
                <div className="flex flex-col gap-4 sm:gap-10 px-5">
                    <div>
                        <h1 className="text-white text-2xl sm:text-8xl font-bold mb-3">{data.title}</h1>
                        <div className="flex gap-16 items-center">
                            <div>
                                {
                                    Array(data.rating).fill("star").map((item, index) => {
                                        return <Icon key={index} className="text-red-600">star</Icon>
                                    })
                                }
                                {
                                    Array(5 - data.rating).fill("star").map((item, index) => {
                                        return <Icon key={index} className="text-red-600">star_outline</Icon>
                                    })
                                }
                            </div>
                            <p className="text-lg text-white">
                                <span className="font-bold text-red-500">
                                    Duration : &nbsp;
                                </span>
                                {data.duration}
                            </p>
                        </div>
                    </div>
                    <div className="text-white flex flex-col sm:gap-2 gap-0">
                        <p className="text-sm sm:text-lg">
                            <span className="font-bold text-red-500">
                                Staring : &nbsp;
                            </span>
                            {data.staring}
                        </p>
                        <p className="text-sm sm:text-lg">
                            <span className="font-bold text-red-500">
                                Category : &nbsp;
                            </span>
                            {data.category}
                        </p>
                        <p className="text-sm sm:text-lg">
                            <span className="font-bold text-red-500">
                                Tags : &nbsp;
                            </span>
                            {data.tags}
                        </p>
                    </div>
                    <div>
                        <Button theme="error" className="flex gap-2 py-1 sm:py-3.5 px-2 sm:px-6">
                            <Icon>play_circle</Icon>
                            Play Now
                        </Button>
                    </div>
                </div>
            </>
        );
        return cap
    }

    const data = [
        {
            image: "sanddust2.jpg",
            caption: <Caption data={{
                title: "STREAM JUST",
                rating: 5,
                duration: "03:25:10",
                staring: "Amir khan",
                category: "Comedy,drama,action",
                tags: "Comedy,drama,action"
            }} />
        },
        {
            image: "movie-abc.png",
            caption: <Caption data={{
                title: "Dinosaur",
                rating: 3,
                duration: "02:10:50",
                staring: "Sharukh khan",
                category: "Action",
                tags: "Comedy,drama,action"
            }} />
        },
        {
            image: "movie-xyz.png",
            caption: <Caption data={{
                title: "Monkey",
                rating: 2,
                duration: "01:05:25",
                staring: "saif khan",
                category: "Action , drama",
                tags: "Comedy,drama,action"
            }} />
        }
    ]
    const design = (
        <>
            <div className="hidden sm:block">
                <Carousel
                    data={data}
                    height={500}
                    counting={false}
                />
            </div>
            <div className="sm:hidden block">
                <Carousel
                    data={data}
                    height={300}
                    counting={false}
                />
            </div>
        </>
    );
    return design
}
export default Header