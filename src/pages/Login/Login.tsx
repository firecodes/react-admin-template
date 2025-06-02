import Var from '@/config/Var';
import {
  AlipayOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoOutlined,
  UserOutlined,
  WeiboOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { App, Divider, Space, Tabs, theme } from 'antd';
import React, { CSSProperties, Fragment, useId, useState } from 'react';
import CSS from './Style.module.css';
import { useNavigate } from 'react-router-dom';
import { setLocalToken, setSessionToken } from '@/config/Storage';

type LoginType = 'phone' | 'account';

const Login = () => {
  const { token } = theme.useToken();
  // 登录方式
  const [loginType, setLoginType] = useState<LoginType>('account');
  // 全局提示
  const { message } = App.useApp();
  // 路由导航
  const navigate = useNavigate();
  // 图标样式
  const iconStyles: CSSProperties = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };

  // 生成唯一标识符
  const tokenKey = useId();

  return (
    <LoginFormPage
      logo={Var.LOGO}
      backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
      title="Super System"
      containerStyle={{
        backgroundColor: 'rgba(0, 0, 0,0.65)',
        backdropFilter: 'blur(4px)',
      }}
      style={{ height: '100vh' }}
      subTitle={Var.SYSTEM_NAME}
      onFinish={async (values) => {
        const { autoLogin } = values;
        if (autoLogin) {
          setLocalToken(tokenKey);
        } else {
          setSessionToken(tokenKey);
        }
        navigate('/', { replace: true });
        message.success('欢迎登录');
      }}
      actions={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Divider plain>
            <span
              style={{
                color: token.colorTextPlaceholder,
                fontWeight: 'normal',
                fontSize: 14,
              }}
            >
              其他登录方式
            </span>
          </Divider>
          <Space align="center" size={24}>
            <div
              className={CSS.login_way_icon}
              style={{
                border: '1px solid ' + token.colorPrimaryBorder,
              }}
            >
              <AlipayOutlined style={{ ...iconStyles, color: '#1677FF' }} />
            </div>
            <div
              className={CSS.login_way_icon}
              style={{
                border: '1px solid ' + token.colorPrimaryBorder,
              }}
            >
              <TaobaoOutlined style={{ ...iconStyles, color: '#FF6A10' }} />
            </div>
            <div
              className={CSS.login_way_icon}
              style={{
                border: '1px solid ' + token.colorPrimaryBorder,
              }}
            >
              <WeiboOutlined style={{ ...iconStyles, color: '#1890ff' }} />
            </div>
          </Space>
        </div>
      }
    >
      <Tabs
        centered
        activeKey={loginType}
        onChange={(activeKey) => setLoginType(activeKey as LoginType)}
      >
        <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
        <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
      </Tabs>
      {loginType === 'account' && (
        <Fragment>
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: (
                <UserOutlined
                  style={{ color: token.colorText }}
                  className={'prefixIcon'}
                />
              ),
            }}
            placeholder={'用户名: admin'}
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: (
                <LockOutlined
                  style={{
                    color: token.colorText,
                  }}
                  className={'prefixIcon'}
                />
              ),
            }}
            placeholder={'密码: 123456'}
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </Fragment>
      )}
      {loginType === 'phone' && (
        <Fragment>
          <ProFormText
            fieldProps={{
              size: 'large',
              prefix: (
                <MobileOutlined
                  style={{ color: token.colorText }}
                  className={'prefixIcon'}
                />
              ),
            }}
            name="mobile"
            placeholder={'手机号'}
            rules={[
              {
                required: true,
                message: '请输入手机号！',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ]}
          />
          <ProFormCaptcha
            fieldProps={{
              size: 'large',
              prefix: (
                <LockOutlined
                  style={{ color: token.colorText }}
                  className={'prefixIcon'}
                />
              ),
            }}
            captchaProps={{
              size: 'large',
            }}
            placeholder={'请输入验证码'}
            captchaTextRender={(timing, count) => {
              if (timing) {
                return `${count} ${'获取验证码'}`;
              }
              return '获取验证码';
            }}
            name="captcha"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
            onGetCaptcha={async () => {
              message.success('获取验证码成功！验证码为：1234');
            }}
          />
        </Fragment>
      )}
      <div style={{ marginBlockEnd: 24 }}>
        <ProFormCheckbox noStyle name="autoLogin">
          自动登录
        </ProFormCheckbox>
        <a style={{ float: 'right' }}>忘记密码</a>
      </div>
    </LoginFormPage>
  );
};

export default Login;
