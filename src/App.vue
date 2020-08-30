<template>
    <div>
        <h1>The Grauniad</h1>
        <SearchForm />
        <input
            type="button"
            value="Reading List"
            :disabled="!readLater.length"
            v-on:click="toggleReadingList"
        />
        <ReadLaterList v-if="showReadLater" :readLater="readLater" />
        <main v-if="!showReadLater">
            <ArticleList v-if="articles" :articles="articles" :searchParams="searchParams" />
            <ArticleDetail
                v-if="selectedArticle"
                :article="selectedArticle"
                :readLater="readLater"
            />
            <div v-else>No selected article to display</div>
        </main>
    </div>
</template>

<script>
import { API_KEY } from "@/api_key.js";
import { eventBus } from "@/main.js";

import ArticleList from "@/components/ArticleList";
import ArticleDetail from "@/components/ArticleDetail";
import SearchForm from "@/components/Search";
import ReadLaterList from "@/components/ReadLaterList";
export default {
    name: "App",
    data() {
        return {
            articles: null,
            selectedArticle: null,
            bodySummaries: [],
            searchParams: { page: 1 },
            readLater: [],
            showReadLater: false,
        };
    },
    components: {
        ArticleList,
        ArticleDetail,
        SearchForm,
        ReadLaterList,
    },
    methods: {
        fetchData: function (apiArgs) {
            const baseUrl = "https://content.guardianapis.com/search?";
            let searchArgs = "";
            const keys = Object.keys(apiArgs);
            keys.forEach((key) => (searchArgs += `${key}=${apiArgs[key]}&`));
            const defaultArgs = `show-blocks=all&show-fields=all&api-key=${API_KEY}`;
            fetch(`${baseUrl}${searchArgs}${defaultArgs}`)
                .then((response) => response.json())
                .then((data) => {
                    const DATA = data.response.results;
                    console.log(data.response);
                    this.articles = data.response;
                    for (let i = 0; i < 4; i++) {
                        this.readLater.push(DATA[i]);
                    }
                });
        },
        toggleReadingList: function () {
            this.showReadLater = !this.showReadLater;
        },
    },
    computed: {
        pageNumber: function () {
            return this.searchParams.page;
        },
    },
    mounted() {
        this.fetchData(this.searchParams);
        eventBus.$on(
            "clicked-list-item",
            (res) => (this.selectedArticle = res)
        );
        eventBus.$on("search", (res) => {
            console.log(res);
            this.searchParams = res;
            this.fetchData(this.searchParams);
        });
        eventBus.$on("page-change", (res) => (this.searchParams.page = res));
        eventBus.$on("add-read-later", (res) => this.readLater.push(res));
        eventBus.$on("remove-read-later", (res) => {
            const updatedList = this.readLater.filter(
                (article) => article !== res
            );
            this.readLater = updatedList;
        });
        eventBus.$on("toggle-read-later", () => this.toggleReadingList());
        eventBus.$on("clear-read-later", () => {
            this.toggleReadingList();
            this.readLater = [];
        });
        eventBus.$on("close-article", () => (this.selectedArticle = null));
    },
    watch: {
        pageNumber: function () {
            this.fetchData(this.searchParams);
        },
    },
};
/* 
Try adding show-blocks=all& to query, for ex. returned property "bodyTextSummary" at url. The URL below can be broken down into:
Basic URL: http://content.guardianapis.com/search?
Start of Search Params: q=
Search Params(all " " are substituted with "%20"): 12%20years%20a%20slave&
Convert to json format: format=json&
Filter by specific tags: tag=film/film,tone/reviews&
Filter by starting date: from-date=2010-01-01&
Order by relevance: order-by=relevance&
Show Full API Hash: show-blocks=all&
Your API Key(should put your key in place of "test"): api-key=test

http://content.guardianapis.com/search?q=12%20years%20a%20slave&format=json&tag=film/film,tone/reviews&from-date=2010-01-01&order-by=relevance&show-blocks=all&api-key=test

 */
</script>

<style>
body {
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
    scroll-behavior: smooth;
}
main {
    /* display: grid;
    grid-template-columns: 1fr 1fr; */
}
</style>