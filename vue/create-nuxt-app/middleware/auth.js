export default function ({from, route, redirect}) {
  return true
  console.log('middleware')
  console.log(process.server)
  // if (!process.server && from.name !== 'goods' && route.name === 'goods-id'){
  //   return redirect('/')
  // }
  // context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
}