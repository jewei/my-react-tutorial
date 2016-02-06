import React from 'react'
import ReactDOM from 'react-dom'

class CommentBox extends React.Component {
  render() {
    return (
      <div className="comment-box">
        <h1 className="comment-box__title">Comments</h1>
        <CommentList />
        <CommentForm />
      </div>
    )
  }
}

class CommentList extends React.Component {
  render () {
    return (
      <div className="comment-box__list">
        Hello, world! I am a Commentlist.
      </div>
    )
  }
}

class CommentForm extends React.Component {
  render () {
    return (
      <div className="comment-box__form">
        Hello, world! I am a Commentform.
      </div>
    )
  }
}

ReactDOM.render(
  <CommentBox />,
  document.getElementById('root')
)
