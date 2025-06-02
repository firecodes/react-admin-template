// 添加token
export function setLocalToken(token: string) {
  localStorage.setItem('token', token);
}

// 是否保持登录状态，不勾选保持登录状态的话，调用此方法，存储到sessionStorage
export function setSessionToken(token: string) {
  sessionStorage.setItem('token', token);
}

// 获取token   (首先获取localStorage的token,再次获取sessionStorage的token，如果都不存在就返回null))
export function getToken(): string | null {
  if (localStorage.getItem('token')) {
    return localStorage.getItem('token');
  } else if (sessionStorage.getItem('token')) {
    return sessionStorage.getItem('token');
  } else {
    return null;
  }
}

// 删除token
export function removeToken() {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
}
