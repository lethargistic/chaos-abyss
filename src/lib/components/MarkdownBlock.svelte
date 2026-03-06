<script lang="ts">
    // !!!!!!!!!!!!!!!!!
    // The markdown is handled server side
    // This page only renders the html gotten from the server
    // !!!!!!!!!!!!!!!!!

    import {hydrate, onDestroy, onMount, tick} from "svelte";
    import {browser} from "$app/environment";
    import {render} from "svelte/server";
    import EmailBox from "$lib/components/EmailBox.svelte";

    const {content, slug, form = null} = $props();

    let quotes: NodeListOf<HTMLQuoteElement>;
    let quote: HTMLElement;
    let below: HTMLElement;
    let parentElem: HTMLElement;

    const makeBlockquoteFullHeight = () => {
        if (below && quote) {
            const height = below.getBoundingClientRect().height;
            quote.style.height = height + 'px';
        }
    }

    let observer: ResizeObserver;

    const observeQuotes = (quotes: NodeListOf<HTMLQuoteElement>) => {
        quotes.forEach(currentQuote => {
            quote = currentQuote;
            below = quote?.nextElementSibling as HTMLElement;
            if (!below) {
                console.warn("Lethargistic: A blockquote is not supposed to exist without an element after it. Likely just move the '>' 1 line back.")
                return;
            }
            parentElem = quote?.parentElement as HTMLElement;

            if (parentElem.classList.contains('c-quote')) {
                return;
            }

            makeBlockquoteFullHeight();

            observer.observe(below);
        })
    }

    if (!browser) {
        // I'm not completely positive that this works
        // the docs do be kind of vague on this one
        const emailBox = render(EmailBox, {
            props: {form: form, lirith: true}
        })
    }

    onMount(() => {
        if (slug === 'lirith') {
            const target = document.querySelector('#email-box-placeholder');
            if (!target) {return;}
            const emailBoxHyd = hydrate(EmailBox, {
                target: target,
                props: {form: form, lirith: true}
            })
        }

        tick().then(() => {
            observer = new ResizeObserver(makeBlockquoteFullHeight)

            // normal quotes
            quotes = document.querySelectorAll('blockquote');
            observeQuotes(quotes);

            // cquotes
            quotes = document.querySelectorAll('.c-quote');
            observeQuotes(quotes);
        })

    })
    onDestroy(() => {
        if (observer) {
            observer.disconnect();
        }
    })
</script>

