<template>
  <div class="guide-item text-start">
    <h4 class="title-guide">Blackjack</h4>
    <div>
      <h3>{{ $t("blackjack_rule_title_1") }}</h3>
      <p>{{ $t("blackjack_rule_1") }}</p>
      <p>{{ $t("blackjack_rule_2") }}</p>
      <h3>{{ $t("blackjack_rule_title_2") }}</h3>
      <ul>
        <li>{{ $t("blackjack_rule_list_1_1") }}</li>
        <li>{{ $t("blackjack_rule_list_1_2") }}</li>
        <li>{{ $t("blackjack_rule_list_1_3") }}</li>
        <li>{{ $t("blackjack_rule_list_1_4") }}</li>
        <li>{{ $t("blackjack_rule_list_1_5") }}</li>
        <li>{{ $t("blackjack_rule_list_1_6") }}</li>
      </ul>
      <h3>{{ $t("blackjack_rule_title_3") }}</h3>
      <ul>
        <li>{{ $t("blackjack_rule_list_2_1") }}</li>
        <li>{{ $t("blackjack_rule_list_2_2") }}</li>
        <li>{{ $t("blackjack_rule_list_2_3") }}</li>
      </ul>
      <h3>{{ $t("blackjack_rule_title_4") }}</h3>
      <ul>
        <li>{{ $t("blackjack_rule_list_3_1") }}</li>
        <li>{{ $t("blackjack_rule_list_3_2") }}</li>
        <li>{{ $t("blackjack_rule_list_3_3") }}</li>
        <li>{{ $t("blackjack_rule_list_3_4") }}</li>
        <li>{{ $t("blackjack_rule_list_3_5") }}</li>
        <li>{{ $t("blackjack_rule_list_3_6") }}</li>
        <li>{{ $t("blackjack_rule_list_3_7") }}</li>
        <li>{{ $t("blackjack_rule_list_3_8") }}</li>
      </ul>
      <h3>{{ $t("blackjack_rule_title_5") }}</h3>
      <p>{{ $t("blackjack_rule_3") }}</p>
      <h3>{{ $t("blackjack_rule_title_6") }}</h3>
      <p>{{ $t("blackjack_rule_4") }}</p>
      <p>{{ $t("blackjack_rule_5") }}</p>
      <h3>{{ $t("blackjack_rule_title_7") }}</h3>
      <p>{{ $t("blackjack_rule_6") }}</p>
      <p>{{ $t("blackjack_rule_7") }}</p>
      <p>{{ $t("blackjack_rule_8") }}</p>
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
.guide-item text-start {
  width: 100%;
}
.title-guide {
  margin-top: 16px;
  color: var(--pink);
}
</style>
