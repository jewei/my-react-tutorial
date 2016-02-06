import React from 'react'
import ReactDOM from 'react-dom'
const marked = require('marked')

class CommentBox extends React.Component {
  render() {
    return (
      <div className="comment-box">
        <h1 className="comment-box__title">Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm />
      </div>
    )
  }
}

class CommentList extends React.Component {
  render () {
    let commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      )
    })

    return (
      <div className="comment-box__list">
        {commentNodes}
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
  rawMarkup () {
    let rawMarkup = marked(this.props.children.toString(), {sanitise: true})
    return { __html: rawMarkup }
  }

  render () {
    return (
      <div className="comment-box__comment">
        <h2 className="comment-box__author">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    )
  }
}

const data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
]

ReactDOM.render(
  <CommentBox data={data} />,
  document.getElementById('root')
)
