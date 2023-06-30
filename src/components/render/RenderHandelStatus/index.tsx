import { defineComponent } from 'vue';
import './index.less';

export default defineComponent({
  name: 'RenderHandelStatus',
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
              : { background: '#FFC107', outline: '#ffc10738 solid 2px' }
          }
        />
        {props.status ? '已处理' : '未处理'}
      </span>
    );
  },
});
