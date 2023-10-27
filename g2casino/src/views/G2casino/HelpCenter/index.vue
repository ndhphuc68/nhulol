<script setup>
import { ref } from 'vue';
import { useI18n } from "vue-i18n";
import { formatDate } from "@/utils";
import RowHelpCenter from './RowHelpCenter';
import BannerPage from '@/components/G2casino/BannerPage';

const { t } = useI18n()
const columns = {
    no: { text: "#" },
    cu_question: {
        text: t("title"),
    },
    cu_status: {
        text: t("state"),
    },
    cu_created: {
        text: t("dateOfRequest"),
        callback: (row, date) => {
            return formatDate(date);
        },
    },
    action: { text: "" },
};
const listHelp = [
    {
        'cu_question': 'Pellentesque vulputate enim risus ',
        'cu_status': 'COMPLETE',
        'cu_created': '20220406',
        'cu_answer': 'Laoreet duis semper et tincidunt quis dui laoreet. Lectus est amet est pulvinar gravida integer sed. In turpis pellentesque pellentesque sodales quam fames augue ultrices neque. Sit blandit blandit mattis placerat.'
    },
    {
        'cu_question': 'Pellentesque vulputate enim risus ',
        'cu_status': 'failed',
        'cu_created': '20220406',
        'cu_answer': 'Laoreet duis semper et tincidunt quis dui laoreet. Lectus est amet est pulvinar gravida integer sed. In turpis pellentesque pellentesque sodales quam fames augue ultrices neque. Sit blandit blandit mattis placerat.'
    },
    {
        'cu_question': 'Pellentesque vulputate enim risus ',
        'cu_status': 'ACTIVE',
        'cu_created': '20220406',
        'cu_answer': 'Laoreet duis semper et tincidunt quis dui laoreet. Lectus est amet est pulvinar gravida integer sed. In turpis pellentesque pellentesque sodales quam fames augue ultrices neque. Sit blandit blandit mattis placerat.'
    }

]
const currentPage = ref(1);
const itemsPerPage = ref(7);

const handleDeleteHelpCenter = async (idx) => {
    // const res = await store.dispatch("deleteHelpCenterAction", {
    //     idx: idx,
    //     data: {
    //         memberIdx: userInfor.value.me_idx,
    //         mInviteCode: userInfor.value.me_invite_code,
    //         mNickName: userInfor.value.me_nickname,
    //     },
    // });
    // if (res?.is_success) {
    //     await store.dispatch("showAlert", {
    //         type: "success",
    //         message: t("delete_success"),
    //     });
    // } else {
    //     await store.dispatch("showAlert", {
    //         type: "error",
    //         message: t("delete_error"),
    //     });
    // }
};

</script>

<template>
    <BannerPage :page="$t('helpCenter')" />
    <div class="helpcenter-wrapper container">
        <div class="d-flex align-center justify-content-between">
            <router-link class="btn-query" to="/query-creation">
                <span>{{ $t("queryCreation") }}</span>
                <i class="pi pi-pencil " style="font-size: 1rem"></i>
            </router-link>
        </div>
        <div class="card">
            <table class="custom">
                <tr class="table-titles">
                    <th v-for="(col, key, index) in columns" :key="index">
                        {{ col?.text }}
                    </th>
                </tr>
                <template v-for="(row, index) in listHelp" :key="index">
                    <RowHelpCenter @handleDeleteHelpCenter="handleDeleteHelpCenter" :columns="columns" :index="index"
                        :row="row" cellClickOnMobile="title" detailKey="cu_answer" />
                </template>
            </table>
            <v-pagination v-model="currentPage" :length="Math.ceil(listHelp?.length / itemsPerPage)"
                rounded="0"></v-pagination>
        </div>
    </div>
</template>

<style scoped lang="scss">
.helpcenter-wrapper {
    margin-top: 3rem;
    margin-bottom: 3rem;
}

.btn-query {
    border-radius: 4px;
    padding: 12px;
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-bottom: 2.5rem;
    background: #162F86;
    text-decoration: none;
    color: #ffffff;

    span {
        margin-right: 0.8rem;
    }

    &:hover {
        transform: scale(0.97);
        opacity: 0.9;
        transition: all linear 0.2s;
    }
}
@media (max-width: 768px) {
    .card {
        border: none;
    }
}
</style>