<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer/Footer.svelte";
    import Confidential from "$lib/components/Confidential.svelte";

    const cheatCode = ['L', 'A', 'N', 'T', 'E', 'R', 'N'];
    let codeIx = 0;
    const maxDelay = 3000;
    let past = Date.now();
    let confidential = $state(false);

    const handleConfidential = (e: KeyboardEvent) => {
        const now = Date.now();

        if (now - past > maxDelay) {
            codeIx = 0;
        }

        past = now;

        if (e.key === cheatCode[codeIx] || e.key === cheatCode[codeIx].toLowerCase()) {
            codeIx++;
            if (codeIx === cheatCode.length) {
                confidential = true;
                codeIx = 0;
            }
        } else {
            codeIx = 0;
        }
    }

    let body = $state<HTMLElement | null>(null);

    $effect(() => {
        if (!body) return;
        if (confidential) {
            body.style.overflow = "hidden";
        } else {
            body.style.overflow = "visible";
        }
    })
</script>

<svelte:window onkeydown={handleConfidential}/>
<svelte:body bind:this={body}/>


<Header/>
{#if confidential}
    <Confidential bind:confidential={confidential}/>
{/if}


<main>
    <div class="wrap">
        <section class="this-site">
            <h2>About this place</h2>
            <div>
                <p>Leaving in a little bit about the site here.</p>
                <p>
                    <strong>Chaos Abyss</strong> - is a my fun little
                    blog/I put in too much effort into this and it's actually kinda journalistic, and <i>probably</i>
                    well
                    researched type of thing. So I try to make it fun to read and informative, and hope you like it.
                </p>
                <p>
                    This site covers a wide range of things, but mostly it's the stuff I'm into. Or it's just
                    interesting as fuck.
                </p>
                <p>
                    The thing is built and crafted in Svelte, and it's <a
                        href="https://github.com/lethargistic/chaos-abyss/"
                        style="text-decoration: underline; cursor: pointer"> open-sauce</a>. Go check it out, or else...
                </p>
                <p>
                    <strong>AI policy:</strong><br> Shrimple. Spellcheck, idk dumb
                    question about cats or something - ok. sure. Any actual research - no never why that'd be so dumb,
                    I'll
                    just spend my minute actually looking into it.
                </p>
                <p><strong>Why Chaos Abyss?:</strong><br> Ehh, it's
                    a very deep <span style="color: #666666; cursor: pointer"
                                      onclick={() => {const audio = new Audio('/audio/ba-dum-tss.mp3'); audio.play()}}
                                      onkeydown={() => {}} tabindex="-1" role="button">(ba dum tss)</span> metaphor. You
                    can
                    interpret it however you wish though.<br><br> <strong>You might see:</strong> <br>- Occasional
                    shouting into the void. <br>- Mild chaos, some abyss. <br>- Unhinged passion for details.<br> -
                    Lore. Wait no. Maybe. <br>- Overanalysis of things that probably don’t need it.
                </p>
            </div>
        </section>
        <section class="content">
            <img class="pfp" width="524" height="524" src="/img/pfp.webp" alt="Lethargistic profile pic" loading="lazy"/>
            <h1>Who is behind all this</h1>
            <div class="content-text">
                <p>
                    Muhahaha - I'm Lethargistic, an incredibly tired wizard individual.
                </p>
                <p>
                    I live in
                    Ukraine <img
                        width="72" height="72" class="smol" src="/img/flag-ua.png" alt="Ukrainian flag"> and it's fun here, plus we have
                    pierogi,
                    and they're crazy good. And I recommend you visit here someday.
                </p>
                <p> My main thing is web
                    development,
                    but I do have a lot of interests and passions, a lot more than I should. </p>
                <p>
                    I
                    currently study in a college, academically, I'm the best student in the whole thing. Although, I
                    hate it
                    to the core. </p>
                <p> From a young
                    age I learned English, the best decision in my life. I now crawl the internet in search of
                    information
                    to
                    process and store in unhealthy amounts on a daily basis. Although I unfortunately touch plenty of
                    grass,
                    and also I exercise.</p>
                <p><strong>Some things I like: </strong> Minecraft, Konosuba, VA-11 Hall-A,
                    Frieren, Omori, Oneshot, Hades, Vocaloid music, Dead Cells, EDM music <br> <strong>Some things that
                        keep
                        me alive:</strong> caffeine, Svelte, Stardew Valley, badass Ukrainian soldiers on the
                    frontlines
                </p>
            </div>
        </section>
    </div>
</main>
{#if !confidential}
    <Footer about={true}/>
{/if}


<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap');

    :global {
        html, body {
            overflow-y: visible;
        }
    }

    p:first-child {
        margin-top: 0;
    }

    p {
        margin-top: 1rem;
    }

    main {
        padding-bottom: 10vh;

        @media (max-width: 768px) {
            padding-bottom: 1vh;
        }

        & .wrap {
            display: flex;

            max-width: 1200px;
            width: 100%;
            padding-top: clamp(0.1rem, 0.5rem, 2rem);
            margin: 0 auto;

            @media (max-width: 768px) {
                flex-direction: column;
                box-sizing: border-box;
            }

            & .this-site {
                width: 50%;
                padding: 1rem;
                box-sizing: border-box;

                @media (max-width: 768px) {
                    width: 100%;
                }

                & h2 {
                    font-weight: bolder;
                    font-family: 'Roboto Slab', sans-serif;
                    margin-bottom: 1rem;
                }
            }

            & .content {
                margin-top: 1rem;
                font-size: 1rem;
                width: 50%;
                padding: 1rem;
                box-sizing: border-box;

                @media (max-width: 768px) {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                }

                & h1 {
                    font-family: 'Roboto Slab', sans-serif;
                    font-size: 2rem;
                    padding-bottom: 1rem;

                    @media (max-width: 768px) {
                        order: 1;
                    }
                }

                .content-text {
                    & .smol {
                        display: inline;
                        aspect-ratio: 1;
                        width: 1rem;
                        height: auto;
                        vertical-align: middle;
                    }

                    @media (max-width: 768px) {
                        order: 3;
                    }
                }

                & .pfp {
                    aspect-ratio: 1;
                    border-radius: 1px;
                    border: 1px solid black;
                    margin-left: 1rem;
                    margin-bottom: 0.5rem;
                    width: 200px;
                    height: auto;
                    float: right;

                    @media (max-width: 768px) {
                        align-self: center;
                        margin: 0 0 1rem 0;
                        display: block;
                        float: none;
                        order: 2;
                    }
                }
            }


        }
    }
</style>