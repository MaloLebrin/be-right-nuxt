<template>
<UserCombobox
  is-required
  :default-values="state.items"
  name="userId"
  label="Id de l'utilisateur"
  value-key="id"
  is-multiple
  @search="setSearchEntity"
/>
</template>

<script setup lang="ts">
import type { UserType } from 'store/user/types'
import UserCombobox from '../User/UserCombobox.vue'

const {
  state,
  searchEntity,
} = tableHook<UserType>('admin/user')

function setSearchEntity(str: string) {
  state.search = str
  searchEntity()
}
</script>
