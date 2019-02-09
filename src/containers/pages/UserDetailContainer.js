import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Loader, Dimmer, Header, Grid } from 'semantic-ui-react';
import * as userActions from '../../actions/user';
import * as postActions from '../../actions/post';
import * as albumActions from '../../actions/album';
import UserPosts from '../../components/user/UserPosts';
// album
// albm

class UserDetailContainer extends Component {
  componentDidMount() {
    this.props.Post.loadAllPostByUserId(this.props.match.params.id);
    this.props.User.loadUserById(this.props.match.params.id);
  }

  render() {
    const { posts, isLoadingPosts, isLoadingUsers } = this.props;
    const { user={} } = this.props;
    const { name } = user;

    return (
      <>
        {isLoadingUsers || isLoadingPosts || posts.length === 0 || user.length === 0 || posts === undefined ?
          <Dimmer active inverted>
            <Loader size='huge'>Loading...</Loader>
          </Dimmer>
        :
          <>
            {name && <Header as='h1' textAlign='center' style={{ marginBottom: 50 }}>Posts of {name}</Header>}
            <Grid columns={2} container>
              <Grid.Row>
                {posts.map(post => (
                  <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                    <UserPosts post={post} />
                  </Grid.Column>
                ))}
              </Grid.Row>
            </Grid>
          </>
        }
      </>
    )
  }
}

const mapStateToProps = state => {
  const { posts, isLoading: isLoadingPosts } = state.posts;
  const { user, isLoading: isLoadingUsers } = state.users;
  return {
    posts,
    isLoadingPosts,
    user,
    isLoadingUsers
  };
}

const mapDispatchToProps = dispatch => {
  return {
    User: bindActionCreators(userActions, dispatch),
    Post: bindActionCreators(postActions, dispatch),
    Album: bindActionCreators(albumActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailContainer);
