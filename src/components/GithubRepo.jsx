import React from 'react'

class GithubRepo extends React.Component{
  render(){
    return(
      <div>
        <a href={this.props.user.svn_url}>{this.props.user.full_name}</a>
      </div>
    )
  }
}

export default GithubRepo;
