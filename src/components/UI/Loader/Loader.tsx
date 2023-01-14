import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

import './Loader.scss'

const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />

const Loader: React.FC = () => <Spin indicator={antIcon} />

export default Loader
