var React = require('react');

class UnsubscribeMessage extends React.Component {
  render() {
    const { message } = this.props;

    return <div>
      <center>
        <h1>{message}</h1>
      </center>
    </div>;
  }
}

module.exports = UnsubscribeMessage;