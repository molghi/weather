const getRandom = (maxValue: number): number => Math.floor(Math.random() * maxValue);

async function fetchBgImage(query: string) {
    const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;

    try {
        // if (query === "clear")
        query = "nature";

        const perPage = 10;
        const pages = 10;

        // Compose array of 10 URL strings
        const URLs = Array.from({ length: pages }, (_, i) => 1 + i).map(
            (number, index) =>
                `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
                    query
                )}&orientation=landscape&page=${number}&per_page=${perPage}&client_id=${UNSPLASH_KEY}`
        );

        // const URL = `https://api.pexels.com/v1/search?query=nature%20night&per_page=80&orientation=landscape`;
        // const response = await fetch(URL, {
        //   headers: {
        //     Authorization: PEXELS_KEY,
        //   },
        // });

        const res = await Promise.all([
            await fetch(URLs[0]),
            await fetch(URLs[1]),
            await fetch(URLs[2]),
            await fetch(URLs[3]),
            await fetch(URLs[4]),
            await fetch(URLs[5]),
            await fetch(URLs[6]),
            await fetch(URLs[7]),
            await fetch(URLs[8]),
            await fetch(URLs[9]),
        ]);

        const res2 = await Promise.all([
            await res[0].json(),
            await res[1].json(),
            await res[2].json(),
            await res[3].json(),
            await res[4].json(),
            await res[5].json(),
            await res[6].json(),
            await res[7].json(),
            await res[8].json(),
            await res[9].json(),
        ]);

        const results = [
            ...res2[0].results,
            ...res2[1].results,
            ...res2[2].results,
            ...res2[3].results,
            ...res2[4].results,
            ...res2[5].results,
            ...res2[6].results,
            ...res2[7].results,
            ...res2[8].results,
            ...res2[9].results,
        ].map((x) => x.urls.full); // unsplash

        // const results = data.photos.map((x) => x.src.original); // pexels

        // Fetch 100 images
        console.log("Backdrop: fetched", results.length, "images");

        // Get random index
        const randomIndex = getRandom(results.length);

        // Return random image
        return results[randomIndex];
    } catch (error) {
        console.error(error);
    }
}

export default fetchBgImage;
