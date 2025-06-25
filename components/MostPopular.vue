<template>
  <div class="container mt-8">
    <h1 class="text-[40px] font-nunito font-bold border-l-5 rounded-l-xs leading-[50px] border-l-primary pl-5">
      Самые популярные
    </h1>
    <div class="flex gap-10">
      <BeerCard
        v-for="beer in beers"
        :key="beer.title"
        :beer="beer"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BeerCard from '~/components/BeerCard.vue'

const beers = [
  {
    title: 'Зеленый кайф',
    rating: 8.9,
    comments: 27,
    style: 'Безалкольное, 0%',
    image: '/bear.png',
  },
  {
    title: 'Жидкое золото',
    rating: 9.1,
    comments: 14,
    style: 'Лагер, 4.7%',
    image: '/bear.png',
  },
  {
    title: 'Мед с пузырьками',
    rating: 7.5,
    comments: 38,
    style: 'Портер, 6.5%',
    image: '/bear.png',
  },
  {
    title: 'Наивкуснейшая пенка',
    rating: 9.3,
    comments: 45,
    style: 'ИПА, 6.2%',
    image: '/bear.png',
  },
]
</script>