import React from 'react'
import ReactDOM from 'react-dom'

class CommentBox extends React.Component {
  render() {
    return (
      <div className="comment-box">
        <h1>Comments</h1>
        <CommentList />
        <CommentForm />
      </div>
    )
  }
}

class CommentList extends React.Component {
  render () {
    return (
      <div className="comment-list">
        Hello, world! I am a Commentlist.
      </div>
    )
  }
}

class CommentForm extends React.Component {
  render () {
    return (
      <div className="comment-form">
        Hello, world! I am a Commentform.
      </div>
    )
  }
}

ReactDOM.render(
  <CommentBox />,
  document.getElementById('root')
)
