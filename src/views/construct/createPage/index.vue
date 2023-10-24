<template>
  <page-header-wrapper title="创建页面">
    <div class="create-page">
      <div class="control">
        <div class="components-list">
          <div class="components-ele" v-for="item in controlComponents" :key="item.type">
            <div class="components-title">
              <span class="iconfont icon-icon-test" />
              {{ item.label }}
            </div>
            <draggable
              draggable=".components-item"
              :list="item.components"
              itemKey="typeName"
              :sort="false"
              :group="{ name: item.group, pull: 'clone', put: false }"
              :clone="cloneComponent"
              @end="onEnd"
            >
              <template #item="{ element }">
                <div class="components-item">
                  <span class="iconfont" :class="element.tagIcon" />
                  {{ element.typeName }}
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </div>
      <div class="layout">
        <draggable :animation="250" group="componentsGroup" :list="drawingList" itemKey="id">
          <template #item="{ element }">
            <div
              class="draggabl-item"
              :class="activeId === element.id ? 'draggabl-item-active' : ''"
              @click="handlerActive(element)"
            >
              <draggableForm :element="element" />
            </div>
          </template>
        </draggable>
        <div v-show="!drawingList.length" class="empty-info">从左侧拖入或点选组件进行表单设计</div>
      </div>
      <div class="setting">
        <ComponentPanel :activeItem="activeItem" />
      </div>
    </div>
  </page-header-wrapper>
</template>

<script setup lang="ts">
import { ref, reactive, computed, ComputedRef, provide } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import draggable from 'vuedraggable';
import { controlComponents } from '../config';
import type { Components, componentId } from '../configType';
import DraggableFormItem from './draggableFormItem.vue';
import ComponentPanel from './componentPanel/componentPanel.vue';
import draggableForm from './draggableForm.vue';

defineOptions({
  name: 'createPage',
});

const drawingList = reactive<Array<Components>>([]);

/** 默认激活项id */
const idGlobal = 0;

/** 当前选中的元素 */
const activeId = ref<componentId>('');

/** 临时推拽的数据 */
let tempActive = 0;

/** 当前选中元素的数据 */
const activeItem = computed<Components>(() => {
  return activeItemFind(drawingList, activeId.value);
});

function activeItemFind(element, id: componentId) {
  for (let i = 0; i < element.length; i++) {
    if (element[i].id === id) {
      return element[i];
    } else if (element[i].components) {
      const active = activeItemFind(element[i].components, id);
      if (active) return active;
    }
  }
}

provide('activeItemProvide', activeItem);
provide('activeIdProvide', activeId);
provide('handlerActiveProvide', handlerActive);

function cloneComponent(origin) {
  console.log('clone', origin);

  const clone = JSON.parse(JSON.stringify(origin));
  clone.id = uuidv4();
  tempActive = clone.id;
  return JSON.parse(JSON.stringify(clone));
}

function onEnd(obj: any) {
  console.log('onEnd', obj);
  if (obj.from !== obj.to) {
    activeId.value = tempActive;
  }
}

/**
 * 改变激活元素
 */
function handlerActive(ele) {
  if (activeId.value !== ele.id) {
    activeId.value = ele.id;
  }
}
</script>

<style scoped lang="less">
@selectedColor: #f6f7ff;
@lighterBlue: #409eff;
@activeItem: #e8f5ff;
.create-page {
  display: flex;
  height: 100%;
  .control {
    width: 260px;
    height: 100%;
    border-right: 1px solid #e4e4e4;
  }
  .layout {
    flex: 1;
    padding: 0 12px;
    .draggabl-item {
      border: 1px dashed rgb(3, 84, 255);
      padding: 18px 18px;
      border-radius: 4px;
      margin-bottom: 18px;
      overflow: hidden;
      cursor: move;
      &:hover {
        background: rgb(245, 250, 255);
      }
    }
    .draggabl-item.draggabl-item-active {
      background-color: @activeItem;
    }
  }
  .setting {
    width: 320px;
    border-left: 1px solid #e4e4e4;
  }
}

.components-list {
  margin-right: 12px;
  .components-ele {
    margin-bottom: 16px;
    .components-title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-left: 1%;
      margin-bottom: 5px;
    }
    .components-item {
      display: inline-block;
      width: 38%;
      margin: 1%;
      transition: transform 0ms !important;
      padding: 8px 10px;
      border: 1px dashed @selectedColor;
      border-radius: 3px;
      background: @selectedColor;
      font-size: 14px;
      cursor: move;
      .iconfont {
        font-size: 14px;
        vertical-align: inherit;
      }
      .svg-icon {
        color: #777;
        font-size: 15px;
      }
      &:hover {
        border: 1px dashed #787be8;
        color: #787be8;
      }
    }
  }
}
</style>
