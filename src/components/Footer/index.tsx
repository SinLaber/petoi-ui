import { GitlabFilled} from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from "react";
const Footer: React.FC = () => {
  const defaultMessage = '基于React开发的Web服务管理平台';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Ant Design Pro',
          title: 'Ant Design Pro',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'Gitlab',
          title: <GitlabFilled />,
          href: 'https://gitee.com/SinLaber/rpm',
          blankTarget: true,
        },
        {
          key: 'Sin Lab',
          title: 'Sin Lab',
          href: 'https://sinlab.cn',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
