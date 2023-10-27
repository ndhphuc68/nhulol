<script setup>
import { computed, onUnmounted, ref } from "vue";
import NoticeItem from "./NoticeItem";
import { useStore } from "vuex";
import Loading from "@/components/EDGames/Loading";

const store = useStore();
const listNotice = computed(() => store.getters.getNotice);

const currentPage = ref(1);
const itemsPerPage = 7;

const displayData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return listNotice?.value.slice(startIndex, endIndex);
});

const clickCallback = (pageNum) => {
  currentPage.value = pageNum;
};

onUnmounted(() => {
  store.commit("handleActiveContent", null);
});
</script>

<template>
  <h2 class="text-center mb-3">{{ $t("notice") }}</h2>
  <div class="table-container" v-if="listNotice">
    <div class="header-table">
      <div>{{ $t("no.") }}</div>
      <div>{{ $t("title") }}</div>
      <div>{{ $t("date") }}</div>
    </div>
    <div class="content-table">
      <NoticeItem
        v-for="(notice, idx) in displayData"
        :key="idx"
        :notice="notice"
        :idx="idx"
      />
    </div>
    <v-pagination
      v-model="currentPage"
      @click="clickCallback"
      :length="Math.ceil(listNotice?.length / itemsPerPage)"
      rounded="0"
    ></v-pagination>
  </div>
  <div v-else style="margin-top: 4rem">
    <Loading :size="'50'" />
  </div>
</template>

<style lang="scss" scoped>
.header-table {
  display: grid;
  grid-template-columns: 15% 55% 30%;
  text-align: center;
  background: #e592ed;
  color: #fff;
  font-weight: 600;
  padding: 1rem 0.5rem;
  border-radius: 6px;

  @media (max-width: 375px) {
    font-size: 12px;
  }
}

.table-container {
  width: 100%;
  padding: 1rem 2.5rem 2.5rem 2.5rem;
  @media (max-width: 768px) {
    padding: 1rem 1rem 2.5rem 1rem;
  }

  .content-table {
    min-height: 500px;
    overflow: auto;
  }
}

.table-container .pagination {
  background: #fff;
  width: 50%;
  display: flex;
  justify-content: space-evenly;
  position: absolute;
  bottom: 15px;
  left: 25%;
  @media (max-width: 768px) {
    width: 90%;
    left: 5%;
  }
}

@media (max-width: 768px) {
}
</style>

