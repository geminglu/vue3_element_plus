import { defineComponent } from 'vue';
import './index.less';

export default defineComponent({
  name: 'RenderDisabled',
  props: {
    status: {
      type: [Boolean, Number],
    },
  },
  setup(props) {
    return () => (
      <span class="status">
        <i
          class="icon"
          style={
            props.status
              ? { background: '#2196F3', outline: '#2196f347 solid 2px' }
              : { background: '#E91E63', outline: '#e91e634a solid 2px' }
          }
        />
        {props.status ? '启用' : '禁用'}
      </span>
    );
  },
});
