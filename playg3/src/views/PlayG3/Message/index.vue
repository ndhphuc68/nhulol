<script setup>
import {ref, computed, watch} from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import Action from "@/components/PlayG3/Action"
import {confirm, toastMessage} from "@/utils/PlayG3/toast";
import {converTime} from "@/utils/PlayG3";
import {columns, infoTable} from "./data";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const listMessage = computed(() => infoTable);

const currentPage = ref(1);
const itemsPerPage = 4;

const expandedRows = ref([]);
const showMobile = ref(-1);

const expandAll = ($event) => {
    const isExpanded = expandedRows?.value.find(
        (p) => p.id === $event.data.id
    );
    if (isExpanded) {
        expandedRows.value = [];
    } else {
        expandedRows.value = [$event.data];
    }
};

const confirmDeleteProduct = (prod) => {
    confirm(t("do you really want to delete?"), () => {
        handleDeleteHelpCenter(prod.id);
    });
};

const handleDeleteHelpCenter = async (id) => {
    toastMessage.success('delete success : ' + id)
    
};

const displayData = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return listMessage.value.slice(startIndex, endIndex);
});
watch(currentPage, ()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
})

const getStatusLabel = (status) => {
    switch (status) {
        case 1:
            return "Check";
        
        case 0:
            return "Not";
        default:
            return null;
    }
};
</script>

<template>
    <section class="container">
        <div class="head-tab">
            <h4 class="title">
                {{ $t('message') }}
            </h4>
        </div>
        <div class="query-list">
            <div class="table-wrapper my-3 h-100">
                <DataTable
                    :value="listMessage"
                    class="p-datatable-lg"
                    paginator
                    dataKey="id"
                    :rows="5"
                    @rowClick="expandAll"
                    v-model:expandedRows="expandedRows"
                >
                    <template v-for="col of columns" :key="col.field">
                        <Column
                            :field="col.field"
                            :header="$t(col.header)"
                            v-if="col?.isStatus"
                        >
                            <template #body="slotProps">
                                <Tag
                                    :value="getStatusLabel(slotProps.data[col.field])"
                                    class="status"
                                    :class="getStatusLabel(slotProps.data[col.field])"
                                />
                            </template>
                        </Column>
                        <Column v-else :field="col.field" :header="$t(col.header)">
                            <template #body="slotProps">
                            <span>
                                {{
                                    col?.isIndex ? slotProps.index + 1 :
                                        col?.callback
                                            ? col?.callback(slotProps.data[col.field])
                                            : slotProps.data[col.field]
                                }}
                            </span>
                            </template>
                        </Column>
                    </template>
                    
                    <Column
                        header=""
                        :exportable="false"
                        style="min-width: 8rem"
                    >
                        <template #body="slotProps">
                            <Action
                                :handle-delete=" () => { confirmDeleteProduct(slotProps.data) }"
                                :handleViewDetail="()=>expandAll(slotProps)"
                            />
                        </template>
                    </Column>
                    <template #expansion="slotProps">
                        <div class="p-3 d-flex flex-column align-start">
                            <h5>{{ slotProps.data.subject }}</h5>
                            <p class="text-start">{{ slotProps.data.content }}</p>
                        </div>
                    </template>
                </DataTable>
            </div>
            <div class="table-mobile mt-3 d-md-none">
                <article class="mt-3" v-for="(item, index) in displayData" :key="index">
                    <div class="align-center head ">
                        <span> No.{{ index + 1 }} </span>
                        <Action
                            :handle-delete=" () => { confirmDeleteProduct(item) }"
                            :handleViewDetail="()=>showMobile === index ? (showMobile = -1) : (showMobile = index)"
                        />
                    </div>
                    <div
                        @click="
              showMobile === index ? (showMobile = -1) : (showMobile = index)
            "
                        class="item-row"
                    >
                        <span>{{ $t("content") }}</span>
                        <span>{{ item?.subject }}</span>
                    </div>
                    <div v-if="showMobile === index" class="d-flex flex-column">
                        <h6>{{ item?.subject }}</h6>
                        <p>{{ item?.content }}</p>
                    </div>
                    <div class="item-row">
                        <span>{{ $t("status") }}</span>
                        <Tag
                            :value="getStatusLabel(item?.status)"
                            class="status"
                            :class="getStatusLabel(item?.status)"
                        />
                    </div>
                    
                    <div class="item-row">
                        <span>{{ $t("updateTime") }}</span>
                        <span>{{ converTime(item.date) }}</span>
                    </div>
                </article>
            </div>
            <div class="mt-3 d-md-none">
                <v-pagination
                    v-model="currentPage"
                    :length="Math.ceil(listMessage?.length / itemsPerPage)"
                    rounded="0"
                ></v-pagination>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.container {
    margin: 3.125rem auto;
}

.head-tab {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .title {
        font-size: 1.75rem;
        display: flex;
        align-items: center;
    }
}

.query-list {
    .status {
        padding: 6px 10px
    }
    
    .status.Check {
        border-radius: 20px;
        background: rgba(21, 128, 61, 0.20);
        color: #16a34a;
    }
    
    .status.Not {
        border-radius: 20px;
        background: rgba(185, 28, 28, 0.20);
        color: #d23449;
    }
    
    
    .table-mobile {
        /* max-height: 20rem; */
        font-size: 14px;
        overflow: auto;
        
        article {
            padding: 1rem;
            border-radius: 8px;
            border: 1px solid #545454;
            background: #1D1D20;
            
            .head {
                border-bottom: 1px solid #27272A;
                padding-bottom: 0;
                margin-bottom: 1rem;
                border-radius: 0;
            }
            
            .item-row {
                padding: 1rem 0.5rem;
                
                &:nth-child(even) {
                    background: #27272C;
                }
            }
            
            div {
                display: flex;
                justify-content: space-between;
                
                border-radius: 5px;
                
                span {
                    text-align: left;
                    max-width: 48%;
                    
                    &:last-child {
                        text-align: right;
                    }
                }
            }
        }
    }
    
    @media (max-width: 767px) {
        .table-wrapper {
            display: none;
        }
    }
}

@media (max-width: 768px) {
    .query-list {
        .header {
            display: none;
        }
        
    }
}
</style>

<style lang="scss">

.table-wrapper {
    .p-datatable-wrapper {
        height: 100% !important;
        min-height: 500px;
        
        font-size: 12px;
        
        thead {
            top: 0;
            
            tr {
                th {
                    background-color: #27272C;
                    text-align: center;
                    color: var(--textPlayG3);
                    border-bottom: 1px solid #27272A;
                }
            }
        }
        
        tbody {
            tr {
                outline: none;
                background-color: #1D1D20;
                
                td {
                    border-bottom: 1px solid #27272A;
                    padding: 0.5rem;
                    text-align: center;
                    background-color: #1D1D20;
                    color: var(--textSecondPlayG3)
                }
            }
        }
    }
    
    .p-datatable .p-column-header-content {
        justify-content: center;
    }
    
    .p-component {
        background-color: #1D1D20;
    }
}
</style>
