export const prerender = true;

export const load = () => {
    return {
        meta: {
            title: "About",
            canonUrl: "https://www.chaos-abyss.com/about",
            metaNamed: [
                { name: "description", content: "About page for Chaos Abyss, a blog about lots of things. This is the part where I pretend to be professional." },
                { name: "twitter:card", content: "summary_large_image" },
                { name: "twitter:title", content: "About" },
                { name: "twitter:description", content: "About page for Chaos Abyss, a blog about lots of things. This is the part where I pretend to be professional." },
                { name: "twitter:image", content: `/img/ogimg.png` },
                { name: "author", content: "Lethargistic" }
            ],
            metaProperty: [
                { property: "og:type", content: "website" },
                { property: "og:locale", content: "en_US" },
                { property: "og:title", content: "About" },
                { property: "og:description", content: "About page for Chaos Abyss, a blog about lots of things. This is the part where I pretend to be professional." },
                { property: "og:url", content: "https://www.chaos-abyss.com/about" },
                { property: "og:image", content: `/img/ogimg.png` }
            ],
            jsonLD: {
                "@context": "https://schema.org",
                "@type": "AboutPage",
                "name": "About",
                "url": "https://www.chaos-abyss.com/about",
                // look at him yapping about himself
                "mainEntity": {
                    "@type": "Person",
                    "mainEntityOfPage": "https://www.chaos-abyss.com/about",
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