import React from 'react';
import { Link } from 'react-router';



class GithubUser extends React.Component{
  render(){
    return(
      <div>
        <Link to={`/user/${this.props.user.login}`}>
          <img className="avatar-pics" src={this.props.user.avatar_url} alt="avatar"/>
          <h3>{this.props.user.login}</h3>
        </Link>
      </div>
    )
  }

}

export default GithubUser;
