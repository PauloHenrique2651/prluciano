import { useState } from "react";
import { Play, YoutubeLogo } from "@phosphor-icons/react";

/** YouTube video that loads only when played: a poster with a play button until then,
 *  so the page stays light and YouTube sets nothing before the visitor asks for the video. */
export default function VideoCard({ id, title, label = "Watch José Armando", caption = true, onPlay }) {
  const [playing, setPlaying] = useState(false);
  const [poster, setPoster] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);
  return (
    <figure className="rt-video">
      <div className="rt-video-screen">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button type="button" className="rt-video-poster" onClick={() => {
              setPlaying(true);
              onPlay?.();
            }} aria-label={`Play video: ${title}`}>
            <img
              src={poster}
              alt=""
              loading="lazy"
              decoding="async"
              onLoad={(e) => {
                // YouTube serves a 120px grey placeholder when there is no HD poster
                if (e.currentTarget.naturalWidth < 200) setPoster(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`);
              }}
              onError={() => setPoster(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}
            />
            <span className="rt-video-play">
              <Play size={30} weight="fill" aria-hidden="true" />
            </span>
            <span className="rt-video-label">{label}</span>
          </button>
        )}
      </div>
      {caption && (
        <figcaption>
          <YoutubeLogo size={18} weight="fill" aria-hidden="true" />
          {title}, from Luciano Emilio's channel
        </figcaption>
      )}
    </figure>
  );
}
