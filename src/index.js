import React from 'react'
import ReactDOM from 'react-dom'
const marked = require('marked')

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
        <Comment author="Pete Hunt">This is one comment</Comment>
        <Comment author="Jordan Walke">This is *another* comment</Comment>
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

class Comment extends React.Component {
  render () {
    return (
      <div className="comment-box__comment">
        <h2 className="comment-box__author">
          {this.props.author}
        </h2>
        {marked(this.props.children.toString())}
      </div>
    )
  }
}

ReactDOM.render(
  <CommentBox />,
  document.getElementById('root')
)
