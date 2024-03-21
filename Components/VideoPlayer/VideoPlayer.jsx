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

const VideoPlayer = () => {
    const video = useRef()
    const player = useRef(null)

    const options = {
        controls: true,
        sources: [
            {
                src: "https://stream-storage-app-pk.s3.ap-south-1.amazonaws.com/stream/original/test-four/test-four.mpd",
                type: "application/dash+xml"
            }
        ],
        fluid: true,
        playbackRates: [0.5, 1, 1.5, 2, 2.5, 3],
        autoplay: true

    }

    const update = () => {
        player.current.src({
            src: "/test.mp4",
            type: "video/mp4"
        })
    }

    const onReady = (v_player) => {
        // v_player.seekButtons({
        //     forward: 10,
        //     back: 10
        //   });
        v_player.hlsQualitySelector({
            displayCurrentQuality: true,
        })

        v_player.hotkeys({
            allwayesCaptureHotKeys :true,
            seekStep : 10,
            enableValumeScroll : true
        })
    }


    useEffect(() => {
        player.current = videojs(
            video.current,
            options,
            () => onReady(player.current)
        )
    }, [])

    const uploadAndPlay = (e) => {
        const input = e.target;
        const file = input.files[0];
        const url = URL.createObjectURL(file);
        player.current.src({
            src: url,
            type: "video/mp4"
        })
    }
    const design = (
        <>
            <div className="w-6/12">
                <video
                    ref={video}
                    className="video-js 
                  vjs-big-play-centered 
                  vjs-theme-forest"
                />

                <Button
                    onClick={update}
                    className="py-5 m-3">
                    UPDATE VIDEO
                </Button>

                <label >
                    <input type="file" onChange={uploadAndPlay} />
                </label>

            </div>
        </>
    );
    return design
}

export default VideoPlayer 