export default defineEventHandler(() => {
  console.log('test API')
  return { message: 'API работает' }
})