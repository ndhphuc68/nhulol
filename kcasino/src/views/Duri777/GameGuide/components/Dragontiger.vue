<template>
    <div class="guide-item">
        <h4 class="title-guide">Dragon Tiger</h4>
        <div>
            <p v-html="$t('dragontiger_rule_1')"></p>
            <br/>
            <p><strong v-html="$t('dragontiger_rule_2')"></strong></p>
            <p v-html="$t('dragontiger_rule_3')"></p>
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
    color: var(--primary);
}
</style>
