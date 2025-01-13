<template>
<div className="flex items-center gap-3">
  <img
    :alt="`Photo de ${fullName}`"
    :src="imageUrl"
    className="aspect-square size-6 md:size-12 lg:size-20 rounded-full object-cover"
  >
  <div className="text-sm/5 text-gray-700">
    {{ fullName }}
  </div>
</div>
</template>

<script setup lang="ts">
interface Author {
  fullName?: string
  imageUrl?: string
}

withDefaults(defineProps<Author>(), {
  fullName: 'Malo Lebrin',
  imageUrl: 'https://media.licdn.com/dms/image/v2/D5603AQEu5LWkASjNNw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1705484136800?e=1742428800&v=beta&t=YxLJncs3N1ttjRIYy53zw2_vcjbIQubz2Sg959WJM8s'
})
</script>
