// @ts-ignore
/* eslint-disable */

declare namespace API {
  //同意返回接口格式，data类型根据实际情况确定
  type ResultResp<T> = {
    code: number;
    msg?: string;
    data: T;
  };

  //当前用户信息类型
  type CurrentUser = {
    id: string;
    username: string;
    password: string;
    status: number;
    avatar: string;
    signature: string;
    level: string;
    levelName: string;
    role: number;
    roleName: string;
    roleAuth: string[];
    address: string;
    groupId: string;
    groupName: string;
    tel: string;
    mail: string;
  };

  //登录参数类型
  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  //登录参数类型
  type UserParams = {
    id:? number
    username?: string;
    password?: string;
    tel?: boolean;
    mail?: string;
    status: number;
    role: number;
    level: number;
    address: string;
    groupId: string;
  };

  //登录结果返回类型
  type LoginInfo = {
    id: number;
    name: string;
    type?: string;
    status?: number;
    tel?: string;
    mail?: string;
    ctime?: string;
    mtime?: string;
    //唯一token,登陆成功后生成
    token: string
  };

  type WebListItem = {
    id: number
    website: string
    ipPort: string
    status: number
    des: string
    ctime: string
    mtime: string
  }

  type Page<T> = {
    pageNo: number,
    pageSize: number,
    totalCount: number,
    totalPage: number,
    offset: number,
    data: T
  }


  type RoleAuth = {
    id: number;
    name: string;
    auth: string;
    ctime: string;
    mtime?: string;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type EnumGroup = {
    id: number,
    enumCode: string,
    enumName: string,
    enumGroupCode: number,
    enumGroupName: string
  }









  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

}
