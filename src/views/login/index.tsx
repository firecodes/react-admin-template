import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from '@/redux/index.ts'
import { setToken } from '@/redux/modules/user.ts'
import { loginApi } from '@/api/modules/login.ts'
import { HOME_PATH } from '@/config/index.ts'
import { notification, message } from '@/hooks/useMessage.ts'
import usePermissions from '@/hooks/usePermissions.ts'
import './index.less'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { initPermissions } = usePermissions()

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const userLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      message.open({
        key: 'login-loading',
        type: 'loading',
        content: '正在登录，请稍后...'
      })
      await new Promise((resolve: any) => {
        setTimeout(function () {
          message.destroy('login-loading')
          resolve(true)
        }, 2500)
      })

      // 1.登录获取token,并进行持久化存储
      const loginRes = await loginApi({ username, password })
      dispatch(setToken(loginRes.token))

      // 2.获取用户的菜单列表
      await initPermissions(loginRes.token)

      // 3.跳转首页
      notification.success({
        message: '登录成功',
        description: '欢迎回来，玛卡巴卡！',
        duration: 2
      })
      navigate(HOME_PATH)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="login-page">
        <div className="w3l-hotair-form">
          <h1>admin template</h1>

          <div className="container">
            <div className="workinghny-form-grid">
              <div className="main-hotair">
                <div className="content-wthree">
                  <h2>Log In</h2>
                  <form onSubmit={userLogin}>
                    <input
                      className="text"
                      type="text"
                      name="text"
                      placeholder="username：admin / user"
                      autoFocus
                      autoComplete="off"
                      required
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                      className="password"
                      type="password"
                      name="password"
                      placeholder="password：123456"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="btn" type="submit">
                      Log In
                    </button>
                  </form>
                  <p className="account">
                    Don&apos;t have an account? <a>registered</a>
                  </p>
                </div>
                <div className="w3l_form align-self">
                  <div className="left_grid_info">
                    <img className="img-fluid" src="/src/assets/images/bg_login.png" alt="#" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="copyright text-center">
            <p className="copy-footer-29">
              登录模板版权所有@<a href="https://w3layouts.com">W3layouts</a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
