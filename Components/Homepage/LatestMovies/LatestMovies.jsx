import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Link from 'next/link';
import { Button } from '../../../Tailwind/page';

const LatestMovies = ({ latest ,title}) => {

    const design = (
        <>
            <div className='bg-white p-4'>
                <h1 className='text-black text-3xl font-bold mb-5'>
                    {title}
                </h1>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    grabCursor={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {
                        latest && latest.map((item, index) => (
                            <SwiperSlide
                                key={index}
                                style={{
                                    height: "182px",
                                    background: `url(${process.env.NEXT_PUBLIC_CLOUDFRONT}/${item.thumbnail})`,
                                    backgroundSize: "cover"
                                }}
                            >
                                <div
                                    className='absolute w-full text-left bottom-0 left-0 p-4'
                                    style={{ background: `rgba(0,0,0,0.7)` }}
                                >
                                    <h1 className='text-white capitalize'>
                                        {item.title}
                                    </h1>
                                    <p className='font-bold text-white'>
                                        Duration : {(item.duration/60).toFixed(2)} Min
                                    </p>
                                    <Link 
                                     href={{
                                        pathname: "/videos/" + item.title.toLowerCase().split(" ").join("-"),
                                        query: item
                                    }}
                                    passHref 
                                    >
                                        <Button className='my-3' theme='error'>
                                            Play Now
                                        </Button>
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </div>
        </>
    );
    return design
}
export default LatestMovies