import React from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
// import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
 
class Image_Upload extends React.Component {
  
  state =  {
    selectedFile: null,
    imagePreviewUrl: null
  };
 
  fileChangedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
 
    let reader = new FileReader();
     
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      });
    }
 
    reader.readAsDataURL(event.target.files[0])
 
  }
 
  submit = () => {
 
    var fd = new FormData();
 
    fd.append('file', this.state.selectedFile);
 
    var request = new XMLHttpRequest();
 
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        alert('Uploaded!');
      }
    };
    request.open("POST", "https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload", true);
    request.send(fd);
  }
 
  render() {
 
    let $imagePreview = (<div className="previewText image-container">Please select an Image for Preview</div>);
    if (this.state.imagePreviewUrl) {
      $imagePreview = (<div className="image-container" ><img src={this.state.imagePreviewUrl} alt="icon" width="200" /> </div>);
    }
 
    return (
      <div className="Image_Upload">
	      	<input type="file" name="avatar" onChange={this.fileChangedHandler} />
	         <button type="button" onClick={this.submit} > Upload </button>
	         { $imagePreview }
      </div>
    );
  }
}
 
export default Image_Upload;