import { Avatar, Divider } from 'antd'
import { QqOutlined, WechatOutlined, GithubOutlined } from '@ant-design/icons'
import '../public/style/components/author.css'

const Author = () => {
    return(
        <div className="author-div comm-box">
            <div>
                <Avatar size={100} src="https://i2.hdslb.com/bfs/face/4c6e3e5bae71b1c5417887dc792393240872c45b.jpg@150w_150h.jpg"  />
            </div>
            <div className='author-introduction'>
                毕业生
                <Divider>社交账号</Divider>
                <Avatar size={28} icon={<QqOutlined />} className='account' />
                <Avatar size={28} icon={<WechatOutlined />} className='account' />
                <Avatar size={28} icon={<GithubOutlined />} className='account' />
            </div>
        </div>
    )
}

export default Author