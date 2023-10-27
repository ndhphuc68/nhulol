<template>
  <div class="guide-item">
    <h4 class="title-guide">Mahjong</h4>
    <div>
      <h3>{{ $t("mahjong_rule_title_1") }}</h3>
      <p>{{ $t("mahjong_rule_1") }}</p>
      <ul>
        <li>{{ $t("mahjong_rule_list_1_1") }}</li>
        <li>{{ $t("mahjong_rule_list_1_2") }}</li>
        <li>{{ $t("mahjong_rule_list_1_3") }}</li>
        <li>{{ $t("mahjong_rule_list_1_4") }}</li>
      </ul>
      <h3>{{ $t("mahjong_rule_title_2") }}</h3>
      <p>{{ $t("mahjong_rule_2") }}</p>
      <ul>
        <li>{{ $t("mahjong_rule_list_2_1") }}</li>
        <li>{{ $t("mahjong_rule_list_2_2") }}</li>
        <li>
          {{ $t("mahjong_rule_list_2_3") }}
          <table border="0" cellpadding="1" cellspacing="1" width="100%">
            <tbody>
              <tr>
                <th style="width: 15% !important">
                  {{ $t("mahjong_rule_table_1") }}
                </th>
                <th style="width: 85% !important">
                  {{ $t("mahjong_rule_table_2") }}
                </th>
              </tr>
              <tr>
                <td>9</td>
                <td>{{ $t("mahjong_rule_table_3") }}</td>
              </tr>
              <tr>
                <td>8</td>
                <td>{{ $t("mahjong_rule_table_4") }}</td>
              </tr>
              <tr>
                <td>7</td>
                <td>{{ $t("mahjong_rule_table_5") }}</td>
              </tr>
              <tr>
                <td>6</td>
                <td>{{ $t("mahjong_rule_table_6") }}</td>
              </tr>
              <tr>
                <td>5</td>
                <td>{{ $t("mahjong_rule_table_7") }}</td>
              </tr>
              <tr>
                <td>4</td>
                <td>{{ $t("mahjong_rule_table_8") }}</td>
              </tr>
              <tr>
                <td>3</td>
                <td>{{ $t("mahjong_rule_table_9") }}</td>
              </tr>
              <tr>
                <td>2</td>
                <td>{{ $t("mahjong_rule_table_10") }}</td>
              </tr>
              <tr>
                <td>1</td>
                <td>{{ $t("mahjong_rule_table_11") }}</td>
              </tr>
              <tr>
                <td>0</td>
                <td>{{ $t("mahjong_rule_table_12") }}</td>
              </tr>
            </tbody>
          </table>
        </li>
        <li>{{ $t("mahjong_rule_list_2_4") }}</li>
      </ul>
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
.guide-item {
  width: 100%;
}

.title-guide {
  margin-top: 16px;
  color: var(--primaryDoplay);
}
</style>
