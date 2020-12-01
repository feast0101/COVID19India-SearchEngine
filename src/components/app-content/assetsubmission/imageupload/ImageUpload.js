import React from 'react';
import './ImageUpload.scss';
import convertBytesToSize from './convertBytesToSize';
import DeleteIcon from '../../../../assets/images/icon-post-delete.svg';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: props.imageSrc || '',
      fileSizeError: '',
      fileExtError: false,
      fileName: '',
      fileSize: ''
    };
    this.onFileChange = this.onFileChange.bind(this);
    this.onImageDelete = this.onImageDelete.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.imageSrc) {
       this.setState({imageSrc: newProps.imageSrc})
    }
  }

  onFileChange(e) {
    const file = e.target.files[0];
    const { accept, maxSize, handleFileUpload } = this.props;
    this.setState({ fileExtError: false, fileSizeError: '', imageSrc: '', fileName: '', fileSize: '' });

    if (file && file.name) {
      const fileExt = file.name.split('.').pop().toLowerCase();
      if (!accept.includes(fileExt)) {
        this.setState({
          fileExtError: true
        });
      } else if (file.size > maxSize * 1000000) {
        this.setState({
          fileSizeError: `Max size allowed ${maxSize}MB`
        });
      } else {
        const fileSize = convertBytesToSize(file.size);
        this.setState({
          imageSrc: URL.createObjectURL(file),
          fileName: file.name,
          fileSize
        });
        //console.log(file)
        handleFileUpload(file);
      }
    }
  }

  onImageDelete(event) {
    this.setState({ imageSrc: '', fileName: '', fileSize: '' });
    this.props.handleFileUpload(null);
    event.preventDefault();
  }

  render() {
    const { accept, extnErrMsg, maxSize, isMandatory } = this.props;
    const { imageSrc, fileSizeError, fileName, fileSize, fileExtError } = this.state;
    const fileExtension = fileName.split('.').pop();
    const fileOnlyName = fileName.split('.').splice(0, fileName.split('.').length - 1).join('.');
    return (
      <div className='img-upload-container'>
        <div className='uploader'>
          <label htmlFor='imgUpload'>
            {
              imageSrc &&
              <div>
                <img src={imageSrc} className='loaded' alt='' />
                <button className='img-icon-delete-logo' >
                  <img src={DeleteIcon} alt="Smiley face" onClick={this.onImageDelete}></img>
                </button>
              </div>
            }
            <input
              type='file'
              id='imgUpload'
              accept={accept}
              onChange={this.onFileChange}
              onClick={(e) => { e.target.value = null; }}
            />
            {
              !imageSrc &&
              <div className='upload-an-image'>
                <div className='upload-icon' />
                Click to upload your logo
              </div>
            }
          </label>
          {/*
            fileName &&
            <div className='img-description'>
              <div className='file-name'>
                <div>{fileOnlyName}</div>.{fileExtension}
              </div>
              <div className='file-size'>{fileSize}</div>
            </div>
          */}
          {fileExtError && <div className='error'>{extnErrMsg}</div>}
          {fileSizeError !== '' && <div className='error'>{fileSizeError}</div>}
        </div>
        <div className={`upload-suggestion ${fileExtError ? 'upload-error' : ''}`}>
          What should I upload?
          <ul>
            <li>{maxSize}MB maximum file size</li>
            <li>{accept.replace(/\./gi, ' ').trim().replace(/,(?=[^,]*$)/, ' or')}</li>
            <li>Recommended at least 280px width</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ImageUpload;