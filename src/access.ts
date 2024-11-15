/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    noAuth: () => true,  // 允许未登录用户访问根路径
    canAdmin: currentUser && currentUser.role > 100,
    canUser: currentUser && currentUser.role > 0,
  };
}
