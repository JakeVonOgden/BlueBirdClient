import * as React from 'react';
import '../../../StyleSheets/AccountStyles/Profile.css';

interface AccountTableProps 
{
    userAccount: [{username: "", email: "", password: ""}],
    fetchAccount(): void
    editUpdateAccount(account: UserJson): void
    updateOn(): void
    updateOff(): void
    sessionToken: string | null
    unhashedPw: string | null
}

interface UserJson 
{
    username: string,
    email: string,
    password: string
}
 
class AccountTable extends React.Component<AccountTableProps> {
    
    deleteAccount = () => {
        fetch(`http://localhost:4000/user/delete`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`
            })
        })
        .then(() => this.props.fetchAccount())
    }
    componentDidMount(){
        console.log(this.props.userAccount)
    }
      

    accountMapper = () => {
        return this.props.userAccount.map((account: UserJson, index) => {
            return(
                <>
                    <div className="card__name">
                        <p>{account.username}</p>
                    </div>
                        <p> <span className="email-label"> Email: </span> {account.email}</p>
                        <p> <span className="password-label">Password:</span> {this.props.unhashedPw}</p>
                        <div className="card__button">
                            <p onClick={() => {this.props.editUpdateAccount(account); this.props.updateOn()}}>Edit</p>
                        </div>
                    
                </>
                
            )
        })
    }
    
    render() { 
        return (
            <div className="card">
                <div className="card__image">
                    <img src='https://media-exp1.licdn.com/dms/image/C4E03AQEO4PYpy7svPQ/profile-displayphoto-shrink_800_800/0/1634117865921?e=1642636800&v=beta&t=hen__z9-UzP5_UigvuCpJjKDk8uesguigmYGAquIPMo' alt="pic" />
                </div>
                {this.accountMapper()}
            </div>
        );
    }
}
 
export default AccountTable;