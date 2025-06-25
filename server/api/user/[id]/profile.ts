import { defineEventHandler } from 'h3'

type Beer = {
  id: number
  name: string
  favorite: boolean
  review: string
  rating: number
}

type Achievement = {
  id: number
  title: string
  description: string
  image: string
  unlocked: boolean
}

type UserData = {
  nickname: string
  avatar: string
  level: number
  icon: string
  beers: Beer[]
  achievements: Achievement[]
}

const fakeUsers: Record<string, UserData> = {
  'PivoLover42': {
    nickname: 'PivoLover42',
    avatar: '/avatar.png',
    level: 24,
    icon: '/pivo.png',
    beers: [
      { id: 1, name: 'ИПА', favorite: true, review: 'топ пивас', rating: 5 },
      { id: 2, name: 'Лагер', favorite: false, review: '', rating: 0 },
      { id: 3, name: 'Стаут', favorite: true, review: 'не оч топ пивас', rating: 4 },
    ],
    achievements: [
      {
        id: 1,
        title: 'Алкаш',
        description: 'Попробовал 50 сортов',
        image: '/6351681377.jpg',
        unlocked: true,
      },
      {
        id: 2,
        title: 'Алкаш про',
        description: 'Оценил 100 разных пивов',
        image: '/6351681377.jpg',
        unlocked: false,
      },
    ],
  },
  'PivoLover43': {
    nickname: 'PivoLover43',
    avatar: '/avatar2.webp',
    level: 24,
    icon: '/pivo.png',
    beers: [
      { id: 1, name: 'ИПА', favorite: true, review: 'топ пивас', rating: 5 },
      { id: 2, name: 'Лагер', favorite: false, review: '', rating: 0 },
    ],
    achievements: [
      {
        id: 1,
        title: 'Сомелье',
        description: 'Попробовал 50 сортов',
        image: '/6351681377.jpg',
        unlocked: true,
      },
      {
        id: 2,
        title: 'Алкаш про',
        description: 'Оценил 100 разных пивов',
        image: '/6351681377.jpg',
        unlocked: true,
      },
    ],
  },
}

export default defineEventHandler((event) => {
  const id = event.context.params?.id as string
  console.log('api profile called for:', id)
  return fakeUsers[id] || { beers: [], achievements: [] }
})



