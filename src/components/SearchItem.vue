<template>
  <div class="search-item">
    <div class="item-title">
      <span>
        {{item.title}}
      </span>
    </div>
    <div class="item-content">
      <a-input v-model:value="modelValue" v-if="item.type === 'input'"/>
      <a-select v-model:value="modelValue" :options="item.options" v-if="item.type === 'select'"/>
      <a-date-picker v-model:value="modelValue" v-if="item.type === 'date'"/>
    </div>
  </div>
</template>

<script setup>
import useModelValue from "../composables/useModelValue";

/**
 * @Description
 * @Author youus
 * @Date 21:29
 * @Version v1.0.0
 *
 * Hello, humor
 */
const props = defineProps({
  item: {
    type: Object,
    default: () => ({
      key: '',
      title: '',
      type: 'input',
      defaultValue: undefined,
      options: [],
    })
  }
});

const defaultValue = toRef(props.item, 'defaultValue');

const { modelValue } = useModelValue(defaultValue, props.item.type);
</script>

<style scoped>

</style>