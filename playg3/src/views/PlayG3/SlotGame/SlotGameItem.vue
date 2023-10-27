<script setup>
import {defineProps, defineEmits} from "vue";
import {dataGWM, dataHabanero} from "@/utils/datas";
import {useI18n} from "vue-i18n";

const $emits = defineEmits(["handlePlayGameSlotItem"]);

const t = useI18n();
const lang = t.locale.value;
const props = defineProps({
    game: Object,
    typeCompayGame: {
        type: String,
        default: "",
    },
});

const getImage = (id, key) => {
    if (props.typeCompayGame === "habanero_slot") {
        return dataHabanero.find((e) => e.id === id && e.key === key).image;
    } else if (props.typeCompayGame === "gmw_slot") {
        return dataGWM.find((e) => e.id === id && e.key === key).image;
    } else {
        return null;
    }
};
</script>

<template>
    <div class="item-game-slot d-flex flex-column justify-center align-center">
        <div class="game-play">
            <div class="group-img position-relative">
                <img
                    :src="
            getImage(game.id, game.key)
              ? getImage(game.id, game.key)
              : game.image
          "
                    alt="game.name"
                    class="game-img"
                    loading="lazy"
                />
                <div class="overlay"></div>
            </div>
            
            <div class="game-name">
                <div
                    class="card-content d-flex align-center justify-content-between"
                >
                    <div>
                          <span class="title-game mb-3">
                                {{ lang === "ko" ? game.names?.ko : game.names?.en }}
                          </span>
                        <span class="title-company">
                            eveondo
                        </span>
                    </div>
                    
                    <button
                        class="button btn-contained"
                        @click="$emits('handlePlayGameSlotItem', game.key)"
                    >
                        {{ $t("playnow") }}
                    </button>
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
                height: 180px;
                object-fit: cover;
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
            font-size: 0.875rem;
            font-weight: 400;
            padding: 0.5rem;
        }
        
        .title-game {
            text-overflow: ellipsis;
            overflow: hidden;
            max-width: 98%;
            white-space: nowrap;
            margin: 0;
            text-align: center;
            font-size: 20px;
            font-weight: 600;
            font-style: normal;
            line-height: normal;
        }
        
        .title-company {
            display: block;
            color: var(--textSecondPlayG3);
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
            
            > div {
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
