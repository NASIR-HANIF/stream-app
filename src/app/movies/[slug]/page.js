"use client";
import Head from "next/head";
import Template from "../../../../Components/Template/Template";
import VideoPlayer from "../../../../Components/VideoPlayer/VideoPlayer";
import { useSearchParams } from "next/navigation";

export const Page = () => {
  const params = useSearchParams();
  const title = params.get("title");
  const desc = params.get("desc");
  const duration = params.get("duration");
  const thumbnail = params.get("thumbnail");
  const category = params.get("category");
  const data = {
    title,
    desc,
    duration,
    thumbnail,
    category,
  };

  const design = (
    <>
      <Template>
        <Head>
          <title>Movies - StreamJust - Watch TV Shows Online, Watch Movies Online </title>
          <meta name="description" content="WEBWatch anywhere, anytime. Sign in with your StreamJust account to watch instantly on the web at StreamJust.com from your personal computer or on any internet-connected device that offers " key="desc" />
          <meta name="keywords" content=" TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more." key="keywords" />
          <meta property="og:title" content="StreamJust - Watch TV Shows Online, Watch Movies Online " key="ogtitle" />
          <meta property="og:description" content="TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more." key="ogdesc" />
          <meta property="og:image" content="https://th.bing.com/th/id/OIP.g-KcgY9WQJ4iJYckXWU8AgHaHa?rs=1&pid=ImgDetMain" key="ogimage" />
        </Head>
        <div className="bg-black">
          <div className="sm:w-9/12 mx-auto">
            {data.title ? <VideoPlayer params={data} /> : null}
            <div className="bg-white p-8">
              <h2 className="text-2xl font-bold">{data.title && data.title}</h2>
              <p className="font-bold">
                Duration : {data.duration && (data.duration / 60).toFixed(2)}{" "}
                Min
              </p>
              <p>{data.desc && data.desc}</p>
              <h2 className="text-2xl font-bold">Category</h2>
              <p>{data.category && data.category}</p>
            </div>
          </div>
        </div>
      </Template>
    </>
  );
  return design;
};

export default Page;
