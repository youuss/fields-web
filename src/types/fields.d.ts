/**
 * @Description field相关类型
 * @Author youus
 * @Date 2022/6/4 13:32
 * @Version v1.0.0
 *
 * Hello, humor
 */


type SearchType = {
  type?: string;
  default?: string | number;
  options?: { label: string, value: string | number, _id: string, _type: 'string' | 'number', }[]
}

type ColumnType = {
  width?: number;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
  _slot?: string;
}

interface Field {
  key?: string;
  title?: string;
  _status?: 'always' | 'current';
  _isTableField?: boolean;
  _isSearchField?: boolean;
  search?: SearchType;
  column?: ColumnType
}