import {PageContainer, ProCard, StatisticCard} from '@ant-design/pro-components';
import {Alert, Col, Row} from 'antd';
import React, {useEffect, useRef} from 'react';
import {IdcardOutlined, PhoneOutlined} from "@ant-design/icons";

const { Divider } = StatisticCard;

const Dashboard: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  // @ts-ignore
  useEffect(() => {
    const contentContainer = contentRef.current;

    if (contentContainer) {
      // 获取内容容器内部的实际高度
      const contentHeight = contentContainer.scrollHeight;

      // 定时器，每隔一段时间滚动内容
      const scrollInterval = setInterval(() => {
        contentContainer.scrollTop += 1;

        // 检查是否滚动到底部，如果是，则回到顶部
        if (contentContainer.scrollTop >= contentHeight) {
          contentContainer.scrollTop = 0;
        }
      }, 50); // 调整滚动速度，单位为毫秒

      // 清理定时器
      return () => clearInterval(scrollInterval);
    }
  }, []);
  return (
    <PageContainer>
      <Alert type="success" showIcon banner message={'更快更强的重型组件，已经发布。'} style={{ marginBottom: 6 }}/>
      <Row gutter={16}>
        <Col span={18}>
          <ProCard bordered split="horizontal">
            <ProCard bordered>
              <StatisticCard.Group style={{ marginBottom: 6}}>
                <StatisticCard
                  statistic={{
                    title: '所有用户',
                    tip: '所有用户',
                    value: 15,
                  }}
                />
                <Divider />
                <StatisticCard
                  statistic={{
                    title: '未启用',
                    value: 5,
                    status: 'default',
                  }}
                />
                <StatisticCard
                  statistic={{
                    title: '正常',
                    value: '9',
                    status: 'success',
                  }}
                />
                <StatisticCard
                  statistic={{
                    title: '封禁',
                    value: 1,
                    status: 'error',
                  }}
                />
              </StatisticCard.Group>
            </ProCard>
            <ProCard split="horizontal" bordered>
              <ProCard split="vertical">
                <ProCard title="运行中试验">12/56</ProCard>
                <ProCard title="历史试验总数">134 个</ProCard>
                <ProCard title="历史试验总数">134 个</ProCard>
              </ProCard>
              <ProCard split="vertical">
                <ProCard title="运行中试验">12/56</ProCard>
                <ProCard title="历史试验总数">134 个</ProCard>
                <ProCard title="历史试验总数">134 个</ProCard>
              </ProCard>
              <ProCard split="vertical">
                <ProCard title="运行中试验">12/56</ProCard>
                <ProCard title="历史试验总数">134 个</ProCard>
                <ProCard title="历史试验总数">134 个</ProCard>
              </ProCard>
            </ProCard>
          </ProCard>
        </Col>
        <Col span={6}>
          <ProCard title="值班信息" bordered style={{ height: '33%'}}>
            <p><IdcardOutlined /> 值班人: 齐斌(2307055)</p>
            <p><PhoneOutlined/> 电话: 17355139683</p>
          </ProCard>
          <ProCard title="公告" bordered style={{ height: '67%' }}>
            <div style={{ height: '100%', maxHeight: '250px', overflow: 'hidden' }} ref={contentRef}>
              <p>你的公告文字内容你的公告文字内容1</p>
              <p>你的公告文字内容你的公告文字内容2</p>
              <p>你的公告文字内容你的公告文字内容3</p>
              <p>你的公告文字内容你的公告文字内容4</p>
              <p>你的公告文字内容你的公告文字内容5</p>
              <p>你的公告文字内容你的公告文字内容6</p>
              <p>你的公告文字内容你的公告文字内容7</p>
              <p>你的公告文字内容你的公告文字内容8</p>
              <p>你的公告文字内容你的公告文字内容9</p>
              <p>你的公告文字内容你的公告文字内容0</p>
            </div>
          </ProCard>
        </Col>
      </Row>
    </PageContainer >
  );
};
export default Dashboard;
