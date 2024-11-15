// @ts-ignore
import {request} from 'umi';

const servicePath = {
  currentUser: '/api/user/account',
  login: '/api/auth/login',
  logout: '/api/auth/logout',
  webSite: '/api/index/queryAll',
  userList: '/api/admin/userAccountList',
  queryUserDetail: '/api/admin/queryUserDetail',

  queryRoleList: '/api/role/queryRoleList',
  insertRoleAuth: '/api/role/insertRoleAuth',
  updateRoleAuth: '/api/role/updateRoleAuth',
  deleteRoleAuth: '/api/role/deleteRoleAuth',

  queryEnumById: '/api/enum/queryEnumById',
}

export default servicePath;


/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(){
  const body = {
    id: localStorage.getItem("id")
  };
  const response = await request<API.ResultResp<any>>(servicePath.currentUser, {
    method: 'POST',
    data: {...body},
  });
  if (response.code === 0) {
    return response.data;
  }
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.ResultResp<API.LoginInfo>>(servicePath.login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  const body = {
    token: localStorage.getItem("token")
  };
  return request<Record<string, any>>(servicePath.logout, {
    method: 'POST',
    data: {...body},
    ...(options || {}),
  });
}

/** 获取网站列表 GET /api/index/queryAll */
export async function websiteList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.WebListItem>(servicePath.webSite, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
