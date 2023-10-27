<template>
  <Modal
    :handle-close="handleToggleModal"
    :styles="{
      width: 'auto',
      height: 'auto',
      border: 'none',
      overflowY: 'hidden',
      padding: '20px',
    }"
  >
    <div class="container">
      <div class="blog">
        <h5 class="date">30, Apr 2023</h5>
        <h3 class="title">
          Mauris egestas ut lorem sagittis iaculis varius in. Integer euismod
          risus sit tincidunt mollis.
        </h3>
        <p class="blog-content">
          Quam suscipit rhoncus ac nulla luctus nunc odio diam gravida. Libero
          et arcu purus ornare vitae hac purus.
        </p>
        <div class="img-block">
          <img
            alt=""
            class="w-100"
            src="../../../../assets/Duri/blogs/img.png"
          />
        </div>
        <p class="blog-content">
          Malesuada vitae nunc nulla suspendisse viverra velit. Tortor tristique
          viverra nec non ultrices parturient sit. Dignissim lectus erat cursus
          sit nibh augue vestibulum ut urna. Natoque magna cras ut justo in
          suspendisse. Placerat fringilla erat velit interdum ipsum platea
          consequat. Iaculis id mi id tortor tortor amet lacus pellentesque.
          Accumsan purus in Bibendum sagittis elementum mauris feugiat id
          vulputate ut ullamcorper. Nibh odio non fusce ornare lorem tempor
          felis. Dui scelerisque dictumst turpis vestibulum varius. Diam luctus
          pulvinar nunc mi fermentum arcu egestas sit. In at arcu viverra
          bibendum. Et laoreet nibh amet euismod condimentum. Enim ullamcorper
          nunc turpis mauris auctor mi pellentesque pellentesque dictumst.
          Nullam dignissim feugiat quis massa magna. Ut nunc id euismod est
          velit sed ligula porttitor nibh. Malesuada vitae nunc nulla
          suspendisse viverra velit. Tortor tristique viverra nec non ultrices
          parturient sit. Dignissim lectus erat cursus sit nibh augue vestibulum
          ut urna. Natoque magna cras ut justo in suspendisse. Placerat
          fringilla erat velit interdum ipsum platea consequat. Iaculis id mi id
          tortor tortor amet lacus pellentesque. Accumsan purus in
        </p>
      </div>
    </div>
  </Modal>
</template>
<script setup>
import { defineProps } from "vue";
import Modal from "@/components/Duri/modal/Modal.vue";

defineProps({
  handleToggleModal: Function,
});
</script>

<style lang="scss" scoped>
.blog {
  margin-top: 50px;
}

.title {
  font-size: 32px;
  font-weight: 700;
}

.date {
  font-size: 16px;
  line-height: 150%;
}

.container {
  margin: 10px 0;
  overflow: auto;
  max-height: 83vh;

  &::-webkit-scrollbar {
    display: none;
  }
}

.img-block {
  margin: 32px 0;
  border-right: 5px;
}

.blog-content {
  font-size: 16px;
  line-height: 160%;
  text-align: justify;
}
</style>