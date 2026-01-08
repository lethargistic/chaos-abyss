import {error as sverror, type RequestHandler} from "@sveltejs/kit";
import {createClient} from "@supabase/supabase-js";
import {PUBLIC_DEV, PUBLIC_SUPABASE_URL} from "$env/static/public";
import {SECRET_SUPABASE_SERVICE_ROLE_KEY} from "$env/static/private";

export const GET: RequestHandler = async () => {
    const supabase = createClient(PUBLIC_SUPABASE_URL, SECRET_SUPABASE_SERVICE_ROLE_KEY)

    const {count, error} = await supabase
        .from('articles')
        .select('*', {count: 'exact', head: true})
        .filter('category', 'not.in', '(draft,stashed)')

    if (error || !count) {
        if (PUBLIC_DEV) console.error(error);
        sverror(500, 'Failed to get article count')
    }

    return new Response(JSON.stringify({ count: count }), {
        headers: { "Content-Type": "application/json" }
    });
}