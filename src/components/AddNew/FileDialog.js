import React from 'react';

function buildFileSelector() {
  const fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');
  fileSelector.setAttribute('multiple', 'multiple');
  return fileSelector;
}

class FileDialogue extends React.Component {
  componentDidMount() {
    this.fileSelector = buildFileSelector();
  }

  handleFileSelect = e => {
    e.preventDefault();
    this.fileSelector.click();
  };

  render() {
    return (
      <button
        type="button"
        onClick={this.handleFileSelect}
        style={{ width: '100px' }}
      >
        Select files
      </button>
    );
  }
}

export default FileDialogue;
