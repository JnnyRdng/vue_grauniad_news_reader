<template>
    <ul>
        <ArticleListItem v-for="(article, index) in articles" :key="index" :article="article" />
    </ul>
</template>

<script>
import ArticleListItem from "@/components/ArticleListItem";
export default {
    name: "article-list",
    props: ["articles"],
    components: {
        ArticleListItem,
    },
};
</script>

<style>
</style>