import {error as sverror, type RequestHandler} from "@sveltejs/kit";
import {createClient} from "@supabase/supabase-js";
import {PUBLIC_DEV, PUBLIC_SUPABASE_URL} from "$env/static/public";
import {SECRET_SUPABASE_SERVICE_ROLE_KEY} from "$env/static/private";

export const GET: RequestHandler = async () => {
    const supabase = createClient(PUBLIC_SUPABASE_URL, SECRET_SUPABASE_SERVICE_ROLE_KEY)

    const {data, error} = await supabase
        .from('articles')
        .select('date')
        .filter('category', 'not.in', '(draft,stashed)')
        .order('date', {ascending: false})
        .limit(1)
        .single()

    if (error || !data) {
        if (PUBLIC_DEV) console.error(error);
        sverror(500, 'Failed to get latest post bagels')
    }

    return new Response(JSON.stringify({ date: data.date }), {
        headers: { "Content-Type": "application/json" }
    });
}