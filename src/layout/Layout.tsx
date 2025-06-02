import avatarGif from '@/assets/image/avatar.gif';
import { CacheForwardRef } from '@/components/TabsKeepAlive';
import { removeToken } from '@/config/Storage';
import Var from '@/config/Var';
import { RoutePath } from '@/routes/path';
import routes from '@/routes/routes';
import {
  AlertOutlined,
  GithubFilled,
  LeftSquareOutlined,
  LockFilled,
  LogoutOutlined,
  SoundOutlined,
  UserOutlined
} from '@ant-design/icons';
import {
  ProLayout,
  ProSettings,
  SettingDrawer,
} from '@ant-design/pro-components';
import { App, Badge, Button, Dropdown, Flex } from 'antd';
import { useRef, useState } from 'react';
import { KeepAlive, KeepAliveScope, RouterTabs } from 'react-route-cache';
import { useLocation, useNavigate, useOutlet } from 'react-router-dom';

// 初始化布局界面
const Layout = () => {
  // 路由信息
  const location = useLocation();
  // 路由导航
  const navigate = useNavigate();
  // 子组件Ref 用于调用子组件方法
  const forwardRef = useRef<CacheForwardRef>(null);
  // 系统配置
  const [settings, setSetting] = useState<Partial<ProSettings>>({
    fixSiderbar: true,
    fixedHeader: true,
    layout: 'mix',
  });
  // 全局提示
  const { message } = App.useApp();

  // 菜单项
  const items = [
    {
      key: 'accountInfo',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    {
      key: 'editPwd',
      icon: <LockFilled />,
      label: '修改密码',
    },
    {
      key: 'exitLogin',
      icon: <LogoutOutlined />,
      label: (
        <div
          onClick={() => {
            removeToken();
            navigate(RoutePath.LOGIN, { replace: true });
            message.success('退出登录成功');
          }}
        >
          退出登录
        </div>
      ),
    },
  ];

  // 需要使用useOutlet
  const outlet = useOutlet();

  return (
    <ProLayout
      // 导航栏布局
      layout="mix"
      // 拆分菜单
      splitMenus
      // 固定侧边栏
      fixSiderbar
      // 固定头部导航
      fixedHeader
      // 导航栏风格
      navTheme="realDark"
      style={{ height: '100vh' }}
      // 侧边栏宽度
      siderWidth={240}
      // 路由配置
      route={routes[0]}
      // 当前路由
      location={location}
      // 上下文样式配置
      contentStyle={{
        padding: 0,
        overflow: 'auto',
      }}
      token={{
        header: {
          colorBgMenuItemSelected: '#1668dc',
          colorBgMenuItemHover: '#2c3440',
        },
        sider: {
          colorBgMenuItemSelected: '#1668dc',
          colorTextMenuSelected: '#fff',
          colorBgMenuItemHover: '#2c3440',
        },
      }}
      logo={Var.LOGO}
      title={Var.SYSTEM_NAME}
      headerTitleRender={() => (
        <Flex
          align="center"
          justify="center"
          gap={16}
          style={{ paddingRight: 16 }}
        >
          <img src={Var.LOGO} alt="logo" />
          <span style={{ fontFamily: 'YouSheBiaoTiHei', fontSize: 26 }}>
            {Var.SYSTEM_NAME}
          </span>
        </Flex>
      )}
      // 自定义渲染菜单
      menuItemRender={(item, dom) => (
        <div
          style={{ width: '100%' }}
          title={item.name}
          onClick={() => {
            const { path, key, name } = item;
            if (key && path && name) {
              forwardRef.current?.addTab({ key, path, label: name });
            }
            if (path) navigate(path);
          }}
        >
          {dom}
        </div>
      )}
      // 导航菜单默认项
      menu={{
        // 默认展开所有菜单
        defaultOpenAll: false,
        // 忽略扁平菜单
        ignoreFlatMenu: true,
      }}
      // 标签页配置
      pageTitleRender={() => Var.SYSTEM_NAME}
      avatarProps={{
        src: avatarGif,
        title: 'Admin',
        size: 'large',
        render: (_, dom) => <Dropdown menu={{ items }}>{dom}</Dropdown>,
      }}
      actionsRender={({ isMobile }) => {
        if (isMobile) return [];
        if (typeof window === 'undefined') return [];
        return [
          <Button key="data-screen" onClick={() => navigate('/data-screen')}>
            <LeftSquareOutlined />
            数据大屏
          </Button>,
          // 徽标
          <Badge key="AlertOutlined" count={3}>
            <AlertOutlined style={{ fontSize: 18 }} />
          </Badge>,
          <Badge key="SoundOutlined" count={1}>
            <SoundOutlined style={{ fontSize: 18 }} />
          </Badge>,
          <GithubFilled
            key="GithubFilled"
            style={{ fontSize: 18 }}
            onClick={() => {
              window.open(
                'https://gitee.com/chen_shaos_fish_pond/react_admin_demo.git',
              );
            }}
          />,
        ];
      }}
      // 系统配置
      {...settings}
    >
      {/* <TabsKeepAlive
        ref={forwardRef}
        isCache
        blacklist={['/example', '/three']}
        isDrag
        isTabs
      /> */}
      <KeepAliveScope>
        <RouterTabs theme="dark" size="small" />
        <KeepAlive
          styles={{
            wrapper: { height: 'calc(100% - 34px)' },
            content: { height: '100%', overflow: 'auto' },
          }}
        >
          {outlet}
        </KeepAlive>
      </KeepAliveScope>
      {/* <Outlet /> */}
      {/* 系统配置 */}
      <SettingDrawer
        enableDarkTheme
        getContainer={(e: any) => {
          if (typeof window === 'undefined') return e;
          return document.getElementById('test-pro-layout');
        }}
        settings={settings}
        onSettingChange={setSetting}
        hideCopyButton
        hideHintAlert
        disableUrlParams
      />
    </ProLayout>
  );
};

export default Layout;
