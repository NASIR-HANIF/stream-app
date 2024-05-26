"use client";
import Head from "next/head";
import Template from "../../../Components/Template/Template";
import Videos from "../../../Components/Videos/Videos";



const getData = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/movies/active`);
        if (!response.ok) {
            throw new Error("Failed to Fetch Data !")
        }
        return await response.json();
    } catch (error) {
        return [];
    }

}


export const Page = async () => {
    const data = await getData();
    const design = (
        <>
            <Template>
                <Head>
                    <title>Videos - StreamJust - Watch TV Shows Online, Watch Movies Online </title>
                    <meta name="description" content="WEBWatch anywhere, anytime. Sign in with your StreamJust account to watch instantly on the web at StreamJust.com from your personal computer or on any internet-connected device that offers " key="desc" />
                    <meta name="keywords" content=" TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more." key="keywords" />
                    <meta property="og:title" content="StreamJust - Watch TV Shows Online, Watch Movies Online " key="ogtitle" />
                    <meta property="og:description" content="TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more." key="ogdesc" />
                    <meta property="og:image" content="https://th.bing.com/th/id/OIP.g-KcgY9WQJ4iJYckXWU8AgHaHa?rs=1&pid=ImgDetMain" key="ogimage" />
                </Head>
             {
                data && data.data ?  <Videos videos={data && data.data} /> : null
             }
            </Template>
        </>
    );
    return design
}

export default Page