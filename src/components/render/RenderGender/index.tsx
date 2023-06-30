import { defineComponent } from 'vue';
import { ElTag } from 'element-plus';

export default defineComponent({
  name: 'RenderGender',
  props: {
    status: {
      type: [String, Number],
    },
  },
  setup(props) {
    return () => (
      <span class="gender">
        {parseInt(props.status as string) === 1 ? (
          <ElTag>男</ElTag>
        ) : parseInt(props.status as string) === 0 ? (
          <ElTag type="success">女</ElTag>
        ) : (
          <ElTag type="info">保密</ElTag>
        )}
      </span>
    );
  },
});
