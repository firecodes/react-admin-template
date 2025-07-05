import Mock from 'mockjs'
import menuList from '../mockData/menuList.json'

const baseUrl = 'http://localhost:8848'

// 模拟用户登录并返回token
Mock.mock(`${baseUrl}/api/login`, 'post', (option: any) => {
  const { username, password } = JSON.parse(option.body)
  const avalidUser = ['admin', 'user']
  if (!avalidUser.includes(username)) {
    return {
      code: 0,
      message: '用户不存在'
    }
  }
  if (password !== '123456') {
    return {
      code: 0,
      message: '密码错误'
    }
  }
  if (username === 'admin') {
    return {
      code: 1,
      message: '登录成功',
      token: 'admin-token'
    }
  }
  if (username === 'user') {
    return {
      code: 1,
      message: '登录成功',
      token: 'user-token'
    }
  }
})

// 模拟用户的菜单列表
Mock.mock(`${baseUrl}/api/user/menus`, 'post', (option: any) => {
  const { token } = JSON.parse(option.body)
  if (token === 'admin-token') {
    return {
      code: 1,
      message: 'success',
      data: menuList
    }
  }
  if (token === 'user-token') {
    return {
      code: 1,
      message: 'success',
      data: menuList.filter((_, index) => index % 2 === 0)
    }
  }
  return {
    code: 401,
    message: 'Invalid token'
  }
})
