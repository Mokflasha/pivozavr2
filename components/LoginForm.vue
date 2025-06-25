<template>
  <div class="max-w-80 container mt-17 font-nunito"> 
    <h1 class="text-center font-bold text-3xl mb-10">Войдите в аккаунт</h1>
    <form class="relative" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="nickname">
        <FormItem class="pb-3">
          <FormLabel>Никнейм</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Введите ваш никнейм" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="password">
        <FormItem class="pb-4 px">
          <FormLabel>Пароль</FormLabel>
          <FormControl>
            <Input type="password" placeholder="Введите пароль" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button class="px-15 container text-lg py-5" type="submit">
        Войти
      </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

type LoginResponse = {
  success: boolean
  id?: string
  error?: string
}

const formSchema = toTypedSchema(z.object({
  nickname: z.string().min(1, { message: 'Введите никнейм' }),
  password: z.string().min(1, { message: 'Введите пароль' }),
}))

const form = useForm({
  validationSchema: formSchema,
})

const router = useRouter()

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const res = await $fetch<LoginResponse>('/api/login', {
      method: 'POST',
      body: values,
    })

    if (res.success && res.id) {
      localStorage.setItem('userId', res.id)

      const profile = await $fetch(`/api/user/${res.id}/profile`)

      localStorage.setItem('avatar', profile.avatar || '/default-avatar.png')

      router.push(`/user/${res.id}`)
    } else {
      alert(res.error || 'Ошибка входа')
    }
  } catch (err) {
    console.error(err)
    alert('Ошибка сети')
  }
})


</script>

