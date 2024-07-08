// Write your code here
import {FaPen} from 'react-icons/fa6'

import {formatDistanceToNow} from 'date-fns'

import './index.css'

const PostItem = props => {
  const {commentDetails} = props
  const {id, name, comment, isLiked, initialClassName, date} = commentDetails
  const initial = name ? name[0].toUpperCase() : ''
  const likeTextClassName = isLiked ? 'button active' : 'button'
  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const postedTime = formatDistanceToNow(date)

  const onClickLike = () => {
    const {toggleIsLiked} = props
    toggleIsLiked(id)
  }

  const onChangeTweet = () => {
    const {changeName, changeTweet} = props
    changeName(id)
    changeTweet(id)
  }

  const onDeleteComment = () => {
    const {deleteComment} = props
    deleteComment(id)
  }

  return (
    <li className="comment-item">
      <div className="comment-container">
        <div>
          <div>
            <div className="name-icon">
              <div className="combine-name">
                <button className={initialClassName} type="button">
                  {initial}
                </button>
                <p>{name}</p>
              </div>
              <div>
                <button
                  type="button"
                  className="icon-button"
                  onChange={onChangeTweet}
                >
                  <FaPen aria-label="close" />
                </button>
              </div>
            </div>
            <p className="time">{postedTime} ago</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="buttons-container">
        <div className="like-container">
          <img src={likeImageUrl} alt="like" className="icon-button" />
          <button
            className={likeTextClassName}
            type="button"
            onClick={onClickLike}
          >
            Like
          </button>
        </div>
        <button
          className={likeTextClassName}
          type="button"
          onClick={onDeleteComment}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            className="icon-button"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default PostItem
