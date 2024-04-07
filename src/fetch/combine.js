export const combine = (...params) => {
  return `/${params.join('/')}`.replace(/\/\//g, '/')
}
