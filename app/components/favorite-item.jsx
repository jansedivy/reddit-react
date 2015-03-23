var React = require('react');
var { Link } = require('react-router');
var classnames = require('classnames');

var PureRenderMixin = React.addons.PureRenderMixin;

var FavoriteItem = React.createClass({
  mixins: [PureRenderMixin],

  getInitialState() {
    this.startX = null;
    this.startY = null;
    this.prevX = null;
    this.prevY = null;
    this.dx = 0;
    this.dy = 0;
    this.holding = true;
    this.prevent = false;
    this.scrolling = false;

    return {
      translation: 0,
      open: false,
      animate: true
    };
  },

  handleTouchStart(e) {
    var touch = e.touches[0];
    var x = touch.pageX - e.target.offsetLeft;
    var y = touch.pageY - e.target.offsetTop;

    this.startX = x;
    this.startY = y;
    this.prevX = x;
    this.prevY = y;
    this.holding = true;
    this.prevent = false;
    this.scrolling = false;

    this.setState({
      animate: false,
      translation: 0
    });
  },

  handleTouchEnd() {
    var width = React.findDOMNode(this).offsetWidth;

    if (this.state.translation/width > 0.5) {
      this.setState({
        open: true
      });
    }

    if (this.dx > 25) {
      this.setState({
        open: true
      });
    }

    this.scrolling = false;
    this.prevent = false;
    this.holding = false;

    this.setState({
      animate: true,
      translation: 0
    });
  },

  handleTouchMove(e) {
    if (!this.scrolling && this.holding) {
      var touch = e.touches[0];
      var x = touch.pageX - e.target.offsetLeft;
      var y = touch.pageY - e.target.offsetTop;

      var dx = x - this.prevX;
      var dy = y - this.prevY;

      var relX = x - this.startX;
      var relY = y - this.startY;

      if (relX < 0) {
        relX = 0;
      }

      if (!this.prevent) {
        if (Math.abs(relY) > 6) {
          this.scrolling = true;
        }

        if (Math.abs(relX) > 4) {
          this.prevent = true;
        }
      }

      if (this.prevent) {
        e.preventDefault();

        this.setState({
          translation: relX
        });
      }

      this.prevX = x;
      this.prevY = y;
      this.dx = dx;
      this.dy = dy;
    }
  },

  handleBehindTouchStart(e) {
    if (this.state.open) {
      var touch = e.touches[0];
      var x = touch.pageX - e.target.offsetLeft;
      var y = touch.pageY - e.target.offsetTop;

      this.behindStartX = x;
      this.behindStartY = y;
    }
  },

  handleBehindTouchMove(e) {
    if (this.state.open && !this.scrolling) {
      var touch = e.touches[0];
      var x = touch.pageX - e.target.offsetLeft;
      var y = touch.pageY - e.target.offsetTop;

      var dx = x - this.behindStartX;
      var dy = y - this.behindStartY;

      if (this.prevent) {
        e.preventDefault();
      }

      if (Math.abs(dy) > 20) {
        this.scrolling = true;
      } else if (dx < -40) {
        this.close();

        this.prevent = true;

        e.preventDefault();
      }
    }
  },

  handleBehindTouchEnd() {
    this.prevent = false;
    this.scrolling = false;
  },

  close() {
    this.startX = null;
    this.startY = null;
    this.prevX = null;
    this.prevY = null;
    this.dx = 0;
    this.dy = 0;
    this.holding = true;
    this.prevent = false;
    this.scrolling = false;
    this.behindStartX = 0;
    this.behindStartY = 0;

    this.setState({
      translation: 0,
      open: false,
      animate: true
    });
  },

  remove() {
    this.props.onRemove(this.props.item.name);
    this.close();
  },

  render() {
    var style = {
      '-webkit-transform': 'translateX(' + (this.state.open ? '100%' : this.state.translation + 'px') + ')'
    };

    return (
      <li className="favorite-item">
        <div style={style} className={classnames('list-item-inside', { 'animate': this.state.animate })} onTouchEnd={this.handleTouchEnd} onTouchMove={this.handleTouchMove} onTouchStart={this.handleTouchStart}>
          <Link to="subreddit" params={this.props.item}>{this.props.item.name}</Link>
        </div>
        <div onTouchEnd={this.handleBehindTouchEnd} onTouchMove={this.handleBehindTouchMove} onTouchStart={this.handleBehindTouchStart} className="list-item-behind">
          <a href="#" onClick={this.remove}>Remove</a>
        </div>
      </li>
    );
  }
});

module.exports = FavoriteItem;
