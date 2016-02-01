import React from 'react'
import ReactDOM from 'react-dom'

class CommentBox extends React.Component {
  render() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
}

ReactDOM.render(
  <CommentBox />,
  document.getElementById('root')
)
