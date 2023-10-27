<template>
  <article class="item pt-3 pb-3 text-start">
    <div class="text">
      {{ item?.no_subject }}
    </div>
    <div>
      <button @click="handleSeeMore">{{ $t("seeMore") }}</button>
    </div>
  </article>
</template>

<script setup>
import { defineProps } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  item: Object,
  modal: String,
  idx: Number,
});
const store = useStore();

const handleSeeMore = () => {
  switch (props.modal) {
    case "faq":
      store.commit("handleToggle", "notice");
      store.commit("handleActiveTab", 1);
      store.commit("handleActiveContent", props.idx);
      break;
    case "notice":
      store.commit("handleToggle", "notice");
      store.commit("handleActiveTab", 0);
      store.commit("handleActiveContent", props.idx);
      break;

    default:
      store.commit("handleToggle", "event");
      break;
  }
  // if (props.modal === "faq") {
  //   store.commit("handleToggle", "notice");
  //   store.commit("handleActiveTab", 1);
  //   store.commit("handleActiveContent", props.idx);
  // } else store.commit("handleToggle", "event");
};
</script>

<style scoped lang="scss">
.item {
  border-top: 1px solid #7a7a7a;
  font-size: 14px;
}
.text {
  width: 100%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
button {
  padding: 0.5rem 0 0 0;
  color: #dc2626;
  font-weight: 600;
}
</style>
