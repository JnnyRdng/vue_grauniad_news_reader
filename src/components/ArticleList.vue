<template>
    <main>
        <ul>
            <ArticleListItem v-for="(article, index) in articles" :key="index" :article="article" />
        </ul>
        <input type="button" v-on:click="pageBack" :disabled="searchParams.page < 2" value="<" />
        <span>{{ searchParams.page }}</span>
        <input type="button" v-on:click="pageForward" :disabled="articles.length < 10" value=">" />
    </main>
</template>

<script>
import { eventBus } from "@/main.js";
import ArticleListItem from "@/components/ArticleListItem";
export default {
    name: "article-list",
    props: ["articles", "searchParams"],
    components: {
        ArticleListItem,
    },
    methods: {
        pageBack: function () {
            eventBus.$emit("page-change", this.searchParams.page - 1);
        },
        pageForward: function () {
            eventBus.$emit("page-change", this.searchParams.page + 1);
        },
    },
    computed: {},
};
</script>

<style>
ul {
    /* column-count: 2; */
    padding: 0px;
    list-style: none;
    margin: 30px;
}
</style>