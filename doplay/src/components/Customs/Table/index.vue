<script setup>
import {defineProps, ref} from "vue";

defineProps({
    setting: Object,
    columns: Object,
    rows: Object,
})

const idxRowViewing = ref([]);


// check trạng thái của row đang mở hide content hay không
function isRowViewingDetail(id_row) {
    return idxRowViewing.value.find(
        (item) => item === id_row + ""
    );
}

function handleOnclickCell(id_row) {
    const idxRow = idxRowViewing.value.findIndex(
        (item) => item === id_row + ""
    );
    if (idxRow > -1) {
        idxRowViewing.value.splice(idxRow, 1)
    } else {
        idxRowViewing.value.push(id_row);
    }
}
</script>

<template>
    <div class="table">
        <div :style="{ backgroundColor: setting?.bgColumns }" class="columns">
            <div class="column" v-if="setting?.isViewIndex">
                stt
            </div>
            <div v-for="(col, key, index) in columns" :key="index" class="column">
                {{ col?.label }}
            </div>
        </div>
        <div class="rows">
            <div v-for="(row, indexRow) in rows" :key="indexRow">
                
                
                <!-- click full row-->
                <div v-if="setting?.isActionFullRow"
                     :class="{active : row[setting?.stateRow?.activeByData] ===  setting?.stateRow?.conditionActive }"
                     :style="row[setting?.stateRow?.activeByData] ===  setting?.stateRow?.conditionActive ?  setting?.stateRow?.rowActiveStyles : null"
                     class="row full-row-action"
                     @click="handleOnclickCell(row[setting.id_row])">
                    
                    <div class="value" v-if="setting?.isViewIndex">
                        <p class="title-mobile mobile">stt</p>
                        <p
                            class="content"
                        >
                            <span class="d-flex">  {{ indexRow }} </span>
                        </p>
                    </div>
                    <template v-for="(value, key, indexCell) in row" :key="indexCell">
                        <div v-if=" key !== setting['columnHide'] &&  columns[key]"
                             class="row-mobile btn">
                            <div>
                                <div class="value">
                                    <p class="title-mobile mobile">{{ columns[key]?.label }}</p>
                                    <p
                                        :class="{
                      success:  columns[key]['keySuccess'] === value,
                      warning: columns[key]['keyWarn'] === value,
                      error: columns[key]['keyError'] === value,
                    }"
                                        :style="columns[key]['styles']"
                                        class="content"
                                    >
                    <span class="d-flex">
                       <span v-if="columns[key]['leftIcon']" class="left-icon" v-html="columns[key]['leftIcon']"></span>
                      <span v-if="columns[key]['leftIconActive']" class="left-iconActive"
                            v-html="columns[key]['leftIconActive']"></span>
                      {{ value?.content || value }}
                    </span>
                                    
                                    </p>
                                </div>
                            </div>
                            <!-- This detail content in mobile   -->
                            <div
                                v-if="row[setting.columnHide]  &&
                  key === setting.columnViewHideColumMobile &&
                 isRowViewingDetail(row[setting.id_row])
                "
                                class="value detail-hide-content mobile"
                            >
                                <p>{{ row[setting.columnHide] }}</p>
                            </div>
                        </div>
                    </template>
                    <div v-if="columns['actions']" class="value actions">
                        <p class="title-mobile mobile">action</p>
                        <component
                            :is="columns['actions'].component()"
                            :handleViewDetail="() => handleOnclickCell(row[setting.id_row])"
                            :handleDelete="() => columns['actions']?.handleDelete(row[setting.id_row])"
                        />
                    </div>
                </div>
                
                
                <!-- not  click full row-->
                <div v-if="!setting?.isActionFullRow"
                     :class="{active : row[setting?.stateRow?.activeByData] ===  setting?.stateRow?.conditionActive }"
                     class="row">
                    <template v-for="(value, key, indexCell) in row" :key="indexCell">
                        <div v-if=" key !== setting['columnHide'] && columns[key]"
                             class="row-mobile">
                            <div>
                                <!-- This item does not need to click event   -->
                                <div v-if="!columns[key]?.isAction" class="value">
                                    <p class="title-mobile mobile">{{ columns[key]?.label }}</p>
                                    <p
                                        :class="{
                      success: columns[key]['keySuccess'] === value,
                      warning: columns[key]['keyWarn'] === value,
                      error: columns[key]['keyError'] === value,
                    }"
                                        :style="columns[key]['styles']"
                                        class="content"
                                    >
                     <span class="d-flex">
                       <span v-if="columns[key]['leftIcon']" class="left-icon" v-html="columns[key]['leftIcon']"></span>
                      <span v-if="columns[key]['leftIconActive']" class="left-iconActive"
                            v-html="columns[key]['leftIconActive']"></span>
                      {{ value?.content || value }}
                    </span>
                                    </p>
                                </div>
                                
                                <!-- This item does need to click event   -->
                                <button
                                    v-if="columns[key]?.isAction"
                                    class="value"
                                    @click="
                    handleOnclickCell(row[setting.id_row])
                  "
                                >
                  <span class="title-mobile mobile">{{
                          columns[key]?.label
                      }}</span>
                                    <span class="d-flex align-center">
                    <span class="content"> {{ value?.content || value }} </span>
                    <span
                        v-if="columns[key]?.actionComponent"
                        style="width: 18px; height: 18px"
                        v-html="columns[key]?.actionComponent"
                    ></span>
                  </span>
                                </button>
                            </div>
                            <!-- This detail content in mobile   -->
                            <div
                                v-if="row[setting.columnHide]  &&
                  key === setting.columnViewHideColumMobile &&
                 isRowViewingDetail(row[setting.id_row])
                "
                                class="value detail-hide-content mobile"
                            >
                                <p>{{ row[setting.columnHide] }}</p>
                            </div>
                        </div>
                    </template>
                    <div v-if="columns['actions']" class="value actions">
                        <p class="title-mobile mobile">action</p>
                        <component
                            :is="columns['actions'].component()"
                            :handleViewDetail="() => handleOnclickCell(row[setting.id_row])"
                            :handleDelete="() => columns['actions']?.handleDelete(row[setting.id_row])"
                        />
                    </div>
                </div>
                
                
                <!-- This detail content in laptop   -->
                <div
                    class="laptop"
                >
                    <div
                        v-if="
              row[setting.columnHide] &&
              isRowViewingDetail(row[setting.id_row])
            "
                        class="value"
                    >
                        <p>{{ row[setting.columnHide] }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.table {
    margin-top: 28px;
    overflow-x: auto;
    overflow-y: hidden;
}

.columns {
    display: flex;
    justify-content: space-between;
}

.column {
    padding: 15px 5px;
    min-width: 130px;
    text-align: center;
    text-transform: capitalize;
}

.row {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    position: relative;
    
    .left-iconActive {
        display: none;
    }
    
    .left-icon {
        display: block;
        width: 22px;
        height: 22px;
        margin-right: 5px;
    }
    
    &.active {
        .left-icon {
            display: none;
        }
        
        .left-iconActive {
            display: block;
            width: 22px;
            height: 22px;
            margin-right: 5px;
            
        }
    }
    
}

.full-row-action:hover {
    transform: scale(0.98);
    background-color: #ececec;
    cursor: pointer;
    transition: all linear .2s;
}

.value {
    padding: 10px 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 130px;
    max-width: 150px;
}

.content {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
}

.laptop {
    display: block;
}

.mobile {
    display: none;
}

.detail-hide-content {
    position: absolute;
    width: 100%;
}

.content.success {
    background: #F0FDF4;
    color: #15803D;
}

.content.warning {
    background: #FFFBEB;
    color: #B45309;
}

.content.error {
    background: #FEF2F2;
    color: #B91C1C;
}

@media (max-width: 768px) {
    .full-row-action:hover {
        background-color: unset;
        transform: unset;
    }
    
    .columns {
        display: none;
    }
    
    .laptop {
        display: none;
    }
    
    .mobile {
        display: block;
    }
    
    .row {
        flex-direction: column;
        position: static;
        margin: 30px 0;
        box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    }
    
    .detail-hide-content {
        position: static;
    }
    
    .row-mobile:nth-child(odd) {
        border-radius: 8px;
        background: #FAFAFA;
    }
    
    .value {
        justify-content: space-between;
        max-width: unset;
        min-width: unset;
    }
    
    button.value {
        width: 100%;
    }
    
    .title-mobile, .content {
        max-width: 160px;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* Limit to 2 lines */
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>
