import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import type {Settings as LayoutSettings} from '@ant-design/pro-components';
import {PageLoading, SettingDrawer} from '@ant-design/pro-components';
import type {RunTimeLayoutConfig} from 'umi';
import {history} from 'umi';
import defaultSettings from '../config/defaultSettings';
import {currentUser as queryCurrentUser} from './services/api';
// @ts-ignore
import type {RequestConfig} from "@@/plugin-request/request";

const loginPath = '/user/login';

const authHeaderInterceptor = (url: string, options: any) => {
  const token = localStorage.getItem("token")===null?"":localStorage.getItem("token");
  const o = options;
  if(history.location.pathname !== loginPath) {
    o.headers = {
      "appKey": "rpm",
      'token': `${token}`,
    };
    return {
      options: o
    }
  }
  o.headers = {
    "appKey": "rpm",
    'token': `${token}`,
  };
  return {
    options: o
  }
}
export const request: RequestConfig = {
  timeout: 3000,
  requestInterceptors: [
    authHeaderInterceptor
  ]
};

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

//各项数据初始化
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: any;
  fetchUserInfo?: () => Promise<API.ResultResp<API.CurrentUser> | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      return await queryCurrentUser();
    } catch (error) {
      console.error('获取用户信息失败:', error);
      return undefined; // 返回 undefined 而不是重定向
    }
  };

  const currentUser = await fetchUserInfo();
  return {
    fetchUserInfo,
    currentUser,
    settings: defaultSettings,
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      const noAuthPaths = [loginPath, '/']; // 允许未登录访问的路径

      // 如果没有登录且不在免登录路径，重定向到登录页
      if (!initialState?.currentUser && !noAuthPaths.includes(location.pathname)) {
        history.push(loginPath);
      }
    },
    childrenRender: (children: any) => (
      <>
        {children}
        <SettingDrawer
          disableUrlParams
          enableDarkTheme
          settings={initialState?.settings}
          onSettingChange={(settings) => {
            setInitialState((preInitialState) => ({
              ...preInitialState,
              settings,
            }));
          }}
        />
      </>
    ),
    ...initialState?.settings,
  };
};

