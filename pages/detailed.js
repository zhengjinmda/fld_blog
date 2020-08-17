import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Advert from '../components/Advert'
import Author from '../components/Author'
import Footer from '../components/Footer'
import { Row, Col, Breadcrumb, Affix } from 'antd'
import { StarTwoTone, FireTwoTone, TagsTwoTone, HomeOutlined, ProfileOutlined, VideoCameraAddOutlined } from '@ant-design/icons'
import axios from 'axios'
import '../public/style/pages/detailed.css'
import Tocify from '../components/tocify.tsx'

//后端接口
import  servicePath  from '../config/apiUrl'

//代码高亮模块
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

const Detailed = (props) => {
  const tocify = new Tocify()
  const renderer = new marked.Renderer()

  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  }

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });

  let html = marked(props.article_content)


  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className='comm-main' type='flex' justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className='bread-div'>
              <Breadcrumb>
                <Breadcrumb.Item href='/'><HomeOutlined />首页</Breadcrumb.Item>
                <Breadcrumb.Item href='/list'><VideoCameraAddOutlined />日常学习</Breadcrumb.Item>
                <Breadcrumb.Item ><ProfileOutlined />xxxx</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div >
              <div className='detailed-title'>
                React实战
              </div>
              <div className='list-icon center'>
                <span><StarTwoTone /> 2020-6-21 </span>
                <span><TagsTwoTone /> 视频教程 </span>
                <span><FireTwoTone /> 2020人 </span>
              </div>
              <div className="detailed-content" dangerouslySetInnerHTML={{ __html: html }}></div>
            </div>
          </div>
        </Col>
        <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className='detailed-nav comm-box'>
              <div className='nav-title'>文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </>
  )
}

Detailed.getInitialProps = async (context) => {

  let id = context.query.id
  const promise = new Promise((resolve) => {

    axios(servicePath.getArticleById+id).then(
      (res) => {
        console.log(res)
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}

export default Detailed