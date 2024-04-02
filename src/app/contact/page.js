"use client";
import Head from "next/head";
import ContactForm from "../../../Components/ContactForm/ContactForm";
import Template from "../../../Components/Template/Template";

const Page = ()=>{
const design = (
    <>
        <Template>
            <Head>
            <title>Contact - StreamJust - Watch TV Shows Online, Watch Movies Online </title>
            <meta name="description" content="WEBWatch anywhere, anytime. Sign in with your StreamJust account to watch instantly on the web at StreamJust.com from your personal computer or on any internet-connected device that offers " key="desc" />
            <meta name="keywords" content=" TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more." key="keywords" />
            <meta property="og:title" content="StreamJust - Watch TV Shows Online, Watch Movies Online " key="ogtitle" />
            <meta property="og:description" content="TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more." key="ogdesc" />
            <meta property="og:image" content="https://th.bing.com/th/id/OIP.g-KcgY9WQJ4iJYckXWU8AgHaHa?rs=1&pid=ImgDetMain" key="ogimage" />
            </Head>
          <div className="p-5 sm:p-16">
                <div className="w-full mx-auto sm:w-6/12 border p-3 sm:p-8 shadow-lg rounded-lg ">
                    <h1 className="font-bold text-5xl mb-5">Contact us</h1>
                    <ContactForm />
                </div>
          </div>
        </Template>
    </>
);
return design;
}
export default Page