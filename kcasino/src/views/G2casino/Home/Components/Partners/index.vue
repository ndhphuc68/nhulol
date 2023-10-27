<template>
    <section id="partner">
        <div class="wrap">
            <div class="item" v-for="(item,index) in listImage" :key="index">
                <img
                    :src="require(`@/assets/G2casino/logo/companies-demo/${item}.png`)"
                    alt="live-logo"
                    class="live-company no-active"
                />
                <img
                    :src="require(`@/assets/G2casino/logo/companies-demo/${item}Active.png`)"
                    alt="live-logo"
                    class="live-company active"
                />
            </div>
        </div>
    </section>
</template>

<script setup>
const listImage = [
    'reelkingdom', 'ag', 'nentent', 'gmw', 'wm', 'aspectgaming'
]
</script>

<style scoped lang="scss">
#partner {
    margin: 64px 0;
    
    .wrap {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-gap: 20px;
        
        .item {
            display: flex;
            justify-content: center;
            align-items: center;
            
            img {
                height: 48px;
            }
            
            .no-active {
                display: block;
            }
            
            .active {
                display: none;
            }
            
            
            &:hover {
                .no-active {
                    display: none;
                }
                
                .active {
                    display: block;
                }
            }
        }
    }
    
    @media (max-width: 1100px) {
        .wrap {
            .item {
                img {
                    height: 35px;
                }
            }
        }
    }
    
    @media (max-width: 876px) {
        width: 70%;
        margin: 64px auto;
        .wrap {
            grid-template-columns: repeat(2, calc(50% - 20px));
            grid-gap: 40px;
        }
    }
    
    @media (max-width: 500px) {
        width: 100%;
    }
}
</style>