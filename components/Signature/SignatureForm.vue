<template>
<div class="space-y-4">
  <VueSignaturePad
    ref="signaturePad"
    class="border border-red-500"
    width="100%"
    height="500px"
  />

  <div class="flex items-center justify-center space-x-4">
    <BaseButton
      :disabled="!signaturePad"
      :is-loading="uiStore.getUIIsLoading"
      color="red"
      @click="clear"
    >
      <template #icon>
        <ArrowUturnDownIconOutline />
      </template>
      Réinitialiser
    </BaseButton>

    <BaseButton
      :disabled="!signaturePad"
      :is-loading="uiStore.getUIIsLoading"
      @click="save"
    >
      <template #icon>
        <ArrowDownOnSquareIconOutline />
      </template>
      Enregistrer
    </BaseButton>
  </div>
</div>
</template>

<script setup>
import { VueSignaturePad } from 'vue-signature-pad'
import { useUiStore } from '~~/store'
import BaseButton from '~~/components/Base/BaseButton.vue'

const props = defineProps({
  signature: String,
})

const emit = defineEmits(['save', 'delete'])
const uiStore = useUiStore()

const signaturePad = ref(null)

onMounted(() => {
  console.log(props.signature, '<=== props.signature')
  if (props.signature && signaturePad.value) {
    signaturePad.value.fromDataURL(props.signature)

    console.log(signaturePad.value.isEmpty(), '<===isempty ')
  }
})

function clear() {
  signaturePad.value?.clearSignature()
  emit('delete')
}

function save() {
  if (signaturePad.value) {
    const { data } = signaturePad.value.saveSignature()
    emit('save', data)
  }
}
</script>
