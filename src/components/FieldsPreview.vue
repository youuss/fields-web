<template>
  <Search />
  <a-table :columns="fieldStore.columns"/>
</template>

<script lang="ts" setup>

/**
 * @Description fields转换为table/search的预览
 * @Author youus
 * @Date 23:24
 * @Version v1.0.0
 *
 * Hello, humor
 */
import { useFieldsStore } from '@/store/fields';

const fieldStore = useFieldsStore()
</script>