<template>
<div className="flex items-center gap-3">
  <img
    :alt="`Photo de ${fullName}`"
    :src="imageUrl"
    className="aspect-square size-6 rounded-full object-cover w-8 h-8"
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
  imageUrl: 'https://img.freepik.com/photos-gratuite/homme-vue-devant-posant-exterieur_23-2151038658.jpg?t=st=1744127595~exp=1744131195~hmac=aba2f72e5bf6ef9f28e4c4f87e38dccea049f9a2b162da31a76bb518f92c1855&w=740'
})
</script>
