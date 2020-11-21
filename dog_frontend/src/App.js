import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
// import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
import { Layout } from 'antd';
import Image_Upload from './Components/upload_image.js';

const { Header, Footer, Sider, Content } = Layout;
 
class App extends Component {
  render() { 
    return (
      <div className="App">
      	<Layout>
	      <Header></Header>
	      <Content>
	      	<Image_Upload />
	      </Content>
	      <Footer></Footer>
	    </Layout>
      </div>
    );
  }
}
 
export default App;