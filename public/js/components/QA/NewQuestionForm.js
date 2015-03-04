var QuestionForm = React.createClass({
  submitQuestion: function(e){
    e.preventDefault();
    var text = this.refs.text.getDOMNode().value.trim();
    var title = this.refs.title.getDOMNode().value.trim();
    this.refs.title.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
    this.props.onQuestionSubmit(title, text);
  },

  render: function() {
    return(
      <form className="questionForm" onSubmit={this.submitQuestion}>
        Title: <input type="text" placeholder="Title" ref="title" />
        Text: <input type="text" placeholder="Body" ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
})

module.exports = QuestionForm;