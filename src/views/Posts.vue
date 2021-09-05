<template>
  <div class="posts">
    <top-bar></top-bar>
    <list :posts="filteredPosts" :no-data="noPostsFound" :loading="loading" />
  </div>
</template>
<script>
import List from "../components/List.vue";
import { mapGetters, mapActions } from "vuex";
import TopBar from "../components/TopBar.vue";
export default {
  name: "Posts",
  components: { List, TopBar },
  data() {
    return {
      items: [],
      loading: true,
    };
  },
  computed: {
    ...mapGetters(["filteredPosts", "noPostsFound", "isFetched"]),
  },
  async mounted() {
    try {
      if (!this.isFetched) {
        await this.fetchUsers();
        await this.fetchPosts();
      }
    } finally {
      this.loading = false;
    }
  },
  methods: {
    ...mapActions(["fetchPosts", "fetchUsers"]),
  },
};
</script>

<style lang="scss" scoped>
.posts {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
</style>