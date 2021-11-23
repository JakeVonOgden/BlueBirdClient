import * as React from 'react';
import APIURL from '../../helpers/environment';
import 
{
    Modal,
    ModalBody,
}   from 'reactstrap'


interface CommentsEditProps 
{
    userComment: [CommentJSON]
    updateCommentOn(): void
    updateCommentOff(): void
    clickEditComment(comment: CommentJSON): void
    commentEditActive: boolean
    commentToEdit: CommentJSON
    sessionToken: string | null
    fetchReviews(): void
}
 
interface CommentsEditState 
{
    isOpen: boolean
    success: boolean
    content: string
    comments: CommentJSON
}

interface CommentJSON
{
    id: number,
    content: number,
    owner: string,
    createdAt: string,
}
 
class CommentsEdit extends React.Component<CommentsEditProps, CommentsEditState, CommentJSON> {
    constructor(props: CommentsEditProps) {
        super(props);
        this.state = {
            isOpen: false,
            content: "",
            success: false,
            comments: {
                id: 0,
                content: 0,
                owner: "",
                createdAt: ""
            }
        };
        this.commentEdit = this.commentEdit.bind(this)
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

    commentEdit = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        fetch(`${APIURL}comment/edit/${this.props.commentToEdit.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                content: this.state.content
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`
            })
        }).then((res) => {
            this.fetchComments(this.props.commentToEdit.id)
            this.props.updateCommentOff()
        })
    }
    
    handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            content: e.target.value
        })
    }
    
    render() { 
        return (
            <>
                <Modal className="comment-modal" isOpen={true}>
                    <ModalBody className="comment-modal-body">
                        <div className="text-container">
                            <form action="" className="mainWrap">
                                <textarea className="modal-text-area" placeholder="Edit your comment..." value={this.state.content} onChange={this.handleContentChange}></textarea>
                                <button type="submit" className="editBUTTON" onClick={this.commentEdit}> Save </button>
                                <button onClick={this.props.updateCommentOff} className="deleteBUTTON"> Close </button>
                            </form>
                        </div>
                    </ModalBody>
                </Modal>
            </>  
        );
    }
}
 
export default CommentsEdit;