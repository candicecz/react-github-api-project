import React from 'react';
import API_KEY from './gitkey';
import GithubUser from './GithubUser';
import Infinite from 'react-infinite';

class Following extends React.Component{
  constructor(){
    super();
    this.state = {
      page:1,
      loading: false,
      following:[]
    }
  }

  fetchData = () => {
    this.setState({
      loading:true
    })

    fetch(`https://api.github.com/users/${this.props.params.username}/following?access_token=${API_KEY}&page=${this.state.page}&per_page=50`)
    .then(r => r.json())
    .then(data => {
      this.setState({
        following: this.state.following.concat(data),
        loading:false,
        page:this.state.page + 1
      })
    })
  }


  render(){

    return(
      <div className='following-page'>
        <h3>Followed by {this.props.params.username}</h3>
        <Infinite
        isInfiniteLoading={this.state.loading}
        onInfiniteLoad={this.fetchData}
        useWindowAsScrollContainer
        elementHeight={500}
        loadingSpinnerDelegate={<div>LOADING....</div>}
        infiniteLoadBeginEdgeOffset={100}>
          {this.state.following.map(follow => {
            return (
              <GithubUser key={follow.id} user={follow}/>
            )})}
        </Infinite>
      </div>

    )
  }

}

export default Following;
