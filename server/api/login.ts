import { defineEventHandler, readBody } from 'h3'

type AuthUser = {
  nickname: string
  password: string
}

const fakeUsers: Record<string, AuthUser> = {
  'PivoLover42': {
    nickname: 'PivoLover42',
    password: '12345678',
  },
  'PivoLover43': {
    nickname: 'PivoLover43',
    password: '12345678',
  },
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { nickname, password } = body

  const user = fakeUsers[nickname]
  if (!user) {
    return { success: false, error: 'Пользователь не найден' }
  }

  if (user.password !== password) {
    return { success: false, error: 'Неверный пароль' }
  }

  return { success: true, id: user.nickname }
})


