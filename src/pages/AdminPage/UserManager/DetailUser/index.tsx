import React, {useEffect, useState } from "react";
import {
  PageContainer,
  ProDescriptions
} from '@ant-design/pro-components';
import {Card} from "antd";
import {queryUserDetail} from "@/services/admin";

const DetailUser: React.FC = () => {
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf('/') + 1);

  // 使用 useState 来保存用户详情数据
  const [userDetail, setUserDetail] = useState<API.CurrentUser | null>(null);

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

    // 调用查询用户详情的函数
    fetchUserDetail();
  }, [id]); // 仅在 id 发生变化时重新调用 useEffect

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
        <ProDescriptions title="用户详情" bordered column={1} labelStyle={{width: 180}}>
          <ProDescriptions.Item label="用户ID">{userDetail.id}</ProDescriptions.Item>
          <ProDescriptions.Item label="用户名">{userDetail.username}</ProDescriptions.Item>
          <ProDescriptions.Item label="电话">{userDetail.tel}</ProDescriptions.Item>
          <ProDescriptions.Item label="邮箱">{userDetail.mail}</ProDescriptions.Item>
          <ProDescriptions.Item label="角色">{userDetail.role}</ProDescriptions.Item>
          <ProDescriptions.Item label="状态">{userDetail.status}</ProDescriptions.Item>
          <ProDescriptions.Item label="部门">{userDetail.groupId}</ProDescriptions.Item>
          <ProDescriptions.Item label="等级">{userDetail.level}</ProDescriptions.Item>
          <ProDescriptions.Item label="工作地址">{userDetail.address}</ProDescriptions.Item>
          <ProDescriptions.Item label="个性签名">{userDetail.signature}</ProDescriptions.Item>
        </ProDescriptions>
      </Card>
    </PageContainer>
  );
};

export default DetailUser;
