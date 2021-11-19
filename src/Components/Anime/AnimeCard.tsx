
import * as React from 'react';
import AnimeModal from './AnimeModal'
import '../../StyleSheets/AnimeStyles/Anime.css'

interface AnimeCardProps 
{
    anime: AnimeJSON,
}

interface AnimeCardState 
{
    anime: {},
    viewActive: boolean,
    animeToView: {}
}

interface AnimeJSON 
{
    title: string,
    mal_id: number,
    url: string,
    image_url: string,
    synopsis: string,
    status: string
    score: string
    rated: string,
    type: string,
}
 
class AnimeCard extends React.Component<AnimeCardProps, AnimeCardState, AnimeJSON> {
    
    constructor(props: AnimeCardProps) {
        super(props);
        this.state = { anime: this.props.anime, viewActive: false,
        animeToView: {}  };
    }

    animeMounted = (singleAnime: AnimeJSON) => {
        this.setState({
            animeToView: singleAnime
        })
    }

    displayModal = () => {
        this.setState({
            viewActive: true
        })
    }

    hideModal = () => {
        this.setState({
            viewActive: false
        })
    }


    render() {
        
        return (
        <>  
           <article className="anime-card">
               
                    <figure>
                        <img 
                            onClick={() => {this.animeMounted(this.props.anime); this.displayModal()}}
                            src={this.props.anime.image_url}
                            alt="AnimePoster" />
                    </figure>
                    <h3>{ this.props.anime.title }</h3>
               
           </article>
           {
               this.state.viewActive
                ?
                    <AnimeModal
                    animeToView={this.state.animeToView}
                    hideModal={this.hideModal}
                    anime={this.props.anime}/>
                :
                    null
           }
            
        </>     
                    
        );
    }
}
 
export default AnimeCard;