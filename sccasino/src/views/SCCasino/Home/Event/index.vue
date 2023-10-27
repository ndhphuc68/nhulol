<script setup>
import svgIcon from '@/assets/SCCasino/icon/commons';
import NoticeItem from "@/views/SCCasino/Home/Notice/NoticeItem";

const noticeList = [
    {
        no_content: "<p>notice1 content</p>",
        no_content_txt: "notice1 content text Lorem Ipsum Donot Lorem Ipsum Donot a Lorem Ipsum Donot Lorem Ipsum Donot a",
        no_created: 1681440872,
        no_idx: 51,
        no_img_base64: null,
        no_invite_code: "ROOT",
        no_is_delete: "NORMAL",
        no_partner_account: "cmsadmin",
        no_read_count: 0,
        no_request_ip: "210.99.223.155",
        no_status: "ACTIVE",
        no_subject: "notice1 content text Lorem Ipsum Donot Lorem Ipsum Donot a Lorem Ipsum Donot Lorem Ipsum Donot a",
        no_type: "NOTICE_FAQ",
        no_update: "2023-06-27 08:37:16",
    },
    {
        no_content: "<p>notice1 content</p>",
        no_content_txt: "notice1 content text",
        no_created: 1681440872,
        no_idx: 51,
        no_img_base64: null,
        no_invite_code: "ROOT",
        no_is_delete: "NORMAL",
        no_partner_account: "cmsadmin",
        no_read_count: 0,
        no_request_ip: "210.99.223.155",
        no_status: "ACTIVE",
        no_subject: "notice1",
        no_type: "NOTICE_FAQ",
        no_update: "2023-06-27 08:37:16",
    },
    {
        no_content: "<p>notice1 content</p>",
        no_content_txt: "notice1 content text",
        no_created: 1681440872,
        no_idx: 51,
        no_img_base64: null,
        no_invite_code: "ROOT",
        no_is_delete: "NORMAL",
        no_partner_account: "cmsadmin",
        no_read_count: 0,
        no_request_ip: "210.99.223.155",
        no_status: "ACTIVE",
        no_subject: "notice1",
        no_type: "NOTICE_FAQ",
        no_update: "2023-06-27 08:37:16",
    },
    {
        no_content: "<p>notice1 content</p>",
        no_content_txt: "notice1 content text",
        no_created: 1681440872,
        no_idx: 51,
        no_img_base64: null,
        no_invite_code: "ROOT",
        no_is_delete: "NORMAL",
        no_partner_account: "cmsadmin",
        no_read_count: 0,
        no_request_ip: "210.99.223.155",
        no_status: "ACTIVE",
        no_subject: "notice1",
        no_type: "NOTICE_FAQ",
        no_update: "2023-06-27 08:37:16",
    },
    {
        no_content: "<p>notice1 content</p>",
        no_content_txt: "notice1 content text",
        no_created: 1681440872,
        no_idx: 51,
        no_img_base64: null,
        no_invite_code: "ROOT",
        no_is_delete: "NORMAL",
        no_partner_account: "cmsadmin",
        no_read_count: 0,
        no_request_ip: "210.99.223.155",
        no_status: "ACTIVE",
        no_subject: "notice1",
        no_type: "NOTICE_FAQ",
        no_update: "2023-06-27 08:37:16",
    },
    {
        no_content: "<p>notice1 content</p>",
        no_content_txt: "notice1 content text",
        no_created: 1681440872,
        no_idx: 51,
        no_img_base64: null,
        no_invite_code: "ROOT",
        no_is_delete: "NORMAL",
        no_partner_account: "cmsadmin",
        no_read_count: 0,
        no_request_ip: "210.99.223.155",
        no_status: "ACTIVE",
        no_subject: "notice1",
        no_type: "NOTICE_FAQ",
        no_update: "2023-06-27 08:37:16",
    },
    {
        no_content: "<p>notice1 content</p>",
        no_content_txt: "notice1 content text",
        no_created: 1681440872,
        no_idx: 51,
        no_img_base64: null,
        no_invite_code: "ROOT",
        no_is_delete: "NORMAL",
        no_partner_account: "cmsadmin",
        no_read_count: 0,
        no_request_ip: "210.99.223.155",
        no_status: "ACTIVE",
        no_subject: "notice1",
        no_type: "NOTICE_FAQ",
        no_update: "2023-06-27 08:37:16",
    },
    {
        no_content: "<p>notice1 content</p>",
        no_content_txt: "notice1 content text",
        no_created: 1681440872,
        no_idx: 51,
        no_img_base64: null,
        no_invite_code: "ROOT",
        no_is_delete: "NORMAL",
        no_partner_account: "cmsadmin",
        no_read_count: 0,
        no_request_ip: "210.99.223.155",
        no_status: "ACTIVE",
        no_subject: "notice1",
        no_type: "NOTICE_FAQ",
        no_update: "2023-06-27 08:37:16",
    },
    {
        no_content: "<p>notice1 content</p>",
        no_content_txt: "notice1 content text",
        no_created: 1681440872,
        no_idx: 51,
        no_img_base64: null,
        no_invite_code: "ROOT",
        no_is_delete: "NORMAL",
        no_partner_account: "cmsadmin",
        no_read_count: 0,
        no_request_ip: "210.99.223.155",
        no_status: "ACTIVE",
        no_subject: "notice1",
        no_type: "NOTICE_FAQ",
        no_update: "2023-06-27 08:37:16",
    },
    {
        no_content: "<p>notice1 content</p>",
        no_content_txt: "notice1 content text",
        no_created: 1681440872,
        no_idx: 51,
        no_img_base64: null,
        no_invite_code: "ROOT",
        no_is_delete: "NORMAL",
        no_partner_account: "cmsadmin",
        no_read_count: 0,
        no_request_ip: "210.99.223.155",
        no_status: "ACTIVE",
        no_subject: "notice1",
        no_type: "NOTICE_FAQ",
        no_update: "2023-06-27 08:37:16",
    },
];

</script>

<template>
    <div class="notice-container">
        <div class="notice-head">
            <div class="d-flex">
                <h4 class="notice-title me-2">{{ $t('notice') }}</h4>
                <component class="icon" :is="svgIcon?.ExclamationIcon"/>
            </div>
            <button class="btn-more btn-hover">
                {{ $t('seeMore') }}
            </button>
        </div>
        <div class="notice-body">
            <NoticeItem v-for="(item, index) in noticeList.slice(0,4)" :key="index" :notice="item"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
.notice-container {
    .notice-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        .notice-title {
            font-weight: 700;
            font-size: 1.5rem;
            color: var(--primarySCCasino);
        }
        
        .icon {
            width: 1.5rem;
            height: 1.5rem;
        }
        
        .btn-more {
            color: var(--primarySCCasino);
            font-weight: 500;
        }
    }
}
</style>