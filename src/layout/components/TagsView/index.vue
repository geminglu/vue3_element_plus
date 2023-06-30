<!-- TODO tabs标签页待开发 -->
<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import ScrollPane from './ScrollPane.vue';

const TagsView = defineComponent({
  name: 'TagsView',
  setup() {
    const store = useStore();
    // return () => (
    //   <div class="tags_view">
    //     <ScrollPane>
    //       {store.state.app.keepAliveIncludes.map((item, index) => {
    //         return <router-link key={item} to={item}></router-link>;
    //       })}
    //     </ScrollPane>
    //   </div>
    // );
  },
  components: { ScrollPane },
});

export default TagsView;
</script>

<style scoped lang="less">
.tags_view {
}
</style>
