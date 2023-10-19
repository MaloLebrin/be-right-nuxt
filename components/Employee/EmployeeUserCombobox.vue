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
import UserCombobox from '../User/UserCombobox.vue'
import type { UserType } from '~~/store/user/types'

const {
  state,
  searchEntity,
} = tableHook<UserType>('admin/user')

function setSearchEntity(str: string) {
  state.search = str
  searchEntity()
}
</script>
