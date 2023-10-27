<template>
  <div class="guide-item">
    <h4 class="title-guide">Sicbo</h4>
    <div>
      <ul>
        <li>{{ $t('sicbo_rule_list_1') }}</li>
        <li>{{ $t('sicbo_rule_list_2') }}</li>
        <li>{{ $t('sicbo_rule_list_3') }}</li>
        <li>{{ $t('sicbo_rule_list_4') }}</li>
      </ul>
      <table border="0" cellpadding="1" cellspacing="1" width="100%">
        <tbody>
        <tr>
          <th style="width: 20%; !important;">{{ $t('sicbo_rule_table_1') }}</th>
          <th style="width: 60%; !important;">{{ $t('sicbo_rule_table_2') }}</th>
          <th style="width: 20%; !important;">{{ $t('sicbo_rule_table_3') }}</th>
        </tr>
        <tr>
          <th colspan="3">{{ $t('sicbo_rule_table_1_0') }}</th>
        </tr>
        <tr>
          <td>{{ $t('sicbo_rule_table_1_1') }}</td>
          <td>{{ $t('sicbo_rule_table_1_5') }}</td>
          <td>1:1</td>
        </tr>
        <tr>
          <td>{{ $t('sicbo_rule_table_1_2') }}</td>
          <td>{{ $t('sicbo_rule_table_1_6') }}</td>
          <td>1:1</td>
        </tr>
        <tr>
          <td>{{ $t('sicbo_rule_table_1_3') }}</td>
          <td>{{ $t('sicbo_rule_table_1_7') }}</td>
          <td>1:1</td>
        </tr>
        <tr>
          <td>{{ $t('sicbo_rule_table_1_4') }}</td>
          <td>{{ $t('sicbo_rule_table_1_8') }}</td>
          <td>1.1</td>
        </tr>
        <tr>
          <td>4 or 17</td>
          <td>{{ $t('sicbo_rule_table_1_9') }}</td>
          <td>1:50</td>
        </tr>
        <tr>
          <td>5 or 16</td>
          <td>{{ $t('sicbo_rule_table_1_10') }}</td>
          <td>1:18</td>
        </tr>
        <tr>
          <td>6 or 15</td>
          <td>{{ $t('sicbo_rule_table_1_11') }}</td>
          <td>1:14</td>
        </tr>
        <tr>
          <td>7 or 14</td>
          <td>{{ $t('sicbo_rule_table_1_12') }}</td>
          <td>1:12</td>
        </tr>
        <tr>
          <td>8 or 13</td>
          <td>{{ $t('sicbo_rule_table_1_13') }}</td>
          <td>1:8</td>
        </tr>
        <tr>
          <td>9, 10, 11 or 12</td>
          <td>{{ $t('sicbo_rule_table_1_14') }}</td>
          <td>1:6</td>
        </tr>
        <tr>
          <th colspan="3">{{ $t('sicbo_rule_table_2_0') }}</th>
        </tr>
        <tr>
          <td>{{ $t('sicbo_rule_table_2_1') }}</td>
          <td>{{ $t('sicbo_rule_table_2_7') }}</td>
          <td>1:150</td>
        </tr>
        <tr>
          <td>{{ $t('sicbo_rule_table_2_2') }}</td>
          <td>{{ $t('sicbo_rule_table_2_8') }}</td>
          <td>1:24</td>
        </tr>
        <tr>
          <td>{{ $t('sicbo_rule_table_2_3') }}</td>
          <td>{{ $t('sicbo_rule_table_2_9') }}</td>
          <td>1:8</td>
        </tr>
        <tr>
          <td>{{ $t('sicbo_rule_table_2_4') }}</td>
          <td>{{ $t('sicbo_rule_table_2_10') }}</td>
          <td>1:5</td>
        </tr>
        <tr>
          <td>{{ $t('sicbo_rule_table_2_5') }}</td>
          <td>{{ $t('sicbo_rule_table_2_11') }}</td>
          <td>1:7</td>
        </tr>
        <tr>
          <td rowspan="3">{{ $t('sicbo_rule_table_2_6') }}</td>
          <td>{{ $t('sicbo_rule_table_2_12') }}</td>
          <td>1:1</td>
        </tr>
        <tr>
          <td>{{ $t('sicbo_rule_table_2_13') }}</td>
          <td>1:2</td>
        </tr>
        <tr>
          <td>{{ $t('sicbo_rule_table_2_14') }}</td>
          <td>1:3</td>
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