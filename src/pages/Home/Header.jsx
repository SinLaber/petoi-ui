import React from 'react';
import { Row, Col, Menu, Button, Popover } from 'antd';

import { enquireScreen } from 'enquire-js';
import Icon from "antd/es/icon";

class Header extends React.Component {
  state = {
    menuVisible: false,
    menuMode: 'horizontal',
  };

  componentDidMount() {
    enquireScreen((b) => {
      this.setState({ menuMode: b ? 'inline' : 'horizontal' });
    });
  }

  render() {
    const { menuMode, menuVisible } = this.state;

    const menu = (
      <Menu mode={menuMode} id="nav" key="nav">
        <Menu.Item key="home">
          <a href="/dashboard">首页</a>
        </Menu.Item>
        <Menu.Item key="docs">
          <a><span>文档</span></a>
        </Menu.Item>
        <Menu.Item key="components">
          <a href="/user/login">管理</a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div id="header" className="header">
        {menuMode === 'inline' ? (
          <Popover
            overlayClassName="popover-menu"
            placement="bottomRight"
            content={menu}
            trigger="click"
            open={menuVisible}
            arrowPointAtCenter
          >
            <Icon
              className="nav-phone-icon"
              type="menu"
            />
          </Popover>
        ) : null}
        <Row>
          <Col xxl={4} xl={5} lg={8} md={8} sm={24} xs={24}>
            <div id="logo" to="/">
              <img src="/logo.svg" alt="logo" />
              <span>RED CARP PRO</span>
            </div>
          </Col>
          <Col xxl={20} xl={19} lg={16} md={16} sm={0} xs={0}>
            <div className="header-meta">
              <div id="preview">
                <a
                  id="preview-button"
                  target="_blank"
                  href="/dashboard"
                  rel="noopener noreferrer"
                >
                  {/*<Button>管理</Button>*/}
                </a>
              </div>
              {menuMode === 'horizontal' ? <div id="menu">{menu}</div> : null}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Header;
