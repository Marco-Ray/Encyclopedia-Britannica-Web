/* eslint-disable */

import $axiosJson from '@/utils/axios'; // 引入封装的axios实例

// 获取本地json数据
export function getJsonDataApi() {
  return $axiosJson({
    url: '/v0/b/my-site-c1432.appspot.com/o/data%2Feight_ed_lemma_with_date_and_labels.json?alt=media&token=541bc88c-68c7-45ba-b131-14a60a85bf0b', // json文件地址
    method: 'GET',
  });
}
