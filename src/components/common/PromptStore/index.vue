<script setup lang="tsx">
import { computed, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import usePromptStore from '@/store/modules/prompt';
import { useBasicLayout } from '@/hooks/useBasicLayout';
import { t } from '@/locales';
import BaseModal from '@/components/baseUi/modal/BaseModal.vue';

interface DataProps {
  renderKey: string;
  renderValue: string;
  key: string;
  value: string;
}

interface Props {
  visible: boolean;
}

interface Emit {
  (e: 'update:visible', visible: boolean): void;
}

const PromptRecommend = [
  {
    key: 'awesome-chatgpt-prompts-zh',
    desc: 'ChatGPT 中文调教指南',
    downloadUrl:
      'https://raw.githubusercontent.com/PlexPt/awesome-chatgpt-prompts-zh/main/prompts-zh.json',
    url: 'https://github.com/PlexPt/awesome-chatgpt-prompts-zh',
  },
  {
    key: 'awesome-chatgpt-prompts-zh-TW',
    desc: 'ChatGPT 中文調教指南 (透過 OpenAI / OpenCC 協助，從簡體中文轉換為繁體中文的版本)',
    downloadUrl:
      'https://raw.githubusercontent.com/PlexPt/awesome-chatgpt-prompts-zh/main/prompts-zh-TW.json',
    url: 'https://github.com/PlexPt/awesome-chatgpt-prompts-zh',
  },
];

const props = defineProps<Props>();

const emit = defineEmits<Emit>();

const message = ElMessage;

const show = computed({
  get: () => props.visible,
  set: (visible: boolean) => emit('update:visible', visible),
});

const showModal = ref(false);

const importLoading = ref(false);
const exportLoading = ref(false);

const searchValue = ref<string>('');

// 移动端自适应相关
const { isMobile } = useBasicLayout();

const promptStore = usePromptStore();

// Prompt在线导入推荐List,根据部署者喜好进行修改(assets/recommend.json)
const promptRecommendList = PromptRecommend;
const promptList = ref<any>(promptStore.promptList);

// 用于添加修改的临时prompt参数
const tempPromptKey = ref('');
const tempPromptValue = ref('');

// Modal模式，根据不同模式渲染不同的Modal内容
const modalMode = ref('');

// 这个是为了后期的修改Prompt内容考虑，因为要针对无uuid的list进行修改，且考虑到不能出现标题和内容的冲突，所以就需要一个临时item来记录一下
const tempModifiedItem = ref<any>({});

// 添加修改导入都使用一个Modal, 临时修改内容占用tempPromptKey,切换状态前先将内容都清楚
const changeShowModal = (
  mode: 'add' | 'modify' | 'local_import',
  selected = { key: '', value: '' }
) => {
  if (mode === 'add') {
    tempPromptKey.value = '';
    tempPromptValue.value = '';
  } else if (mode === 'modify') {
    tempModifiedItem.value = { ...selected };
    tempPromptKey.value = selected.key;
    tempPromptValue.value = selected.value;
  } else if (mode === 'local_import') {
    tempPromptKey.value = 'local_import';
    tempPromptValue.value = '';
  }
  showModal.value = !showModal.value;
  modalMode.value = mode;
};

// 在线导入相关
const downloadURL = ref('');
const downloadDisabled = computed(() => downloadURL.value.trim().length < 1);
const setDownloadURL = (url: string) => {
  downloadURL.value = url;
};

// 控制 input 按钮
const inputStatus = computed(
  () => tempPromptKey.value.trim().length < 1 || tempPromptValue.value.trim().length < 1
);

// Prompt模板相关操作
const addPromptTemplate = () => {
  for (const i of promptList.value) {
    if (i.key === tempPromptKey.value) {
      message.error(t('store.addRepeatTitleTips'));
      return;
    }
    if (i.value === tempPromptValue.value) {
      message.error(t('store.addRepeatContentTips', { msg: tempPromptKey.value }));
      return;
    }
  }
  promptList.value.unshift({ key: tempPromptKey.value, value: tempPromptValue.value } as never);
  message.success(t('common.addSuccess'));
  changeShowModal('add');
};

const modifyPromptTemplate = () => {
  let index = 0;

  // 通过临时索引把待修改项摘出来
  for (const i of promptList.value) {
    if (i.key === tempModifiedItem.value.key && i.value === tempModifiedItem.value.value) break;
    index = index + 1;
  }

  const tempList = promptList.value.filter((_: any, i: number) => i !== index);

  // 搜索有冲突的部分
  for (const i of tempList) {
    if (i.key === tempPromptKey.value) {
      message.error(t('store.editRepeatTitleTips'));
      return;
    }
    if (i.value === tempPromptValue.value) {
      message.error(t('store.editRepeatContentTips', { msg: i.key }));
      return;
    }
  }

  promptList.value = [
    { key: tempPromptKey.value, value: tempPromptValue.value },
    ...tempList,
  ] as never;
  message.success(t('common.editSuccess'));
  changeShowModal('modify');
};

const deletePromptTemplate = (row: { key: string; value: string }) => {
  promptList.value = [
    ...promptList.value.filter((item: { key: string; value: string }) => item.key !== row.key),
  ] as never;
  message.success(t('common.deleteSuccess'));
};

const clearPromptTemplate = () => {
  promptList.value = [];
  message.success(t('common.clearSuccess'));
};

const importPromptTemplate = (from = 'online') => {
  try {
    const jsonData = JSON.parse(tempPromptValue.value);
    let key = '';
    let value = '';
    // 可以扩展加入更多模板字典的key
    if ('key' in jsonData[0]) {
      key = 'key';
      value = 'value';
    } else if ('act' in jsonData[0]) {
      key = 'act';
      value = 'prompt';
    } else {
      // 不支持的字典的key防止导入 以免破坏prompt商店打开
      message.warning('prompt key not supported.');
      throw new Error('prompt key not supported.');
    }

    for (const i of jsonData) {
      if (!(key in i) || !(value in i)) throw new Error(t('store.importError'));
      let safe = true;
      for (const j of promptList.value) {
        if (j.key === i[key]) {
          message.warning(t('store.importRepeatTitle', { msg: i[key] }));
          safe = false;
          break;
        }
        if (j.value === i[value]) {
          message.warning(t('store.importRepeatContent', { msg: i[key] }));
          safe = false;
          break;
        }
      }
      if (safe) promptList.value.unshift({ key: i[key], value: i[value] } as never);
    }
    message.success(t('common.importSuccess'));
  } catch {
    message.error('JSON 格式错误，请检查 JSON 格式');
  }
  if (from === 'local') showModal.value = !showModal.value;
};

// 模板导出
const exportPromptTemplate = () => {
  exportLoading.value = true;
  const jsonDataStr = JSON.stringify(promptList.value);
  const blob = new Blob([jsonDataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'ChatGPTPromptTemplate.json';
  link.click();
  URL.revokeObjectURL(url);
  exportLoading.value = false;
};

// 模板在线导入
const downloadPromptTemplate = async () => {
  try {
    importLoading.value = true;
    const response = await fetch(downloadURL.value);
    const jsonData = await response.json();
    if ('key' in jsonData[0] && 'value' in jsonData[0])
      tempPromptValue.value = JSON.stringify(jsonData);
    if ('act' in jsonData[0] && 'prompt' in jsonData[0]) {
      const newJsonData = jsonData.map((item: { act: string; prompt: string }) => {
        return {
          key: item.act,
          value: item.prompt,
        };
      });
      tempPromptValue.value = JSON.stringify(newJsonData);
    }
    importPromptTemplate();
    downloadURL.value = '';
  } catch {
    message.error(t('store.downloadError'));
    downloadURL.value = '';
  } finally {
    importLoading.value = false;
  }
};

// 移动端自适应相关
const renderTemplate = () => {
  const [keyLimit, valueLimit] = isMobile.value ? [10, 30] : [15, 50];

  return promptList.value.map((item: { key: string; value: string }) => {
    return {
      renderKey: item.key.length <= keyLimit ? item.key : `${item.key.substring(0, keyLimit)}...`,
      renderValue:
        item.value.length <= valueLimit ? item.value : `${item.value.substring(0, valueLimit)}...`,
      key: item.key,
      value: item.value,
    };
  });
};

watch(
  () => promptList,
  () => {
    promptStore.updatePromptList(promptList.value);
  },
  { deep: true }
);

const dataSource = computed(() => {
  const data = renderTemplate();
  const value = searchValue.value;
  if (value && value !== '') {
    return data.filter((item: DataProps) => {
      return item.renderKey.includes(value) || item.renderValue.includes(value);
    });
  }
  return data;
});
</script>

<template>
  <BaseModal
    v-model="show"
    :isShowFooter="false"
    width="800px"
    :title="t('store.siderButton')"
    draggable
  >
    <div class="space-y-4">
      <el-tabs type="border-card">
        <el-tab-pane :label="t('store.local')">
          <div
            class="flex gap-3 mb-4"
            :class="[isMobile ? 'flex-col' : 'flex-row justify-between']"
          >
            <div class="flex items-center space-x-4">
              <el-button @click="changeShowModal('add')" type="primary">
                <span v-if="!isMobile"> <span class="iconfont icon-add" />&nbsp;</span>
                {{ t('common.add') }}
              </el-button>
              <el-button @click="changeShowModal('local_import')" plain>
                <span v-if="!isMobile"><span class="iconfont icon-import" />&nbsp;</span>
                {{ t('common.import') }}
              </el-button>
              <el-button :loading="exportLoading" @click="exportPromptTemplate()" plain>
                <span v-if="!isMobile"><span class="iconfont icon-export" />&nbsp;</span>
                {{ t('common.export') }}
              </el-button>
              <el-popconfirm @confirm="clearPromptTemplate" :title="t('store.clearStoreConfirm')">
                <template #reference>
                  <el-button plain>
                    <span v-if="!isMobile"><span class="iconfont icon-delete" />&nbsp;</span>
                    {{ t('common.clear') }}
                  </el-button>
                </template>
              </el-popconfirm>
            </div>
            <div class="flex items-center">
              <el-input
                v-model="searchValue"
                style="width: 100%"
                :placeholder="t('common.search')"
              />
            </div>
          </div>
          <template v-if="!isMobile">
            <div>
              <el-table :data="dataSource" max-height="400px">
                <el-table-column prop="renderKey" :label="t('store.title')" />
                <el-table-column prop="renderValue" :label="t('store.description')" />
                <el-table-column fixed="right" :label="t('common.action')" width="100">
                  <template #default="scope">
                    <el-link
                      type="primary"
                      :underline="false"
                      @click="changeShowModal('modify', scope.row)"
                    >
                      {{ t('common.edit') }}
                    </el-link>
                    <el-divider direction="vertical" />
                    <el-link
                      type="danger"
                      :underline="false"
                      @click="deletePromptTemplate(scope.row)"
                    >
                      {{ t('common.delete') }}
                    </el-link>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination layout="prev, pager, next" :total="dataSource.length" />
            </div>
          </template>
          <template v-if="isMobile">
            <el-scrollbar height="400px">
              <ul>
                <li class="flex render_list" v-for="(item, index) of dataSource" :key="index">
                  <div class="des">
                    <h4 style="font-size: 16px; font-weight: bold">{{ item.renderKey }}</h4>
                    <p>{{ item.renderValue }}</p>
                  </div>
                  <div class="flex flex-col items-flex-end gap-2 open">
                    <span>
                      <el-button type="primary" @click="changeShowModal('modify', item)" text bg>
                        {{ t('common.edit') }}
                      </el-button>
                    </span>
                    <el-button type="danger" @click="deletePromptTemplate(item)" text bg>
                      {{ t('common.delete') }}
                    </el-button>
                  </div>
                </li>
              </ul>
            </el-scrollbar>
          </template>
        </el-tab-pane>
        <el-tab-pane :label="t('store.online')">
          <p class="mb-4">
            {{ t('store.onlineImportWarning') }}
          </p>
          <div class="flex items-center gap-4">
            <el-input v-model="downloadURL" placeholder="" />
            <el-button
              type="primary"
              :disabled="downloadDisabled"
              :loading="importLoading"
              @click="downloadPromptTemplate()"
            >
              {{ t('common.download') }}
            </el-button>
          </div>
          <el-divider border-style="double" />
          <div class="max-h-[360px] overflow-y-auto space-y-4">
            <el-card v-for="info in promptRecommendList" :key="info.key" shadow="never">
              <span class="text-ellipsis text-xl" style="line-height: 1.5em">{{ info.key }}</span>
              <p
                class="overflow-hidden text-ellipsis whitespace-nowrap"
                :title="info.desc"
                style="margin: 12px 0"
              >
                {{ info.desc }}
              </p>
              <div class="flex items-center justify-end space-x-4">
                <el-link :underline="false">
                  <a :href="info.url" target="_blank">
                    <span class="iconfont icon-link" />&nbsp;
                  </a>
                </el-link>
                <el-link :underline="false" @click="setDownloadURL(info.downloadUrl)">
                  <span class="iconfont icon-add-bold" />&nbsp;
                </el-link>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </BaseModal>

  <BaseModal
    v-model="showModal"
    width="600"
    draggable
    :is-show-footer="false"
    :title="
      modalMode === 'add'
        ? t('chat.addTipsWord')
        : modalMode === 'modify'
        ? t('chat.editTipsWord')
        : t('chat.importTipsWord')
    "
  >
    <template v-if="modalMode === 'add' || modalMode === 'modify'">
      <span style="line-height: 2em">{{ t('store.title') }}</span>
      <el-input v-model="tempPromptKey" style="margin-bottom: 12px" />
      <span style="line-height: 2em">{{ t('store.description') }}</span>
      <el-input
        v-model="tempPromptValue"
        type="textarea"
        style="margin-bottom: 12px"
        :autosize="{ minRows: 1, maxRows: 8 }"
      />
      <el-button
        type="primary"
        style="width: 100%; margin-top: 12px"
        :disabled="inputStatus"
        @click="
          () => {
            modalMode === 'add' ? addPromptTemplate() : modifyPromptTemplate();
          }
        "
      >
        {{ t('common.confirm') }}
      </el-button>
    </template>
    <template v-if="modalMode === 'local_import'">
      <el-input
        v-model="tempPromptValue"
        :placeholder="t('store.importPlaceholder')"
        :autosize="{ minRows: 3, maxRows: 15 }"
        type="textarea"
      />
      <el-button
        type="primary"
        style="width: 100%; margin-top: 12px"
        :disabled="inputStatus"
        @click="
          () => {
            importPromptTemplate('local');
          }
        "
      >
        {{ t('common.import') }}
      </el-button>
    </template>
  </BaseModal>
</template>

<style scoped lang="less">
.render_list {
  padding: 12px 0;
  border-bottom: 1px solid var(--el-border-color);

  .des {
    flex: 1;
    color: var(--el-text-color-primary);

    p {
    }
  }

  .open {
    margin-left: 20px;
  }
}
</style>
