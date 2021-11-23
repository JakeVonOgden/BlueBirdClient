import * as React from 'react';
import styled from "styled-components";
import AccountBox  from './Index';

interface AccountProps {
    updateToken(newToken: string): void,
    updateRole(newRole: string): void,
    updatePw(newPw: string): void, 
    clearToken(): void, 
    sessionToken: string | null
    role: string | null
    unhashedPw: string | null,
    username: string | null,
    updateUsername(newUsername: string): void,
    
}

interface AccountState {

}
 
class Account extends React.Component<AccountProps, AccountState> {
    constructor(props: AccountProps) {
        super(props);
        this.state = { };
    }
    render() { 
        return (
            <div className="App"> 
                <AccountContainer>
                    <AccountBox 
                        updateToken={this.props.updateToken}
                        sessionToken={this.props.sessionToken} 
                        updateRole={this.props.updateRole} 
                        role={this.props.role} 
                        unhashedPw={this.props.unhashedPw} 
                        updatePw={this.props.updatePw}
                        username={this.props.username}
                        updateUsername={this.props.updateUsername} 
                    />
                </AccountContainer>
            </div> 
        );
    }
}
 
export default Account;

const AccountContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: -3.1%;
    background: url('http://dslv9ilpbe7p1.cloudfront.net/Y-TEe8xXElhdokAksNpb0w_store_banner_image.png');
    background-size: 110%;
`;