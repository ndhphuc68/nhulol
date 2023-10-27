<script setup>
import {datafooter, datasitemap} from "@/components/SCCasino/Footer/data";
</script>

<template>
  <footer>
    <div class="container">
      <div class="row justify-content-between">
        <div class="col-lg-4">
          <div class="logo-footer">
            <img src="@/assets/SCCasino/logo/logo.png" alt="" class="img-fluid">
          </div>
          <div class="desc">
            COPYRIGHT 2020, KCASINO. ALL RIGHTS RESERVED.
            GAMBLING CAN BE ADDICTIVE, PLEASE PLAY RESPONSIBLY. FOR MORE INFORMATION ON SUPPORT TOOLS, PLEASE VISIT OUR RESPONSIBLE GAMBLING PAGE
          </div>
        </div>
        <div class="col-lg-3">
          <div class="title">
            <h3>Help Center</h3>
            <ul class="list-item">
              <li class="items"
                v-for="(item, index) in datafooter"
                :key="index"
              >
                <a href="">
                  <component :is="item.icon"/>
                  <span>{{ $t(item.text) }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="title">
            <h3>{{ $t('sitemap') }}</h3>
          </div>
          <div class="list-sitemap">
             <a href="#"
                v-for="(item,index) in datasitemap"
                :key="index"
             >
               {{ $t(item.text) }}
             </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
  footer{
    background-color: #18181B;
    padding: 3rem 0;
    
    .logo-footer{
      text-align: left;
      margin-bottom: 1rem;

      img{
        height: 4.5rem;
      }
    }

    .desc{
      color: #A1A1AA;
      font-size: .7rem;
      text-align: left;
    }

    .list-item{
      list-style-type: none;
      display: flex;
      justify-content: space-between;
      padding: 0;

      .items a{
        display: flex;
        flex-direction: column;
        align-items: center;
        text-decoration: none;
        margin: 0 5px;

        svg{
          background-color: #FAFAFA;
          border-radius: 100%;
          padding: 8px 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 4rem;
          height: 4rem;
          margin-bottom: .5rem;
        }
        
        span{
          color: #A1A1AA;
        }
      }
    }
    
    .title{
      h3{
        color: #E9E9EB;
        padding: .3rem 0;
        text-align: left;
      }
    }

    .list-sitemap{
      display: grid;
      grid-template-columns: 1fr 1fr;
      text-align: left;
      gap: .5rem;
      
      a{ 
        text-decoration: none;
        color: #E4E4E7;
      }
    }
  }

  @media (max-width: 991px) {

  }
</style>