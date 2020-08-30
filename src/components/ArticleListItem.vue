<template>
    <li
        v-on:mouseover="handleMouseOver"
        v-on:mouseleave="handleMouseLeave"
        v-on:click="handleClick"
    >
        <div>
            <span>{{article.sectionName}}</span>
            {{ text }}
        </div>
    </li>
</template>

<script>
import { eventBus } from "@/main.js";
import { Mutate } from "@/Mutate.js";

export default {
    name: "article-list-item",
    props: ["article"],
    data() {
        return {
            text: this.wrongHeadline,
        };
    },
    methods: {
        handleMouseOver: function () {
            this.text = this.article.webTitle;
        },
        handleMouseLeave: function () {
            this.text = this.wrongHeadline;
        },
        handleClick: function () {
            eventBus.$emit("clicked-list-item", this.article);
        },
    },
    computed: {
        wrongHeadline: function () {
            return Mutate.scramble(this.article.webTitle);
        },
    },
    mounted() {
        this.text = this.wrongHeadline;
    },
    watch: {
        article: function () {
            this.text = this.wrongHeadline;
        },
    },
};
</script>

<style>
li {
    margin: 10px 0px;
    font-family: "headline-gothic-atf";
    font-size: 1.5em;
    color: white;
    background-color: black;
    padding: 5px 20px;
    cursor: pointer;
}
li:hover {
    color: lightgrey;
}
li > div > span {
    color: darkgrey;
    margin-right: 20px;
}
</style>