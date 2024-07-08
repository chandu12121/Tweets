import {Component} from 'react'
import {v4} from 'uuid'

import PostItem from '../PostItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class CreatePost extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentList: [],
  }

  deleteComment = commentId => {
    const {commentList} = this.state

    this.setState({
      commentList: commentList.filter(comment => comment.id !== commentId),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachComment => {
        if (eachComment.id === id) {
          return {
            ...eachComment,
            isLIked: !eachComment.isLIked,
          }
        }
        return eachComment
      }),
    }))
  }

  onChangeNameInput1 = event => {
    this.setState({
      nameInput: event.target.value,
    })
  }

  onChangeCommentInput1 = event => {
    this.setState({
      commentInput: event.target.value,
    })
  }

  renderCommentList = () => {
    const {commentList} = this.state
    return commentList.map(eachComment => (
      <PostItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
        changeName={this.onChangeNameInput1}
        changeTweet={this.onChangeCommentInput1}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialBackgroundClassNames = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLIked: false,
      initialClassName: initialBackgroundClassNames,
    }
    this.setState(prevState => ({
      commentList: [...prevState.commentList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  onChangeNameInput = event => {
    this.setState({
      nameInput: event.target.value,
    })
  }

  onChangeCommentInput = event => {
    this.setState({
      commentInput: event.target.value,
    })
  }

  render() {
    const {nameInput, commentInput, commentList} = this.state
    return (
      <div className="app-container">
        <h1>Tweets</h1>
        <div className="comments-container">
          <div className="comments-inputs">
            <form className="form" onSubmit={this.onAddComment}>
              <p>Say something about 4.0 Technologies</p>
              <input
                type="text"
                placeholder="Your Name"
                value={nameInput}
                onChange={this.onChangeNameInput}
              />
              <br />
              <textarea
                placeholder="Your Tweet"
                value={commentInput}
                onChange={this.onChangeCommentInput}
                rows="6"
              />
              <br />
              <button type="submit" className="add-btn">
                Add Tweet
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
          />
        </div>

        <hr className="line" />

        <p>
          <span className="count-btn">{commentList.length}</span> Tweets
        </p>
        <ul className="comments-list">{this.renderCommentList()}</ul>
      </div>
    )
  }
}

export default CreatePost
