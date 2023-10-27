<template>
    <div class="guide-item">
        <h4 class="title-guide">Bullfight</h4>
        <div>
            <h3>{{ $t("bullfight_rule_title_1") }}</h3>
            <p>{{ $t("bullfight_rule_1") }}</p>
            <h3>{{ $t("bullfight_rule_title_2") }}</h3>
            <ul>
                <li>{{ $t("bullfight_rule_list_1_1") }}</li>
                <li>{{ $t("bullfight_rule_list_1_2") }}</li>
                <li>{{ $t("bullfight_rule_list_1_3") }}</li>
                <li>{{ $t("bullfight_rule_list_1_4") }}</li>
            </ul>
            <h3>{{ $t("bullfight_rule_title_3") }}</h3>
            <ul>
                <li>{{ $t("bullfight_rule_list_2_1") }}</li>
                <li>
                    {{ $t("bullfight_rule_list_2_2") }}
                    <blockquote>
                        <h4>{{ $t("bullfight_rule_title_4") }}</h4>
                        <p class="box">{{ $t("bullfight_rule_list_2_2_1") }}</p>
                        <p class="box">{{ $t("bullfight_rule_list_2_2_2") }}</p>
                    </blockquote>
                </li>
                <li>{{ $t("bullfight_rule_list_2_3") }}</li>
            </ul>
            <table border="0" cellpadding="1" cellspacing="1" width="100%">
                <tbody>
                <tr>
                    <th colspan="4">{{ $t("bullfight_rule_table_1_0") }}</th>
                </tr>
                <tr>
                    <th colspan="2" width="50%">
                        {{ $t("bullfight_rule_table_1_1") }}
                    </th>
                    <th colspan="2" width="50%">
                        {{ $t("bullfight_rule_table_1_2") }}
                    </th>
                </tr>
                <tr>
                    <th style="width: 25% !important">
                        {{ $t("bullfight_rule_table_1_3") }}
                    </th>
                    <th style="width: 25% !important">
                        {{ $t("bullfight_rule_table_1_4") }}
                    </th>
                    <th style="width: 25% !important">
                        {{ $t("bullfight_rule_table_1_3") }}
                    </th>
                    <th style="width: 25% !important">
                        {{ $t("bullfight_rule_table_1_5") }}
                    </th>
                </tr>
                <tr>
                    <td>No Bull ~ Bull6</td>
                    <td>{{ $t("bullfight_rule_table_1_6") }}</td>
                    <td>No Bull ~ Bull6</td>
                    <td>{{ $t("bullfight_rule_table_1_9") }}</td>
                </tr>
                <tr>
                    <td>Bull7 ~ Bull9</td>
                    <td>{{ $t("bullfight_rule_table_1_7") }}</td>
                    <td>Bull7 ~ Bull9</td>
                    <td>{{ $t("bullfight_rule_table_1_10") }}</td>
                </tr>
                <tr>
                    <td>BullBull</td>
                    <td>{{ $t("bullfight_rule_table_1_8") }}</td>
                    <td>BullBull</td>
                    <td>{{ $t("bullfight_rule_table_1_11") }}</td>
                </tr>
                </tbody>
            </table>
            <ul>
                <li>{{ $t("bullfight_rule_list_3_1") }}</li>
                <li>{{ $t("bullfight_rule_list_3_2") }}</li>
            </ul>
            <p>{{ $t("bullfight_rule_2") }}</p>
            <table border="0" cellpadding="1" cellspacing="1" width="100%">
                <tbody>
                <tr>
                    <th colspan="3">{{ $t("bullfight_rule_table_2_0") }}</th>
                </tr>
                <tr>
                    <th style="width: 40% !important">
                        {{ $t("bullfight_rule_table_1_3") }}
                    </th>
                    <th style="width: 20% !important">
                        {{ $t("bullfight_rule_table_2_1") }}
                    </th>
                    <th style="width: 40% !important">
                        {{ $t("bullfight_rule_table_2_2") }}
                    </th>
                </tr>
                <tr>
                    <td>{{ $t("bullfight_rule_table_2_3") }}</td>
                    <td>{{ $t("bullfight_rule_table_2_4") }}</td>
                    <td rowspan="2">{{ $t("bullfight_rule_table_2_5") }}</td>
                </tr>
                </tbody>
            </table>
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
    color: #254ee0;
}
</style>
