const Scrambler = function () { }
Scrambler.prototype.scramble = function (original) {
    const words = original.split(" ");
    const newWords = words.map((word) => {
        let newWord = "";
        for (const char of word) {
            const newChar = this.randomLetter(char);
            newWord += newChar;
        }
        return this.randomSwap(newWord);
        // return newWord;
    });
    return newWords.join(" ");
}

Scrambler.prototype.randomLetter = function (letter) {
    const random = Math.random();
    // const letters = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM".split(
    //     ""
    // );
    const vowels = "aeiou";
    if (vowels.includes(letter) && random < 0.1) {
        return vowels[Math.floor(Math.random() * vowels.length)];
    } else {
        return letter;
    }
}

Scrambler.prototype.randomSwap = function (word) {
    const random = Math.random();
    if (random < 0.15 && word.length > 5) {
        const randomIndex1 = Math.ceil(
            Math.random() * (word.length - 2)
        );
        let randomIndex2 = randomIndex1;
        while (randomIndex1 === randomIndex2) {
            randomIndex2 = Math.ceil(Math.random() * (word.length - 2));
        }
        const min = Math.min(randomIndex1, randomIndex2);
        const max = Math.max(randomIndex1, randomIndex2);
        const firstLetter = word[min];
        const secondLetter = word[max];
        let newWord = "";
        newWord += word.substring(0, min);
        newWord += secondLetter;
        newWord += word.substring(min + 1, max);
        newWord += firstLetter;
        newWord += word.substring(max + 1);
        return newWord;
    }
    return word;
};

export const Mutate = new Scrambler();