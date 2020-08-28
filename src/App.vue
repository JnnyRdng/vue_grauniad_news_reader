<template>
    <div>
        <h1>The Grauniad</h1>
        <ArticleList :articles="articles" />
    </div>
</template>

<script>
import { API_KEY } from "@/api_key.js";

import ArticleList from "@/components/ArticleList";
export default {
    name: "App",
    data() {
        return {
            articles: [],
            selectedArticle: null,
            bodySummaries: [],
        };
    },
    components: {
        ArticleList,
    },
    methods: {
        fetchData: function () {
            fetch(
                `https://content.guardianapis.com/search?show-blocks=all&show-elements=image&api-key=${API_KEY}`
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
        // scrambler: function (original) {
        //     const words = original.split(" ");
        //     const newWords = words.map((word) => {
        //         let newWord = "";
        //         for (const char of word) {
        //             const random = Math.random();
        //             const newChar = random < 0.05 ? randomLetter() : char;
        //             newWord += newChar;
        //         }
        //         return newWord;
        //     });
        //     return newWords.join(" ");
        // },
        // randomLetter: function () {
        //     const letters = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM".split(
        //         ""
        //     );
        //     return letters[Math.floor(Math.random() * letters.length)];
        // },
    },
    mounted() {
        this.fetchData();
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
</style>