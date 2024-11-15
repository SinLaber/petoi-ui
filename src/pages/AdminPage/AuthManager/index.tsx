import type { ProColumns } from '@ant-design/pro-components';
import {EditableProTable, PageContainer} from '@ant-design/pro-components';
import React, { useState } from 'react';
import {queryRoleList, insertRoleAuth, updateRoleAuth, deleteRoleAuth} from "@/services/admin";
import {message} from "antd";

const AuthManager: React.FC = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly API.RoleAuth[]>([]);

  const columns: ProColumns<API.RoleAuth>[] = [
    {
      title: '权限ID',
      dataIndex: 'id',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:
            rowIndex > 1 ? [{ required: true, message: '权限ID为必填项' }] : [],
        };
      },
      // 第一行不允许编辑
      // editable: false,
      width: '10%',
    },
    {
      title: '权限名称',
      dataIndex: 'name',
      width: '20%',
    },
    {
      title: '权限详情',
      dataIndex: 'auth',
      width: '30%',
    },
    {
      title: '修改时间',
      dataIndex: 'mtime',
      readonly: true,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <EditableProTable<API.RoleAuth>
        rowKey="id"
        headerTitle=" "
        scroll={{
          x: 960,
        }}
        recordCreatorProps={{
          position: 'bottom',
          // @ts-ignore
          record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
        }}
        loading={false}
        columns={columns}
        // @ts-ignore
        request={async (params: { pageSize: number; current: number; }) => {
          try {
            const msg = await queryRoleList({
              pageNo: params.current,
              pageSize: params.pageSize,
            });
            return {
              data: msg.data.data,
              success: true,
              total: msg.data.totalCount,
            };
          } catch (error) {
            console.error('Error fetching data:', error);
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        // value={dataSource}
        onChange={setDataSource}

        editable={{
            type: 'multiple',
            editableKeys,
            onSave: async (rowKey, data, row) => {
                // 检查rowKey是否存在于dataSource中
                const isExistingRecord = dataSource.some((item) => item.id === rowKey);

                if (isExistingRecord) {
                    // 编辑现有记录，触发更新API
                    console.log('编辑现有记录：', data);
                    // 在这里调用你的更新API，例如：
                    await updateRoleAuth(data);
                    message.success('修改成功！');
                } else {
                    // 添加新记录，触发插入API
                    console.log('添加新记录：', data);
                    // 在这里调用你的插入API，例如：
                    await insertRoleAuth(data);
                    message.success('添加成功！');
                }
            },
            onChange: setEditableRowKeys,
            onDelete: async (rowKey, data) => {
                await deleteRoleAuth(data);
                message.success('删除成功！');
            },
        }}
      />
      </PageContainer>
  );
};

export default AuthManager;
