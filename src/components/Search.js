import React from "react";

class Search extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
    this._onChangeHandler = this._onChangeHandler.bind(this);
    this._onHandleSubmit = this._onHandleSubmit.bind(this);
  }

  _onChangeHandler(ev) {
    this.setState({
      input: ev.target.value
    });
  }

  _onHandleSubmit(ev) {
    console.log(this.state.input);
    ev.preventDefault();
    this.props.onSubmit(this.state.input);
  }

  render() {
    return (
    <form className="search-form" onSubmit={this._onHandleSubmit}>
      <label className="search-label">
        github.com/
        <input className="search-input" type="text" value={this.state.input} onChange={this._onChangeHandler} />
      </label>
      <input className="search-submit" type="submit" value="Submit" />
    </form>
    )
  }
}

export default Search;
