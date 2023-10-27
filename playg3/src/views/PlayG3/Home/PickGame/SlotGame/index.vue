<script setup>
import {reactive, ref} from 'vue'
import SlotGameItem from "@/views/PlayG3/SlotGame/SlotGameItem";
import {games} from "@/views/PlayG3/SlotGame/data";

const gameKey = 'habanero_slot';
const dataHide = [
    "525dd3b1-b829-490a-a337-19bf04986ec9",
    "32a0b1f9-2753-4bec-8cfc-a40b2fa585d4",
    "17bfea87-c325-4bb3-9e33-6ecf367fcd1e",
    "eae7f941-2343-48da-a0f3-74bd362c0a9a",
    "53da6f68-ddff-4f95-af9a-ba8b96e568bb",
    "730151ed-8489-4bed-b910-73f86261753c",
    "2da3e2d6-9aaa-4d28-9120-20da0fb4e4d1",
    "ddafc78d-d83a-4504-bc48-5d896266e058",
];
const loading = ref(false);

const handlePlayGameSlot = () => {
}
const checkGameHide = (key) => {
    const check = dataHide.find((e) => e === key);
    return !check;
};
const slotgames = reactive(games);
</script>

<template>
    <div>
        <div class="row">
            <div
                v-for="(game, index) in slotgames.slice(0,8)"
                :key="index"
                class="col-lg-3 col-md-4 col-12"
                :class="checkGameHide(game.key) ? ' px-3 py-3' : 'd-none'"
            >
                <SlotGameItem
                    @handlePlayGameSlot="handlePlayGameSlot"
                    :game="game"
                    :type-compay-game="gameKey"
                />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>