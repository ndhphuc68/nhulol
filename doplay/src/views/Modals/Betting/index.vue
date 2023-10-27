<script setup>
import {ref} from "vue"
import {useI18n} from 'vue-i18n';
import {vInfiniteScroll} from '@vueuse/components'
import Table from '@/components/Customs/Table'
import Loading from '@/components/Loading'

const isLoading = ref(false);
const {t} = useI18n();
const setting = {
  id_row: "id_item", /*important*/
  bgColumns: "#F2F2F2",
  isActionFullRow: false,
};
const columns = {
  number: {
    label: t("number"),
    isAction: false,
    styles: {},
  },
  game: {
    label: t('game'),
    isAction: false,
    styles: {}
  },
  win: {
    label: t('win'),
    isAction: false,
    styles: {
      padding: '5px',
      borderRadius: '5px',
      background: '#F0FDF4',
      color: '#15803D',
    }
  },
  loss: {
    label: t('loss'),
    isAction: false,
    styles: {
      padding: '5px',
      borderRadius: '5px',
      background: '#FEF2F2',
      color: '#B91C1C'
    }
  },
  result: {
    label: t('result'),
    isAction: false,
    styles: {
      padding: '5px',
      borderRadius: '5px',
      color: '#2563EB'
    }
  },
  date: {
    label: t('date'),
    isAction: false,
    styles: {}
  }
};
const rows = ref([
  {
    id_item: "1",
    number: "1",
    game: "blackjack",
    win: "0",
    loss: '100000',
    result: '100000',
    date: "08.01.2023   13:25"
  },
  {
    id_item: "2",
    number: "2",
    game: "blackjack",
    win: "0",
    loss: '100000',
    result: '100000',
    date: "08.01.2023   13:25"
  },
  {
    id_item: "3",
    number: "3",
    game: "blackjack",
    win: "0",
    loss: '100000',
    result: '100000',
    date: "08.01.2023   13:25"
  },
]);
let hasLoadedMore = ref(false);

function onLoadMore() {
  const length = rows.value.length + 1;
  isLoading.value = true
  if (!hasLoadedMore.value) {
    // console.log("loadmore")
    hasLoadedMore.value = true;
    setTimeout(() => {
      rows.value.push(...Array.from({length: 5}, (_, i) => {
        return {
          id_item: length + i,
          number: length + i,
          game: "blackjack",
          win: "0",
          loss: '100000',
          result: '100000',
          date: "08.01.2023   13:25"
        }
      },))
      isLoading.value = false;
      hasLoadedMore.value = false
    }, 3000);


    // clearTimeout(idTimeOut)
  }

}
</script>

<template>
  <div class="betting">
    <div v-infinite-scroll="[onLoadMore, { 'distance' : 15 }]" class="infinite-list-wrapper" style="overflow: auto">
      <div class="list">
        <Table :columns="columns" :rows="rows" :setting="setting"/>
        <div v-if="isLoading" class="loading" style="margin-top: 10px">
          <Loading :size="'20'"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.betting {
  max-width: 1128px;
  min-width: 800px;
  min-height: 700px;
}

.infinite-list-wrapper {
  height: 700px;
  text-align: center;

  &::-webkit-scrollbar {
    display: none;
  }
}

.loading {
  overflow: hidden;
}

@media (max-width: 768px) {
  .betting {
    width: 100vw;
    padding: 10px;
    min-width: unset;
    border-radius: 5px;
  }
}
</style>