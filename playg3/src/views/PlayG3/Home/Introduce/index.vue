<script setup>

import {dataIntroduce} from "@/views/PlayG3/Home/Introduce/data";
</script>

<template>
  <section class="introduce my-5">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6 col-lg-3 my-lg-0 my-3"
             v-for="(item,index) in dataIntroduce"
             :key="index"
        >
          <div class="items text-center">
            <div class="img-fluid">
              <img :src="item?.img" alt="">
            </div>
            <h3 class="title">{{ $t(item.title) }}</h3>
            <p>{{ $t(item.text) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .introduce{
    .items{
      border-radius: 12px;
      border: 1px solid var(--neutral-800, #27272A);
      box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25);
      background: linear-gradient(2deg, #27272a00, #27272a00), linear-gradient(124.2deg, #130C25 18.24%, rgb(116 130 114 / 44%) 150.8%);
      backdrop-filter: blur(4px);
      padding: 2rem 1.25rem 1.25rem 1.25rem;

      .title{
        margin:2rem 0 1rem 0;
        font-size: 1.5rem;
      }
      
      p{
        color: var(--textdesc);
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        height: 70px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
    }
  }
</style>