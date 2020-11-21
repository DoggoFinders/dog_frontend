import React from "react";
import ImageUpload from "../ImageUpload";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";

const Landing = (props) => {
  return (
    <Layout>
      <Header></Header>
      <Content>
        <ImageUpload />
      </Content>
      <Footer></Footer>
    </Layout>
  );
};

Landing.propTypes = {};

export default Landing;
