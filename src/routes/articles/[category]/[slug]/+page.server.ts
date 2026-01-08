import {error as sverror} from "@sveltejs/kit";
import {getClient} from "$lib/utils/getSupabaseClient";
import {escapeHTML} from "$lib/utils/escapeHTML";
import {calculateDeepAccent} from "$lib/utils/calculateDeepAccent";
import {getWordCount} from "$lib/utils/getWordCount";

export const prerender = 'auto';

const authors = [{
    name: 'Maksiks',
    link: '/about',
}]

export const load = async ({params}) => {
    const supabase = getClient();
    // no, i just wanted to name it like that
    const slugcat = params.category;

    // article per slug and category
    const {data: article, error: artErr} = await supabase
        .from('articles')
        .select('*')
        .eq('slug', params.slug)
        .ilike('category', slugcat)
        .single();
    if (artErr || !article) {
        throw sverror(404, 'Oh no, article not found.');
    }

    article.author ??= "Maksiks";

    // adjacent articles
    const [nextArtRes, previousArtRes] = await Promise.all([
        supabase
            .from('articles')
            .select('title, slug, category')
            .gt('date', article.date)
            .not('category', 'in', '("draft","stashed")')
            .order('date', {ascending: true})
            .limit(1),
        supabase
            .from('articles')
            .select('title, slug, category')
            .lt('date', article.date)
            .not('category', 'in', '("draft","stashed")')
            .order('date', {ascending: false})
            .limit(1),
    ]);

    const next = {
        title: nextArtRes.data?.[0]?.title ?? 'There is nothing but the stars above.',
        slugcat: nextArtRes.data?.[0]?.category ?? undefined,
        slug: nextArtRes.data?.[0]?.slug ?? undefined,
    };

    const previous = {
        title: previousArtRes.data?.[0]?.title ?? 'You’ve reached the bottom of the abyss.',
        slugcat: previousArtRes.data?.[0]?.category ?? undefined,
        slug: previousArtRes.data?.[0]?.slug ?? undefined,
    };

    const adjacent = {previous, next};

    // seo

    const toISODate = (dateString: string): string => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'uhm, the date is wrong';
        }
        return date.toISOString().split("T")[0];
    };

    const meta = {
        title: article.title,
        canonUrl: `https://www.chaos-abyss.com/articles/${article.category}/${params.slug}`,
        metaNamed: [
            {name: "description", content: article.metadesc ?? article.blurb},
            {name: "twitter:card", content: "summary_large_image"},
            {name: "twitter:title", content: article.title},
            {name: "twitter:description", content: article.metadesc ?? article.blurb},
            {name: "twitter:image", content: article.fig}
        ],
        metaProperty: [
            {property: "og:type", content: "article"},
            {property: "og:locale", content: "en_US"},
            {property: "og:title", content: article.title},
            {property: "og:description", content: article.metadesc ?? article.blurb},
            {property: "og:url", content: `https://www.chaos-abyss.com/articles/${article.category}/${params.slug}`},
            {property: "og:image", content: article.fig}
        ],
        jsonLD: {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "author": {
                "@type": "Person",
                "name": article.author
            },
            "name": article.title,
            "datePublished": toISODate(article.date),
            "url": `https://www.chaos-abyss.com/articles/${article.category}/${params.slug}`
        }
    };

    // accent
    const match = article.accent.match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)$/);
    if (!match) {
        console.warn("Maksiks: Invalid accent, default will be used instead.");
        article.accent = 'oklch(0.8149 0.1044 19.57)'
    }

    let accentDeep = calculateDeepAccent(article.accent);

    // misc

    const wordcount = getWordCount(article.contentmd ?? 0);
    const authorlink = authors.find(author => author.name === article.author)?.link;

    return {
        article,
        // accent edited inside the article
        adjacent,
        meta,
        wordcount,
        authorlink,
        accentDeep
    };
}
