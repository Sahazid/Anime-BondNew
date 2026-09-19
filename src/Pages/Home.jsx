import Hero from "../component/Hero";
import Streaming from "../component/Streaming";

const animePromise = fetch("https://aniwixi.xyz/wp-json/aniwixi/v1/anime")
                        .then((res) => res.json());

const Home = () => {
    return (
        <div>
            <Hero animePromise={animePromise} />
           
        </div>
    );
};

export default Home;