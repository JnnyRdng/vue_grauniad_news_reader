<template>
    <form v-on:submit.prevent="doSearch">
        <input type="text" v-model="searchTerm" />
        <input type="date" v-model="fromDate" />
        <input type="date" v-model="toDate" />
        <input type="number" min="1" max="50" v-model.number="numResults" />
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
            fromDate: "",
            toDate: "",
            numResults: 10,
        };
    },
    methods: {
        doSearch: function () {
            eventBus.$emit("search", this.searchObject);
        },
        getTodayDate: function () {
            let date = new Date();
            let mm = date.getMonth() + 1; // getMonth() is zero-based
            let dd = date.getDate();

            this.toDate = `${date.getFullYear()}-${(mm > 9 ? "" : "0") + mm}-${
                (dd > 9 ? "" : "0") + dd
            }`;
            console.log(new Date(date - 1));
            date.setDate(date.getDate() - 1);
            mm = date.getMonth() + 1;
            dd = date.getDate();
            this.fromDate = [
                date.getFullYear(),
                (mm > 9 ? "" : "0") + mm,
                (dd > 9 ? "" : "0") + dd,
            ].join("-");
        },
    },
    computed: {
        searchObject: function () {
            return {
                q: this.searchTerm,
                "from-date": this.fromDate,
                "to-date": this.toDate,
                "page-size": this.numResults,
                page: 1,
            };
        },
    },
    mounted() {
        this.getTodayDate();
    },
};
</script>

<style>
</style>