/* eslint-disable prettier/prettier */
import React, { FC, useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { connect, useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../../redux/root-reduser'
import { switchPage as paginationCount } from '../../../redux/actions'
import { GetActionTypes } from '../../../redux/actions-type'
import './Pagination.scss'

interface PaginationType {
  totalItems: number
}
const PaginationList: FC<PaginationType> = ({ totalItems }) => {
  const dispatch = useDispatch()
  const [current, setCurrent] = useState(1)
  const onChange = (page: number) => {
    dispatch({ type: GetActionTypes.PAGINATION, offset: page * 5 - 5 })
    setCurrent(page)
  }
  return (
    <>
      <Pagination showSizeChanger={false} current={current} total={totalItems} onChange={onChange} />
    </>
  )
}
const mapStatetoProps = (state: RootState) => {
  return { state }
}
const mapDispatchToProps = {
  switchPage: paginationCount
}
export default connect(mapStatetoProps, mapDispatchToProps)(PaginationList)
