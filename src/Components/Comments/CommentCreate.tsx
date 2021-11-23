import * as React from 'react';
import APIURL from '../../helpers/environment';
import 
{
    Modal,
    ModalBody,
}   from 'reactstrap'



interface CommentCreateProps 
{
    userReviews: [ReviewJSON],
    fetchReviews(): void,
    updateOn(): void,
    updateOff(): void,
    reviewToComment: ReviewJSON,
    commentActive: boolean,
    sessionToken: string | null,
    clickCommentReview(review: ReviewJSON): void,
   
}
 
interface CommentCreateState 
{
    isOpen: boolean
    content: string
    success: boolean
    comments: CommentJSON
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
class CommentCreate extends React.Component<CommentCreateProps, CommentCreateState, ReviewJSON> {
    constructor(props: CommentCreateProps) {
        super(props);
        this.state = {  
            isOpen: false,
            content: "",
            success: false,
            comments: {
                id: 0,
                content: 0,
                owner: "",
                createdAt: "",
            }
        };
    }

    fetchComments = (id: number) => {
        fetch(`${APIURL}comment/${id}`, {
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


    commentCreate = (): void => {
       
        fetch(`http://localhost:4000/comment/create`, {
            method: 'POST',
            body: JSON.stringify({
                content: this.state.content,
                reviewId: this.props.reviewToComment.id, 
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`
            })
        }).then((res) => res.json())
        .then((comment) => {
            this.fetchComments(comment.reviewId)
            this.props.updateOff()
        });
    };
    
    handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            content: e.target.value
        })
    }
    
    componentDidUpdate(prevProps: Readonly<CommentCreateProps>, prevState: Readonly<CommentCreateState>) {
        if (this.state.comments !== prevState.comments){
            this.fetchComments(this.props.reviewToComment.id)
        }
    }
    
    
    render() { 
        return (  
            <>
                <Modal isOpen={true}>
                    <ModalBody>
                        Create a comment
                    </ModalBody>
                    <ModalBody>
                        <div className="text-container">
                            <form action="" className="mainWrap">
                                <textarea placeholder="Leave your comment..." value={this.state.content} onChange={this.handleContentChange} className="modal-text-area"></textarea>
                                <button type="submit" onClick={this.commentCreate} className="editBUTTON"> Post Comment </button>
                                <button onClick={this.props.updateOff} className="deleteBUTTON"> Close </button>
                            </form>
                        </div>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

                        
 
export default CommentCreate;