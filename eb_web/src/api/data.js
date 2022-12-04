/* eslint-disable */

import $axiosJson from '@/utils/axios'; // 引入封装的axios实例

// 获取本地json数据
export function getJsonDataApi() {
  return $axiosJson({
    url: '/data/eight_ed_lemma_with_date_and_labels.json', // json文件地址
    method: 'GET',
  });
}
