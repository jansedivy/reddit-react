var React = require('react');
var { Link } = require('react-router');
var classnames = require('classnames');

var PureRenderMixin = React.addons.PureRenderMixin;

var FavoriteItem = React.createClass({
  mixins: [PureRenderMixin],

  getInitialState() {
    return {
      translation: 0,
      startX: null,
      startY: null,
      prevX: null,
      prevY: null,
      dx: 0,
      dy: 0,
      holding: true,
      prevent: false,
      scrolling: false,
      open: false,
      animate: true
    };
  },

  handleTouchStart(e) {
    var touch = e.touches[0];
    var x = touch.pageX - e.target.offsetLeft;
    var y = touch.pageY - e.target.offsetTop;

    this.setState({
      animate: false,
      startX: x,
      startY: y,
      prevX: x,
      prevY: y,
      holding: true,
      prevent: false,
      scrolling: false,
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

    if (this.state.dx > 25) {
      this.setState({
        open: true
      });
    }

    this.setState({
      animate: true,
      scrolling: false,
      prevent: false,
      holding: false,
      translation: 0
    });
  },

  handleTouchMove(e) {
    if (!this.state.scrolling && this.state.holding) {
      var touch = e.touches[0];
      var x = touch.pageX - e.target.offsetLeft;
      var y = touch.pageY - e.target.offsetTop;

      var dx = x - this.state.prevX;
      var dy = y - this.state.prevY;

      var relX = x - this.state.startX;
      var relY = y - this.state.startY;

      if (relX < 0) {
        relX = 0;
      }

      if (!this.state.prevent) {
        if (Math.abs(relY) > 6) {
          this.setState({
            scrolling: true
          });
        }

        if (Math.abs(relX) > 4) {
          this.setState({
            prevent: true
          });
        }
      }

      if (this.state.prevent) {
        e.preventDefault();

        this.setState({
          translation: relX
        });
      }

      this.setState({
        prevX: x,
        prevY: y,
        dx: dx,
        dy: dy
      });
    }
  },

  handleBehindTouchStart(e) {
    if (this.state.open) {
      var touch = e.touches[0];
      var x = touch.pageX - e.target.offsetLeft;
      var y = touch.pageY - e.target.offsetTop;

      this.setState({
        behindStartX: x,
        behindStartY: y
      });
    }
  },

  handleBehindTouchMove(e) {
    if (this.state.open && !this.state.scrolling) {
      var touch = e.touches[0];
      var x = touch.pageX - e.target.offsetLeft;
      var y = touch.pageY - e.target.offsetTop;

      var dx = x - this.state.behindStartX;
      var dy = y - this.state.behindStartY;

      if (this.state.prevent) {
        e.preventDefault();
      }

      if (Math.abs(dy) > 20) {
        this.setState({
          scrolling: true
        });
      } else if (dx < -40) {
        this.close();

        this.setState({
          prevent: true
        });

        e.preventDefault();
      }
    }
  },

  handleBehindTouchEnd() {
    this.setState({
      prevent: false,
      scrolling: false
    });
  },

  close() {
    this.setState({
      translation: 0,
      startX: null,
      startY: null,
      prevX: null,
      prevY: null,
      dx: 0,
      dy: 0,
      holding: true,
      prevent: false,
      scrolling: false,
      open: false,
      animate: true,

      behindStartX: 0,
      behindStartY: 0
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
