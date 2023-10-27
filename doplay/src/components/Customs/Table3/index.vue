<script setup>
const columns = [
  {
    key: 'number',
    label: 'number',
    style: {},
  },
  {
    key: 'withdrawlaccount',
    label: 'withdrawlaccount',
    style: {},
  },
  {
    key: 'withdrawl',
    label: 'withdrawl',
    style: {},
  },
  {
    key: 'currencyxchangeDate',
    label: 'currencyx changeDate',
    style: {},
  }
]
const rows = [
  {
    number: 1,
    withdrawlaccount: 'withdrawlaccount',
    withdrawl: 'withdrawl',
    currencyxchangeDate: 'currencyxchangeDate'
  },
  {
    number: 2,
    withdrawlaccount: 'withdrawlaccount',
    withdrawl: 'withdrawl',
    currencyxchangeDate: 'currencyxchangeDate'
  },
  {
    number: 3,
    withdrawlaccount: 'withdrawlaccount',
    withdrawl: 'withdrawl',
    currencyxchangeDate: 'currencyxchangeDate'
  },
  {
    number: 4,
    withdrawlaccount: 'withdrawlaccount',
    withdrawl: 'withdrawl',
    currencyxchangeDate: 'currencyxchangeDate'
  }
];

function getLabel(key) {
  const column = columns.find((item) => {
    return item.key === key
  });
  return column.label;
}
</script>

<template>
  <div class="table">
    <div class="columns">
      <div v-for="(col, index) in columns" :key="index" class="col-item">
        <p>{{ col.label }}</p>
      </div>
    </div>
    <div class="rows">
      <div v-for="(row,index) in rows" :key="index" class="row">
        <div v-for="(value, key) in row" :key="value" class="row-item">
          <div class="item-row-title">
            <p>
              {{ getLabel(key) }}
            </p>
          </div>
          <div>
            <p>
              {{ value }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table {
  margin-top: 20px;
  overflow-x: auto;
  overflow-y: hidden;
}

.columns {
  display: flex;
  justify-content: space-between;
  background: #F4F4F5;
}

.col-item {
  padding: 12px;
  text-align: center;
  min-width: 50px;
}

.col-item p {
  max-width: 160px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
}

.row {
  display: flex;
  justify-content: space-between;
}

.row-item {
  padding: 12px;
  min-width: 80px;
}

.row-item p {
  max-width: 160px;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-row-title {
  display: none;
}


@media (max-width: 768px) {
  .columns {
    display: none;
  }

  .item-row-title {
    display: block;
  }

  .row {
    flex-direction: column;
    margin: 30px 0;
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  }

  .row-item {
    display: flex;
    justify-content: space-between;
    padding: 15px 8px;
    align-items: center;
  }

  .row-item:nth-child(odd) {
    border-radius: 8px;
    background: #FAFAFA;
  }
}
</style>