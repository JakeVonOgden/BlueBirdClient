import * as React from 'react';
import APIURL from '../../../helpers/environment';
import {Container} from 'reactstrap';
import ReviewsDisplay from './ReviewsDisplay';
import ReviewsEdit from './ReviewsEdit';

interface PersonalReviewsProps {
    sessionToken: string | null
}
 
interface PersonalReviewsState {
    userReviews: [ReviewJSON]
    updateActive: boolean,
    reviewToUpdate: ReviewJSON
    token: string | null
}

interface ReviewJSON
{
    anime: string,
    rating: number,
    content: string,
    image: string,
    owner: string,
    id: number
}
 
class PersonalReviews extends React.Component<PersonalReviewsProps, PersonalReviewsState, ReviewJSON> {
    constructor(props: PersonalReviewsProps) {
        super(props);
        this.state = {   
            userReviews: [{
                anime: "",
                rating: 0, 
                content: "",
                image: "",
                owner: "",
                id: 0
            }],
            reviewToUpdate: {
                anime: "",
                rating: 0,
                content: "",
                image: "",
                owner: "",
                id: 0,
            },
            token: "",
            updateActive: false
        };
    }

    fetchReviews = () => {
        fetch(`${APIURL}review/mine`, {
            method: "GET",
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`
            })
        }).then((res) => res.json())
        .then((reviews) => {
            console.log(reviews)
            this.setState({
                userReviews: reviews
            })
        })
    }

    editUpdateReview = (review: ReviewJSON) => {
        this.setState({
            reviewToUpdate: review
        });
        console.log(review);
    }

    updateOn = () =>{
        this.setState({
            updateActive: true
        })
    }

    updateOff = () => {
        this.setState({
            updateActive: false
        })
    }

    componentDidMount(){
        this.fetchReviews();
    }


    componentDidUpdate(prevProps: Readonly<PersonalReviewsProps>) {
        if (this.props.sessionToken !== prevProps.sessionToken) {
            this.fetchReviews()
        }
    }


    render() { 
        return (  
            <>
                <Container>
                    <ReviewsDisplay 
                        fetchReviews={this.fetchReviews}
                        userReviews={this.state.userReviews} 
                        updateOn={this.updateOn}
                        updateOff={this.updateOff} 
                        updateActive={this.state.updateActive} 
                        editUpdateReview={this.editUpdateReview} 
                        reviewToUpdate={this.state.reviewToUpdate}
                        sessionToken={this.props.sessionToken}
                    />
                    
                </Container>
                {
                    this.state.updateActive
                        ?
                            <ReviewsEdit 
                                fetchReviews={this.fetchReviews}
                                userReviews={this.state.userReviews} 
                                updateOn={this.updateOn} 
                                updateOff={this.updateOff} 
                                editUpdateReview={this.editUpdateReview} 
                                updateActive={this.state.updateActive} 
                                reviewToUpdate={this.state.reviewToUpdate}
                                sessionToken={this.props.sessionToken}
                            />
                        :
                        null
                }
            </>
        );
    }
}
 
export default PersonalReviews;