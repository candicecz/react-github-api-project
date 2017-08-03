import React from 'react';
import API_KEY from './gitkey';
import GithubRepo from './GithubRepo'
import Infinite from 'react-infinite';

class Repos extends React.Component{
  constructor(){
    super();
    this.state={
      page:1,
      loading: false,
      repos:[]
    };
  }

  fetchData = () => {
    this.setState({
      loading:true
    })

    fetch(`https://api.github.com/users/${this.props.params.username}/repos?access_token=${API_KEY}&page=${this.state.page}&per_page=50`)
    .then(r => r.json())
    .then(data => {
      this.setState({
        repos: this.state.repos.concat(data),
        loading:false,
        page:this.state.page + 1
      })
    })
  }
  render(){
    // if(!this.state.repos){
    //   return(
    //     <div>
    //       <h3>LOADING...</h3>
    //     </div>
    //   )
    // }
    return(
      <div>
        <h3>{this.props.params.username}'s Public Repos </h3>
        <Infinite
        isInfiniteLoading={this.state.loading}
        onInfiniteLoad={this.fetchData}
        useWindowAsScrollContainer
        elementHeight={20}
        loadingSpinnerDelegate={<div>LOADING....</div>}
        infiniteLoadBeginEdgeOffset={50}>
          {this.state.repos.map(repo => {
            return (
              <GithubRepo key={repo.id} user={repo}/>
            )})}
        </Infinite>
      </div>
    )
  }
}

export default Repos;
