import * as React from 'react';
import AnimeCard from './AnimeCard';

interface MainContentProps 
{
    search: string,
    didSearch: boolean
    value: string
}

interface MainContentState 
{
    animeList: []
    singleSynopsis: string,
    singleImage: string,
    singleTitle: string,
    singleStatus: string,
    newSearch: string
    anime: [],
    viewActive: boolean,
    animeToView: {}
}

interface AnimeJSON 
{
    title: string,
    mal_id: number,
    url: string
    image_url: string
    synopsis: string,
    status: string,
    score: string,
    rated: string,
    type: string,
}
 
class MainContent extends React.Component<MainContentProps, MainContentState, AnimeJSON> {
    
    constructor(props: MainContentProps) {
        super(props);
        this.state = { 
            animeList: [], 
            newSearch: this.props.value,
            singleSynopsis: "",
            singleImage: "",
            singleTitle: "",
            singleStatus: "",
            anime: [],
            viewActive: false,
            animeToView: {}  
        };
    }
    
    fetchAnime = async () => {
        const temp = await fetch(`https://api.jikan.moe/v3/search/anime?q=${this.props.value}&order_by=title&sort=asc&limit=12`)
            .then(res => res.json());
        this.setState({
            animeList: temp.results,
        })
    }

    componentDidMount() {
        this.fetchAnime()
    }

    componentDidUpdate(prevProps: MainContentProps, prevState: MainContentState) {
        if (prevProps.value !== this.props.value) {
            this.fetchAnime()
        }
    }

    render() {
        return (  
            <main>
                <div className="anime-list">
                    {this.state.animeList.map((anime: AnimeJSON) => (
                        <AnimeCard anime={anime} key={anime.mal_id} />
                    ))}
                </div>
                {console.log(this.state.animeList)}
            </main>
        );
    }
}
 
export default MainContent;