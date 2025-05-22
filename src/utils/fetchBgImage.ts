async function fetchImage(query) {
    const UNSPLASH_KEY = "000";
    return;

    try {
        if (query === "clear") query = "nature";
        const URL = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            query
        )}&orientation=landscape&page=1&per_page=30&client_id=${UNSPLASH_KEY}`;
        const URL2 = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            query
        )}&orientation=landscape&&page=4per_page=30&client_id=${UNSPLASH_KEY}`;
        const URL3 = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            query
        )}&orientation=landscape&&page=5per_page=30&client_id=${UNSPLASH_KEY}`;
        const URL4 = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            query
        )}&orientation=landscape&&page=6per_page=30&client_id=${UNSPLASH_KEY}`;
        const URL5 = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            query
        )}&orientation=landscape&&page=7per_page=30&client_id=${UNSPLASH_KEY}`;
        const URL6 = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            query
        )}&orientation=landscape&&page=8per_page=30&client_id=${UNSPLASH_KEY}`;
        const URL7 = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            query
        )}&orientation=landscape&&page=9per_page=30&client_id=${UNSPLASH_KEY}`;
        const URL8 = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            query
        )}&orientation=landscape&&page=10per_page=30&client_id=${UNSPLASH_KEY}`;
        // const URL = `https://api.pexels.com/v1/search?query=nature%20night&per_page=80&orientation=landscape`;
        // const response = await fetch(URL, {
        //   headers: {
        //     Authorization: PEXELS_KEY,
        //   },
        // });
        const response = await fetch(URL);
        const response2 = await fetch(URL2);
        const response3 = await fetch(URL3);
        const response4 = await fetch(URL4);
        const response5 = await fetch(URL5);
        const response6 = await fetch(URL6);
        const response7 = await fetch(URL7);
        const response8 = await fetch(URL8);
        if (!response.ok) throw new Error("💥 Oops! Something failed (Unsplash)");
        if (!response2.ok) throw new Error("💥 Oops! Something failed (Unsplash)");
        if (!response3.ok) throw new Error("💥 Oops! Something failed (Unsplash)");
        if (!response4.ok) throw new Error("💥 Oops! Something failed (Unsplash)");
        if (!response5.ok) throw new Error("💥 Oops! Something failed (Unsplash)");
        if (!response6.ok) throw new Error("💥 Oops! Something failed (Unsplash)");
        if (!response7.ok) throw new Error("💥 Oops! Something failed (Unsplash)");
        if (!response8.ok) throw new Error("💥 Oops! Something failed (Unsplash)");
        const data = await response.json();
        const data2 = await response2.json();
        const data3 = await response3.json();
        const data4 = await response4.json();
        const data5 = await response5.json();
        const data6 = await response6.json();
        const data7 = await response7.json();
        const data8 = await response8.json();
        // const results = data3.results.map((x) => x.urls.full); // unsplash: array or pure img urls (30)
        const results = [
            ...data.results,
            ...data2.results,
            ...data3.results,
            ...data4.results,
            ...data5.results,
            ...data6.results,
            ...data7.results,
            ...data8.results,
        ].map((x) => x.urls.full); // unsplash: array or pure img urls (30)
        // const results = data.photos.map((x) => x.src.original); // pexels
        // fetching 100 images
        return results;
    } catch (error) {
        console.error(error);
    }
}
