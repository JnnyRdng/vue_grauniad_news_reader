<template>
    <article>
        <header>
            <input type="button" value="Close" v-on:click="closeArticle" />
            <h2>{{article.webTitle}}</h2>
            <p>{{timeToRead}}</p>
            <input
                v-if="!inReadLater"
                type="button"
                value="Add to read later"
                v-on:click="addToReadLater"
            />
            <input
                v-else
                type="button"
                value="Remove from read later"
                v-on:click="removeFromReadLater"
            />
        </header>

        <main id="articleBody" v-dragscroll>
            <img alt="Article Thumbnail" :src="article.fields.thumbnail" />
            <p>{{ summary }}</p>
            <!-- <div v-html="article.blocks.body[0].bodyHtml"></div> -->
        </main>
    </article>
</template>

<script>
import { Mutate } from "@/Mutate.js";
import { eventBus } from "@/main.js";
export default {
    name: "article-detail",
    props: ["article", "readLater"],
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
        inReadLater: function () {
            return this.readLater.includes(this.article);
        },
    },
    methods: {
        addToReadLater: function () {
            eventBus.$emit("add-read-later", this.article);
        },
        removeFromReadLater: function () {
            eventBus.$emit("remove-read-later", this.article);
        },
        closeArticle: function () {
            eventBus.$emit("close-article");
        },
    },
};
</script>

<style>
#articleBody {
    /* column-count: 4; */
    column-fill: auto;
    column-width: 300px;
    column-gap: 40px;
    height: 600px;
    overflow-y: hidden;
    overflow-x: auto;
    cursor: grab;
    text-align: justify;
}
#articleBody > img {
    max-width: 300px;
    height: auto;
}
</style>

