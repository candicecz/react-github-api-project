import React from 'react';
import API_KEY from './gitkey';
import GithubUser from './GithubUser';

class Following extends React.Component{
  constructor(){
    super();
    this.state = {}
  }

  componentDidMount(){
    fetch(`https://api.github.com/users/${this.props.params.username}/following?access_token=${API_KEY}`)
    .then(r => r.json())
    .then(data => {
      this.setState({
        following:data
      })
    })
  }
  render(){
    if(!this.state.following){
      return (
        <h1> LOADING... </h1>
      )
    }
    return(
      <div className='following-page'>
        <h3>Followed by {this.props.params.username}</h3>
        <ul>
          {this.state.following.map(follow => {
            return (
              <GithubUser key={follow.id} user={follow}/>
            )})}
        </ul>
      </div>

    )
  }

}

export default Following;
