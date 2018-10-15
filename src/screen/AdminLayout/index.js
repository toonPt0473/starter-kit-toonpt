/**
 *
 * AdminLayout
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'

// import styled from 'styled-components'
import { Layout, Menu } from 'antd'
import { withRouter } from 'react-router'

import { AdminRouter, AdminBreadcrumb, AdminMenu } from './Helper'
// import messages from './messages';
// const Logo = styled('div')`
//   font-size: 16px;
//   color: white;
// `
const { Content, Footer, Sider } = Layout
// const SubMenu = Menu.SubMenu;
export class AdminLayout extends React.PureComponent {
  state = {
    collapsed: false,
  }
  handleLogout = () => {
    // this.props.dispatch(logout())
  }
  handleCollapse = (collapsed) => {
    this.setState({ collapsed })
  }

  render() {
    const currentPath = this.props.location.pathname
    return (
      <Layout style={{ minHeight: '100vh' }}>
        {/* <Header>
          <Logo>Admin page</Logo>
        </Header> */}
        <Layout>
          <Sider
            breakpoint="sm"
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.handleCollapse}
          >
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={[currentPath]}
              defaultOpenKeys={[currentPath]}
            >
              {AdminMenu(this.props.match.url)}
              {/* <Menu.Item>
                <button onClick={this.handleLogout}>
                  <Icon type="logout" />
                  <span>Logout</span>
                </button>
              </Menu.Item> */}
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ margin: '0 16px' }}>
              {AdminBreadcrumb(this.props.match.url)}
              {AdminRouter(this.props.match.url)}
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Witsawa ©2017 Created by Witsawa Developers
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

AdminLayout.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

const mapStateToProps = (state) => ({ // eslint-disable-line
})

const mapDispatchToProps = (dispatch) => ({ // eslint-disable-line

})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withRouter,
)(AdminLayout)
