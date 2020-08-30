<template>
    <main id="read-later-list">
        <input type="button" value="close read later" v-on:click="closeReadLater" />
        <input type="button" value="clear read later" v-on:click="clearReadLater" />
        <ul>
            <ReadLaterListItem
                v-for="(article, index) in readLater"
                :key="index"
                :article="article"
            />
        </ul>
    </main>
</template>

<script>
import ReadLaterListItem from "@/components/ReadLaterListItem";
import { eventBus } from "@/main.js";
export default {
    name: "read-later-list",
    props: ["readLater"],
    components: {
        ReadLaterListItem,
    },
    methods: {
        closeReadLater: function () {
            eventBus.$emit("toggle-read-later");
        },
        clearReadLater: function () {
            eventBus.$emit("clear-read-later");
        },
    },
};
</script>

<style>
#read-later-list {
    z-index: 99;
    width: 100%;
    height: 100vh;
    background-color: lightgrey;
    position: fixed;
    top: 0px;
    left: 0px;
}
</style>