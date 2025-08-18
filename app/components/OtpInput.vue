<script setup lang="ts">

const props = defineProps<{
  length?: number
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const length = props.length || 5
const values = ref<string[]>(Array(length).fill(''))
const inputs = ref<HTMLInputElement[]>([])

onMounted(() => {
  // Pre-fill if modelValue already has something
  if (props.modelValue) {
    const chars = props.modelValue.split('')
    values.value = values.value.map((_, i) => chars[i] || '')
  }
})

const focusInput = (index: number) => {
  nextTick(() => {
    inputs.value[index]?.focus()
  })
}

const handleInput = (e: Event, index: number) => {
  const target = e.target as HTMLInputElement
  const value = target.value.replace(/[^0-9]/g, '') // allow only digits
  values.value[index] = value

  emit('update:modelValue', values.value.join(''))

  if (value && index < length - 1) {
    focusInput(index + 1)
  }
}

const handleBackspace = (e: KeyboardEvent, index: number) => {
  if (e.key === 'Backspace' && !values.value[index] && index > 0) {
    focusInput(index - 1)
  }
}

const handlePaste = (e: ClipboardEvent) => {
  e.preventDefault()
  const pasted = e.clipboardData?.getData('text') || ''
  const digits = pasted.replace(/[^0-9]/g, '').slice(0, length).split('')
  digits.forEach((d, i) => (values.value[i] = d))
  emit('update:modelValue', values.value.join(''))
}
</script>

<template>
  <div class="d-flex gap-3 otp justify-content-center" @paste="handlePaste">
    <input
      v-for="(_, i) in length"
      :key="i"
      ref="inputs"
      type="text"
      inputmode="numeric"
      maxlength="1"
      class="form-control"
      v-model="values[i]"
      @input="(e) => handleInput(e, i)"
      @keydown="(e) => handleBackspace(e, i)"
    />
  </div>
</template>

<style scoped>
.otp .form-control {
  width: 50px;
  height: 50px;
  text-align: center;
}
</style>
