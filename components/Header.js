import React, { useState, useEffect } from 'react'
import '../public/style/components/header.css'
import { Row, Col, Menu } from 'antd'
import Link from 'next/link'
import Router from 'next/router'
import servicePath from '../config/apiUrl'
import axios from 'axios'
import { HomeOutlined } from '@ant-design/icons'
import * as Icon from '@ant-design/icons';

const Header = () => {

    const [navArray, setNavArray] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo).then(
                (res) => {
                    setNavArray(res.data.data)
                    return res.data.data
                }
            )
            setNavArray(result)
        }
        fetchData()
    }, [])

    //跳转页面
    const handleClick = (e) => {
        if (e.key === "0") {
            Router.push('/index')
        } else {
            Router.push('/list?id=' + e.key)
        }
    }

    return (
        <div className="header">
            <Row type="flex" justify="center" >
                <Col xxs={24} sm={24} md={6} lg={8} xl={10}>
                    <span className="header-logo">FLD君</span>
                    <span className="header-txt">家里蹲无聊瞎折腾的博客。</span>
                </Col>

                <Col className="memu-div" xs={0} sm={0} md={16} lg={10} xl={8}>
                    <Menu mode="horizontal" onClick={handleClick} defaultSelectedKeys="0">
                        <Menu.Item key="0">
                            <HomeOutlined />
                            首页
                    </Menu.Item>
                        {
                            navArray.map(item => {
                                return (
                                    <Menu.Item key={item.Id}>
                                        {
                                            React.createElement(
                                                Icon[item.icon])
                                        }
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}


export default Header