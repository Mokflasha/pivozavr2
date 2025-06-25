<template>
  <div class="w-64 mt-8">
    <div class="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
      <NuxtImg format="webp" :src="beer.image" alt="Logo" />
    </div>
    <div class="mt-4 flex gap-4">
      <div class="flex items-center gap-2">
        <Star color="#f3da0b" fill="#f3da0b" class="w-5" />
        <p>{{ beer.rating }}</p>
      </div>
      <div class="flex items-center gap-2">
        <MessageSquare color="#353535" class="w-5 mt-1" />
        <p>{{ beer.comments }}</p>
      </div>
    </div>
    <p class="mt-2 mb-2 text-2xl">{{ beer.title }}</p>
    <p class="mb-4 text-xs text-muted">Стиль пива: {{ beer.style }}</p>
    <div class="flex justify-between items-center mt-4">
      <Button variant="default" class="text-base w-30 font-bold">
        Оценить
      </Button>
      <Button variant="outline" class="text-base w-30 font-bold">
        Любимое
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Star, MessageSquare } from 'lucide-vue-next'

defineProps<{
  beer: {
    title: string
    rating: number
    comments: number
    style: string
    image: string
  }
}>()
</script>
