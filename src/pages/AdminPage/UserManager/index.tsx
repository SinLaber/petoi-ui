import React, {useRef, useState} from "react";
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import {Button, message, Modal} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {deleteUserAccount, userAccountList} from "@/services/admin";
import {history, Link} from "umi";



const UserManager: React.FC = () => {
  const [records, setRealRecord] = useState<API.CurrentUser | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const actionRef = useRef<ActionType>();

  const handleDetail = (record: any) => {
    // 在这里执行详情操作，可以显示模态框、跳转页面等
    const realRecord = record.props.record as API.CurrentUser;
    console.log('点击了编辑，记录是：', realRecord);
    // 具体的详情操作代码
    history.push('/admin/manage/detail/' + realRecord.id)
  };

  const handleEdit = (record: any) => {
    // 在这里执行详情操作，可以显示模态框、跳转页面等
    const realRecord = record.props.record as API.CurrentUser;
    console.log('点击了编辑，记录是：', realRecord);
    // 具体的详情操作代码
    history.push('/admin/manage/edit/' + realRecord.id)
  };

  const handleDelete = (record: any) => {
    // 在这里执行详情操作，可以显示模态框、跳转页面等
    const realRecord = record.props.record as API.CurrentUser;
    setRealRecord(realRecord);
    // 具体的详情操作代码
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (records) {
        // 在这里执行真正的删除操作
        await deleteUserAccount(records.id);
        // 使用 actionRef 重新加载表格数据
        if (actionRef.current) {
          actionRef.current.reload();
        }
      }
    } catch (error) {
      console.error('删除失败:', error);
      message.error('删除失败');
    }
    setDeleteModalVisible(false);
  };

  const columns: ProColumns<API.CurrentUser>[] = [
    {
      title: '用户ID',
      dataIndex: 'id',
      valueType: 'textarea',
      width: '10%'
    },
    {
      title: '用户名',
      dataIndex: 'username',
      valueType: 'textarea',
      width: '15%'
    },
    {
      title: '角色',
      dataIndex: 'roleName',
      valueType: 'textarea',
      width: '15%'
    },
    {
      title: '职级',
      dataIndex: 'level',
      valueType: 'textarea',
      hideInSearch: true,
      width: '15%',
      render: (_, record) => {
        const { level, levelName } = record;
        return `${levelName}（`+`${level}）`;
      },
    },
    {
      title: '部门',
      dataIndex: 'groupName',
      valueType: 'textarea',
      hideInSearch: true,
      width: '15%',
      render: (_, record) => {
        const { groupId, groupName } = record;
        return `${groupName}（`+`${groupId}）`;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: '15%',
      valueEnum: {
        '-1': {
          text: '未启用',
          status: 'Default',
        },
        0: {
          text: '正常',
          status: 'Success',
        },
        1: {
          text: '封禁',
          status: 'Error',
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (record) => [
        <a key="detail" onClick={() => handleDetail(record)}>
          详情
        </a>,
        <a key="alter" onClick={() => handleEdit(record)}>
          修改
        </a>,
        <a key="delete" onClick={() => handleDelete(record)}>
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        actionRef={actionRef}
        //@ts-ignore
        request={async (params: { pageSize: number; current: number; }) => {
          try {
            const msg = await userAccountList({
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
        columns={columns}
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          pageSize: 10,
          current: 1,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="addButton" // 添加唯一的key
          >
            <Link to='/admin/manage/add' key="addLink"><PlusOutlined /> 添加</Link>
          </Button>,
        ]}
      />
      <Modal
        title="确认删除"
        open={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={() => setDeleteModalVisible(false)}
      >
        确定要删除吗？
      </Modal>
    </PageContainer>
  );
};

export default UserManager;
