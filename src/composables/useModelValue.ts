/**
 * @Description
 * @Author youus
 * @Date 2022/6/21 23:54
 * @Version v1.0.0
 *
 * Hello, humor
 */
import { Ref } from 'vue';
import dayjs from 'dayjs';

export default function useModelValue(defaultValue: Ref, type: string) {
  switch (type) {
    case 'input':
      return {
        modelValue: ref(defaultValue.value),
      }
    case 'select':
      return {
        modelValue: ref(defaultValue.value),
      }
    case 'date':
      return {
        modelValue: ref(dayjs(defaultValue.value)),
      }
    default:
      return {
        modelValue: ref(defaultValue.value),
      }
  }
}