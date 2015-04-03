var Constants = require('../constants/constants.js');

var PostBody = React.createClass({

  componentDidMount: function() {
    $('pre').each(function() {
      $(this).addClass('prettyprint');
    });

    $('.ExampleBox').append('<script src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js"></script>');
  },

  componentDidUpdate: function() {
    $('pre').each(function() {
      $(this).addClass('prettyprint');
    });

    $('.ExampleBox').append('<script src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js"></script>');
  },

  render: function(){

    if(this.props.type === Constants.EXAMPLE) {
      return (
        <div className="PostBody">
          <pre className="small"><code>{this.props.text}</code></pre>
        </div>
      );
    } else {
      return (
        <div className="PostBody">
          <p className="small">{this.props.text}</p>
        </div>
      );
    }
  }
});

module.exports = PostBody;
