import * as React from 'react';
import '../../../StyleSheets/ReviewStyles/ReviewModal.css';
import 
{
    Modal,
    ModalBody,
}   from 'reactstrap'

  


interface ReviewsEditProps 
{
    userReviews: [ReviewJSON],
    updateActive: boolean,
    reviewToUpdate: ReviewJSON,
    sessionToken: string | null,
    fetchReviews(): void,
    updateOn(): void,
    updateOff(): void,
    editUpdateReview(review: ReviewJSON): void,
}

interface ReviewsEditState 
{
    editContent: string,
    editRating: number,
    isOpen: boolean
}

interface ReviewJSON
{
    anime: string
    rating: number
    content: string,
    image: string,
    owner: string,
    id: number
}
 
class ReviewsEdit extends React.Component<ReviewsEditProps, ReviewsEditState> {
    
    constructor(props: ReviewsEditProps) {
        super(props);
        this.state = {
            editContent: "", 
            editRating: 0,
            isOpen: false
        };
        this.reviewUpdate = this.reviewUpdate.bind(this);
    }
    
    reviewUpdate = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        fetch(`http://localhost:4000/review/edit/${this.props.reviewToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                content: this.state.editContent, 
                rating: this.state.editRating,
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`
            })
        }).then((res) => {
            this.props.fetchReviews();
            this.props.updateOff();
        })
    }

    handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            editContent: e.target.value
        })
    }

    handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            editRating: parseInt(e.currentTarget.value)
        })
    }

    render() { 
        return (
            <Modal className="modal-l" isOpen={true}>
                 <ModalBody>
                    Update Review
                </ModalBody>
                <ModalBody>
                        <div className="text-container">
                            <form action="" className="mainWrap">
                                    <div className="review-header">
                                        <div className="hello">
                                        <h1 className="review-rating-header">Rating</h1>
                                        </div>
                                        <select id="rating" className="review-rating" value={this.state.editRating} onChange={this.handleRatingChange}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                     </div>
                                <textarea placeholder="Leave your review..." className="modal-text-area" value={this.state.editContent} onChange={this.handleContentChange}></textarea>
                                <button type="submit" onClick={this.reviewUpdate} className="review-updateBtn">Save </button>
                                <button onClick={this.props.updateOff} className="review-updateBtn"> Close </button>
                            </form>
                        </div>
                </ModalBody>
            </Modal>
        );
    }
}
                   
 
export default ReviewsEdit;