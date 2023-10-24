<script lang="ts" setup>
import moment from 'moment';
import { useBasicLayout } from '@/hooks/useBasicLayout';
import { t } from '@/locales';
import { ElMessage } from 'element-plus';

const { isMobile } = useBasicLayout();

function exportData(): void {
  const date = moment().format();
  const data: string = localStorage.getItem('chatStorage') || '{}';
  const jsonString: string = JSON.stringify(JSON.parse(data), null, 2);
  const blob: Blob = new Blob([jsonString], { type: 'application/json' });
  const url: string = URL.createObjectURL(blob);
  const link: HTMLAnchorElement = document.createElement('a');
  link.href = url;
  link.download = `chat-store_${date}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function importData(event: Event): void {
  const target = event.target as HTMLInputElement;
  if (!target || !target.files) return;

  const file: File = target.files[0];
  if (!file) return;

  const reader: FileReader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result as string);
      localStorage.setItem('chatStorage', JSON.stringify(data));
      ElMessage.success(t('common.success'));
      location.reload();
    } catch (error) {
      ElMessage.error(t('common.invalidFileFormat'));
    }
  };
  reader.readAsText(file);
}

function clearData(): void {
  localStorage.removeItem('chatStorage');
  location.reload();
}

function handleImportButtonClick(): void {
  const fileInput = document.getElementById('fileInput') as HTMLElement;
  if (fileInput) fileInput.click();
}
</script>

<template>
  <div class="p-4 space-y-5 min-h-[200px]">
    <div class="space-y-6">
      <div class="flex items-center space-x-4" :class="isMobile && 'items-start'">
        <span class="flex-shrink-0 w-[100px]">{{ $t('setting.chatHistory') }}</span>

        <div class="flex flex-wrap items-center gap-4">
          <el-button size="small" @click="exportData">
            <template #icon>
              <span class="iconfont icon-download-2-fill"></span>
            </template>
            {{ $t('common.export') }}
          </el-button>

          <input id="fileInput" type="file" style="display: none" @change="importData" />
          <el-button size="small" @click="handleImportButtonClick">
            <template #icon>
              <span class="iconfont icon-upload-2-fill"></span>
            </template>
            {{ $t('common.import') }}
          </el-button>

          <el-popconfirm :title="t('chat.clearHistoryConfirm')" @confirm="clearData">
            <template #reference>
              <el-button size="small">
                <template #icon>
                  <span class="iconfont icon-close-circle-line"></span>
                </template>
                {{ $t('common.clear') }}
              </el-button>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </div>
  </div>
</template>
