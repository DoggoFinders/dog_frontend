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
 
  submit = async () => {
    var fd = new FormData();
    fd.append('image', this.state.selectedFile);
    const result = await fetch("https://c11c52db807a.ngrok.io/api/infer", {
      method: "POST",
      body: fd,
    });
    const data = await result.json();
    console.log(data);
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