import React from 'react';
import ReactDOM from 'react-dom';
import './Filter.scss';

import DropdownTreeSelect from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {blue: false};
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    if (node instanceof HTMLElement) {
      const child = node.querySelector('.search');
      child.parentNode.innerText = this.props.config.placeholder;
    }
  }


  onFocus(event) {
    this.setState({blue: !this.state.blue});
  }
  onBlur(event) {
    this.setState({blue: !this.state.blue});
  }
  onChange(currentNode, selectedNodes) {
    this.setState({blue: false});
    this.props.config.onChange(currentNode, selectedNodes);
  }

  render() {
    const { config } = this.props;
    const options = config.options || [];
    const className = this.state.blue ? "filter clicked " + config.className : "filter " + config.className;
    return (<DropdownTreeSelect className={className} onFocus={this.onFocus} onBlur={this.onBlur} disabled={config.disabledFilter} onChange={(currentNode, selectedNodes) => this.onChange(currentNode, selectedNodes)} radioSelect={true} clearSearchOnChange={true} data={options} />);
  }
}

export default Filter;