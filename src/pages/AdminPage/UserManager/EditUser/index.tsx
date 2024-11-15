import React, {useEffect, useState } from "react";
import {
  ProForm,
  PageContainer,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-components';
import {Card, Col, Row, Space} from "antd";
import {queryEnumGroup, queryUserDetail, updateUserAccount} from "@/services/admin";

const formItemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 10,
  }
};
const EditUser: React.FC = () => {
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf('/') + 1);

  // 使用 useState 来保存用户详情数据
  const [userDetail, setUserDetail] = useState<API.CurrentUser | null>(null);
  const [enumValues, setEnumValues] = useState({});

  // 使用 useEffect 来在组件加载时调用查询用户详情的函数
  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        // 调用 queryUserDetail 函数，获取用户详情
        const result = await queryUserDetail({ id });
        // 更新组件的状态，显示用户详情
        setUserDetail(result.data);
      } catch (error) {
        console.error('Error fetching user detail:', error);
      }
    };

    // 从后端获取枚举值的异步函数
    const fetchEnumValues = async (groupId: number) => {
      try {
        const response = await queryEnumGroup({ groupId });
        setEnumValues((prevEnumValues) => ({
          ...prevEnumValues,
          [groupId]: response.data,
        }));
        console.log(response.data)
      } catch (error) {
        console.error(`Error fetching enum values for groupId ${groupId}:`, error);
        // 在此添加适当的错误处理，例如显示错误消息给用户
      }
    };

    // 调用查询用户详情的函数
    fetchUserDetail();
    fetchEnumValues(1);
    fetchEnumValues(2);
    fetchEnumValues(3);
    fetchEnumValues(4);
  }, [id]); // 仅在 id 发生变化时重新调用 useEffect

  // 确保 userDetail 有值，如果为 null，则使用空对象
  const initialValues = {...userDetail,
    role: userDetail?.role.toString(),
    status: userDetail?.status.toString(),
    password: null
  };

  if (!userDetail) {
    // 如果用户详情尚未加载，可以显示 loading 状态或其他占位内容
    return <div
      style={{
        background: '#fafafa',
        padding: 24,
      }}
    >
      Loading...
    </div>;
  }

  return (
    <PageContainer>
      <Card>
        <ProForm
          key="form"
          layout='horizontal'
          initialValues={initialValues}
          {...formItemLayout}
          onFinish={updateUserAccount}
          submitter={{
            render: (props, dom) => {
              return (
                <Row>
                  <Col span={10} offset={2}>
                    <Space>{dom}</Space>
                  </Col>
                </Row>
              )
            },
          }}
        >
          <ProFormText name="id" label="用户ID" rules={[{required: true}]} disabled={true}/>
          <ProFormText name="username" label="用户名" rules={[{required: true}]}/>
          <ProFormText.Password name="password"
                                label="新密码"
                                placeholder="密码长度为6-18位字符,为空则不修改"
                                allowClear
                                rules={[{pattern: /^(?=.*[A-Za-z])[A-Za-z0-9]{6,18}$/, message: "密码长度必须为6-18位"}]}/>
          <ProFormDigit name="tel" label="电话" rules={[{required: true}, {pattern: /^1\d{10}$/, message: "电话必须是11位数字"}]}/>
          <ProFormText name="mail" label="邮箱" rules={[{required: true}]}/>
          <ProFormSelect label="角色" name="role"
                         fieldProps={{style: { width: '300px'}}}
                         valueEnum={(enumValues[4] || []).reduce((acc: string, item: API.EnumGroup) => {
                           acc[item.enumCode] = item.enumName;
                           return acc;
                         }, {})}
                         rules={[{required: true}]}
          />
          <ProFormSelect label="状态" name="status"
                         fieldProps={{style: { width: '300px'}}}
                         rules={[{required: true}]}
                         valueEnum={(enumValues[2] || []).reduce((acc: string, item: API.EnumGroup) => {
                           acc[item.enumCode] = item.enumName;
                           return acc;
                         }, {})}
          />
          <ProFormSelect label="部门" name="groupId"
                         fieldProps={{style: { width: '300px'}}}
                         rules={[{required: true}]}
                         valueEnum={(enumValues[3] || []).reduce((acc: string, item: API.EnumGroup) => {
                           acc[item.enumCode] = item.enumName + "(" + item.enumCode + ")";
                           return acc;
                         }, {})}
          />
          <ProFormSelect label="等级" name="level"
                         fieldProps={{style: { width: '300px'}}}
                         rules={[{required: true}]}
                         valueEnum={(enumValues[1] || []).reduce((acc: string, item: API.EnumGroup) => {
                           acc[item.enumCode] = item.enumName + "(" + item.enumCode + ")";
                           return acc;
                         }, {})}
          />
          <ProFormTextArea name="address" label="工作地址" rules={[{required: true}]}/>
          <ProFormTextArea name="signature" label="个性签名"/>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default EditUser;
