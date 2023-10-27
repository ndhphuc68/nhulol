<template>
    <div class="wrapper">
        <button v-for="(item, index) in data" :key="index"
                class="d-flex justify-content-between blog-item  w-100"
                @click="handleToggleViewBlog"
        >
            <span class="w-80 content">
                {{ item.content }}
            </span>
            <span class="w-20">
                {{ item.date }}
            </span>
        </button>
    </div>
    <Blog v-if="isViewBlog" :handle-toggle-modal="handleToggleViewBlog"/>
</template>


<script setup>
import Blog from "@/views/PlayG1/modals/Blog/index.vue";
import {ref} from "vue";

const isViewBlog = ref(false)

const handleToggleViewBlog = () => {
    isViewBlog.value = !isViewBlog.value
}
const data = [
    {
        content: 'Pharetra sed eu tincidunt  sdklfj sdlfjsdl sdjkl sdfjsdkljfsdkljfsdkljfsdjfsdkjf sdlfj sdlj fsdljkfsdjklf sdkljfut interdum egestas id ac amet.',
        date: '12/2'
    },
    {
        content: 'Pharetra sed eu tincidunt ut interdum egestas id ac amet.',
        date: '12/2'
    },
    {
        content: 'Pharetra sed eu tincidunt ut interdum egestas id ac amet.',
        date: '12/2'
    },
    {
        content: 'Pharetra sed eu tincidunt ut interdum egestas id ac amet.',
        date: '12/2'
    }
]
</script>


<style lang="scss" scoped>
.wrapper {
    padding: 10px;
    
    .blog-item {
        margin: 12px 0;
        cursor: pointer;
        
        &:hover {
            color: var(--primary);
        }
    }
    
    .content {
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        white-space: nowrap;
        overflow: hidden;
        width: 80%;
        font-weight: 400;
        text-align: left;
    }
}

@media (max-width: 768px) {
    .wrapper {
        padding: 0;
    }
    .content {
        max-width: 70%;
    }
}
</style>