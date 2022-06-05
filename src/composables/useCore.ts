/**
 * @Description 字段核心转译
 * @Author youus
 * @Date 2022/6/4 16:02
 * @Version v1.0.0
 *
 * Hello, humor
 */
import { useFieldsStore } from '@/store/fields';

const ActionIgnoreParams = ['visible', 'status', 'search']

const PrimaryIgnoreParams = ['visible', 'status']

const travelObject = (obj: Record<string, any>, ignoreParams: string[]) => {
  for(let key in obj) {
    if (ignoreParams.includes(key)) {
      delete obj[key]
    }
    if (typeof obj[key] === 'object') {
      if (Object.keys(obj[key]).length > 1) {
        travelObject(obj[key], ignoreParams)
      } else {
        delete obj[key]
      }
    }
  }
  
  return obj
}

const useFieldFormat = (field: Field, key?: string) => {
  switch (key) {
    case 'action' :
      return travelObject(field, ActionIgnoreParams)
    default :
      return travelObject(field, PrimaryIgnoreParams)
  }
}

export default function useCore() {
  const fieldStore = useFieldsStore()
  
  const fields: Field[] = JSON.parse(JSON.stringify(fieldStore.fields));
  
  const keys = fields.map(field => field.param)
  
  const schema = reactive<Record<string, any>>({})
  
  keys.forEach(key => {
    const field = fields.find(f => f.param === key);
    if (field) {
      schema[key as string] = useFieldFormat(field, key)
    }
  })
  
  return {
    schema
  }
}