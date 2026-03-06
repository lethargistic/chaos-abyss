<script lang="ts">
    import {enhance} from '$app/forms';
    import MarkdownBlock from "$lib/components/MarkdownBlock.svelte";
    import {currentContent, currentDate, currentDetails, md} from "../../shared.svelte";
    import {onDestroy, onMount} from "svelte";
    import {goto} from "$app/navigation";
    import {browser} from "$app/environment";
    import MetaBlock from "$lib/components/MetaBlock.svelte";
    import {calculateDeepAccent} from "$lib/utils/calculateDeepAccent";

    const date = (!!currentDate.date ? currentDate.date : (browser ? localStorage.getItem('date') || '' : ''));

    let {data, form} = $props();
    const isEditing = $derived({val: data.clean ? false : (!!currentDetails.details ? !!currentDetails.details : (browser ? localStorage.getItem('isEditing') === 'true' : false))});

    const autoGrow = (e: Event) => {
        const textarea = e.target as HTMLInputElement;

        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    let text = $derived(
        !!currentContent.content ? currentContent.content : (browser ? localStorage.getItem("text") ?? '' : '')
    );

    let parsedHtml = $state('');

    // once again a workaround, it used to work before my manipulations too hmm
    // really unsure why can't i just use derived here
    // EDIT: it's cause it has side effects i think
    $effect(() => {
        parsedHtml = md.render(text);
    })

    // very lame that you can't do this in css in Svelte right now
    let body: HTMLBodyElement | undefined = $state();

    onMount(() => {
        if (body) {
            body.style.backgroundColor = '#232323';
        }
    })

    onDestroy(() => {
        if (body) {
            body.style.backgroundColor = 'white';
        }
    })

    // sidebar
    let sidebar = $state(false);

    const toggleSidebar = (e: KeyboardEvent) => {
        if (e.key === '/' && e.ctrlKey) {
            e.preventDefault();
            sidebar = !sidebar;
        }
    }

    type Details = {
        uuid: string,
        title: string,
        blurb: string,
        metadesc: string,
        category: string,
        slug: string,
        fig: string,
        widefig: string,
        figcap: string | null,
        figalt: string,
        accent: string,
        jewel: boolean,
        reminder: string,
        author: string,
    }

    // LOAD LAST DETAILS FROM LOCAL STORAGE (or defaults)
    const localDetails = browser ? JSON.parse(localStorage.getItem("details") ?? "{}") : {};

    let uuid = $state(data.clean ? crypto.randomUUID() : localDetails.uuid ?? '00000000-0000-0000-0000-000000000000');
    let title = $state(localDetails.title ?? 'Oh no he forgot the title probably');
    let blurb = $state(localDetails.blurb ?? 'default');
    let metadesc = $state(localDetails.metadesc ?? 'default');
    let category = $state(data.clean ? 'draft' : localDetails.category ?? 'draft');
    let slug = $state(localDetails.slug ?? 'default');
    let fig = $state(localDetails.fig ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTGoZWW-KsjKOKlnprtHNtxWr6rRvNM417dg&s');
    let widefig = $state(localDetails.widefig ?? '');
    let figcap: string | null = $state(localDetails.figcap ?? null);
    let figalt = $state(localDetails.figalt ?? '');
    let jewel = $state(!!localDetails.jewel); // coerces to boolean
    let reminder = $state(localDetails.reminder ?? '');
    let author = $state(localDetails.author ?? 'Lethargistic');

    let hue = $state(parseFloat(browser ? (localStorage.getItem('hue') ?? '30') : '30'));
    let accent = $derived(`oklch(0.8149 0.1044 ${hue})`);

    const getHueFromCSSOKLCH = (oklch: string) => parseFloat(oklch.match(/oklch\([^ ]+ [^ ]+ ([^ ]+)/)?.[1] ?? '30');

    // Svelte's object reactivity is weird (or i just can't figure it out)
    // it technically works to just go details.title = 'blah blah blah'
    // but you get a warning that it's non-reactive so a million variables
    // go brrrrrrrr
    const derivedDetails = $derived(currentDetails.details);
    $effect(() => {
        if (derivedDetails) {
            uuid = derivedDetails.uuid;
            title = derivedDetails.title;
            blurb = derivedDetails.blurb;
            metadesc = derivedDetails.metadesc;
            category = derivedDetails.category;
            slug = derivedDetails.slug;
            fig = derivedDetails.fig;
            widefig = derivedDetails.widefig;
            figcap = derivedDetails.figcap;
            figalt = derivedDetails.figalt;
            accent = derivedDetails.accent;
            jewel = derivedDetails.jewel;
            reminder = derivedDetails.reminder;
            author = derivedDetails.author;

            hue = getHueFromCSSOKLCH(derivedDetails.accent);
        }
    });

    const details: Details = $derived({
        uuid: uuid,
        title: title,
        blurb: blurb,
        metadesc: metadesc,
        category: category,
        slug: slug,
        fig: fig,
        widefig: widefig,
        figcap: figcap,
        figalt: figalt,
        accent: accent,
        jewel: jewel,
        reminder: reminder,
        author: author,
    })

    // set accent vars
    $effect(() => {
        body?.style.setProperty('--accent-color', accent);
        body?.style.setProperty('--accent-color-deeper', calculateDeepAccent(accent));
    })

    // return to list on success

    $effect(() => {
        if (form?.success) {
            goto('/admin/dashboard/list');
        }
    })

    // SAVE LAST DETAILS FROM LOCAL STORAGE
    let timeout: ReturnType<typeof setTimeout>;

    const handleSaving = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            localStorage.setItem('details', JSON.stringify(details));
            localStorage.setItem('text', text);
            localStorage.setItem('isEditing', isEditing.val.toString());
            localStorage.setItem('date', date);
            localStorage.setItem('hue', hue.toString());
        }, 500)
    }

    // pretrimmed content for search
    const contentTrim = $derived(parsedHtml.trim().replace(/\s+/g, ' ').slice(0, 500))

