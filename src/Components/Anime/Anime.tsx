import * as React from 'react';
import Header from './Header';
import MainContent from './MainContent';
import {Container } from 'reactstrap'
interface AnimeProps {
    search: string
    didSearch: boolean
    value: string
}
interface AnimeState {
    animeList: [],
    topAnime: [],
}

class Anime extends React.Component<AnimeProps, AnimeState> {
    constructor(props: AnimeProps) {
        super(props);
        this.state = { animeList: [], topAnime: [], };
    }

   
    
   
  
    
    render() {
        return (
            <div>
                
                <Container>
                    <Header />
                    <br/>
                    <MainContent value={this.props.value} search={this.props.search} didSearch={this.props.didSearch} />
                </Container>
               
            </div>
        );
    }
}
 
export default Anime;