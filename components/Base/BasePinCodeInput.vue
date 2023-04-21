<template>
<div
  ref="otpCont"
  class="inline-flex w-full"
>
  <input
    v-for="(el, ind) in digits"
    :key="ind"
    v-model="digits[ind]"
    type="text"
    class="h-16 w-full border-black-2 border inline-block rounded-md m-1 p-3.5 text-2xl bg-white focus:outline focus:outline-indigo-500"
    :autofocus="ind === 0"
    :placeholder="(ind).toString()"
    maxlength="1"
    @keydown="$event => handleKeyDown($event, ind)"
  >
</div>
</template>

<script setup lang="ts">
interface Props {
  default?: string
  digitCount: number
}

const props = defineProps<Props>()

const emit = defineEmits(['update:otp'])

const digits = reactive<string[] | null []>([])

if (props.default && props.default.length === props.digitCount) {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = props.default.charAt(i)
  }
} else {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = null
  }
}

const otpCont = ref<null | HTMLInputElement>(null)

function isDigitsFull() {
  for (const elem of digits) {
    if (elem === null || elem === undefined) {
      return false
    }
  }

  return true
}

function handleKeyDown(event: KeyboardEvent, index: number) {
  if (event.key !== 'Tab'
        && event.key !== 'ArrowRight'
        && event.key !== 'ArrowLeft'
  ) {
    event.preventDefault()
  }

  if (event.key === 'Backspace') {
    digits[index] = null

    if (index !== 0 && otpCont.value) {
      (otpCont.value.children)[index - 1].focus()
    }

    return
  }

  const regex = /^[a-zA-Z0-9]+$/

  if (regex.test(event.key)) {
    digits[index] = event.key.toUpperCase()

    if (index !== props.digitCount - 1 && otpCont.value) {
      (otpCont.value.children)[index + 1].focus()
    }
  }

  if (isDigitsFull()) {
    emit('update:otp', digits.join(''))
  }
}
</script>
