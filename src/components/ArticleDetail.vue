<template>
    <article>
        <header>
            <h2>{{article.webTitle}}</h2>
            <p>{{timeToRead}}</p>
        </header>
        <main>{{ summary }}</main>
    </article>
</template>

<script>
import { Mutate } from "@/Mutate.js";
export default {
    name: "article-detail",
    props: ["article"],
    computed: {
        summary: function () {
            return Mutate.scramble(this.article.blocks.body[0].bodyTextSummary);
        },
        timeToRead: function () {
            const wordCount = this.article.blocks.body[0].bodyTextSummary.split(
                " "
            ).length;
            const decimal = (wordCount / 300).toString().split(".");
            const minutes = Math.round(
                (parseInt(decimal[1].substr(0, 2)) * 0.6) / 60
            );
            const totalTime = parseInt(decimal[0]) + minutes;
            return `${totalTime} minute${totalTime === 1 ? "" : "s"} to read`;
        },
    },
};
</script>

<style>
</style>