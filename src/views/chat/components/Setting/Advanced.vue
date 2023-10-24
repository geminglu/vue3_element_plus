<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import useChatStore from '@/store/modules/chat';
import { t } from '@/locales';

const settingStore = useChatStore();

const systemMessage = ref(settingStore.systemMessage ?? '');

const temperature = ref(settingStore.temperature ?? 0.5);

// eslint-disable-next-line camelcase
const top_p = ref(settingStore.top_p ?? 1);

function updateSettings(options: any) {
  settingStore.updateSetting(options);
  ElMessage.success(t('common.success'));
}

function handleReset() {
  settingStore.resetSetting();
  ElMessage.success(t('common.success'));
  window.location.reload();
}
</script>

<template>
  <div class="p-4 space-y-5 min-h-[200px]">
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[120px]">{{ $t('setting.role') }}</span>
        <div class="flex-1">
          <el-input
            v-model:value="systemMessage"
            type="textarea"
            :autosize="{ minRows: 1, maxRows: 4 }"
          />
        </div>
        <el-button size="small" text type="primary" @click="updateSettings({ systemMessage })">
          {{ $t('common.save') }}
        </el-button>
      </div>
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[120px]">{{ $t('setting.temperature') }} </span>
        <div class="flex-1">
          <el-slider v-model="temperature" :max="2" :min="0" :step="0.1" />
        </div>
        <span>{{ temperature }}</span>
        <el-button size="small" text type="primary" @click="updateSettings({ temperature })">
          {{ $t('common.save') }}
        </el-button>
      </div>
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[120px]">{{ $t('setting.top_p') }} </span>
        <div class="flex-1">
          <el-slider v-model="top_p" :max="1" :min="0" :step="0.1" />
        </div>
        <span>{{ top_p }}</span>
        <el-button size="small" text type="primary" @click="updateSettings({ top_p })">
          {{ $t('common.save') }}
        </el-button>
      </div>
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[120px]">&nbsp;</span>
        <el-button size="small" @click="handleReset">
          {{ $t('common.reset') }}
        </el-button>
      </div>
    </div>
  </div>
</template>
