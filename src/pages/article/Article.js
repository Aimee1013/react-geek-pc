import { Breadcrumb, Button, Card, DatePicker, Form, Modal, Radio, Select, Table, Tag } from 'antd';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { http } from "@/utils/http";
import img404 from '@/assets/img404.png'

import { EditOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';

import { useStore } from '@/store/Store'
import { observer } from "mobx-react-lite";

const { RangePicker } = DatePicker;
const { Option } = Select;
const { confirm } = Modal;

function Article () {

  // 获取频道列表
  const { channelStore } = useStore()


  // 获取文章列表
  // 1.管理文章列表
  const [articleList, setArticleList] = useState({
    list: [],
    count: 0
  })

  // 2.管理文章参数
  const [params, setParams] = useState({
    page: 1,
    per_page: 10
  })

  // 3.向接口发送请求


  useEffect(() => {
    const getList = async () => {
      const res = await http.get('/mp/articles', { params })
      console.log('getList', res.data)
      const { results, total_count } = res.data

      setArticleList({
        list: results,
        count: total_count
      })
    }
    getList()
  }, [params])


  // 筛选功能
  const onSearch = (values) => {
    console.log(values)

    // 处理数据
    const { status, channel_id, date } = values
    const SearchParams = {}
    if (status !== -1) {
      // status!==-1 说明状态不是全选
      SearchParams.status = status
    }

    if (channel_id) {
      SearchParams.channel_id = channel_id
    }

    if (date) {
      SearchParams.begin_pubdate = date[0].format('YYYY-MM-DD')
      SearchParams.end_pubdate = date[1].format('YYYY-MM-DD')
    }

    // 修改params数据，引起getList()接口的重新发送，让params的新老数据做展开合并
    setParams({ ...params, ...SearchParams })
  }

  // 切换第几页
  const onChangePage = (page) => {
    setParams({ ...params, page })
  }

  // 删除提示
  const showConfirm = (item) => {
    confirm({
      title: '你确定要删除吗？',
      icon: <ExclamationCircleFilled />,
      onOk () {
        deleteArticle(item)
      },
      onCancel () {
        console.log('Cancel')
      },
    });
  };

  // 删除文章
  const deleteArticle = async (item) => {
    console.log(item)
    await http.delete(`/mp/articles/${item.id}`)
    // 删除后重新刷新列表，页码停留在第一页
    setParams({ ...params, page: 1 })
  }

  // 编辑文章
  const navigate = useNavigate()

  const editArticle = (item) => {
    console.log('edit', item)
    navigate(`/publish?id=${item.id}`)
  }


  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      render: (cover) => {
        return <img src={cover.images[0] || img404} width={150} height={100} />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 350
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status) => {
        const statusList = ['草稿', '待审核', '审核通过', '审核失败']
        const statusColor = ['blue', 'yellow', 'green', 'red']
        return <Tag color={statusColor[status]}>{statusList[status]}</Tag>
      }
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
      key: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
      key: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
      key: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
      key: 'like_count'
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => { editArticle(item) }}
          />

          <Button
            type="primary"
            shape="circle" danger
            icon={<DeleteOutlined />}
            onClick={() => { showConfirm(item) }} />
        </div>
      }
    }
  ]

  return (
    <div>
      <Card title={
        <Breadcrumb>
          <Breadcrumb.Item><Link to='/'>首页</Link></Breadcrumb.Item>
          <Breadcrumb.Item>内容管理</Breadcrumb.Item>
        </Breadcrumb>
      } bordered={false} >

        <Form
          name="basic"
          autoComplete="off"
          onFinish={onSearch}
          initialValues={{ status: -1 }}
        >
          <Form.Item
            label="状态"
            name="status">
            <Radio.Group >
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            {/* <Channel style={{ width: 200 }}></Channel> */}
            <Select style={{ width: '120px' }}>
              {
                channelStore.channelInfo.map(item =>
                  <Option value={item.id} key={item.id}>{item.name}</Option>)
              }
            </Select>
          </Form.Item>

          <Form.Item name='date' label='日期'>
            <RangePicker />
          </Form.Item>


          <Form.Item >
            <Button type="primary" htmlType="submit">
              筛选
            </Button>
          </Form.Item>
        </Form>

        {/* 总页数 */}
        <Card title={`根据筛选条件共查询到${articleList.count}条结果:`}>
          <Table
            columns={columns}
            dataSource={articleList.list}
            pagination={
              {
                pageSize: params.per_page,
                total: articleList.count,
                onChange: onChangePage
              }
            }
            rowKey={item => item.id}
          />
        </Card>

      </Card>
    </div >
  );
}

export default observer(Article)