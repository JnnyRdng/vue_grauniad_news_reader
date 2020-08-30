<template>
    <main>
        <ul>
            <ArticleListItem
                v-for="(article, index) in articles.results"
                :key="index"
                :article="article"
            />
        </ul>
        <input type="button" v-on:click="pageBack" :disabled="articles.currentPage < 2" value="<" />
        <span>{{ articles.currentPage }} out of {{ articles.pages }} pages</span>
        <input
            type="button"
            v-on:click="pageForward"
            :disabled="articles.currentPage === articles.pages"
            value=">"
        />
    </main>
</template>

<script>
import { eventBus } from "@/main.js";
import ArticleListItem from "@/components/ArticleListItem";
export default {
    name: "article-list",
    props: ["articles"],
    components: {
        ArticleListItem,
    },
    methods: {
        pageBack: function () {
            eventBus.$emit("page-change", this.articles.currentPage - 1);
        },
        pageForward: function () {
            eventBus.$emit("page-change", this.articles.currentPage + 1);
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