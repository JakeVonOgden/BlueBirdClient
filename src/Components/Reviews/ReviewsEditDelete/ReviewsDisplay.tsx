import * as React from 'react';
import APIURL from '../../../helpers/environment';
import '../../../StyleSheets/ReviewStyles/ReviewDisplay.css'
import { 
    Container,
    Row, 
    Card, 
    CardImg, 
    CardBody,  
    Button,
} from 'reactstrap';

interface ReviewsDisplayProps
{
    userReviews: [ReviewJSON],
    fetchReviews(): void,
    editUpdateReview(review: ReviewJSON): void,
    updateOn(): void,
    updateOff(): void,
    sessionToken: string | null,
    updateActive: boolean,
    reviewToUpdate: ReviewJSON,
}
 
interface ReviewJSON
{
    anime: string
    rating: number,
    content: string,
    image: string,
    owner: string,
    id: number
}
 
class ReviewsDisplay extends React.Component<ReviewsDisplayProps> {
    
    deleteReview = (review: ReviewJSON) => {
        fetch(`${APIURL}review/delete/${review.id}`, {
            method: "DELETE",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`
            })
        })
        .then(() => this.props.fetchReviews())
    }
    
   
      
    cardMapper = () => {
        return this.props.userReviews.map((reviews: ReviewJSON, index) => {
            return(
                <div className="anime-review-wrapper" key={index}> 
                    <Card className="entire-card">
                        <CardBody className="entire-body">
                            <CardImg className="card-image" src={reviews.image} />
                            <Button className="deleteBUTTON" onClick={() => {this.deleteReview(reviews)}}> Delete </Button>
                            <Button className="editBUTTON" onClick={() => {this.props.editUpdateReview(reviews); this.props.updateOn()}}> Edit </Button>
                        </CardBody>
                    </Card>
                    <div className="review-text-area">
                        <h1 className="text-area-head"> {reviews.anime} </h1>
                        <h3 className="text-area-rating"> {reviews.rating} / 5 </h3>
                        <p className="text-area-para"> {reviews.content} </p>
                    </div>
                </div>
            )
        })
    }
                
    render() { 
        return (  
            <>
                <Container>
                    <h1 className="header"> Your Reviews </h1>
                    <br/>
                    <Row>
                        {Array.isArray(this.props.userReviews) ? this.cardMapper() : null}
                    </Row>
                </Container>
            </>
        );
    }
}
                        

export default ReviewsDisplay;