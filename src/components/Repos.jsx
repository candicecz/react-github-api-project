import React from 'react';
import API_KEY from './gitkey';
import GithubRepo from './GithubRepo'

class Repos extends React.Component{
  constructor(){
    super();
    this.state={};
  }
  componentDidMount(){
    fetch(`https://api.github.com/users/${this.props.params.username}/repos?access_token=${API_KEY}`)
    .then(r => r.json())
    .then(data => {
      this.setState({
        repos:data
      })
    })
  }
  render(){
    if(!this.state.repos){
      return(
        <div>
          <h3>LOADING...</h3>
        </div>
      )
    }
    return(
      <div>
        <h3>{this.props.params.username}'s Public Repos </h3>
        <ul>
          {this.state.repos.map(repo => {
            return (
              <GithubRepo key={repo.id} user={repo}/>
            )})}
        </ul>
      </div>
    )
  }
}

export default Repos;
