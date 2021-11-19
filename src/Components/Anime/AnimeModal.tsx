import * as React from 'react';
import { Redirect } from 'react-router-dom';
import
{
    Modal,
    ModalBody,
    ModalFooter,
    Button
} from 'reactstrap'

interface AnimeModalProps {
    animeToView: {},
    hideModal(): void
    anime: AnimeJSON
}
 
interface AnimeModalState {
    isOpen: boolean
    singleSynopsis: string,
    singleImage: string,
    singleTitle: string,
    singleStatus: string,
    postClick: boolean,
    viewClick: boolean
}

interface AnimeJSON
{
    mal_id: number
    title: string,
    image_url: string,
    synopsis: string,
    status: string
    score: string
    rated: string,
    type: string,
    url: string
}
 
class AnimeModal extends React.Component<AnimeModalProps, AnimeModalState> {
    constructor(props: AnimeModalProps) {
        super(props);
        this.state = {
            isOpen: true,
            singleImage: "",
            singleStatus: "",
            singleSynopsis: "",
            singleTitle: "",
            postClick: false,
            viewClick: false,
        };
    }

    storeAnime = (reviewImage: string, reviewTitle: string) => {
        localStorage.setItem("image", reviewImage);
        localStorage.setItem("title", reviewTitle);
        this.setState({
            singleImage: reviewImage,
            singleTitle: reviewTitle,
            postClick: true,
        })
    }

    seeReviews = (reviewImage: string, reviewTitle: string) => {
        localStorage.setItem("image", reviewImage);
        localStorage.setItem("title", reviewTitle);
        this.setState({
            singleImage: reviewImage,
            singleTitle: reviewTitle,
            viewClick: true,
        })
    }

    handlePostClick = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        this.storeAnime(this.props.anime.image_url, this.props.anime.title)
    }

    handleViewClick = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        this.seeReviews(this.props.anime.image_url, this.props.anime.title)
    }

    render() { 
        return (
            <> 
                <Modal 
                    className="modal-lg"
                    isOpen={true} 
                    id="exampleModal" 
                    tabindex="-1"  
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                        
                    
                    
                   
                    
                    <ModalBody>
                        <img 
                            src={this.props.anime.image_url} 
                            alt="one-piece"
                        />
                        <div className="modal-synopsis">
                            {this.props.anime.synopsis}
                        </div>
                    </ModalBody>
                    
                    <ModalFooter>
                        <div className="more-info">
                            {this.props.anime.type}
                        </div>
                        <div className="more-info">
                            {this.props.anime.rated}
                        </div>
                        <div className="more-info">
                            {this.props.anime.score} / 10
                        </div>
                        <div className="more-info">
                            <a href="/reviews" onClick={this.handleViewClick}>
                                See Reviews
                            </a>
                        </div>
                        <div className="more-info">
                            <a href="/leaveReview" onClick={this.handlePostClick}>
                                Post Review
                            </a>
                        </div>
                        <div className="more-info">
                            <Button className="delete-button" onClick={this.props.hideModal}> 
                                CLOSE 
                            </Button>
                        </div>
                        
                    </ModalFooter>
                </Modal>
                {this.state.postClick ? <Redirect to="/leaveReview"/> : null}
                {this.state.viewClick ? <Redirect to="/reviews" /> : null}
            </>
        );
    }
}

export default AnimeModal;