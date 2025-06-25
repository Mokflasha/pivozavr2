<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const isLoggedIn = ref(false)
const nickname = ref('')
const avatar = ref('/default-avatar.png')

const router = useRouter()

onMounted(() => {
  const storedUserId = localStorage.getItem('userId')
  const storedAvatar = localStorage.getItem('avatar')

  if (storedUserId) {
    isLoggedIn.value = true
    nickname.value = storedUserId
    avatar.value = storedAvatar || '/default-avatar.png'
  }
})

function logout() {
  localStorage.removeItem('userId')
  localStorage.removeItem('avatar')

  isLoggedIn.value = false
  router.push('/')
}

</script>

<template>
  <header class="py-4 border-b">
    <nav class="flex container justify-between">
      <NuxtLink to="/" class="flex gap-1 items-center">
        <NuxtImg width="56" format="webp" src="/logo.png" alt="" />
        <span class="text-3xl font-bold">Pivozavr</span>
      </NuxtLink>
      <div class="relative w-full max-w-md items-center">
        <Input id="search" type="text" placeholder="Поиск" class="pl-10" />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
          <Search class="size-6 text-muted-foreground" />
        </span>
      </div>

      <ul v-if="!isLoggedIn" class="flex gap-6 text-xl font-bold">
        <Button><NuxtLink to="/login">Войти</NuxtLink></Button>
        <Button variant="outline"><NuxtLink to="/registration">Создать аккаунт</NuxtLink></Button>
      </ul>

      <div v-else class="flex items-center gap-4">
        <NuxtLink :to="`/user/${nickname}`" class="flex items-center gap-2">
          <img :src="avatar" alt="avatar" class="w-10 h-10 rounded-full object-cover border" />
          <span class="font-bold text-lg">{{ nickname }}</span>
        </NuxtLink>
        <Button variant="outline" @click="logout">Выйти</Button>
      </div>
    </nav>
  </header>
</template>
