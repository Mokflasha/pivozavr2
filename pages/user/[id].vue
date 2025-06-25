<template>
<div class="container flex justify-between mt-8 py-4 border-b" v-if="userData">
    <div class="flex gap-4">
      <NuxtImg
        :src="userData.avatar"
        height="200"
        width="200"
        class="object-contain rounded-full"
        format="webp"
        alt="Avatar"
      />
      <div>
        <p class="text-3xl font-bold">{{ userData.nickname }}</p>
        <div class="text-xl mt-10">
          Последние достижения
          <div class="flex gap-2 mt-4">
              <div
								v-for="ach in achievements"
								:key="ach.id"
							>
								<NuxtImg
									v-if="ach.unlocked"
									:src="ach.image"
									width="45"
									height="45"
									class="rounded-full"
								/>
							</div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-3xl font-bold flex flex-col justify-between">
      <p>Уровень: {{ userData.level }}</p>
      <NuxtImg
        :src="userData.icon"
        class="h-35 object-contain"
        format="webp"
        alt="Icon"
      />
    </div>
  </div>
	<div class="container flex h-full">
    <div class="border-r h-lvh pt-3 pr-10">
      <ul class="flex flex-col gap-5">
        <li
          class="flex gap-2 cursor-pointer"
          :class="{ 'text-orange-500': activeTab === 'all' }"
          @click="setTab('all')"
        >
          <Beer color="#FE5F00" />
          <p class="font-medium">Все пиво</p>
        </li>
        <li
          class="flex gap-2 cursor-pointer"
          :class="{ 'text-orange-500': activeTab === 'favorites' }"
          @click="setTab('favorites')"
        >
          <Heart color="#FE5F00" />
          <p class="font-medium">Любимое пиво</p>
        </li>
        <li
          class="flex gap-2 cursor-pointer"
          :class="{ 'text-orange-500': activeTab === 'reviews' }"
          @click="setTab('reviews')"
        >
          <MessageCircle color="#FE5F00" />
          <p class="font-medium">Мои отзывы</p>
        </li>
        <li
          class="flex gap-2 cursor-pointer"
          :class="{ 'text-orange-500': activeTab === 'achievements' }"
          @click="setTab('achievements')"
        >
          <Trophy color="#FE5F00" />
          <p class="font-medium">Мои достижения</p>
        </li>
      </ul>
    </div>


		<div v-if="activeTab === 'all'">
			<h2 class="text-xl font-bold mb-4 pl-10">Все пиво</h2>
			<ul class="space-y-2 pl-10">
				<li v-for="beer in allBeers" :key="beer.id" class="text-lg">
					{{ beer.name }}
				</li>
			</ul>
		</div>

		<div v-if="activeTab === 'favorites'">
			<h2 class="text-xl font-bold mb-4 pl-10">Любимое пиво</h2>
			<ul class="space-y-2 pl-10">
				<li v-for="beer in favoriteBeers" :key="beer.id" class="text-lg">
					{{ beer.name }}
				</li>
			</ul>
		</div>

		<div v-if="activeTab === 'reviews'">
			<h2 class="text-xl font-bold mb-4 pl-10">Отзывы</h2>
			<ul class="space-y-4 pl-10">
				<li v-for="beer in reviews" :key="beer.id" class="border-b pb-2">
					<p class="font-semibold text-lg">{{ beer.name }}</p>
					<p class="text-gray-700">{{ beer.review }}</p>
				</li>
			</ul>
		</div>

		<div v-if="activeTab === 'achievements'">
			<h2 class="text-xl font-bold mb-4 pl-10">Достижения</h2>
			<ul class="flex flex-col gap-4 pl-10">
				<li
					v-for="a in achievements"
					:key="a.id"
					class="flex items-center gap-4 p-4 rounded-lg shadow bg-white"
					:class="{ 'opacity-50 grayscale pointer-events-none': !a.unlocked }"
				>
					<img
						:src="a.image"
						alt="Achievement"
						class="w-16 h-16 object-cover rounded-lg flex-shrink-0"
					/>
					<div>
						<p class="font-semibold text-lg">{{ a.unlocked ? a.title : '???' }}</p>
						<p class="text-gray-600">{{ a.unlocked ? a.description : 'Скрыто' }}</p>
					</div>
				</li>
			</ul>
		</div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Beer, Heart, MessageCircle, Trophy } from 'lucide-vue-next'

interface BeerItem {
  id: number
  name: string
  favorite: boolean
  review: string
  rating: number
}

interface Achievement {
  id: number
  title: string
  description: string
  image: string
  unlocked: boolean
}

interface UserProfile {
  nickname: string
  avatar: string
  level: number
  icon: string
  beers: BeerItem[]
  achievements: Achievement[]
}

type Tab = 'all' | 'favorites' | 'reviews' | 'achievements'
const activeTab = ref<Tab>('all')

const route = useRoute()
const userId = route.params.id as string

const { data: userData, error } = await useFetch<UserProfile>(
  `/api/user/${userId}/profile`
)

const allBeers = computed(() => userData.value?.beers || [])
const favoriteBeers = computed(() =>
  userData.value?.beers?.filter(beer => beer.favorite) || []
)
const reviews = computed(() =>
  userData.value?.beers?.filter(beer => beer.review && beer.review.length > 0) || []
)
const achievements = computed(() => userData.value?.achievements || [])

const setTab = (tab: Tab) => {
  activeTab.value = tab
}

</script>


<style scoped>

</style>