import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Streaming = () => {

    const {id, episodeNumber} = useParams();
    //     const params = useParams
    // console.log("ALL PARAMS:", params);

    const [episodeData, setEpisodeData] = useState(null)

    useEffect(() => {
        const getEpisode = async () => {
          const response = await fetch(
            `https://aniwixi.xyz/wp-json/aniwixi/v1/anilist/${id}/ep/${episodeNumber}`
          );
          const data = await response.json();
          setEpisodeData(data);
        };

        getEpisode();

    }, [id, episodeNumber]);

    // console.log("Anime Id: ", {id})
    // console.log("Anime Id: ", {episodeNumber})
    // console.log(episodeData)

    return (
       <div className="min-h-screen bg-black text-white p-5">

    <h1 className="text-2xl font-bold mb-5">
      Episode {episodeNumber}
    </h1>

    {episodeData && (
      <div className="w-full aspect-video">
        <iframe
          src={episodeData.data.player_data.embed_url}
          className="w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          title={`Episode ${episodeNumber}`}
        ></iframe>
      </div>
    )}

  </div>
    );
};

export default Streaming;