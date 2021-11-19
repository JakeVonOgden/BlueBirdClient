import * as React from 'react';

interface HeaderProps {}
interface HeaderState {}
 
class Header extends React.Component<HeaderProps, HeaderState> {
    constructor(props: HeaderProps) {
        super(props);
        this.state = {};
    }
    
    render() { 
        return (  
            <header className="anime-header">
                <h1> Anime <strong className="database-style"> Database </strong> </h1>
            </header>
        );
    }
}
 
export default Header;