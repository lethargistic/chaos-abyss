import {error as sverror} from '@sveltejs/kit';
import type {RequestHandler} from './$types';
import {PUBLIC_DEV, PUBLIC_SUPABASE_URL} from "$env/static/public";
import {SECRET_UNSUBSCRIBE_SECRET, SECRET_SUPABASE_SERVICE_ROLE_KEY} from "$env/static/private";
import {jwtVerify} from "jose";
import {createClient} from "@supabase/supabase-js";

export const GET: RequestHandler = async ({url}) => {
    const jwt = url.searchParams.get('jwt');
    const lirith = url.searchParams.get('lirith') as string === 'true';

    const table = lirith ? 'waitlist' : 'newsletter';

    if (!jwt) {
        throw sverror(400, 'Invalid token')
    }

    try {
        const { payload } = await jwtVerify(jwt, new TextEncoder().encode(SECRET_UNSUBSCRIBE_SECRET), {
            algorithms: ['HS256']
        });
        if (PUBLIC_DEV) {
            console.log("Verified payload:", payload);
        }

        const supabase = createClient(PUBLIC_SUPABASE_URL, SECRET_SUPABASE_SERVICE_ROLE_KEY)

        const {error} = await supabase
            .from(table)
            .update({subscribed: false})
            .eq('email', payload.email)

        if (error || !payload.email) {
            if (PUBLIC_DEV) {
                console.error(error)
            }
            sverror(500, 'Failed to unsubscribe')
        }

        return new Response(JSON.stringify({ success: true }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (err) {
        if (PUBLIC_DEV) {
            console.error("JWT verification failed:", err);
        }
        throw sverror(401, 'Invalid token')
    }

};