export const prerender = true;

export const load = ({url}) => {
    const desc = "Contact page for Chaos Abyss. This is where you reach out, summon me, or accidentally open a portal. No promises which."

    return {
        meta: {
            title: "Contact",
            canonUrl: "https://www.chaos-abyss.com/contact",
            metaNamed: [
                { name: "description", content: desc },
                { name: "twitter:card", content: "summary_large_image" },
                { name: "twitter:title", content: "Contact" },
                { name: "twitter:description", content: desc },
                { name: "twitter:image", content: "https://www.chaos-abyss.com/img/ogimg.png" }
            ],
            metaProperty: [
                { property: "og:type", content: "website" },
                { property: "og:locale", content: "en_US" },
                { property: "og:title", content: "Contact" },
                { property: "og:description", content: desc },
                { property: "og:url", content: url.href },
                { property: "og:image", content: "https://www.chaos-abyss.com/img/ogimg.png" }
            ],
            jsonLD: {
                "@context": "https://schema.org",
                "@type": "ContactPage",
                "name": "Contact",
                "url": "https://www.chaos-abyss.com",
                // look at him yapping about himself
                "mainEntity": {
                    "@type": "Person",
                    "name": "Lethargistic",
                    "url": "https://lethargistic.is-a.dev",
                    "gender": "Male",
                    "knowsLanguage": ["English", "Ukrainian", "Japanese", "toki pona"],
                    "alternateName": "Leth",
                    "description": "Lethargistic is a self-taught software developer with a passion for Japanese, games, media, and design.",
                    "image": "https://www.chaos-abyss.com/img/pfpvlike40somethingidkilostcountsquaresmol.webp",
                    "sameAs": [
                        "https://github.com/lethargistic",
                        "https://bsky.app/profile/lethargistic.bsky.social",
                        "https://x.com/lethargy_coffee",
                        "https://lethargistic.is-a.dev"
                    ],
                    "jobTitle": "Software Developer",
                    "knowsAbout": [
                        "Software Development",
                        "JavaScript",
                        "Youtube",
                        "Japanese",
                        "Games and Media",
                        "Design"
                    ],
                    "alumniOf": {
                        "@type": "CollegeOrUniversity",
                        "name": "Vinnytsia College of the National University of Food Technology"
                    },
                    "birthPlace": {
                        "@type": "Place",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Vinnytsia",
                            "addressCountry": "Ukraine"
                        }
                    }
                }
            }
        }
    };
};