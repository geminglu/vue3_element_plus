import { createVNode, render, shallowReactive } from 'vue';
import BaseModal from '@/components/baseUi/modal/BaseModal.vue';
import { BaseModalProps, instanceType } from './baseModal';

const instances: instanceType[] = shallowReactive([]);

function modalOpen(props: Partial<BaseModalProps>) {
  const id = `modal${new Date().getTime()}`;
  const container = document.createElement('div');
  container.setAttribute('id', id);
  const vnode = createVNode(BaseModal, props);
  render(vnode, container);

  (container.firstElementChild || container).setAttribute('id', id);
  document.body.appendChild(container.firstElementChild || container);
  const vm = vnode.component!;
  vm.exposed!.visible.value = true;

  const instance = {
    id,
    vm,
    close: () => {
      close(id);
    },
    closeAll: () => {
      close();
    },
  };
  instances.push(instance);
  return instance;
}

/**
 * 关闭modal
 * @param id modal ID
 */
function close(id?: string) {
  if (id) {
    instances.filter((f) => f.id === id)[0].vm.exposed!.visible.value = false;
    const div = document.getElementById(id);
    setTimeout(() => {
      div?.parentNode && div.parentNode.removeChild(div);
    });
  } else {
    for (const instance of instances) {
      instance.vm.exposed!.visible.value = false;
      setTimeout(() => {
        const div = document.getElementById(instance.id);
        div?.parentNode && div.parentNode.removeChild(div);
      }, 300);
    }
  }
}

const Modal = {
  open: modalOpen,
};

export default Modal;
