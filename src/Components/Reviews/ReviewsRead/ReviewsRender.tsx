import * as React from 'react';
import '../../../StyleSheets/ReviewStyles/ReviewComments.css'


import { 
    Container,
    Row, 
    Card, 
    CardImg, 
    CardBody,  
    Button,
} from 'reactstrap';


interface ReviewsRenderProps 
{
    userReviews: [ReviewJSON],
    fetchReviews(): void,
    updateOn(): void,
    updateOff(): void,
    reviewToComment: ReviewJSON,
    commentActive: boolean,
    sessionToken: string | null,
    clickCommentReview(review: ReviewJSON): void,
    title: string | null
    username: string | null
    commentEditActive: boolean
    clickEditComment(comment: CommentJSON): void
    updateCommentOn(): void,
    updateCommentOff(): void,
}
 
interface ReviewsRenderState 
{
    viewClicked: boolean
    reviewId: number
    comments: [CommentJSON]
    success: boolean
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

interface CommentJSON
{   
    id: number,
    content: number,
    owner: string,
    createdAt: string,
}
 
class ReviewsRender extends React.Component<ReviewsRenderProps, ReviewsRenderState, ReviewJSON> {
    
    constructor(props: ReviewsRenderProps) {
        super(props);
        this.state = {
            
            comments: [{
                content: 0,
                owner: "",
                createdAt: "",
                id: 0
            }],  
            
            viewClicked: false,
            reviewId: 0,
            success: false,
        };
    }

    handleViewClick = (id: number) => {
        this.setState({
            viewClicked: true,
            reviewId: id
        })
    }

    handleCloseClick = () => {
        this.setState({
            viewClicked: false,
            reviewId: 0,
        })
    }

    fetchComments = () => {
        fetch(`http://localhost:4000/comment/${this.state.reviewId}`, {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        }).then((res) => res.json())
        .then((comments) => {
            console.log(comments);
            this.setState({
                comments: comments,
                success: true
            })
        })
    }

    deleteComment = (comment: CommentJSON) => {
        fetch(`http://localhost:4000/comment/delete/${comment.id}`, {
            method: "DELETE",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`
            })
        })
        .then(() => this.fetchComments())

    }

    componentDidMount() {
        this.handleViewClick(this.state.reviewId)
    }

    componentDidUpdate(prevProps: Readonly<ReviewsRenderProps>, prevState: Readonly<ReviewsRenderState>) {
        if (prevState.reviewId !== this.state.reviewId ) {
            this.fetchComments()
        }
    }
    

    reviewMapper = () => {
        return this.props.userReviews.map((reviews: ReviewJSON, index) => {
            return (
                <div className="anime-review-wrapper" key={index}> 
                    <Card className="entire-card">
                        <CardBody className="entire-body">
                            <h3 className="review-owner"> {reviews.owner} </h3>
                            <CardImg className="card-image" src={reviews.image} />
                        </CardBody>
                    </Card>
                    <div className="review-text-area">
                        <h3 className="text-area-rating"> {reviews.rating} / 5 </h3>
                        <p className="text-area-para"> {reviews.content} </p>
                        {
                            this.state.reviewId === reviews.id 
                            ?
                            <>
                            <Button className="deleteBUTTON" onClick={() => {this.props.clickCommentReview(reviews); this.props.updateOn()}} > Comment </Button>
                            <Button className="deleteBUTTON" onClick={this.handleCloseClick} > Hide </Button>
                            <div className="scroll-box">
                                {this.commentsMapper()}
                            </div>
                            </>
                            :
                            <>
                            <Button className="deleteBUTTON" onClick={() => {this.props.clickCommentReview(reviews); this.props.updateOn()}} > Comment </Button>
                            <Button className="deleteBUTTON" onClick={() => {this.handleViewClick(reviews.id)}} > View Comments </Button>
                            </>
                        }
                    </div>
                </div>
            )
        })
    }

    commentsMapper = () => {
        return this.state.comments.map((comment: CommentJSON, index) => {
            return (
                <>
                   
                    <div className="divToScroll">
                       
                        <h5 className="comment-owner"> {comment.owner} <span className="date">{comment.createdAt.substring(0,10)}</span>  {
                            this.props.username === comment.owner
                                ?
                                <>
                                    <Button className="edit-button" onClick={() => {this.props.clickEditComment(comment); this.props.updateCommentOn()}}> EDIT </Button>
                                    <Button className="delete-button" onClick={() => {this.deleteComment(comment)}}> DELETE </Button>
                                </>
                                :
                                null
                        }</h5>
                        <p className="comment-content" style={{color: "white"}}> {comment.content} </p>
                        
                    </div>
             
                </>
            )
        })
    }
                        
    render() { 
        return (  
            <>
                <Container>
                    <Row>
                        {Array.isArray(this.props.userReviews) ? this.reviewMapper() : null}
                    </Row>
                </Container>
            </>
        );
    }
}
                
export default ReviewsRender;