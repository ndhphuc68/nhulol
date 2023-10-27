<template>
  <form @submit="handleSubmit">
    <div class="field">
      <div class="title">
        <IconTitle />
        <span>{{ $t("title") }}*</span>
      </div>
      <input value="test" disabled type="text" placeholder="Enter the title" />
    </div>
    <div class="field">
      <div class="title">
        <IconContent />
        <span>{{ $t("content") }}*</span>
      </div>
      <textarea :placeholder="`${t('content')}`" rows="8" />
    </div>
    <div class="wrap-btn">
      <button @click="store.commit('handleToggle', 'serviceCenter')">
        {{ $t("cancel") }}
      </button>
      <button class="submit" type="submit">{{ $t("save") }}</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import IconTitle from "@/assets/SCCasino/icon/IconTitle.vue";
import IconContent from "@/assets/SCCasino/icon/IconContent.vue";

const store = useStore();
const { t } = useI18n();

const handleSubmit = () => {
  event.preventDefault();
  console.log(1);
};
</script>

<style scoped lang="scss">
.field {
  margin-bottom: 20px;
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    span {
      color: var(--black-600, #7a7a7a);
      font-size: 16px;
      font-weight: 600;
      margin-left: 5px;
    }
  }

  input[type="text"] {
    padding: 6px 16px;
    width: 100%;
    border-radius: 8px;
    border: 1px solid var(--neutral-300, #d4d4d8);

    &:disabled {
      background: #e3e3e3;
    }
  }

  textarea {
    padding: 6px 16px;
    width: 100%;
    border-radius: 8px;
    max-height: 300px;
    border: 1px solid var(--neutral-300, #d4d4d8);

    &:hover,
    &:focus {
      outline: none;
    }
  }
}

.wrap-btn {
  width: 100%;
  text-align: right;

  button {
    padding: 10px 30px;
    border-radius: 8px;
    border: 1px solid var(--primarySCCasino);
    color: var(--500, #2196f3);
    font-size: 16px;
    font-weight: 500;
    transition: all 0.3s;

    &:last-child {
      margin-left: 15px;
    }

    &:hover {
      opacity: 0.8;
      transform: scale(0.9);
      transition: all 0.3s;
    }
  }

  .submit {
    background: var(--primarySCCasino);
    color: #fff;
  }

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, calc(50% - 7.5px));
    grid-gap: 15px;

    button {
      &:last-child {
        margin: 0;
      }
    }
  }
}
</style>
