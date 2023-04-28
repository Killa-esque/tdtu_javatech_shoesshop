import { Outlet } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Footer, Sider, Content } = Layout;

const AdminTemplate = () => {
  return (
    <Layout style={{ minHeight: '100vh', padding: 0 }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ height: '100vh', position: 'sticky', top: 0, left: 0 }}
      >
        <div style={{ height: '32px', margin: '16px', color: 'white', fontSize: '1.2rem' }}>Logo</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/products">Products</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: 0 }}>
        <Header style={{ backgroundColor: '#fff', padding: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Header</div>
          </div>
        </Header>
        <Outlet />
        <Footer style={{ backgroundColor: '#fff', padding: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Footer</div>
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;
