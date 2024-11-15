import React, {useEffect, useState} from "react";
import {
  PageContainer, ProCard,
} from '@ant-design/pro-components';
import {Card, Form} from "antd";
import {currentUser} from "@/services/api";
import styles from './index.less';

const Center: React.FC = () => {
  const [userData, setUserData] = useState<API.CurrentUser | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await currentUser();
        setUserData(result);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <PageContainer>
      {userData ? (
        <Card>
          <ProCard
            title="基本信息"
            tooltip="基本信息"
            style={{ maxWidth: 800 }}
            headerBordered
          >
            <Form>
              <Form.Item label="昵称">{userData.username}</Form.Item>
              <Form.Item label="角色">{userData.roleName}</Form.Item>
              <Form.Item label="等级">{userData.levelName}({userData.level})</Form.Item>
              <Form.Item label="部门">{userData.groupName}</Form.Item>
              <Form.Item label="状态">{userData.status==0?'正常':(userData.status==-1?'未启用':'封禁')}</Form.Item>
              <Form.Item label="工作地址">{userData.address}</Form.Item>
              <Form.Item label="创建时间">2023-11-09 10:38:58</Form.Item>
              <Form.Item label="修改时间">2023-11-09 10:38:58</Form.Item>
            </Form>
          </ProCard>
          <ProCard
            title="账号与安全"
            tooltip="账号与安全"
            style={{ maxWidth: 800 }}
            headerBordered
          >
            <Form>
              <Form.Item label="头像"><img src={userData.avatar} className={styles.avatarImage} alt="头像"/></Form.Item>
              <Form.Item label="账号">{userData.id}</Form.Item>
              <Form.Item label="登录名">{userData.username}</Form.Item>
              <Form.Item label="密码">{userData.password}</Form.Item>
              <Form.Item label="邮箱">{userData.mail}</Form.Item>
              <Form.Item label="手机号">{userData.tel}</Form.Item>
            </Form>
          </ProCard>
        </Card>
      ) : (
        <p style={{background: '#fafafa', padding: 24,}}>Loading...</p>
      )}

    </PageContainer>
  );
};

export default Center;