<div class="article-content">
    <noscript>
        {#if slug === 'lirith'}
            <EmailBox {form} lirith={true}/>
        {/if}
    </noscript>
    {@html content}
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap');

    :global {
        .c-quote {
            max-width: 40%;
            margin: 0 !important;
            padding: 0 0 0 clamp(10px, 1.5vw, 35px);
            float: right;
            text-transform: uppercase;

            background: linear-gradient(135deg, color-mix(in oklab, var(--accent-color) 99%, black), color-mix(in oklab, var(--accent-color) 30%, black));
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: bold;
            font-size: 1.2rem;

            & blockquote {
                all: unset;
            }
        }

        blockquote {
            max-width: 40%;

            background: linear-gradient(135deg, color-mix(in oklab, var(--accent-color) 99%, black), color-mix(in oklab, var(--accent-color) 30%, black));
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: bold;
            font-size: 1.2rem;

            padding: 0 0 0 clamp(10px, 1.5vw, 35px);
            text-transform: uppercase;

            display: flex;
            align-items: center;

            float: right;

            & p {
                margin: 0 !important;
            }
        }

        .article-content {
            margin: 1.8rem 0 0 0;

            & ul {
                list-style: none;
                margin-top: -1rem;
                padding-bottom: 1rem;

                & li::before {
                    content: '✦ ';
                }
            }

            & h1::before {
                content: 'this is a mistake, an h1 # should not be here -> ';
                color: red;
            }

            & h1 {
                color: red;
            }


            & h2 {
                font-size: 1.7rem;
                line-height: 1.4;

                margin-top: 2.6rem;
                margin-bottom: 1rem;
                border-bottom: 1px solid black;
            }

            & h3 {
                font-size: 1.4rem;
                line-height: 1.4;

                margin-top: 1rem;
                margin-bottom: 1rem;
            }

            & h4 {
                font-size: 1.2rem;
                line-height: 1.4;

                margin-top: 0.6rem;
                margin-bottom: 1rem;
            }

            & p {
                line-height: 1.8;
                margin-bottom: 1rem;
            }

            & figure {
                margin: 20px 0 20px 0;

                align-items: center;
                display: flex;
                flex-direction: column;
                justify-content: center;

                & img {
                    max-width: 80%;
                }
            }

            & img {
                display: block;
                margin-inline: auto;
                max-width: 100%;
                margin-top: 1rem;
            }

            & .table-wrap {
                width: 100%;
                @media (max-width: 768px) {
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                }
                & table {
                    width: 100%;

                    margin: 1vw 0 1vw 0;
                    border: 1px solid black;
                    border-spacing: 0;

                    & td, tr, th {
                        padding: 10px;
                        border: 1px solid black;
                    }

                    @media (max-width: 768px) {
                        min-width: max-content;
                    }
                }
            }


            & a {
                text-decoration: underline;
                cursor: pointer;
            }

            & pre {
                background-color: #fefcff;
                line-height: 1.2rem;
                letter-spacing: -0.022em;
                border: 1px solid #e3e3e3;

                border-radius: 4px;
                padding: 0 20px;

                & code {
                    & * {
                        font-family: "JetBrains Mono", monospace;
                    }

                    padding: 1px 6px;
                    font-family: "JetBrains Mono", monospace;
                    font-weight: bold;
                    font-size: 0.87rem;
                    background: transparent;
                }
            }

            & code {
                font-family: "JetBrains Mono", monospace;
                padding: 1px 6px;
                font-size: 0.87rem;
                border-radius: 4px;
                background-color: #eaeaea;
            }


            & figure {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-top: 1rem;
                margin-bottom: 2rem;

                & img {
                    max-width: 100%;
                }

                & figcaption {
                    margin-top: 1.2rem;
                    align-self: center;
                    text-align: center;
                }
            }

            & .desc {
                display: inline-block;
                font-size: 0.88rem;
                font-weight: 600;
                line-height: 1.2rem;
                padding-top: 0.8rem;
                padding-left: 0.4rem;
                padding-bottom: 0.8rem;
            }

            & .note {
                display: inline-block;
                font-size: 0.88rem;
                font-weight: 600;
                line-height: 1.2rem;
                padding-top: 0.8rem;
                padding-bottom: 0.8rem;
            }

            & #sources {
                box-sizing: border-box;
                margin-top: 1rem;
                padding: 1rem;
                background-color: rgba(239, 239, 243, 0.6);

                & h2 {
                    margin-top: 0;
                }

                & ul {
                    padding-bottom: 0.3rem;

                    & li {
                        padding-top: 0.7rem;
                    }
                }
            }

            & .emote {
                display: inline-block;
                height: 1.4rem;
                width: auto;
                vertical-align: -0.125rem;
                margin: 0;
            }

            & kbd {
                color: white;
                font-size: 0.7rem;
                display: inline;
                line-height: 1;
                padding: 0.1rem;
                margin: 0 0.4rem;
                position: relative;
                top: -1px;

                border-radius: 0.8px;

                background: #595959;
                box-shadow: -2px -2px 0 0 #6a6a6a,
                -2px 2px 0 0 #6a6a6a,
                2px -2px 0 0 #6a6a6a,
                2px 2px 0 0 #6a6a6a,
                -4px -4px 0 0 #353535,
                -4px 4px 0 0 #353535,
                4px -4px 0 0 #353535,
                4px 4px 0 0 #353535,
                -5px -5.2px 0 0 #1d1d1d,
                -5px 5px 0 0 #1d1d1d,
                5px -5.2px 0 0 #1d1d1d,
                5px 5px 0 0 #1d1d1d,
                -5px -5.2px 0 0 #1d1d1d,
                -5px 5px 0 0 #1d1d1d,
                5px -5.2px 0 0 #1d1d1d,
                5px 5px 0 0 #1d1d1d,
                -5px -5.2px 0 0 #1d1d1d,
                -5px 5px 0 0 #1d1d1d,
                5px -5.2px 0 0 #1d1d1d,
                5px 5px 0 0 #1d1d1d,
                -5px -5.2px 0 0 #1d1d1d,
                -5px 5px 0 0 #1d1d1d,
                5px -5.2px 0 0 #1d1d1d,
                5px 5px 0 0 #1d1d1d;

                & span {
                    font-family: "Fredoka", serif;
                    white-space: nowrap;
                    font-weight: 450;
                }
            }

            & .MathJax {
                max-width: 100%;

                svg {
                    max-width: 100%;
                }
            }
        }
    }
</style>