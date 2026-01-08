import {error as sverror, type RequestHandler} from "@sveltejs/kit";
import {createClient} from "@supabase/supabase-js";
import {PUBLIC_DEV, PUBLIC_SUPABASE_URL} from "$env/static/public";
import {SECRET_SUPABASE_SERVICE_ROLE_KEY} from "$env/static/private";
import {getWordCount} from "$lib/utils/getWordCount";

export const GET: RequestHandler = async () => {
    const supabase = createClient(PUBLIC_SUPABASE_URL, SECRET_SUPABASE_SERVICE_ROLE_KEY)

    const {data, error} = await supabase
        .from('articles')
        .select('contentmd')
        .filter('category', 'not.in', '(draft,stashed)')

    if (error || !data) {
        if (PUBLIC_DEV) console.error(error);
        sverror(500, 'The existence of writing implies the existence of unwriting (error).')
    }

    const wordCount = data?.reduce((acc: number, article: typeof data[number]) => acc + getWordCount(article.contentmd), 0);

    return new Response(JSON.stringify({ words: wordCount}), {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, s-maxage=600, max-age=600"
        }
    });
}