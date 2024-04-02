import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Link from 'next/link';
import { Button } from '../../../Tailwind/page';
import LatestMovies from '../LatestMovies/LatestMovies';

const UpcomingMovies =({ latest,title })=>{

    const design =(
        <>
            <LatestMovies latest={latest} title={title}/>
        </>
    );
    return design
}
export default UpcomingMovies