/**
 * @Description field相关类型
 * @Author youus
 * @Date 2022/6/4 13:32
 * @Version v1.0.0
 *
 * Hello, humor
 */


type SearchType = {
  visible: boolean;
  type?: string;
  default?: string | number;
}

type ColumnType = {
  visible: boolean;
  width?: number;
  align?: 'left' | 'center' | 'right',
  fixed?: 'left' | 'right'
}

interface Field {
  param?: string;
  title?: string
  search?: SearchType;
  column?: ColumnType
}