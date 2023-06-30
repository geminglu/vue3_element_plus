const fs = require('fs');
const request = require('request');
const path = require('path');
const compressing = require('compressing');
/** icon目标的上级目录 */
const supIconDir = path.resolve('./src/assets');
/** icon的目标目录 */
const targetIconDir = path.resolve('./src/assets/icon');

const reg = /^font_[\w]+$/;
/** iconfont url */
const iconUrl =
  'https://www.iconfont.cn/api/project/download.zip?spm=a313x.7781069.1998910419.d7543c303&pid=3505221&ctoken=g-lcIuXVYQgKNmGZHfMAS3ED';

(async function () {
  // 下载文件
  const binary = await getFile(iconUrl);
  // 解压
  await compressing.zip.uncompress(binary, supIconDir);

  // 如果iconfont目录存在先删掉里面的文件在删掉该目录
  if (fs.existsSync(targetIconDir)) {
    const targetDir = fs.readdirSync(targetIconDir);
    for (const item of targetDir) {
      fs.unlinkSync(`${targetIconDir}/${item}`);
    }
    fs.rmdirSync(targetIconDir);
  }

  if (fs.existsSync(supIconDir)) {
    const dirList = fs.readdirSync(supIconDir);
    for (const item of dirList) {
      if (fs.statSync(path.join(supIconDir, item)).isDirectory() && reg.test(item)) {
        fs.renameSync(path.join(supIconDir, item), targetIconDir);
      }
    }
  }
})();

/**
 * @param {stirng} fileLink 文件url
 * @returns {Promise<binary>}
 */
function getFile(fileLink) {
  return new Promise((resolve, reject) => {
    request(
      {
        url: fileLink,
        method: 'GET', // 根据实际情况改变请求方式
        encoding: null,
        headers: {
          cookie:
            'EGG_SESS_ICONFONT=LwyPfFe9mdLtPg5kAyRM2oKTWe0dYQN45w0qN-zVhK6dp-njsVT2v8vj0y7Na1xO_qxR0Q5yn44fvFMYv4dAbFkkPN7Q2SIT7WFQ5FO2LlJwA3IiR2fBusdaC1MuXKR7Nskvk0EpZdefi38Hd-3Mk9958LctP137CC1m4wd8n-yM294McqkRTDq_GdGgswlXkN1rBnrD_gxsty9Xm85MqDHQomZubl85kQb7V58c1EK8VmAULMljRD-ho5P1bbGxq0MMZI8Qn2EsV2VR3xO3PA==;',
        },
      },
      (err, response, body) => {
        if (!err && response.statusCode === 200) {
          resolve(body);
        } else {
          reject(err);
        }
      }
    );
  });
}
