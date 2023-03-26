import React, { useEffect, useRef, useState } from 'react';
import {
  Breadcrumb, Button, Card, Form, Input, message, Modal, Radio, Select, Space, Upload,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Publish.module.scss';

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useStore } from "@/store/Store";
import { observer } from "mobx-react-lite";
import { http } from "@/utils";

const { Option } = Select;


function Publish () {
  const { channelStore } = useStore()

  // 存储上传图片的列表
  const [fileList, setFileList] = useState([])


  // 暂存图片列表
  // 实现步骤：
  // 1.通过useRef创建一个暂存仓库，当图片上传完毕时，把图片列表存到仓库中；
  // 2.若是单图模式，就从仓库中取第一张图片，以数组的形式存入fileList；
  // 3.若是三图模式，就从仓库中取所有的图片，以数组的形式存入fileList；

  const imgListStore = useRef()

  // 上传图片事件
  const onUploadChange = ({ fileList }) => {
    console.log('Upload', fileList)
    setFileList(fileList)
    // 当图片上传完毕时，把图片列表存到仓库中
    imgListStore.current = fileList
  }

  // 控制封面图片张数
  const [imgNum, setImgNum] = useState(1)
  const radioChange = (e) => {
    console.log(e.target.value)
    const rawValue = e.target.value
    setImgNum(rawValue)

    // 从仓库中取对应的图片数量，来渲染图片列表的fileList
    if (!!!imgListStore.current) return

    if (rawValue === 1) {
      const singleImg = imgListStore.current ? imgListStore.current[0] : []
      setFileList([singleImg])
    } else if (rawValue === 3) {
      setFileList([imgListStore.current])
    }
  }


  // 收集表单数据，提交接口
  const navigate = useNavigate()
  const publishArticle = async (value) => {
    console.log('0', value)
    // 解构出需要传的参数
    const { channel_id, content, title, type } = value

    // 整合需要传的参数
    const params = {
      channel_id,
      content,
      title,
      type,
      // 后端需要的该参数需要做二次处理，才能传到后端
      cover: {
        type: type,
        images: fileList.map(item => item.response?.data.url || item.url)
      }
    }

    console.log('params', params)

    // 请求接口，提交表单(判断是更新提交还是发布提交)
    if (id) {
      // 有id为更新提交
      await http.put(`/mp/articles/${id}?draft=false`, params)
    } else {
      // 否则发布提交
      await http.post('/mp/articles?draft=false', params)
    }

    // 跳转列表并提示用户
    navigate('/article')
    message.success(`${id ? '更新' : '发布'}文章成功`)
  }


  // 编辑功能
  // 文案适配，通过路由参数id，判断是发布还是编辑
  // 获取路由参数id
  const [params] = useSearchParams()
  const id = params.get('id')

  // 数据回填，通过id调用接口(需要回填的数据：1.表单回填 2.upload组件fileList回填 3.图片暂存列表回填)
  // 获取Form实例对象
  const form = useRef(null)
  useEffect(() => {
    // 根据id从接口获取表单数据
    const loadDetails = async () => {
      const res = await http.get(`/mp/articles/${id}`)
      console.log(res.data)
      const data = res.data
      // 1.回填表单用Form中的setFieldsValue方法(先获取Form实例对象来调用该方法)
      // console.log('111', form.current)
      //此时表单数据回填成功，还需要单独处理上传图片的回填
      form.current.setFieldsValue({ ...data, type: data.cover.type })

      // 2.调用setFileList方法回填upload(把获取的图片数据处理成需要的格式)
      const imgUrl = data.cover.images.map(item => {
        return {
          url: item
        }
      })
      setFileList(imgUrl)

      // 3.图片暂存列表回填
      imgListStore.current = imgUrl
    }

    // 必须有id才能请求接口
    if (id) {
      loadDetails()
    }
  }, [])



  return (
    <div className={styles['articlePublish']}>
      <Card
        title={
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item> {id ? '编辑' : '发布'}文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          size="large"
          labelCol={{ span: 4 }}
          initialValues={{
            type: 1,
            title: '',
            content: '',
          }}
          onFinish={publishArticle}
          ref={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 500 }} />
          </Form.Item>

          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择频道' }]}
          >
            <Select value={undefined} placeholder="请选择文章频道" style={{ width: 300 }}>
              {channelStore.channelInfo.map(item =>
                <Option value={item.id} key={item.id}>{item.name}</Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={(e) => { radioChange(e) }}>
                <Radio value={0}>无图</Radio>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item>
              {/* 图片上传组件 */}
              {imgNum > 0 && <Upload
                listType="picture-card"
                name="image"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                // 控制是否支持多张图片上传
                multiple={imgNum > 1 ? true : false}
                // 控制能上传的最大图片数量
                maxCount={imgNum}
              ><PlusOutlined /></Upload>}

              {/* 预览 */}
              <Modal
                visible=''
                title="图片预览"
                footer={null}
              // onCancel={}
              >
                <img alt="example" style={{ width: '100%' }} src='' />
              </Modal>
            </Form.Item>
          </Form.Item>

          <Form.Item
            label="内容"
            name="content"
            rules={[
              { required: true, message: '请输入文章内容' },
              {
                message: '请输入文章内容',
                validator: (_, value) => {
                  if (value === '<p><br></p>') {
                    return Promise.reject(new Error('请输入文章内容'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            {/* 渲染富文本 */}
            <ReactQuill theme="snow" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                {id ? '更新' : '发布'}文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default observer(Publish)
