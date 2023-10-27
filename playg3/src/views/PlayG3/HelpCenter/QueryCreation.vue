<script setup>
import {computed, ref} from "vue";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
// import { questionContactRequest } from "@/api/helpCenter/request";


const description = ref("");
const userInfo = computed(() => ({me_nickname: 'test', me_phone: '0968472134'}));

const checkCharacterCount = () => {
    if (description.value.length > 10) {
        description.value = description.value.slice(0, 10);
    }
};

const handleSubmit = async () => {
    // if (description.value) {
    //     try {
    //         await store.commit("handleUpdateLoading", true);
    //         const res = await questionContactRequest({
    //             UserQuestion: description.value,
    //             memberIdx: userInfo.value.me_idx,
    //             mInviteCode: userInfo.value.me_invite_code,
    //             mNickName: userInfo.value.me_nickname,
    //         });
    //
    //         if (res?.is_success) {
    //             await store.dispatch("showAlert", {
    //                 type: "success",
    //                 message: t(res.message),
    //             });
    //             await store.dispatch("getListHelpAction", {
    //                 memberIdx: userInfo.value.me_idx,
    //                 inviteCode: userInfo.value.me_invite_code,
    //                 nickName: userInfo.value.nickname,
    //             });
    //             router.push({ name: "HelpCenter" });
    //         } else {
    //             await store.dispatch("showAlert", {
    //                 type: "error",
    //                 message: t("helpCenterError"),
    //             });
    //         }
    //         await store.commit("handleUpdateLoading", false);
    //     } catch (error) {
    //         console.log(error);
    //         await store.commit("handleUpdateLoading", false);
    //     }
    // }
};
</script>

<template>
    <div class="queryCreation">
        <div>
            <div class="row item-help">
                <div class="col-lg-6">
                    <div class="title-help">
                        <h4>{{ $t("name") }}</h4>
                        <p>{{ $t("desNameHelp") }}</p>
                    </div>
                </div>
                <div class="col-lg-6">
                    <InputText
                        disabled
                        class="input"
                        type="text"
                        :value="userInfo.me_nickname"
                        :placeholder="$t('name')"
                    />
                </div>
            </div>
            <div class="row item-help">
                <div class="col-lg-6">
                    <div class="title-help">
                        <h4>{{ $t("cellPhone") }}</h4>
                        <p>{{ $t("desCellPhone") }}</p>
                    </div>
                </div>
                <div class="col-lg-6">
                    <InputText
                        disabled
                        class="input"
                        type="text"
                        :value="userInfo.me_phone"
                        :placeholder="$t('phone')"
                    />
                </div>
            </div>
            <div class="row item-help">
                <div class="col-lg-6">
                    <div class="title-help">
                        <h4>{{ $t("description") }}</h4>
                        <p>{{ $t("desHelp") }}</p>
                    </div>
                </div>
                <div class="col-lg-6">
          <Textarea
              @change="checkCharacterCount"
              class="input"
              v-model="description"
              autoResize
              row
              item-helps="5"
              cols="30"
              rows="5"
              :placeholder="$t('description')"
          />
                </div>
            </div>
            <div class="row item-help">
                <div class="d-flex justify-content-end">
                    <button class="btn-contained btn-send" @click="handleSubmit">
                        {{ $t("send") }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.queryCreation {
    margin-bottom: 3rem;
    margin-top: 3rem;
    
    .title-help {
        text-align: left;
    }
    
    .item-help {
        padding: 2.5rem 0;
        margin-bottom: 3rem;
        
        &:not(:last-child) {
            border-bottom: 1px solid #3F3F46;
            
        }
        
        p {
            color: var(--text-secondG2Casino);
        }
    }
    
    .btn-send {
        border-radius: 69px;
        padding: 12px 24px;
    }
}

.input {
    background: #1A1C20;
    border: none;
    max-height: 150px;
    width: 100%;
}
</style>
