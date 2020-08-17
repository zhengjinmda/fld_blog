import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Advert from '../components/Advert'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import { Row, Col, List, Breadcrumb } from 'antd'
import { StarTwoTone, FireTwoTone, TagsTwoTone, HomeOutlined, VideoCameraAddOutlined } from '@ant-design/icons'
import axios from 'axios'
import Link from 'next/link'
import servicePath from '../config/apiUrl'

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

const MyList = (list) => {
  const [mylist, setMylist] = useState(list.data)

  useEffect(() => {
    setMylist(list.data)
  })

  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize: false,
    xhtml: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });
  
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className='comm-main' type='flex' justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className='bread-div'>
            <Breadcrumb>
              <Breadcrumb.Item href='/'><HomeOutlined /> 首页</Breadcrumb.Item>
              <Breadcrumb.Item ><VideoCameraAddOutlined /> 博客列表</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div>
            <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                    <a>{item.title}</a>
                  </Link>
                  <div className='list-icon'>
                    <span><StarTwoTone />{item.addTime}</span>
                    <span><TagsTwoTone />{item.typeName}</span>
                    <span><FireTwoTone />{item.view_count}人</span>
                  </div>
                  <div className='list-context' dangerouslySetInnerHTML={{__html: item.introduce}}></div>
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </>
  )
}

MyList.getInitialProps = async content => {
  let id = content.query.id
  const promise = new Promise(resolve => {
    axios(servicePath.getListById + id).then(res => {
      resolve(res.data)
    })
  })

  return promise
}

export default MyList