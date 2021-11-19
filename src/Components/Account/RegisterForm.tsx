import * as React from 'react';
import { Redirect } from 'react-router';
import 
{ 
    BoxContainer, 
    FormContainer, 
    Input, 
    MutedLink, 
    SubmitButton, 
    BoldLink 
} from './Common';



interface RegisterFormProps { 
    switchSignin: () => void,
    updateToken(newToken: string): void,
    updateRole(newRole: string): void,
    updatePw(newPw: string): void,
    sessionToken: string | null,
    role: string | null,
    unhashedPw: string | null
    username: string | null,
    updateUsername(newUsername: string): void,
}
interface RegisterFormState {
    username: string, 
    password: string, 
    email: string,
    passwordConfirm: string,
    success: boolean,
}
interface UserJson {
    user: {
        username: string, 
        email: string, 
        password: string, 
        sessionToken: string
    }  
}
//==========================================================================================

class RegisterForm extends React.Component<RegisterFormProps, RegisterFormState, UserJson> {
    constructor(props: RegisterFormProps) {
        super(props);
        this.state = { username: "", password: "", email: "", passwordConfirm: "", success: false};
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(this)
    }
   
    handleSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        fetch("http://localhost:4000/user/register", {
            method: 'POST',
            body: JSON.stringify({ username: this.state.username, password: this.state.password, email: this.state.email }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (res) => res.json()
        ).then((data: UserJson) => {
            console.log("token :", data.user.sessionToken);
            this.props.updateToken(data.user.sessionToken);
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
        });
    }

    handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            password: e.target.value
        });
    }

    handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            email: e.target.value
        });
    }

    handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            passwordConfirm: e.target.value
        });
    }

    passwordsDontMatchAlert = () => {
        return alert("Your passwords do not match")
    }

    render() {
        return (
            <BoxContainer onSubmit={this.handleSubmit}>
                <FormContainer>
                    <Input type="username" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange} />
                </FormContainer>
                <FormContainer>
                    <Input type="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
                </FormContainer>
                <FormContainer>
                    <Input className="pw" type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
                </FormContainer>
                <FormContainer>
                    <Input className="confirm" type="password" placeholder="Confirm Password" value={this.state.passwordConfirm} onChange={this.handlePasswordConfirmChange} />
                </FormContainer>
                <SubmitButton type="submit" onClick={this.state.password === this.state.passwordConfirm ? this.handleSubmit : this.passwordsDontMatchAlert}>Register</SubmitButton>
                <MutedLink>
                    Already have an account?
                    <BoldLink href="#" onClick={this.props.switchSignin}>
                    Login 
                    </BoldLink> 
                </MutedLink>
                {this.state.success === true ? <Redirect to="/" /> : <> </>}
            </BoxContainer>
        )
    }
}
                

export default RegisterForm;