[ { "no_content":"
<p>event1 content</p>
", "no_content_txt":"event1 text content", "no_created":1687158252, "no_idx":63,
"no_img_base64":null, "no_invite_code":"ROOT", "no_is_delete":"NORMAL",
"no_partner_account":"cmsadmin", "no_read_count":0,
"no_request_ip":"210.99.223.155", "no_status":"ACTIVE", "no_subject":"event1",
"no_type":"NOTICE_SITE", "no_update":"2023-07-03 10:14:24" },{ "no_content":"
<p>event1 content</p>
", "no_content_txt":"event1 text content", "no_created":1687158252, "no_idx":63,
"no_img_base64":null, "no_invite_code":"ROOT", "no_is_delete":"NORMAL",
"no_partner_account":"cmsadmin", "no_read_count":0,
"no_request_ip":"210.99.223.155", "no_status":"ACTIVE", "no_subject":"event1",
"no_type":"NOTICE_SITE", "no_update":"2023-07-03 10:14:24" },{ "no_content":"
<p>event1 content</p>
", "no_content_txt":"event1 text content", "no_created":1687158252, "no_idx":63,
"no_img_base64":null, "no_invite_code":"ROOT", "no_is_delete":"NORMAL",
"no_partner_account":"cmsadmin", "no_read_count":0,
"no_request_ip":"210.99.223.155", "no_status":"ACTIVE", "no_subject":"event1",
"no_type":"NOTICE_SITE", "no_update":"2023-07-03 10:14:24" },{ "no_content":"
<p>event1 content</p>
", "no_content_txt":"event1 text content", "no_created":1687158252, "no_idx":63,
"no_img_base64":null, "no_invite_code":"ROOT", "no_is_delete":"NORMAL",
"no_partner_account":"cmsadmin", "no_read_count":0,
"no_request_ip":"210.99.223.155", "no_status":"ACTIVE", "no_subject":"event1",
"no_type":"NOTICE_SITE", "no_update":"2023-07-03 10:14:24" },{ "no_content":"
<p>event1 content</p>
", "no_content_txt":"event1 text content", "no_created":1687158252, "no_idx":63,
"no_img_base64":null, "no_invite_code":"ROOT", "no_is_delete":"NORMAL",
"no_partner_account":"cmsadmin", "no_read_count":0,
"no_request_ip":"210.99.223.155", "no_status":"ACTIVE", "no_subject":"event1",
"no_type":"NOTICE_SITE", "no_update":"2023-07-03 10:14:24" },{ "no_content":"
<p>event1 content</p>
", "no_content_txt":"event1 text content", "no_created":1687158252, "no_idx":63,
"no_img_base64":null, "no_invite_code":"ROOT", "no_is_delete":"NORMAL",
"no_partner_account":"cmsadmin", "no_read_count":0,
"no_request_ip":"210.99.223.155", "no_status":"ACTIVE", "no_subject":"event1",
"no_type":"NOTICE_SITE", "no_update":"2023-07-03 10:14:24" },{ "no_content":"
<p>event1 content</p>
", "no_content_txt":"event1 text content", "no_created":1687158252, "no_idx":63,
"no_img_base64":null, "no_invite_code":"ROOT", "no_is_delete":"NORMAL",
"no_partner_account":"cmsadmin", "no_read_count":0,
"no_request_ip":"210.99.223.155", "no_status":"ACTIVE", "no_subject":"event1",
"no_type":"NOTICE_SITE", "no_update":"2023-07-03 10:14:24" },{ "no_content":"
<p>event1 content</p>
", "no_content_txt":"event1 text content", "no_created":1687158252, "no_idx":63,
"no_img_base64":null, "no_invite_code":"ROOT", "no_is_delete":"NORMAL",
"no_partner_account":"cmsadmin", "no_read_count":0,
"no_request_ip":"210.99.223.155", "no_status":"ACTIVE", "no_subject":"event1",
"no_type":"NOTICE_SITE", "no_update":"2023-07-03 10:14:24" },{ "no_content":"
<p>event1 content</p>
", "no_content_txt":"event1 text content", "no_created":1687158252, "no_idx":63,
"no_img_base64":null, "no_invite_code":"ROOT", "no_is_delete":"NORMAL",
"no_partner_account":"cmsadmin", "no_read_count":0,
"no_request_ip":"210.99.223.155", "no_status":"ACTIVE", "no_subject":"event1",
"no_type":"NOTICE_SITE", "no_update":"2023-07-03 10:14:24" },{ "no_content":"
<p>event1 content</p>
", "no_content_txt":"event1 text content", "no_created":1687158252, "no_idx":63,
"no_img_base64":null, "no_invite_code":"ROOT", "no_is_delete":"NORMAL",
"no_partner_account":"cmsadmin", "no_read_count":0,
"no_request_ip":"210.99.223.155", "no_status":"ACTIVE", "no_subject":"event1",
"no_type":"NOTICE_SITE", "no_update":"2023-07-03 10:14:24" },{ "no_content":"
<p>event1 content</p>
", "no_content_txt":"event1 text content", "no_created":1687158252, "no_idx":63,
"no_img_base64":null, "no_invite_code":"ROOT", "no_is_delete":"NORMAL",
"no_partner_account":"cmsadmin", "no_read_count":0,
"no_request_ip":"210.99.223.155", "no_status":"ACTIVE", "no_subject":"event1",
"no_type":"NOTICE_SITE", "no_update":"2023-07-03 10:14:24" },{ "no_content":"
<p>event1 content</p>
", "no_content_txt":"event1 text content", "no_created":1687158252, "no_idx":63,
"no_img_base64":null, "no_invite_code":"ROOT", "no_is_delete":"NORMAL",
"no_partner_account":"cmsadmin", "no_read_count":0,
"no_request_ip":"210.99.223.155", "no_status":"ACTIVE", "no_subject":"event1",
"no_type":"NOTICE_SITE", "no_update":"2023-07-03 10:14:24" } ]
