<template>
  <div class="guide-item">
    <h4 class="title-guide">Roulette</h4>
    <div>
      <ul>
        <li>{{ $t('roulette_rule_list_1') }}</li>
        <li>{{ $t('roulette_rule_list_2') }}</li>
        <li>{{ $t('roulette_rule_list_3') }}</li>
      </ul>
      <h3>{{ $t('roulette_rule_title_1') }}</h3>
      <p>{{ $t('roulette_rule_1') }}</p>
      <p>{{ $t('roulette_rule_2') }}</p>
      <table border="0" cellpadding="1" cellspacing="1" width="100%">
        <tbody>
        <tr>
          <th width="50%">{{ $t('roulette_rule_table_1') }}</th>
          <th width="50%">{{ $t('roulette_rule_table_2') }}</th>
        </tr>
        <tr>
          <th>{{ $t('roulette_rule_table_3') }}</th>
          <td>1:35</td>
        </tr>
        <tr>
          <th>{{ $t('roulette_rule_table_4') }}</th>
          <td>1:17</td>
        </tr>
        <tr>
          <th>{{ $t('roulette_rule_table_5') }}</th>
          <td>1:11</td>
        </tr>
        <tr>
          <th>{{ $t('roulette_rule_table_6') }}</th>
          <td>1:8</td>
        </tr>
        <tr>
          <th>{{ $t('roulette_rule_table_7') }}</th>
          <td>1:5</td>
        </tr>
        <tr>
          <th>{{ $t('roulette_rule_table_8') }}</th>
          <td>1:2</td>
        </tr>
        <tr>
          <th>{{ $t('roulette_rule_table_9') }}</th>
          <td>1:35</td>
        </tr>
        <tr>
          <th>{{ $t('roulette_rule_table_10') }}</th>
          <td>1:2</td>
        </tr>
        <tr>
          <th>{{ $t('roulette_rule_table_11') }}</th>
          <td rowspan="3">1:2</td>
        </tr>
        <tr>
          <th>{{ $t('roulette_rule_table_12') }}</th>
        </tr>
        <tr>
          <th>{{ $t('roulette_rule_table_13') }}</th>
        </tr>
        <tr>
          <th>{{ $t('roulette_rule_table_15') }}</th>
          <td rowspan="3">1:1</td>
        </tr>
        <tr>
          <th>{{ $t('roulette_rule_table_16') }}</th>
        </tr>
        <tr>
          <th>{{ $t('roulette_rule_table_14') }}</th>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
</script>
<style scoped>
.guide-item {
  width: 100%;
}

.title-guide {
  margin-top: 16px;
  color: var(--primary);
}
</style>