export const combine = (...params) => {
  return `${params.join('/')}`.replace(/\/{2,}/g, '/').replace(':/', '://')
}
