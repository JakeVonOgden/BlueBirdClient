import * as React from 'react';
import APIURL from '../../../helpers/environment';
import '../../../StyleSheets/AccountStyles/EditModal.css';
import '../../../StyleSheets/ButtonStyles/Buttons.css';
import 
{
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Modal,
    ModalBody,
} from 'reactstrap'

interface AccountEditProps 
{
    accountToUpdate: UserJson
    fetchAccount(): void
    updateOff(): void
    updatePw(newPw: string): void,
    sessionToken: string | null
    unhashedPw: string | null
}

interface AccountEditState 
{
    editUsername: string,
    editEmail: string,
    editPassword: string
    isOpen: boolean
}

interface UserJson 
{
    username: string,
    email: string,
    password: string
}
 
class AccountEdit extends React.Component<AccountEditProps, AccountEditState, UserJson> {
    
    constructor(props: AccountEditProps) {
        super(props);
        this.state = { 
            isOpen: true, 
            editUsername: "",
            editEmail: "",
            editPassword: "",
        };
        this.accountUpdate = this.accountUpdate.bind(this);
    }

    accountUpdate = (event: React.SyntheticEvent): void => {
        event.preventDefault()
        fetch(`${APIURL}user/edit`, {
            method: 'PUT',
            body: JSON.stringify({
                username: this.state.editUsername, 
                email: this.state.editEmail, 
                password: this.state.editPassword
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`
            })
        }).then((res) => {
            this.props.updatePw(this.state.editPassword)
            this.props.fetchAccount();
            this.props.updateOff()
        })
    }

    handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            editUsername: e.target.value
        })
    }

    handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            editEmail: e.target.value
        })
    }

    handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            editPassword: e.target.value
        })
    }

    render() { 
        return (  
            <Modal className="modal-sm" isOpen={true}>
               
                <ModalBody className="modal-body">
                    <Form>
                        <FormGroup className="modal-form">
                            <Label htmlfor="username">Edit Username:</Label>
                            <br/>
                            <Input name="username" value={this.state.editUsername} onChange={this.handleUsernameChange}/>
                        </FormGroup>
                        <br/>
                        <FormGroup className="modal-form">
                            <Label htmlfor="email">Edit Email:</Label>
                            <br/>
                            <Input name="email" value={this.state.editEmail} onChange={this.handleEmailChange}/>
                        </FormGroup>
                        <br/>
                        <FormGroup className="modal-form">
                            <Label htmlfor="password">Edit Password:</Label>
                            <br/>
                            <Input name="password" value={this.state.editPassword} onChange={this.handlePasswordChange}/>
                        </FormGroup>
                        <br/>
                        <FormGroup className="btn-center">
                            <Button className="editBUTTON" onClick={this.accountUpdate} type="submit">Save Changes</Button>
                            <Button className="deleteBUTTON" onClick={this.props.updateOff}>
                                Close
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        );
    }
}
 
export default AccountEdit;