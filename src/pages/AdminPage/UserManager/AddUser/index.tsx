import React from 'react';
import {Card, Col, Row, Space} from "antd";
import {
  PageContainer,
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea
} from "@ant-design/pro-components";
import {insertUserAccount} from "@/services/admin";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 10,
  }
};

const AddUser: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <ProForm
          key="form"
          layout='horizontal'
          {...formItemLayout}
          onFinish={insertUserAccount}
          submitter={{
            render: (props, dom) => {
              return (
                <Row>
                  <Col span={10} offset={9}>
                    <Space>{dom}</Space>
                  </Col>
                </Row>
              )
            },
          }}
        >
          <ProFormText name="username" label="用户名" rules={[{required: true}]}/>
          <ProFormText.Password name="password"
                                label="密码"
                                placeholder="密码长度为6-18位字符"
                                allowClear
                                rules={[{required: true}, {pattern: /^(?=.*[A-Za-z])[A-Za-z0-9]{6,18}$/, message: "密码长度必须为6-18位"}]}/>
          <ProFormText.Password name="confirmPassword"
                                label="确认密码"
                                placeholder="确认密码长度为6-18位字符"
                                rules={[{required: true},
                                  ({ getFieldValue }) => ({
                                    validator(_, value) {
                                      if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                      }
                                      return Promise.reject(new Error('确认密码与密码不匹配'));
                                    },
                                  }),
                                ]}/>
          <ProFormDigit name="tel" label="电话" rules={[{required: true}, {pattern: /^1\d{10}$/, message: "电话必须是11位数字"}]}/>
          <ProFormText name="mail" label="邮箱" rules={[{required: true}]}/>
          <ProFormSelect label="角色" name="role"
                         fieldProps={{style: { width: '300px'}}}
                         valueEnum={{
                           100: 'Member',
                           200: 'Leader',
                           300: 'Admin',
                         }}
                         rules={[{required: true}]}
          />
          <ProFormSelect label="状态" name="status"
                         fieldProps={{style: { width: '300px'}}}
                         rules={[{required: true}]}
                         valueEnum={{
                           '-1': '不启用',
                           0: '正常',
                           1: '封禁',
                         }}
          />
          <ProFormSelect label="部门" name="groupId"
                         fieldProps={{style: { width: '300px'}}}
                         rules={[{required: true}]}
                         valueEnum={{
                           'LW000': '总部',
                           'LW100': '行政部',
                           'LW200': '财务部',
                           'LW300': '技术部',
                           'LW400': '运营部',
                         }}
          />
          <ProFormSelect label="等级" name="level"
                         fieldProps={{style: { width: '300px'}}}
                         rules={[{required: true}]}
                         valueEnum={{
                           'P3': '工程师(P3)',
                           'P4': '工程师(P4)',
                           'P5': '工程师(P5)',
                           'P6': '高级工程师(P6)',
                           'P7': '资深工程师(P7)',
                           'P8': '资深工程师(P8)',
                           'P9': '架构师(P9)',
                         }}
          />
          <ProFormTextArea name="address" label="工作地址" rules={[{required: true}]}/>
          <ProFormTextArea name="signature" label="个性签名"/>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default AddUser;
