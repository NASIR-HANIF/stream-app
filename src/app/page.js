"use client";

import Template from "../../Components/Template/Template";
import Homepage from "../../Components/Homepage/Homepage";
import Head from "next/head";



const getData = async () => {
try {
  const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/movies/latest`);
  if (!response) {
    throw new Error("Failed to Fetch Data !")
  }
  return await response.json();
} catch (error) {
  return [];
}

}

const Page = async () => {
  const data = await getData();

  const design = (
    <>
      <Template>
        <Head>
          <title>StreamJust - Watch TV Shows Online, Watch Movies Online </title>
          <link rel="canonical" href={`${process.env.NEXT_PUBLIC_ENDPOINT}/movies`} />
          <link rel="alternate" media="only screen and (max-width: 640px)" href={`${process.env.NEXT_PUBLIC_ENDPOINT}/videos`} />
          <meta name="description" content="WEBWatch anywhere, anytime. Sign in with your StreamJust account to watch instantly on the web at StreamJust.com from your personal computer or on any internet-connected device that offers " key="desc" />
          <meta name="keywords" content=" TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more." key="keywords" />
          <meta property="og:title" content="StreamJust - Watch TV Shows Online, Watch Movies Online " key="ogtitle" />
          <meta property="og:description" content="TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more." key="ogdesc" />
          <meta property="og:image" content="https://th.bing.com/th/id/OIP.g-KcgY9WQJ4iJYckXWU8AgHaHa?rs=1&pid=ImgDetMain" key="ogimage" />
        </Head>
        <Homepage latestMovies={(data && data.data) ? data.data : []} />
      </Template>
    </>
  );
  return design
}

export default Page
