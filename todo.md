- [x] : SERVER SIDE ONLY MARKDOWN RENDERING, SEND THE BAKED HTML ALREADY FROM THE STORAGE !!!!!
- [x] : add article read time (~ very approx and idk humanely)
- [x] : add categories to url
- [x] : add meta stuff like descs (a lib for this or Svelte has smth built in?)
- [x] : add sitemap
- [x] : and make the header responsive while you're at it
- [x] : basic editor !!!
- [x] : cdn ; did external service but same thing
- [x] : check if search article is most relevant ? i didn't sort them but it's alr probably
- [x] : clean up whatever the hell is happening in page.svelte right now
- [x] : db
- [x] : do seo for all other pages
- [x] : editor: add all options to editor (not just content)
- [x] : editor: add editor auth
- [x] : editor: admin: make slug manual
- [x] : editor: fix editor for db and stuff
- [x] : editor: full editor
- [x] : editor: make header colors an option
- [x] : editor: plug editor in
- [x] : editor: setting to change accent color in editor
- [x] : editor: setup drafts in the db
- [x] : editor: handle drafts later
- [x] : experiment with just layout and page for articles
- [x] : figure out optimal seo tags
- [x] : fix consistent capitalization
- [x] : fix stuck in search page / probably just making it fixed with a wrapper maybe - sorta fixed but it's ok
- [x] : fix titles don't do well with apostrophes and etc
- [x] : hardcode the domain (again ....)
- [x] : home page
- [x] : images via couldflare images ; did another service instead forgor the name
- [x] : implement previous/next with the backend
- [x] : kbd syntax
- [x] : later: account for metablock padding changes (restyle)
- [x] : later: articles category order
- [x] : later: fix searchbar caret
- [x] : later: kofi maybe??? (maybe plug)
- [x] : later: resolve articles by uuid instead of date (still safe but it's cleaner code)
- [x] : later: Add delete
- [x] : later: add admin mode (edit articles and etc.)
- [x] : later: add more easter eggs yes please
- [x] : later: add more easter eggs yes please x2
- [x] : later: add old redirects for moved categories + add redirect warning
- [x] : later: implement sources block
- [x] : make discord bots for Converge (just so i dont forget)
- [x] : make footer a bit more hitting (sorta done)
- [x] : make footer responsive
- [x] : make minor edits to responsive once you have the domain ; used --host instead
- [x] : make search cards different
- [x] : make sure zoom is more or less responsive
- [x] : maybe add arbitrary code to arbitrary // done @html instead
- [x] : maybe make half width quotes properly
- [x] : maybe make seo default layout actually use route instead of just yoinking the meta? I'm not sure if it's ok anyway although it does seem like so
- [x] : move all logic to client where necessary
- [x] : note to self: stop with the utility functions everywhere just make a variable for future projects (or not, think about it)
- [x] : previous article/next article
- [x] : responsive the hell of it
- [x] : restyle articles page a bit
- [x] : search
- [x] : seo images on article page
- [x] : separate head fig and banner fig
- [x] : style bits
- [x] : use dates, not strings
- [x] : word count

// I'll likely come back once I'm done with something else
// But this is production ready anyway

- [ ] : fix minor: redundant escapeHTML everywhere
- [ ] : fix: article margins being all over the place
- [ ] : later: RSS
- [ ] : later: Supabase keepalive !!!
- [x] : later: check for mistakes
- [ ] : later: figure out if isp or no isp
- [ ] : later: fix svelte vs vue vs react formatting
- [ ] : later: image based accent
- [ ] : later: markdown-it codesandbox embed
- [ ] : later: pagination
- [ ] : later: remove unnecessary highlight.js styles
- [ ] : later: small desc custom syntax
- [ ] : later: write the articles !!!s
- [ ] : maybe: Add button to copy anchor link for every header
- [ ] : maybe: color associations for more things (notably articles feats)
- [ ] : maybe: dark mode (proper color matched gonna be hard)
- [ ] : maybe: make runnable code blocks myself, mabye???
- [ ] : maybe: maybe autospace in md part of the editor to match article line height better? (how???)
- [ ] : maybe: style previous article/next article differently
- [ ] : nitpick: draft/stash error page is different
- [ ] : nitpick: make editor check for uuid for update instead of email (it's different for insert)
- [x] : soon: favicon
- [ ] : very later: comments
- [ ] : very later: editor loadouts and stuff, actually proper real-time saving
- [ ] : very later: implement reminder
- [ ] : very later: maybe hover/button for Romaji?
- [ ] : very later: maybe more search filters in the future
- [ ] : very later: maybe revisit hand slightly
- [ ] : very later: my own markdown extension for articles specifically because oh my god
- [ ] : very later: remake editor clean logic to be reversed because why isn't in the first place why the url param is why why
- [ ] : very later: remake hand later to something more uh glorius
- [ ] : very later: revival altar for stashed articles
- [ ] : very later: search suggestions
- [ ] : very later: add more text editing functions to editor (e.g. Word)
- [ ] : very later: make header section plugin but with escaping
- [ ] : very later: maybe makes drafts and stashed actually private in the db
- [ ] : very later: one or another way to preview draft figs on article page
- [ ] : fix: main figure captions (from db) completely brokey right now

<br>~~- [ ] : scrap: add burger for phone~~
<br>~~- [ ] : scrap: make header capitalization optional~~ ; it matches the db now
<br>~~- [ ] : scrap: way too late, just gotta know for the future - Dates make some sense but not enough sense (currently no edit date when it's a draft at all) - i should just reset it to null on first publish and rename the goddam date to publish date~~
<br>~~- [x] : scrap: add time parser~~
<br>~~- [x] : scrap: change head fig bg to something other than accent color~~
<br>~~- [x] : scrap: maybe make head fig shadow more intense (or keep it)~~

- [x] : fix: no js articles don't scroll
- [ ] : fix: PUBLIC_DEV variable is a string (idiot)
- [ ] : minor fix: mobile articles page first contentful load lighthouse report is too long
- [ ] : minor fix: lirith articles emailbox reloads the whole component for some reason so client side text only appears for a few seconds
- [x] : right before prod: Zero edit dates and fix publish dates

~~<br>- [ ] : scrap: Point imagekit url~~ : premium only thing apparently
- [x] : prod: Check if copying on mobile works
  ~~<br>- [x] : scrap: apply for google news~~ : it's automatic now so uh
- [x] : prod: check if sitemap also updates weirdly in production
- [x] : prod: redirect vercel domains to chaos-abyss.com
- [x] : prod: submit sitemap to search console
- [x] : prod: make email sender edge function secure
- [x] : prod: about still buggy on mobile
- [x] : prod: make auto email text cooler
- [x] : unsubscribe link
- [x] : prod: handle emails w Resend
- [x] : prod: homepage art is positioned wrong
- [x] : prod: accent color loading
- [x] : prod: make banner
- [x] : prod: umami analytics
- [x] : prod: investigate sveltekit security bug i just discovered lol - ok no i think im just 1 am tripping and seeing ghosts here. NO IT IS REAL IF I GO THE CORRECT DEPLOYMENT. Whay? It's inconsistent tho
- [x] : prod: write readme
- [x] : prod: mobile article title overlap
- [x] : prod: mobile tables are not scrollable
- [x] : prod: an article
- [x] : prod: swap out footer order
- [x] : prod: maybe a real newsletter but later
- [x] : prod: auto emails
- [x] : prod: an article or two
- [x] : prod: an article or three
- [x] : prod: pagination for articles
- [x] : prod: typo and mistake check everything again : almost
- [x] : prod: post to reddit
- [ ] : prod: sort to do list better
- 終わりです

- [ ] : maybe: maybe separate articles desc too
- [ ] : maybe: maybe pagination for search
- [ ] : maybe: maybe fix emailbox jank ; it's fixed already ; no it's still jank sometimes for some reason ; the lirith emailbox is jank because it reloads the whole component (for some reason)
- [ ] : maybe: maybe make self-made markdown-it plugins into packages because evil

- [ ] : todo very: abyss md lib, compiles to GFM with fallbacks safely


i should really use like Trello for this

man spends day making an easter egg and fixes instead of progress im so doomed
