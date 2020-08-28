<template>
    <li v-on:mouseover="handleMouseOver" v-on:mouseleave="handleMouseLeave">{{ text }}</li>
</template>

<script>
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
    },
    computed: {
        wrongHeadline: function () {
            const scrambler = function (original) {
                const words = original.split(" ");
                const newWords = words.map((word) => {
                    let newWord = "";
                    for (const char of word) {
                        const random = Math.random();
                        const newChar =
                            random < 0.15 ? randomLetter(char) : char;
                        newWord += newChar;
                    }
                    return newWord;
                });
                return newWords.join(" ");
            };
            const randomLetter = function (letter) {
                const letters = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM".split(
                    ""
                );
                return letters[Math.floor(Math.random() * letters.length)];
            };
            return scrambler(this.article.webTitle);
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
</style>