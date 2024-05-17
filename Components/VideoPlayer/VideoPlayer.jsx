"use client"
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-seek-buttons/dist/videojs-seek-buttons.css"
import { useRef, useEffect } from "react";
import { Button } from "../../Tailwind/page";
import "jb-videojs-hls-quality-selector";
import "videojs-contrib-quality-levels";
import "videojs-hotkeys";
import "videojs-seek-buttons";

// // City
// import '@videojs/themes/dist/city/index.css';

// // Fantasy
// import '@videojs/themes/dist/fantasy/index.css';

// // Forest
import '@videojs/themes/dist/forest/index.css';

// Sea
// import '@videojs/themes/dist/sea/index.css';

const VideoPlayer = ({params}) => {
    const video = useRef()
    const player = useRef(null)

    const options = {
        controls: true,
        sources: [
            {
                src: `${process.env.NEXT_PUBLIC_CLOUDFRONT}/stream/original/${params.title}/${params.title}.m3u8`,
                type: "application/x-mpegURL"
            }
        ],
        fluid: true,
        playbackRates: [0.5, 1, 1.5, 2, 2.5, 3],
        poster : process.env.NEXT_PUBLIC_CLOUDFRONT+"/"+params.thumbnail,
        autoplay : false

    }



    const onReady = (v_player) => {
        // v_player.seekButtons({
        //     forward: 10,
        //     back: 10
        //   });
        // v_player.hlsQualitySelector({
        //     displayCurrentQuality: true,
        // })

        v_player.hotkeys({
            allwayesCaptureHotKeys: true,
            seekStep: 10,
            enableValumeScroll: true
        })
    }


    useEffect(() => {
        player.current = videojs(
            video.current,
            options,
            () => onReady(player.current)
        )
    }, [])


    const design = (
        <>

            <video
                ref={video}
                className="video-js 
                  vjs-big-play-centered 
                  vjs-theme-forest"
            />
        </>
    );
    return design
}

export default VideoPlayer 