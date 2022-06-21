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
        modelValue: defaultValue,
      }
    case 'select':
      return {
        modelValue: defaultValue,
      }
    case 'date':
      return {
        modelValue: dayjs(defaultValue.value),
      }
  }
}