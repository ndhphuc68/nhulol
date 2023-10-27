<script setup>
import Button from 'primevue/button'
import {defineProps, defineEmits} from "vue";

const $emits = defineEmits(["handleSelectCasino"]);

defineProps({
    casino: Object,
});
</script>

<template>
    <div class="casino-item position-relative" @click="$emits('handleSelectCasino', casino?.key)">
        <div class="d-flex justify-center">
            <!--            <img-->
            <!--                :src="-->
            <!--          require(`@/assets/G2casino/logo/live-companies/${-->
            <!--            casino?.key.split('_')[0]-->
            <!--          }.png`)-->
            <!--        "-->
            <!--                alt="casino-logo"-->
            <!--                class="position-absolute casino-company no-active"-->
            <!--            />-->
            <!--            <img-->
            <!--                :src="-->
            <!--          require(`@/assets/G2casino/logo/live-companies/${-->
            <!--            casino?.key.split('_')[0]-->
            <!--          }Active.png`)-->
            <!--        "-->
            <!--                alt="casino-logo"-->
            <!--                class="position-absolute casino-company active"-->
            <!--            />-->
            <img
                :src="require(`@/assets/G2casino/logo/lives/${casino?.key}_1.png`)"
                alt="casino-logo"
                class="casino-img"
            />
        </div>
        <div class="casino-name">
            <div class="card-content">
                <div>
                    <h4 class="title-game">{{ casino.name }} </h4>
                    <span class="title-company">{{ casino?.key?.split('_casino')[0] }}</span>
                </div>
          
                <Button class="button">
                    <span> {{ $t('betNow') }} </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M12.13 2H11.87C6.43 2 2 6.43 2 11.87V12.13C2 17.57 6.43 22 11.87 22H12.13C17.57 22 22 17.57 22 12.13V11.87C22 6.43 17.57 2 12.13 2ZM15.62 12.53L13.16 15C13.01 15.14 12.82 15.22 12.63 15.22C12.44 15.22 12.24 15.14 12.1 15C11.8 14.7 11.8 14.23 12.1 13.94L13.28 12.75H8.91C8.49 12.75 8.16 12.41 8.16 12C8.16 11.59 8.49 11.25 8.91 11.25H13.28L12.1 10.06C11.8 9.77 11.8 9.3 12.1 9C12.39 8.71 12.86 8.71 13.16 9L15.62 11.47C15.92 11.76 15.92 12.24 15.62 12.53Z"
                            fill="white"/>
                    </svg>
                </Button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.casino-item {
    cursor: pointer;
    border-radius: 12px;
    border: 1px solid #e4e4e7;
    box-shadow: 4px 0 12px rgba(0, 0, 0, 0.15);
    overflow: hidden;
}

.casino-company {
    top: 5px;
    right: 10px;
    height: 48px;
}

.casino-company.active {
    display: none;
}

.casino-item:hover .casino-company.active {
    display: block;
}

.casino-item:hover .casino-company.no-active {
    display: none;
}

.casino-item:hover {
    background-image: url("@/assets/G2casino/gifs/hover.gif");
    transform: scale(0.97);
    transition: all linear .3s;
    box-shadow: rgba(17, 12, 46, 0.15) 0 48px 100px 0;
    //.casino-img {
    //    animation: movie 1s infinite;
    //}
}


@keyframes movie {
    0% {
        transform: scale(0.9);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(0.9);
    }
}

.casino-name {
    padding: 1rem 5px;
}


.card-content {
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    
    .button {
        font-size: 1rem;
        
        span {
            margin-right: 0.625rem;
            font-weight: 700;
        }
    }
    
    .title-game {
        color: var(--textG2Casino);
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 98%;
        white-space: nowrap;
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0;
    }
    
    .title-company {
        display: block;
        color: var(--text-secondG2Casino);
        font-weight: normal;
        font-size: 1rem;
        margin-bottom: 1rem;
    }
}

.casino-img {
    height: 308px;
    max-width: 100%;
}
@media (max-width: 768px) {
    .casino-item {
        .card-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 0 0.5rem;
            
            >div {
                width: 50%;
                text-align: left;
            }
            .title-company {
                margin-bottom: 0;
                text-align: left;
            }
        }
    }
}
</style>