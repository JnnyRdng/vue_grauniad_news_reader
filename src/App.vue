<template>
    <div>
        <h1>The Grauniad</h1>
        <SearchForm />
        <main>
            <ArticleList :articles="articles" :searchParams="searchParams" />
            <ArticleDetail v-if="selectedArticle" :article="selectedArticle" />
        </main>
    </div>
</template>

<script>
import { API_KEY } from "@/api_key.js";
import { eventBus } from "@/main.js";

import ArticleList from "@/components/ArticleList";
import ArticleDetail from "@/components/ArticleDetail";
import SearchForm from "@/components/Search";
export default {
    name: "App",
    data() {
        return {
            articles: [],
            selectedArticle: null,
            bodySummaries: [],
            searchParams: { page: 1 },
        };
    },
    components: {
        ArticleList,
        ArticleDetail,
        SearchForm,
    },
    methods: {
        fetchData: function (args = null) {
            let urlArgs = "";
            if (args) {
                const keys = Object.keys(args);
                keys.forEach((key) => {
                    urlArgs += `${key}=${args[key]}&`;
                });
            }
            fetch(
                `https://content.guardianapis.com/search?${urlArgs}show-blocks=all&show-elements=images&api-key=${API_KEY}`
            )
                .then((response) => response.json())
                .then((data) => {
                    const DATA = data.response.results;
                    console.log(DATA);
                    this.articles = DATA;
                    // this.bodySummaries = DATA.map((article) => {
                    //   return article.blocks.body.map((body) => body.bodyTextSummary)[0];
                    // });
                });
        },
    },
    computed: {
        pageNumber: function () {
            return this.searchParams.page;
        },
    },
    mounted() {
        this.fetchData();
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