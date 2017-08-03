import React from 'react';
import API_KEY from './gitkey';
import GithubUser from './GithubUser';
import Infinite from 'react-infinite';

class Followers extends React.Component{
  constructor(){
  super();
  this.state = {
    page:1,
    loading: false,
    followers:[]
  };
  }

  fetchData = () => {
    this.setState({
      loading:true
    })
    fetch(`https://api.github.com/users/${this.props.params.username}/followers?access_token=${API_KEY}&page=${this.state.page}&per_page=50`)
    .then(r => r.json())
    .then(data => {
      this.setState({
        followers: this.state.followers.concat(data),
        loading: false,
        page: this.state.page + 1
      })
    })
  }


  render(){
    return (
      <div className='followers-page'>
        <h3>Followers of {this.props.params.username}</h3>
        <Infinite
        isInfiniteLoading={this.state.loading}
        onInfiniteLoad={this.fetchData}
        useWindowAsScrollContainer
        elementHeight={500}
        loadingSpinnerDelegate={<div>LOADING....</div>}
        infiniteLoadBeginEdgeOffset={100}>
        {
          this.state.followers.map(follower => {
            return (
              <GithubUser key={follower.id} user={follower}/>
            )
           })
         }
         </Infinite>
      </div>
    )
  }
}

export default Followers;
