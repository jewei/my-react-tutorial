import React, { Component } from 'react'
import ReactDOM from 'react-dom'
const marked = require('marked')
const $ = require ('jquery')

class CommentBox extends Component {
  constructor(props) {
    super(props)
    this.state = {data: []}
  }

  loadCommentsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: (data) => {
        this.setState({data})
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString())
      },
    })
  }

  componentDidMount() {
    this.loadCommentsFromServer()
    setInterval(this.loadCommentsFromServer(), this.props.pollInterval)
  }

  handleCommentSubmit(comment) {
    let comments = this.state.data
    // Optimistically set an id on the new comment. It will be replaced by an
    // id generated by the server. In a production application you would likely
    // not use Date.now() for this and would have a more robust system in place.
    comment.id = Date.now()
    let data = [...comments, comment]
    this.setState({ data })

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: (data) => {
        this.setState({data})
      },
      error: (xhr, status, err) => {
        this.setState({data: comments})
        console.error(this.props.url, status, err.toString())
      }
    })
  }

  render() {
    return (
      <div className="comment-box">
        <h1 className="comment-box__title">Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={::this.handleCommentSubmit} />
      </div>
    )
  }
}

const CommentList = (props) => (
  <div className="comment-box__list">
    { props.data.map(comment => <Comment key={comment.id} author={comment.author} text={comment.text} />) }
  </div>
)

class CommentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {author: '', text: ''}
  }

  handleAuthorChange(e) {
    this.setState({author: e.target.value})
  }

  handleTextChange(e) {
    this.setState({text: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    let author = this.state.author.trim()
    let text = this.state.text.trim()
    if (!text || !author) {
      return
    }
    this.props.onCommentSubmit({ author, text })
    this.setState({author: '', text: ''})
  }

  render () {
    return (
      <form className="comment-box__form" onSubmit={::this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={::this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={::this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    )
  }
}

const Comment = (props) => (
  <div className="comment-box__comment">
    <h2 className="comment-box__author">
      {props.author}
    </h2>
    <span dangerouslySetInnerHTML={{ __html: marked(props.text.toString(), {sanitise: true}) }} />
  </div>
)

ReactDOM.render(
  <CommentBox url="/api/comments" />,
  document.getElementById('root')
)
