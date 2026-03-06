<script lang="ts">
    const {home = false, about = false, contact = false, newsletter = false} = $props();

    // whatever legal meaning these even have this is All rights reserved just read the license lol
    // ^ future me: he literally forgot to put the license in the repo btw
    import {onMount} from "svelte";
    import FooterLinks from "$lib/components/Footer/FooterLinks.svelte";
    import Socials from "$lib/components/Socials.svelte";

    const copyblurbs = [
        // evil
        `© {year} Lethargistic. You thought you could copy? How adorable.`,
        '© {year} Lethargistic. This isn’t copyright. This is dominion.',
        '© {year} Lethargistic. You may view, but you will not possess.',
        '© {year} Lethargistic. What you call “content” is my empire.',
        '© {year} Lethargistic. You copied? Fool. Now I copy you.',

        // not evil
        '© {year} Lethargistic. All rights reserved.',
        '© {year} Lethargistic. All rights buffed. No nerfs today.',
        '© {year} Lethargistic. Rights procedurally forgotten.',
        '© {year} Lethargistic. All rights autosaved.',
        '© {year} Lethargistic. Some rights stewed, others sautéed.',
        "© {year} Lethargistic. All rights neglected. It's a dangerous world out there.",
        '© {year} Lethargistic. My rights are in my reserve.',
        '© {year} Lethargistic. Rights acquired. Loot secured.',
        '© {year} Lethargistic. Reserved the rights to reserve rights.',
        '© {year} Lethargistic. Some rights chewed, others stored in a jar.',
        '© {year} Lethargistic. All rights corrupted. Please insert disk 2.',
        '© {year} Lethargistic. All rights reserved. Kept in a labeled jar.',
        '© {year} Lethargistic. Reserved a table for two.',
        '© {year} Lethargistic. Reserved with complimentary sarcasm.',
        '© {year} Lethargistic. All rights vacuum-packed for freshness.',
        '© {year} Lethargistic. All rights securely hoarded.',
        '© {year} Lethargistic. Rights reserved, pending final boss fight.',
        '© {year} Lethargistic. Reserved. Unauthorized duplication will be sarcastically judged.',
        '© {year} Lethargistic. All rights tightly packed and gently stacked.',
        '© {year} Lethargistic. Rights not available in demo version.',
        '© {year} Lethargistic. All rights on lockdown. Key not included.',
        '© {year} Lethargistic. All rights reserved. They’re shy.',
        '© {year} Lethargistic. All rights reserved. Violation triggers mild disappointment.',
        '© {year} Lethargistic. Rights reserved. See Appendix D for moral justification.',
        '© {year} Lethargistic. All rights reserved. Resistance is futile.',
        '© {year} Lethargistic. All rights reserved. Terms subject to hallucination.',
        '© {year} Lethargistic. Rights reserved pursuant to our recent blood pact.',
        '© {year} Lethargistic. All rights mine. You merely witnessed them.',
        '© {year} Lethargistic. I claimed the rights, and the world bent accordingly.',
        '© {year} Lethargistic. The rights are bound to me. Irrevocably.',
        '© {year} Lethargistic. All rights sealed within the last page of the grimoire.',
        '© {year} Lethargistic. My rights do not negotiate.',
        '© {year} Lethargistic. All rights branded with my true name.',
        '© {year} Lethargistic. Rights very caffeinated.',
        '© {year} Lethargistic. All rights reserved under the secret 28th Amendment: Thou Shalt Not Copy Lethargistic.',
        '© {year} Lethargistic. To copy or not to copy? Nay, thou shalt not.',
        '© {year} Lethargistic. Rights reserved, ye scurvy knave!',
        '© {year} Lethargistic. None may claim the rights but the one foretold.',
        '© {year} Lethargistic. Rights sealed by Zonai magic. Do not disturb.',
        '© {year} Lethargistic. Rights protected by Alma\'s hacker skills.',
        '© {year} Lethargistic. You must complete all shrines before touching these rights.',
        '© {year} Lethargistic. Niko tried to copy. Niko felt bad.',
        '© {year} Lethargistic. Rights reserved. You feel like you’re going to have a bad time.',
        '© {year} Lethargistic. The rights are filled with DETERMINATION.',
        '© {year} Lethargistic. The rights got absorbed by a dog. Sorry.',
        '© {year} Lethargistic. You swing, but the rights parry.',
        '© {year} Lethargistic. All rights reserved. This blurb is modded.',
        '© {year} Lethargistic. Rights enchanted with Protection IV.',
        '© {year} Lethargistic. All rights claimed post-Moon Lord.',
        '© {year} Lethargistic. All rights locked behind the 9999G donut.',
        '© {year} Lethargistic. Rights tomorrow.', // to the 1 person who gets it without looking at the order of these, this is gold.
        '© {year} Lethargistic. The rights are in another biome. And you forgot fuel.',
        '© {year} Lethargistic. You tried to copy. The spirits are mildly perturbed.',
        '© {year} Lethargistic. You Died. The rights remain.',
        '© {year} Lethargistic. One does not simply copy a Lord’s soul.',
        '© {year} Lethargistic. All rights guarded by Cerberus. Pet at your own risk.',
        '© {year} Lethargistic. Rights earned through death. And a lot of reruns.',
        '© {year} Lethargistic. Rights detonated with maximum chuunibyou.',
        '© {year} Lethargistic. Megumin cast Explosion on fair use.',
        '© {year} Lethargistic. Reincarnated into a copyright holder.',
        '© {year} Lethargistic. Roll a crit on every die of a 20d20 to get rights. Good luck.',
        '© {year} Lethargistic. These rights passed the Turing test. You didn’t.',
        '© {year} Lethargistic. These rights are allergic to theft.',
        '© {year} Lethargistic. Rights accessed via terminal_heartbreak.',
        '© {year} Lethargistic. Rights locked behind max friendship.',
        '© {year} Lethargistic. Rights stored in a conveyor loop. Forever.', // this one is hilarious i'm gonna die making these lmaoo
        '© {year} Lethargistic. Rights stored in an Ender Chest. Good luck accessing them.',
        '© {year} Lethargistic. You touched the rights. The curse touched back.',
        '© {year} Lethargistic. You copied. The contract is sealed.',
        '© {year} Lethargistic. You used Steal. You got socks. Not the rights.',
        '© {year} Lethargistic. Rights are absolute. Checkmate.',
        '© {year} Lethargistic. I… am copyright in shadow.', // i'm probably the only one who find these so funny but I don't care
        '© {year} Lethargistic. You have no rights in this world.',
        '© {year} Lethargistic. Rights acquired through legally questionable means.',
        '© {year} Lethargistic. I licked it. It\'s mine.', // * dies of laughter *
        '© {year} Lethargistic. Rights guarded by sarcasm and mild threats.',
        '© {year} Lethargistic. The rights recognize only one master.',
        '© {year} Lethargistic. These rights are a philosopher’s stone. Unreplicable.',
        '© {year} Lethargistic. The rights politely declined.',
        '© {year} Lethargistic. These rights hiss when touched.',
        '© {year} Lethargistic. I didn’t inherit the rights. I conquered them.',
        '© {year} Lethargistic. These rights kneel to no one. Except me.',
        '© {year} Lethargistic. The rights are in your walls. But not those walls, the other ones.',
    ];

    const rareCopyblurbs = [
        // rare
        '© 3:33 AM Lethargistic. Rights sleep-deprived.',
        '© ??? Lethargistic. Rights exist out of bounds.',
        '© NaN Lethargistic. Rights cannot be divided.',
        '© 0x7E9 Lethargistic. Rights protected by wrong hex magic.',
        '© 2010 Lethargistic. El Psy Copy-reserved.',
        '© 1993 Lethargistic. Rights DOOMed.',
        '© 1991 Lethargistic. Rights discombobulated.',
        '© 1720 Lethargistic. Paper rights collapsed.',
        '© 666 Lethargistic. Rights protected by demons.',
        '© 8-bit Lethargistic. Rights chiptuned.',
        '© 1492 Lethargistic. Rights discovered accidentally.',
        '© 1937 Lethargistic. Rights entered Mordor.',
        '© -273.15°C Lethargistic. Rights frozen solid.',
        '© 1889 Lethargistic. All rights impressionistic.',
        '© 33 AD Lethargistic. Rights resurrected.',
        '© 404 Lethargistic. Rights not found.',
        '© 401 Lethargistic. No rights not for you.',
        '© 144p Lethargistic. Rights are a little blurry.',
        '© 3025 Lethargistic. All rights orbiting.',
        '© 2072/2078 Lethargistic. All rights glitched.',
        '© 2077 Lethargistic. All rights teleported.',
        '© 199X Lethargistic. Some rights pixelated.',
        '© 1683 Lethargistic. All rights protected.',
        '© 48 BC Lethargistic. All rights fireproofed.',
        '© {year} BC Lethargistic. All rights salted.',
        '© {year} BC Lethargistic. All rights preserved.'
    ]

    let text: string = $state('');

    const selectString = (): string => {
        if (Math.floor(Math.random() * 5) !== 0) {
            const right = copyblurbs[Math.floor(Math.random() * copyblurbs.length)];
            return right !== text ? right : selectString();
        } else {
            const right = rareCopyblurbs[Math.floor(Math.random() * rareCopyblurbs.length)];
            return right !== text ? right : selectString();
        }
    }

    const copyblurbify = (): void => {
        text = selectString().replace('{year}', year);
    }

    const year: string = new Date().getFullYear().toString();

    onMount(() => {
        copyblurbify();
    })

    let diamond: HTMLElement | undefined = $state();
    let ticking = $state(false);
    const handleDiamondAnim = (e: MouseEvent): void => {
        if (!diamond) return;
        const diaX = diamond.getBoundingClientRect().left + window.scrollX;
        const diaY = diamond.getBoundingClientRect().top + window.scrollY;

        let shiftX = 0;
        let shiftY = 0;
        shiftX = (e.clientX > diaX ? 1 : -1) * e.clientX;
        shiftY = (e.clientY < diaY ? 1 : -1) * e.clientY;
        const x = 5 + shiftX / 100;
        const y = 5 + shiftY / 50;
        if (!ticking) {
            requestAnimationFrame(() => {
                if (!diamond) return;
                diamond.style.transform = `translate(${x}px, ${y}px)`;
                ticking = false;
            });
            ticking = true;
        }
    }

    const socials = [
        {
            text: 'Github',
            icon: 'M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z',
            link: 'https://github.com/lethargistic/chaos-abyss',
        },
        {
            text: 'Bluesky',
            icon: 'M111.8 62.2C170.2 105.9 233 194.7 256 242.4c23-47.6 85.8-136.4 144.2-180.2c42.1-31.6 110.3-56 110.3 21.8c0 15.5-8.9 130.5-14.1 149.2C478.2 298 412 314.6 353.1 304.5c102.9 17.5 129.1 75.5 72.5 133.5c-107.4 110.2-154.3-27.6-166.3-62.9l0 0c-1.7-4.9-2.6-7.8-3.3-7.8s-1.6 3-3.3 7.8l0 0c-12 35.3-59 173.1-166.3 62.9c-56.5-58-30.4-116 72.5-133.5C100 314.6 33.8 298 15.7 233.1C10.4 214.4 1.5 99.4 1.5 83.9c0-77.8 68.2-53.4 110.3-21.8z',
            link: 'https://bsky.app/profile/lethargistic.bsky.social',
        },
        {
            text: 'Twitter',
            icon: 'M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z',
            link: 'https://x.com/lethargy_coffee',
        },
        {
            text: 'Ko-fi',
            icon: 'M538.317 201.703C520.892 109.62 428.787 98.1689 428.787 98.1689H16.2966C2.68144 98.1689 0.990813 116.157 0.990813 116.157C0.990813 116.157 -0.857604 281.252 0.494896 382.645C4.19173 437.286 58.7876 442.876 58.7876 442.876C58.7876 442.876 245.14 442.358 328.521 441.772C383.478 432.169 389.001 383.93 388.437 357.601C486.538 363.011 555.741 293.786 538.317 201.703ZM288.961 280.847C260.874 313.6 198.546 370.472 198.546 370.472C198.546 370.472 195.818 373.155 191.558 370.991C189.845 369.706 189.124 368.962 189.124 368.962C179.138 359.021 113.203 300.232 98.1905 279.832C82.2084 258.08 74.7246 218.97 96.1392 196.203C117.576 173.436 163.877 171.722 194.488 205.377C194.488 205.377 229.766 165.208 272.663 183.669C315.582 202.154 313.959 251.542 288.961 280.847ZM428.11 291.622C407.192 294.236 390.195 292.253 390.195 292.253V164.193H430.094C430.094 164.193 474.524 176.614 474.524 223.658C474.524 266.781 452.32 283.777 428.11 291.622Z',
            link: 'https://ko-fi.com/lethargistic',
        }
    ]
