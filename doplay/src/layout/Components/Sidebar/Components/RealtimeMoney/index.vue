<script setup>
import {ref} from 'vue'
import {formatDate} from '@/utils/function'

const withdraws = ref([
    {id: 1, date: '01/12/2015', name: 'Brooklyn Simmons', money: '396.84'},
    {id: 2, date: '01/12/2015', name: 'Brooklyn Simmons', money: '396.84'},
    {id: 3, date: '01/12/2015', name: 'Brooklyn Simmons', money: '396.84'},
    {id: 4, date: '01/12/2015', name: 'Brooklyn Simmons', money: '396.84'},
])
const deposits = ref([
    {id: 1, date: '01/12/2015', name: 'Brooklyn Simmons', money: '396.84'},
    {id: 2, date: '01/12/2015', name: 'Brooklyn Simmons', money: '396.84'},
    {id: 3, date: '01/12/2015', name: 'Brooklyn Simmons', money: '396.84'},
    {id: 4, date: '01/12/2015', name: 'Brooklyn Simmons', money: '396.84'},
])
// let timeID;
// onMounted(() => {
//   timeID = setInterval(() => {
//     withdraws.value.push({id: 1, date: '01/12/2015', name: 'Brooklyn Simmons', money: '396.84'})
//     deposits.value.push({id: 1, date: '01/12/2015', name: 'Brooklyn Simmons', money: '396.84'})
//   }, 200);
// })
// onUnmounted(() => {
//   clearInterval(timeID);
// })
</script>

<template>
    <v-card class="card">
        <v-card-title class="title"><p>Daily Withdraw</p></v-card-title>
        <div class="daily">
            <div class="daily-scroll">
                <div v-for="(item, index) in withdraws" :key="index"
                     class="daily-item d-flex align-center justify-space-between px-3 py-2">
                    <p class="date">
                        {{ formatDate(item.date) }}
                    </p>
                    <p class="name">
                        {{ item.name }}
                    </p>
                    <p class="money">
                        {{ item.money }}₩
                    </p>
                </div>
            </div>
        </div>
    </v-card>
    <v-card class="card">
        <v-card-title class="title">Daily Deposit</v-card-title>
        <div class="daily">
            <div class="daily-scroll">
                <div v-for="(item, index) in deposits" :key="index"
                     class="daily-item d-flex align-center justify-space-between px-3 py-2">
                    <p class="date">
                        {{ formatDate(item.date) }}
                    </p>
                    <p class="name">
                        {{ item.name }}
                    </p>
                    <p class="money">
                        {{ item.money }}₩
                    </p>
                </div>
            </div>
        </div>
    </v-card>
</template>

<style scoped>
.card {
    margin-top: 24px;
    padding: 5px 0;
}

.title {
    background-color: var(--primary);
    color: #FFFFFF;
}

.daily {
    max-height: 144px;
    overflow-y: hidden;
    
}

.daily-scroll {
    animation: scrollRow linear 60s infinite;
}

.daily-item p {
    font-size: 12px;
    width: 30%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.daily-item .money {
    font-weight: 700;
    color: var(--primary);
}

@keyframes scrollRow {
    0% {
        transform: translateY(0%);
        top: 0%;
    }
    5% {
        transform: translateY(0%);
        top: 0%;
    }
    6% {
        transform: translateY(calc(-48px * 1));
        top: calc(-48px * 1);
    }
    10% {
        transform: translateY(calc(-48px * 1));
        top: calc(-48px * 1);
    }
    11% {
        transform: translateY(calc(-48px * 2));
        top: calc(-48px * 2);
    }
    15% {
        transform: translateY(calc(-48px * 2));
        top: calc(-48px * 2);
    }
    16% {
        transform: translateY(calc(-48px * 3));
        top: calc(-48px * 3);
    }
    20% {
        transform: translateY(calc(-48px * 3));
        top: calc(-48px * 3);
    }
    21% {
        transform: translateY(calc(-48px * 4));
        top: calc(-48px * 4);
    }
    25% {
        transform: translateY(calc(-48px * 4));
        top: calc(-48px * 4);
    }
    26% {
        transform: translateY(calc(-48px * 5));
        top: calc(-48px * 5);
    }
    30% {
        transform: translateY(calc(-48px * 5));
        top: calc(-48px * 5);
    }
    31% {
        transform: translateY(calc(-48px * 6));
        top: calc(-48px * 6);
    }
    35% {
        transform: translateY(calc(-48px * 6));
        top: calc(-48px * 6);
    }
    36% {
        transform: translateY(calc(-48px * 7));
        top: calc(-48px * 7);
    }
    40% {
        transform: translateY(calc(-48px * 7));
        top: calc(-48px * 7);
    }
    41% {
        transform: translateY(calc(-48px * 8));
        top: calc(-48px * 8);
    }
    45% {
        transform: translateY(calc(-48px * 8));
        top: calc(-48px * 8);
    }
    46% {
        transform: translateY(calc(-48px * 9));
        top: calc(-48px * 9);
    }
    50% {
        transform: translateY(calc(-48px * 9));
        top: calc(-48px * 9);
    }
    51% {
        transform: translateY(calc(-48px * 10));
        top: calc(-48px * 10);
    }
    55% {
        transform: translateY(calc(-48px * 10));
        top: calc(-48px * 10);
    }
    56% {
        transform: translateY(calc(-48px * 11));
        top: calc(-48px * 11);
    }
    60% {
        transform: translateY(calc(-48px * 11));
        top: calc(-48px * 11);
    }
    61% {
        transform: translateY(calc(-48px * 12));
        top: calc(-48px * 12);
    }
    65% {
        transform: translateY(calc(-48px * 12));
        top: calc(-48px * 12);
    }
    66% {
        transform: translateY(calc(-48px * 13));
        top: calc(-48px * 13);
    }
    70% {
        transform: translateY(calc(-48px * 13));
        top: calc(-48px * 13);
    }
    71% {
        transform: translateY(calc(-48px * 14));
        top: calc(-48px * 14);
    }
    75% {
        transform: translateY(calc(-48px * 14));
        top: calc(-48px * 14);
    }
    76% {
        transform: translateY(calc(-48px * 15));
        top: calc(-48px * 15);
    }
    80% {
        transform: translateY(calc(-48px * 15));
        top: calc(-48px * 15);
    }
    81% {
        transform: translateY(calc(-48px * 16));
        top: calc(-48px * 16);
    }
    85% {
        transform: translateY(calc(-48px * 16));
        top: calc(-48px * 16);
    }
    86% {
        transform: translateY(calc(-48px * 17));
        top: calc(-48px * 17);
    }
    90% {
        transform: translateY(calc(-48px * 17));
        top: calc(-48px * 17);
    }
    91% {
        transform: translateY(calc(-48px * 18));
        top: calc(-48px * 18);
    }
    95% {
        transform: translateY(calc(-48px * 18));
        top: calc(-48px * 18);
    }
    96% {
        transform: translateY(calc(-48px * 19));
        top: calc(-48px * 19);
    }
    97% {
        transform: translateY(0);
        top: 0%;
    }
}
</style>
