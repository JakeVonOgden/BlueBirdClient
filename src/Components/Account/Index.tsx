import styled from 'styled-components';
import  LoginForm  from './LoginForm';
import { motion } from 'framer-motion';
import * as React from 'react';
import  RegisterForm  from './RegisterForm';

interface AccountBoxProps { 
    updateToken(newToken: string): void,
    updateRole(newRole: string): void,
    updatePw(newPw: string): void, 
    sessionToken: string | null,
    role: string | null
    unhashedPw: string | null,
    username: string | null,
    updateUsername(newUsername: string): void, 
}

interface AccountBoxState { 
    expanded: boolean, 
    active: "signin" | "register"
}


const BoxContainer = styled.div`
    width: 378px;
    min-height: 700px;
    display: flex;
    flex-direction: column;
    border-radius: 19px;
    background-color: #fff;
    box-shadow: 10px 10px 10px 1px black;
    position: relative;
    overflow: hidden;
`;

const TopContainer = styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 1.8em;
    padding-bottom: 3.5em;
`;

const BackDrop = styled(motion.div)`
    width: 160%;
    height: 550px;
    position: absolute;
    display: flex;
    flex-direction: column;
    border-radius: 50%;
    transform: rotate(60deg);
    top: -275px;
    left: -190px;
    background: crimson;
`;

const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const HeaderText = styled.h2`
    font-family: nunito, sans-serif;
    font-size: 40px;
    font-weight: 800;
    line-height: 1.24;
    color: #fff;
    z-index: 10;
`;

const SmallText = styled.h5`
    color: #fff;
    font-family: nunito, sans-serif;
    font-weight: 400;
    font-size: 20px;
    z-index: 10;
    margin: 0;
    marginTop: 7px;
`;

const InnerContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 1.8em;
`;

const BackDropVariants = {
    expanded: {
        width: "280%",
        height: "1100px",
        borderRadius: "20%",
        transform: "rotate(60deg)"
    },
    collapsed: {
        width: "160%",
        height: "550px",
        borderRadius: "50%",
        transform: "rotate(60deg)"
    }
}

const expandingTransition = {
    type: "spring",
    duration: 2.1,
    stiffness: 30,
};

class AccountBox extends React.Component<AccountBoxProps, AccountBoxState> {
    constructor(props: AccountBoxProps) {
        super(props);
        this.state = { expanded: false, active: "signin" };
    }

    playExpandingAnimation = () => {
        this.setState({
            expanded: true
        })
        setTimeout(() => {
            this.setState({
                expanded: false
            })
        }, expandingTransition.duration * 1000 - 1500);
    }
    
    switchToRegister = () => {
        this.playExpandingAnimation();
        
        setTimeout(() => {
            this.setState({
                active: "register"
            })
        }, 400)
    }

    switchToSignin = () => {
        this.playExpandingAnimation();
        
        setTimeout(() => {
            this.setState({
                active: "signin"
            })
        }, 400)
    }

    contextValue = { switchRegister: this.switchToRegister, switchSignin: this.switchToSignin }

    render() {
        return (
            <>
                <BoxContainer>
                <TopContainer>
                        <BackDrop initial={false} animate={this.state.expanded === true ? "expanded" : "collapsed"} variants={BackDropVariants} transition={expandingTransition}/>
                        {this.state.active === "signin" && <HeaderContainer>
                            <HeaderText>Welcome</HeaderText>
                            <HeaderText>Back</HeaderText>
                            <SmallText>Please Sign-in to continue!</SmallText>
                        </HeaderContainer>}
                        {this.state.active === "register" && <HeaderContainer>
                            <HeaderText>Create</HeaderText>
                            <HeaderText>Account</HeaderText>
                            <SmallText>Please Sign-up to continue!</SmallText>
                        </HeaderContainer>}
                    </TopContainer>
                    <InnerContainer>
                        {this.state.active === "signin" && <LoginForm switchRegister={this.switchToRegister} updateToken={this.props.updateToken} sessionToken={this.props.sessionToken} updateRole={this.props.updateRole} role={this.props.role} unhashedPw={this.props.unhashedPw} updatePw={this.props.updatePw} username={this.props.username} updateUsername={this.props.updateUsername} />}
                        {this.state.active === "register" && <RegisterForm switchSignin ={this.switchToSignin} updateToken={this.props.updateToken} sessionToken={this.props.sessionToken} updateRole={this.props.updateRole} role={this.props.role} unhashedPw={this.props.unhashedPw} updatePw={this.props.updatePw} username={this.props.username} updateUsername={this.props.updateUsername}  />} 
                    </InnerContainer>
                </BoxContainer>
            </>
        )
    }
}
                    

export default AccountBox;