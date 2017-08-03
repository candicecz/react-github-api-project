import React from 'react'
import API_KEY from './gitkey'
import GithubUser from './GithubUser'

class Followers extends React.Component{
  constructor(){
  super();
  this.state = {};
  }

  componentDidMount(){
    fetch(`https://api.github.com/users/${this.props.params.username}/followers?access_token=${API_KEY}`)
    .then(r => r.json())
    .then(data => {
      this.setState({
        followers: data
      })
    })
  }
  render(){
    if(!this.state.followers){
      return (
        <div>
          <h3>LOADING FOLLOWERS....</h3>
        </div>
    )}
    return (
      <div className='followers-page'>
        <h3>Followers of {this.props.params.username}</h3>
        <ul>{
          this.state.followers.map(follower => {
            return (
              <GithubUser key={follower.id} user={follower}/>
            )
           })
         }
         </ul>
      </div>
    )
  }
}

export default Followers;
