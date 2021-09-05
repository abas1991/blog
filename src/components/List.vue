<template>
  <div>
    <div v-if="noData && !loading" class="no-data">No data found.</div>
    <div v-if="loading" class="bubble-loading" />
    <template v-if="!loading && !noData">
      <div class="list">
        <card v-for="post in pagedData" :post="post" :key="post.id"></card>
      </div>
      <div class="page-con">
        <span
          class="btn"
          :class="{ disabled: currentPage === 0 }"
          @click="onPrev"
          >Prev</span
        >
        <span class="btn" :class="{ disabled: !hasNextPage }" @click="onNext"
          >Next</span
        >
      </div>
    </template>
  </div>
</template>
<script>
import Card from "./Card.vue";
export default {
  name: "List",
  components: { Card },
  data() {
    return {
      currentPage: 0,
    };
  },
  computed: {
    pagedData() {
      return this.posts.slice(
        this.currentPage * 12,
        this.currentPage * 12 + 12
      );
    },
    hasNextPage() {
      if (this.currentPage + 1 === Math.ceil(this.posts.length / 12))
        return false;
      else return true;
    },
  },
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
    noData: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onNext() {
      const length = this.posts.length;
      if ((this.currentPage + 1) * 10 <= length) {
        this.currentPage = this.currentPage + 1;
      }
    },

    onPrev() {
      if (this.currentPage >= 1) {
        this.currentPage = this.currentPage - 1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  max-width: 1020px;
  display: flex;
  margin-top: 100px;
  flex-wrap: wrap;
}

.success {
  color: rgb(93, 146, 13);
}
.failed {
  color: red;
}
.bubble-loading {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  position: relative;
  animation: bubble-loader 0.6s linear alternate infinite;
  top: 50%;
  margin: 0 auto;
}
@keyframes bubble-loader {
  0% {
    box-shadow: -20px 40px 0 4px rgba(0, 0, 0, 0.15), 0 40px 0 0 #333,
      20px 40px 0 0 #333;
  }

  50% {
    box-shadow: -20px 40px 0 0 #333, 0 40px 0 4px rgba(0, 0, 0, 0.15),
      20px 40px 0 0 #333;
  }

  100% {
    box-shadow: -20px 40px 0 0 #333, 0 40px 0 0 #333,
      20px 40px 0 4px rgba(0, 0, 0, 0.15);
  }
}

.no-data {
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.disabled {
  opacity: 0.3;
}

.page-con .btn {
  margin: 16px;
}

.page-con {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
}
</style>