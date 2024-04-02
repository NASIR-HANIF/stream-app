import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
// import './styles.css';

import { Navigation } from 'swiper/modules';
import Link from 'next/link';

const Header = ({ latest }) => {


    const design = (
        <>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    latest && latest.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Link
                                href={{
                                    pathname: "/videos/" + item.title.toLowerCase().split(" ").join("-"),
                                    query: item
                                }}
                                passHref>
                                <img
                                    src={process.env.NEXT_PUBLIC_CLOUDFRONT + "/" + item.thumbnail}
                                    alt={item.title}
                                    width="100%"
                                />
                            </Link>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </>
    );
    return design
}
export default Header