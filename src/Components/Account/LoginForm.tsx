import { 
    BoxContainer, 
    FormContainer, 
    Input, 
    MutedLink, 
    SubmitButton, 
    BoldLink 
} from './Common';
import APIURL from '../../helpers/environment';
import { Redirect } from 'react-router';
import * as React from 'react';

/*
===========
Interfaces
===========
*/

interface LoginFormProps { 
    switchRegister: () => void, 
    updateToken(newToken: string): void,
    updateRole(newRole: string): void,
    updatePw(newPw: string): void, 
    sessionToken: string | null
    role: string | null
    unhashedPw: string | null,
    username: string | null,
    updateUsername(newUsername: string): void,
}

interface LoginFormState {
    username: string,
    password: string,
    success: boolean
}

interface UserJson {
    user: {
        username: string,  
        sessionToken: string
        role: string
        password: string
    }  
}
//==========================================================================================

class LoginForm extends React.Component<LoginFormProps, LoginFormState, UserJson> {
    constructor(props: LoginFormProps) {
        super(props);
        this.state = { username: "", password: "", success: false };
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }
    
    handleSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        fetch(`${APIURL}user/login`, {
            method: 'POST',
            body: JSON.stringify({ username: this.state.username, password: this.state.password }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (res) => res.json()
        ).then((data: UserJson) => {
            console.log( "token :", data.user.sessionToken );
            this.props.updateToken(data.user.sessionToken);
            this.props.updateRole(data.user.role)
            this.props.updatePw(data.user.password)
            this.props.updateUsername(data.user.username)
            this.setState({
                success: true
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            username: e.target.value
        })
    }
    
    handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        
        return (
            <BoxContainer onSubmit={this.handleSubmit}>
                <br />
                <FormContainer>
                    <Input type="username" value={this.state.username} onChange={this.handleUsernameChange} placeholder="Username" />
                </FormContainer>
                <FormContainer>
                    <Input type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password" />
                </FormContainer>
                <br />
                <SubmitButton type="submit" onClick={this.handleSubmit} >Login </SubmitButton>
                <MutedLink>Don't have an account? <BoldLink href="#" onClick={this.props.switchRegister} > Register </BoldLink> </MutedLink>
                {this.state.success === true ? <Redirect to="/" /> : <> </>}
            </BoxContainer>
        )
    }
}

export default LoginForm;