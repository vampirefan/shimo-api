<script setup lang="ts">
import { connect } from 'shimo-js-sdk'

const {sdkBase}  = useRuntimeConfig().public

async function doTestJsSdk() {
  const signature = await $fetch('/api/utils/signature')
  await connect({
    fileId: 'test-file-id',
    endpoint: sdkBase+'/sdk/v2',
    signature,
    token: 'test-token',
    container: document.querySelector('#shimo-file') as HTMLElement,
  })
}
onMounted(() => {
  doTestJsSdk()
})
</script>

<template>
  <div id="shimo-file" />
</template>
