/**
 * 生成一个随机数
 * @param {number} min 最小值
 * @param  {number} max 最大值
 * @returns {number} 范围随机数
 */
export function randomNum(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 生成一个随机的颜色
 * @param {number} min 最小值
 * @param  {number} max 最大值
 * @returns {string}
 */
export function randomColor(min: number, max: number): string {
  const r = randomNum(min, max);
  const g = randomNum(min, max);
  const b = randomNum(min, max);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

export function arrayToTree(list: any[], root = null) {
  const result = []; // 用于存放结果
  const map: any = {}; // 用于存放 list 下的节点

  // 1. 遍历 list，将 list 下的所有节点以 id 作为索引存入 map
  for (const item of list) {
    map[item.id] = { ...item }; // 浅拷贝
  }

  // 2. 再次遍历，将根节点放入最外层，子节点放入父节点
  for (const item of list) {
    // 3. 获取节点的 id 和 父 id
    const { id, pid } = item; // ES6 解构赋值
    // 4. 如果是根节点，存入 result
    if (item.pid === root) {
      result.push(map[id]);
    } else {
      // 5. 反之，存入到父节点
      if (map[pid])
        map[pid].children ? map[pid].children.push(map[id]) : (map[pid].children = [map[id]]);
    }
  }

  // 将结果返回
  return result;
}