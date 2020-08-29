<template>
    <form v-on:submit.prevent="doSearch">
        <input type="text" v-model="searchTerm" />
        <input type="submit" value="Search" />
    </form>
</template>

<script>
import { eventBus } from "@/main.js";

export default {
    name: "search",
    data() {
        return {
            searchTerm: "",
        };
    },
    methods: {
        doSearch: function () {
            eventBus.$emit("search", this.searchTerm);
        },
    },
};
</script>

<style>
</style>