</script>

<svelte:head>
    <title>Editor</title>
    <meta name="robots" content="noindex, nofollow">
</svelte:head>
<svelte:body bind:this={body}/>
<svelte:window onkeydown={toggleSidebar}/>

<div class="bg-white"></div>
<div class="bg-img"></div>
<div class="bg-gradient"></div>

<button class="burger" aria-label="Sidebar burger" onclick={() => sidebar = !sidebar}
        onkeydown={toggleSidebar}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
        <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/>
    </svg>
</button>
<aside oninput={handleSaving} class="sidebar {sidebar ? 'open' : 'closed'}">
    <label for="title">Title</label>
    <input name="title" id="title" type="text" bind:value={title}/>

    <label for="blurb">Blurb</label>
    <textarea name="blurb" id="blurb" bind:value={blurb}></textarea>

    <label for="meatdesc">Meta description</label>
    <small class="smol">Invisible on the site, but visible on google.</small>
    <textarea name="meatdesc" id="meatdesc" bind:value={metadesc}></textarea>

    <!-- the category select is moved to dashboard-->

    <label for="slug">Slug</label>
    <input name="slug" id="slug" type="text" bind:value={slug}/>
    {#if isEditing.val === true && slug !== derivedDetails?.slug}
        <small class="warn">WARNING: if you change the slug here, it will make a redirect to the new page! <br>Originally: {derivedDetails?.slug}
        </small>
    {/if}

    <label for="fig">Figure</label>
    <input name="fig" id="fig" type="text" bind:value={fig}/>
    <img class="fig" src={fig} alt="fig">

    <label for="widefig">Wide Figure</label>
    <input name="widefig" id="widefig" type="text" bind:value={widefig}/>
    <img class="widefig" src={widefig} alt="widefig">

    <label for="figcap">Figure Caption (Optional)</label>
    <input name="figcap" id="figcap" type="text" bind:value={figcap}/>

    <label for="figalt">Figure Alt Text</label>
    <input name="figalt" id="figalt" type="text" bind:value={figalt}/>

    <label for="accent">Accent</label>
    <input name="accent" id="accent" type="range" min="0" max="360" bind:value={hue}/>
    <div class="color-bar" style="background-color: {accent}"></div>

    <label for="jewel">
        Jewel
        <input name="jewel" id="jewel" type="checkbox" bind:checked={jewel}/>
    </label>

    <label for="reminder">Reminder</label>
    <small class="smol">format example: yearly-2025</small>
    <input name="reminder" id="reminder" type="text" bind:value={reminder}/>

    <label for="author">Author</label>
    <input name="author" id="author" type="text" bind:value={author}/>
</aside>
<main>
    <h1>No one’s watching. You’re safe here.</h1>
    <form method="POST" action="?/newArticle" use:enhance>
        <input type="hidden" name="details" value={JSON.stringify(details)}/>
        <input type="hidden" name="isEditing" value={isEditing.val}/>
        <input type="hidden" name="date" value={date}/>
        <input type="hidden" name="contentTrim" value={contentTrim}/>
        <div class="write-bloc">
            <textarea name="article" bind:value={text} oninput={(e) => {autoGrow(e); handleSaving();}}></textarea>
            <div class="rendered">
                <MetaBlock title={title} blurb={blurb} date={date} accent={accent} lastEdit={''} wordcount={0} authorLink={'/'}
                           author={author}/>
                <MarkdownBlock content={parsedHtml} slug={slug}/>
            </div>
        </div>
        <div class="button-wrap">
            {#if !form?.success}
                <p class="threat">{form?.threat}</p>
            {/if}
            <button>{isEditing.val ? `Finish Editing ${slug}` : "Create New Draft" }</button>
        </div>
    </form>
</main>

<style>
    :global {
        body {
            overflow-y: hidden;
        }
    }

    .threat {
        color: #9a0000;
        align-content: center;
        padding-right: 3rem;
    }

    .burger {
        all: unset;

        position: fixed;
        z-index: 99999;
        top: 1vw;
        right: 1vw;

        cursor: pointer;
        opacity: 50%;

        width: 1rem;
        height: 1rem;
        aspect-ratio: 1/1;

        & svg {
            width: 100%;
        }
    }

    .closed {
        right: -30vw;
    }

    .open {
        right: 0;
    }

    .sidebar {
        position: fixed;
        z-index: 99998;

        width: 30vw;
        height: 100vh;
        background-color: rgba(255, 255, 255, 0.95);
        border-left: 1px solid black;

        transition: right 0.1s ease-in;

        box-sizing: border-box;
        padding: 2rem 3rem 0 1.5rem;

        overflow-x: clip;
        overflow-y: auto;

        * {
            width: 100%;
            display: block;
        }

        & input, select, textarea {
            margin-bottom: 1rem;
            padding-left: 0.3rem;
        }

        & label {
            margin-bottom: 0.3rem;
            border-bottom: 1px solid black;
            padding-right: 0.3rem;
        }

        & input {
            height: 2rem;
        }

        & img {
            padding-bottom: 1rem;
        }

        & .warn {
            color: #c50000;
            padding-top: 0;
            padding-bottom: 1rem;
        }

        & .smol {
            padding-top: 0.3rem;
            padding-bottom: 0.3rem;
        }

        & label[for=jewel] {
            display: flex;
            height: 1rem;
            align-items: center;
            margin-bottom: 1rem;
            width: 5rem;
        }

        & .color-bar {
            width: 100%;
            height: 2rem;
            background: purple;
            margin-bottom: 1rem;
            border: 1px solid black;
        }

        & input[type=checkbox] {
            height: 1rem;
            margin-bottom: 0;
        }

        & textarea {
            padding-top: 0.5rem;
            height: 3rem;
        }

        & select {
            height: 2.5rem;
            padding-right: 1rem;
        }

        & input[type=checkbox], select {
            cursor: pointer;
        }
    }

    .sidebar::-webkit-scrollbar {
        display: none;
    }

    .bg-white {
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;

        width: 100vw;
        height: 20vh;

        background: white;
    }

    .bg-img {
        position: absolute;
        z-index: -1;
        top: 20vh;
        left: 0;

        width: 100vw;
        height: 100vh;

        background: url("/img/amazingsunsetfoggy.webp") no-repeat;
        background-size: cover;
    }

    .bg-gradient {
        position: absolute;
        z-index: -1;
        top: 120vh;
        left: 0;

        width: 100vw;
        height: 450px;

        background: url("/img/editor-gradient.webp") no-repeat;
        background-size: cover;
    }

    main {
        display: flex;
        flex-direction: column;
        align-items: center;

        margin-top: 9rem;

        & h1 {
            font-size: 1.6rem;
            font-family: "Comfortaa", sans-serif;
        }

        & form {
            margin-top: 17rem;
            width: 80vw;

            display: flex;
            flex-direction: column;

            & .write-bloc {
                max-width: 2128px;
                width: 100%;
                min-height: 100vh;

                display: flex;
                flex-direction: row;

                & textarea {
                    all: unset;
                    background-color: #fbfafa;
                    opacity: 0.9;
                    border: #737373 1px solid;

                    overflow-wrap: break-word;
                    white-space: pre-wrap;
                    width: 50%;
                    min-height: 100vh;
                    height: auto;
                    box-sizing: border-box;

                    padding: 2rem;

                }

                & .rendered {
                    background-color: white;
                    width: 50%;
                    height: 100%;
                    min-height: 100vh;
                    opacity: 0.9;

                    max-width: 1000px;
                    margin: 0 auto;

                    padding: 2rem;
                    border: #737373 1px solid;
                    box-shadow: rgba(0, 0, 0, 0.19) 0 10px 20px, rgba(0, 0, 0, 0.23) 0 6px 6px;
                }
            }

            & .button-wrap {
                padding-bottom: 9vh;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;

                width: 100%;
                margin-top: 2rem;

                & button {
                    all: unset;
                    cursor: pointer;
                    background-color: white;
                    border: black 1px solid;
                    border-radius: 24px;

                    padding: 0.5rem 1rem;
                }
            }
        }
    }
</style>