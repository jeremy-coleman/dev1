import CodeMirror from '@skidding/react-codemirror';
import PropTypes from 'prop-types';
import React from 'react';



type HistoryItemProps = {
      cell: {
      id?: any,
      content: string,
      display: boolean,
      lastRan: any,
      cellType?: any,
      },
      display?: boolean,
      id?: any
}

export default class HistoryItem extends React.Component<HistoryItemProps, any> {
  // static propTypes = {
  //   cell: PropTypes.shape({
  //     // id: PropTypes.number.isRequired,
  //     content: PropTypes.string,
  //     display: PropTypes.bool,
  //     lastRan: PropTypes.instanceOf(Date),
  //   }).isRequired,
  // }

  render() {
    const options = {
      lineNumbers: true,
      readOnly: true,
      mode: this.props.cell.cellType,
      theme: 'eclipse',
    }
    const mainElem = (<CodeMirror
      ref="editor" // eslint-disable-line
      value={this.props.cell.content}
      options={options}
    />)

    return (
      <div
        id={`cell-${this.props.cell.id}`}
        className={`cell-container ${this.props.display ? '' : 'hidden-cell'}`}
      >
        <div className="cell history-cell">
          <div className="history-content editor">{mainElem}</div>
          <div className="history-date">{this.props.cell.lastRan.toUTCString()}</div>
        </div>
        <div className="cell-controls" />
      </div>
    )
  }
}
