<script lang="ts">
    // global styles
    import '../styles/global.css';

    // meta
    import {page} from "$app/state";
    import {onMount} from "svelte";
    import {invalidate} from "$app/navigation";
    import type {Session} from "@supabase/supabase-js";
    import {unescapeHTML} from "$lib/utils/unescapeHTML";

    let {data, children} = $props();

    let {meta} = $derived(page.data);
    $effect(() => {
        if (!meta) {
            console.warn("Lethargistic: No meta info found for page! YOU'VE DISTRIBUTED THE SEO GODS");
        }
    })

    let metasNamed = $derived(meta?.metaNamed);
    let metasProperty = $derived(meta?.metaProperty);

    // admin auth

    let { session, supabase } = $derived(data);

    onMount(() => {
        const { data } = supabase.auth.onAuthStateChange((_: Event, newSession: Session | null) => {
            if (newSession?.expires_at !== session?.expires_at) {
                invalidate('supabase:auth')
            }
        });

        return () => data?.subscription?.unsubscribe?.();
    })
</script>

<svelte:head>
    <title>{meta?.title ? unescapeHTML(meta.title) : 'Chaos Abyss'}</title>
    {#if meta}
        <!-- !!! -->
        {#if meta.noindex}
            <meta name="robots" content="noindex, follow">
        {:else }
            <meta name="robots" content="index, follow" />
        {/if}

        {#each metasNamed ?? [] as meta (meta.name)}
            <meta name={meta.name} content={unescapeHTML(meta.content)}/>
        {/each}
        {#each metasProperty ?? [] as meta (meta.property)}
            <meta property={meta.property} content={unescapeHTML(meta.content)}/>
        {/each}

        {#if meta.canonUrl}
            <link rel="canonical" href={meta.canonUrl}>
        {/if}

        {#if meta.jsonLD}
            {@html `<script type="application/ld+json">${JSON.stringify(meta.jsonLD)}</script>`}
        {/if}
    {/if}
</svelte:head>

{@render children()}