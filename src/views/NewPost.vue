<template>
  <div class="new-con">
    <div class="w-full">
      <div class="new-header">
        <div class="flex">
          <span class="back"
            ><img src="../assets/back.svg" alt="back" @click="back"
          /></span>
          <span class="new-text">New post</span>
        </div>
        <span class="btn" @click="addNew"> Publish post </span>
      </div>
      <div class="input-con">
        <label>Title</label>
        <input type="text" v-model="post.title"  @input="$v.post.title.$touch()" />
        <span v-if="$v.post.title.$error" class="text-danger"
          >Title is required</span
        >
      </div>
      <div class="input-con">
        <span>Text</span>
        <textarea v-model="post.text"  @input="$v.post.text.$touch()"/>
        <span v-if="$v.post.text.$error" class="text-danger"
          >Text is required</span
        >
      </div>
      <div class="input-con">
        <span>Tags</span>
        <div class="relative">
          <input type="text" v-model="tag" />
          <span @click="addTag" class="add-action">
            Add
            <img src="../assets/tag-plus.svg" alt="tag" />
          </span>
        </div>
        <div>
          <span class="tag" v-for="(item, index) in post.tags" :key="index">
            <img
              @click="remove(index)"
              class="remove-icon"
              src="../assets/remove.svg"
              alt=""
            />
            {{ item }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  name: "AddNew",
  data() {
    return {
      post: {
        title: "",
        text: "",
        tags: [],
      },
      tag: "",
    };
  },
  validations() {
    return {
      post: {
        title: {
          required,
        },
        text: {
          required,
        },
      },
    };
  },
  methods: {
    ...mapActions(["addPost"]),
    back() {
      this.$router.push({ path: "/posts" });
    },
    addTag() {
      if (this.tag) {
        this.post.tags.push(this.tag);
        this.tag = "";
      }
    },
    remove(index) {
      this.post.tags.splice(index, 1);
    },
    addNew() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.addPost(this.post);
        this.post = {
          title: "",
          text: "",
          tags: [],
        };
        this.$v.$reset();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/_variables.scss";
.tag {
  border: 1px solid $light-gray;
  box-sizing: border-box;
  border-radius: 24px;
  font-size: 14px;
  padding: 4px 12px;
  margin: 8px;
  display: inline-block;
  color: $gray;
}
.new-con {
  max-width: 503px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  input[type="text"] {
    height: 40px;
  }
  textarea {
    height: 120px;
  }
  input[type="text"],
  textarea {
    border: 1px solid $light-gray;
    box-sizing: border-box;
    border-radius: 8px;
    width: 100%;
    margin-top: 4px;
    padding: 0 16px;
  }
}

.new-header {
  display: flex;
  justify-content: space-between;
}

.back {
  width: 24px;
  height: 24px;
  border: 1px solid;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24px;
}

.new-text {
  color: $black;
  font-size: 22px;
  font-weight: bold;
}

.input-con {
  margin-top: 24px;
}

.add-action {
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
  color: $light-gray;
}

.remove-icon {
  margin-right: 8px;
}
</style>
