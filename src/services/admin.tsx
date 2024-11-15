// @ts-ignore
import {request, history} from "umi";
import {message} from "antd";
import servicePath from "@/services/api";

export async function insertUserAccount(params: API.UserParams){
  const url = '/api/admin/insertUserAccount';
  const result = await request<API.ResultResp<string>>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {...params},
    errorHandler: (error: { response: any; }) => {
      // 在这里处理错误，可以访问 error.response 获取后端返回的完整响应
      console.error('Request error:', error.response);
      return {
        code: -1,
        msg: '请求失败',
      };
    },
  });
  if(result.code === 0) {
    history.push("/admin/manage");
    message.success(result.msg);
  }else {
    message.error(result.msg);
  }
}

export async function userAccountList(
  params: {
    pageNo: number;
    pageSize: number;
  },
  options?: Record<string, any>,
) {
  return request<API.ResultResp<API.Page<API.CurrentUser>>>(servicePath.userList, {
    method: 'POST',
    data: {...params},
    ...(options || {}),
  });
}

/** 获取用户详情 POST /api/admin/queryUserDetail */
export async function queryUserDetail(
  params: {
    id: string;
  },
) {
  return request<API.ResultResp<API.CurrentUser>>(servicePath.queryUserDetail, {
    method: 'POST',
    data: {...params},
  });
}

export async function updateUserAccount(params: API.UserParams){
  const url = '/api/admin/updateUserAccount';
  const result = await request<API.ResultResp<string>>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {...params},
    errorHandler: (error: { response: any; }) => {
      // 在这里处理错误，可以访问 error.response 获取后端返回的完整响应
      console.error('Request error:', error.response);
      return {
        code: -1,
        msg: '请求失败',
      };
    },
  });
  if(result.code === 0) {
    history.push("/admin/manage");
    message.success(result.msg);
  }else {
    message.error(result.msg);
  }
}

export async function deleteUserAccount(id: string){
  const url = '/api/admin/deleteUserAccount';
  const result = await request<API.ResultResp<string>>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {'id': id},
    errorHandler: (error: { response: any; }) => {
      // 在这里处理错误，可以访问 error.response 获取后端返回的完整响应
      console.error('Request error:', error.response);
      return {
        code: -1,
        msg: '请求失败',
      };
    },
  });
  if(result.code === 0) {
    history.push("/admin/manage");
    message.success(result.msg);
  }else {
    message.error(result.msg);
  }
}

export async function queryRoleList(
  params: {
    pageNo: number;
    pageSize: number;
  },
  options?: Record<string, any>,
) {
  return request<API.ResultResp<API.Page<API.CurrentUser>>>(servicePath.queryRoleList, {
    method: 'POST',
    data: {...params},
    ...(options || {}),
  });
}

export async function insertRoleAuth(
  params: API.RoleAuth
) {
  return request<API.ResultResp<API.Page<API.CurrentUser>>>(servicePath.insertRoleAuth, {
    method: 'POST',
    data: {...params},
  });
}

export async function updateRoleAuth(
    params: API.RoleAuth
) {
    return request<API.ResultResp<API.Page<API.CurrentUser>>>(servicePath.updateRoleAuth, {
        method: 'POST',
        data: {...params},
    });
}

export async function deleteRoleAuth(
    params: API.RoleAuth
) {
    return request<API.ResultResp<API.Page<API.CurrentUser>>>(servicePath.deleteRoleAuth, {
        method: 'POST',
        data: {...params},
    });
}

export async function queryEnumGroup(
  params: {
    groupId: number;
  },
) {
  return request<API.ResultResp<API.EnumGroup>>(servicePath.queryEnumById, {
    method: 'POST',
    data: {...params},
  });
}