</script>

<svelte:window onmousemove={handleDiamondAnim}/>

<footer class="{home ? 'hand-holder' : ''}">
    <div class="footer-left">
        {#if !home}
            <img class="gem" src="/img/gem.svg" width="1325" height="2457" alt="A really cool gemstone encircled by magic tentacles or something">
        {:else}
            <img class="gem diamond" src="/img/diamond-sticks.svg" alt="A diamond" bind:this={diamond}/>
        {/if}
    </div>
    <div class="footer-mid">
        {#if !home}
            <p class="void-txt">Your attention nourishes the void.</p>
        {:else}
            <a href="https://github.com/lethargistic/chaos-abyss" class="open-sauce" title="github repo">Curious how this
                site works? It's open source! <br>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                    <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
                </svg>
            </a>
        {/if}
    </div>
    <div class="footer-right">
        <div class="link-bloc">
            <ul class="links">
                <FooterLinks {home} {contact} {about} {newsletter}/>
            </ul>
            <ul class="socials">
                <Socials {socials}/>
            </ul>
        </div>
        <div class="copy-bloc">
            <button class="copyright-blurb" type="button" onclick={copyblurbify} aria-label="Change copyright label">{text}</button>
        </div>
    </div>
</footer>

<style>
    .open-sauce {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        gap: 0.1rem;

        @media (max-width: 1279px) {
            flex-direction: column;
            padding: 0 4rem;
        }

        @media (max-width: 767px) {
            flex-direction: row;
            padding: 0;
        }

        & svg {
            display: inline;
            width: 3rem;

            @media (max-width: 1279px) {
                padding-top: 1rem;
                width: 2rem;
            }

            @media (max-width: 767px) {
                padding-top: 0;
                padding-right: 1.5rem;
                padding-left: 0.3rem;
                width: 3.5rem;
            }
        }

        &:hover {
            transition: all 0.1s;
            transform: scale(1.003);
        }

        @media (max-width: 728px) {
            padding-left: 1.5rem;
            width: 80%;
        }
    }

    /* the media query here does not apply in production, why? */
    :global {
        footer.hand-holder:after {
            content: "";
            position: absolute;
            top: -3rem;
            left: 70%;
            width: 20%;
            height: 1px;
            background: #000000;
        }

        @media (max-width: 1279px) {
            footer.hand-holder:after {
                display: none;
            }
        }

        @media (max-width: 728px) {
            footer.hand-holder:after {
                display: initial;
                top: -8.5rem;
                width: 34%;
                left: 42%;
            }
        }
    }


    footer {
        font-size: 1.1rem;
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 68dvh;
        overflow-x: clip;
        overflow-y: visible;

        margin-top: 4rem;
        position: relative;

        @media (max-width: 767px) {
            height: 100%;
            flex-direction: column;
        }

        & .footer-left {
            width: 40%;

            display: flex;
            justify-content: center;
            align-items: center;

            margin-bottom: 3rem;

            @media (max-width: 1279px) {
                width: 20%;
            }

            @media (max-width: 728px) {
                width: 100%;
                order: 2;
            }

            & img {
                height: 100%;
                user-select: none;

                @media (max-width: 1279px) {
                    width: 100%;
                    height: 100%;
                }

                @media (max-width: 728px) {
                    height: 70%;
                    width: 70%;
                }

                &:hover {
                    filter: blur(0.3px);
                    transition: all 0.1s;
                    transform: scale(1.003);
                }
            }

            & .diamond {
                width: 20rem;
                transition: transform 1s ease-out;
            }
        }

        & .footer-mid {
            display: flex;
            justify-content: center;
            align-items: center;
            width: calc(20% - 1.5vw);

            /* approximate, doesn't actually matter */
            margin-bottom: calc(22.66vh - clamp(0px, 3rem, 4rem));

            @media (max-width: 1279px) {
                width: auto;
            }

            @media (max-width: 728px) {
                width: 100%;
                order: 1;
            }

            & p {
                font-size: 1rem;
                text-align: center;
                font-family: 'Anonymous Pro', sans-serif;

                @media (max-width: 728px) {
                    width: 80%;
                }
            }

            & .void-txt {
                @media (max-width: 1279px) {
                    padding-right: 4rem;
                }

                @media (max-width: 728px) {
                    padding-right: 0;
                    margin-top: 10vh;
                }
            }
        }

        & .footer-right {
            border-right: 1px solid black;
            margin-right: 1.5vw;

            width: 40%;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;

            @media (max-width: 1279px) {
                width: 40%;
            }

            @media (max-width: 728px) {
                width: 98%;
                order: 3;
            }

            & .link-bloc {
                display: flex;
                position: relative;
                align-items: center;
                justify-content: center;

                height: 70%;

                padding-right: 4vw;
                padding-top: clamp(0px, 3rem, 4rem);

                /* rip future me trying to make this responsive */
                /* future me here, I'm going to tear you up and put you in a trash can */
                @media (max-width: 728px) {
                    width: 100%;
                }

                &::after {
                    content: "";
                    display: block;
                    position: absolute;
                    height: 25vh;
                    width: 10px;
                    border-left: 1px solid black;
                    bottom: 0;

                    @media (max-width: 728px) {
                        display: none;
                    }
                }

                & .links {
                    padding-right: 4rem;

                    @media (max-width: 728px) {
                        padding-right: 0;
                    }
                }

                & .socials {
                    padding-left: 4rem;

                    @media (max-width: 728px) {
                        display: flex;
                        justify-content: center;

                        padding-left: 0;
                    }
                }

                & ul {
                    list-style-type: none;
                    display: flex;
                    flex-direction: column;

                    @media (max-width: 728px) {
                        padding-bottom: 2rem;
                        width: 50%;
                    }

                    :global {
                        & .social, .link {
                            font-size: 1.2rem;
                            padding-bottom: 0.6rem;
                            color: #555555;

                            & a {
                                cursor: pointer;
                            }

                            &:hover {
                                color: black;

                                transition: all 0.1s;
                                transform: scale(1.003);
                            }
                        }

                        & .heading {
                            font-size: 1.7rem;
                            padding-bottom: 0.9rem;
                            color: #000000;
                        }
                    }
                }

                @media (max-width: 728px) {
                    width: 80%;
                }
            }

            & .copy-bloc {
                border-top: 1px solid black;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                height: 30%;
                width: 120%;
                padding: 0.2rem;
                box-sizing: border-box;

                @media (max-width: 728px) {
                    justify-content: center;

                    width: 100%;
                    height: 3.7em;
                    padding: 1rem 0;
                }

                & .copyright-blurb {
                    all: unset;
                    height: 100%;

                    cursor: pointer;
                    padding-right: 2vw;

                    @media (max-width: 728px) {
                        width: 80%;
                        height: 3.7em;
                    }

                    &:hover {
                        transition: all 0.1s;
                        transform: scale(1.003);
                    }
                }
            }
        }

    }
</style>