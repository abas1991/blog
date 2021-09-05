<template>
  <div class="header" :class="[{ 'b-shadow': headerTop > 0 }]">
    <div class="action-con">
    <div class="flex-1">
    <div class="search-box">
    <input
      type="text"
      v-model="filter"
      @input="debounceSearch"
      placeholder="Search"
      class="search-input"
    />
    <img src="../assets/search.svg" alt="add new" class="search-icon">
    </div>
    </div>
    <div class="flex-1 flex-end">
      <span class="btn add-new-btn" @click="addNew">
        Add new Post
        <img src="../assets/plus.svg" alt="add new" class="add-new">
        </span>
    </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "TopBar",
  data() {
    return {
      filter: "",
      headerTop: 0,
    };
  },
  watch: {
    $route() {
      this.filter = this.currentFilter;
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    ...mapGetters(["currentFilter"]),
  },
  methods: {
    ...mapActions(["setFilter"]),
    debounceSearch(event) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        const value = event.target.value
          ? event.target.value.toLowerCase()
          : "";
        this.setFilter(value);
      }, 500);
    },
    handleScroll() {
      this.headerTop = window.pageYOffset;
    },
    addNew() {
      this.$router.push({ path: "/new" });
    },
  },
};
</script>

<style lang="sass" scoped>
@import "../assets/_variables.scss";
.header
  position: fixed
  top: 0
  left: 0
  right: 0
  padding: 16px
  background-color: white
  display: flex
  justify-content: space-evenly
  align-items: center
  
.action-con
  max-width: 1020px 
  width: 100%
  display: flex
  align-items: center
  
.content
  padding-top: 80px

.b-shadow
  -webkit-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3)
  -moz-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3)
  box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3)

input[type="text"]
  width: 100%
  border: 1px solid $gray-g1
  margin: 8px 0
  outline: none
  padding: 8px
  box-sizing: border-box
  transition: 0.3s

input[type="text"]:focus
  border-color: blueviolet

.search-input
  height: 40px
  border-radius: 24px
  width: 100%
  padding-left: 40px !important

.add-new
  padding-left: 10px

.search-box
  position: relative
  max-width: 316px
  width: 100%
  .search-icon
    position: absolute
    left: 20px
    top: 20px
    fill: $gray

.add-new-btn
  max-width: 150px
</style>
