<script setup>
import {defineProps, defineEmits} from "vue";
import {dataGWM, dataHabanero} from "@/utils/data";
import {useI18n} from "vue-i18n";
import Button from "primevue/button";

const $emits = defineEmits(["handlePlayGameSlot"])

const t = useI18n()
const lang = t.locale.value
const props = defineProps({
    game: Object,
    typeCompayGame: {
        type: String,
        default: ""
    }
});

const getImage = (id, key) => {
    if (props.typeCompayGame === "habanero_slot") {
        return dataHabanero.find(e => e.id === id && e.key === key).image
    } else if (props.typeCompayGame === "gmw_slot") {
        return dataGWM.find(e => e.id === id && e.key === key).image
    } else {
        return null
    }
    
}
</script>

<template>
    <div class="item-game-slot d-flex flex-column justify-center align-center">
        <div class="game-play">
            <div class="group-img position-relative">
                <img
                    :src="getImage(game.id,game.key)
         ? getImage(game.id,game.key): game.image"
                    alt="game.name"
                    class="game-img"
                    loading="lazy"
                />
                <div class="overlay"></div>
            </div>
            
            <div class="game-name">
                <div class="card-content">
                    <div>
                        <h4 class="title-game">{{ lang === 'ko' ? game.names?.ko : game.names?.en }} </h4>
                        <span class="title-company">{{ typeCompayGame.split('_slot')[0] || 'netend' }}</span>
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
    </div>
</template>

<style lang="scss" scoped>
.item-game-slot {
    box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
    border-radius: 6px;
    
    .game-play {
        overflow: hidden;
        width: 100%;
        
        .group-img {
            overflow: hidden;
            border-radius: 5px;
            
            .game-img {
                width: 100%;
            }
            
            .overlay {
                display: none;
            }
            
        }
    }
    
    &:hover {
        .game-play {
            .group-img {
                .game-img {
                    transform: rotate(10deg) scale(1.2);
                    transition: transform linear 0.3s;
                }
                
                .overlay {
                    position: absolute;
                    display: block;
                    inset: 0;
                    background-color: rgba(0, 0, 0, 0.7);
                }
            }
        }
        
        transition: all linear 0.3s;
    }
    
    .card-content {
        color: #fff;
        font-size: 24px;
        font-weight: 700;
        padding: 0.8rem 0;
        
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
    
}
@media (max-width: 768px) {
    .item-game-slot {
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