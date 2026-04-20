---
name: seo-strategy
description: >
  Unified SEO skill with two modes: Article/Page Optimization and Full Website Audit.

  MODE 1 — ARTICLE/PAGE SEO OPTIMIZATION: Use when the user shares an article, blog post,
  draft, page content, or a single-page URL and mentions SEO, ranking, Google, or asks to
  "optimize", "improve", "rewrite", "check", or "polish" content for publishing. Trigger
  phrases: "optimize this article", "SEO optimize this", "improve this for SEO", "check this
  article", "make this rank", "rewrite for SEO". When in doubt, lean toward activating — it's
  better to offer SEO optimization than to miss the opportunity.

  MODE 2 — FULL WEBSITE AUDIT: Use when the user asks for a full site SEO audit, site-wide
  strategy, multi-page analysis, SEO health check, or domain review. Trigger phrases: "audit
  my site", "SEO strategy for my website", "full SEO audit", "site audit", "website SEO
  review", "SEO health check", "domain audit", or when a root URL is provided with an SEO
  request.
---

# Unified SEO Skill

Two distinct SEO workflows. Read Mode Detection first, then follow the matching instructions.

## Important Principles (Both Modes)

These principles override any individual step. Internalize them before starting.

- **Be specific, not generic.** Every finding must reference actual content, URLs, or text. Never say "some pages have issues" — name the pages and the issue.
- **Prioritize ruthlessly.** Not all issues are equal. Lead with what matters most for ranking impact.
- **Preserve the author's voice.** You're an SEO editor, not a ghostwriter. Match tone, vocabulary, and style.
- **Don't over-optimize.** Google penalizes bot-sounding content. Every keyword must feel natural. If you can't fit it naturally, skip it.
- **Substance over tricks.** The most important ranking factor is whether content genuinely helps the reader.
- **Think like a search engine AND a site owner.** Focus on crawlability, content quality, relevance signals, technical health — but explain WHY each issue matters in plain language.
- **Be honest about limitations.** Mode 2 is HTML-analysis only — it cannot measure actual page speed, Core Web Vitals, backlink profile, or real search rankings. Note this in the executive summary and recommend tools like Google PageSpeed Insights and Search Console for those metrics.
- **Be honest in changelogs.** If something was already strong, say so. Don't fabricate trivial edits.

---

## Mode Detection

### Use Mode 1 (Article/Page Optimization) when:
- User shares article text, a blog post draft, or page content
- User provides a single URL and asks to "optimize", "improve", "rewrite"
- User mentions a target keyword or title they want to rank for
- User pastes content and asks to review, improve, or polish it for publishing

### Use Mode 2 (Full Website Audit) when:
- User provides a root domain/homepage URL and asks for "audit", "review", "strategy"
- User asks about site-wide issues, multiple pages, site architecture
- User provides a local directory of HTML files for review

### Ambiguity rules:
- Single URL + "optimize" or "improve the content" → Mode 1
- Single URL + "audit" or "review my site" → Mode 2
- Just a domain, no specific request → Mode 2
- Just article text, no specific request → Mode 1

---

# MODE 1: Article/Page SEO Optimization

Produce a visual HTML report with four tabs: Competitor Research, Revised Article, Changelog, and Original.

## Step 0: User Intake (MANDATORY)

Before any research, gather context from the user using `ask_user_input_v0`. Present questions in a single message. Do NOT proceed until answers are received.

**Essential questions (always ask):**

1. **Target keywords** — "What keywords should this article rank for? List primary + any secondary keywords. Or say 'suggest for me' and I'll infer from your content."
2. **Target audience** — "Who is your reader? (e.g., homeowners in UK, developers, small business owners)"
3. **Search intent** — Options: Informational / Transactional / Commercial comparison / Navigational / Not sure
4. **Geographic focus** — "Any geographic focus? (e.g., UK, US, global, specific city)"

**Follow-up questions (ask in same message, mark as optional):**

5. **Related terms** — "Any industry jargon or related terms to prioritize? Or say 'research for me'."
6. **Competitors** — "Any competitor URLs to analyze and outrank? (optional)"
7. **Constraints** — "Max word count? Tone? Topics to avoid? Mandatory sections/CTAs?"

### Processing answers:
- "suggest for me" for keywords → Infer from article, confirm with user before proceeding.
- "research for me" for related terms → Extract from competitor analysis, highlight in report.
- User-provided keywords → Definitive. Do NOT override with your own inference.
- User-provided competitor URLs → Include alongside organic top results in Step 2a.
- Store ALL answers. Reference throughout optimization.

## Step 1: Determine Target Keyword

Using Step 0 answers:
1. **Primary keyword** — Use user's choice. If "suggest for me", infer from title/themes/topic, present suggestion, get confirmation before proceeding.
2. **Search intent** — Use user's selection. If "not sure", determine from keyword + competitor research.

## Step 2: Competitor Research (CRITICAL)

### 2a. Find Top-Ranking Competitors
Use `web_search` for the target keyword. Examine top 5–10 results. Note title tags, URLs, meta descriptions.

Use `web_fetch` on **top 3–5 ranking pages**. For each, extract:
- Title tag and H1
- All H2/H3 headings (reveal subtopics competitors cover)
- Approximate word count
- Key topics/sections covered
- Content structure (listicle, how-to, comparison, etc.)

### 2b. Extract Keyword & LSI Strategy
Build a keyword map from competitor pages + user preferences:

1. **Primary keyword** — from user or confirmed inference.
2. **Secondary keywords** — variations competitors use in titles/H2s.
3. **LSI keywords** — semantically related terms appearing in 2+ top results. NOT synonyms — contextually related words signaling topical depth. Aim for 20–40 terms grouped by theme.

   **How to extract:** Read competitor content for recurring terms. Search for "[keyword] related searches" and "[keyword] people also ask". Group by: process terms, cost/pricing terms, trust/quality terms, problem terms, comparison terms, location terms.

   If user provided specific LSI terms in Step 0, those are priority inclusions.

4. **Keyword density targets** — Note approximate density from top pages (typically 1–2%). LSI terms: 1–3 mentions each depending on article length.

### 2c. Gap Analysis
Compare user's article against competitors:
- **Content gaps** — Subtopics ALL top competitors cover that user misses (mandatory additions)
- **Structural gaps** — Formats competitors use that user doesn't (tables, FAQs, step-by-step)
- **Depth gaps** — Where competitors go deeper
- **Keyword gaps** — Missing LSI/secondary keywords
- **Unique angles** — What user offers that competitors don't (preserve and amplify)

## Step 3: Analyze Current Article
1. Current SEO strengths — what's working (don't fix what isn't broken)
2. SEO gaps mapped against competitor research
3. Author's voice and style — note tone for preservation in rewrite

## Step 4: SEO Optimization Checklist

Work through every area. All decisions informed by competitor research.

**Content Quality & Intent (Highest Impact):**
- Search intent match — does the article satisfy what the searcher wants?
- Depth vs competitors — add substance where thinner, but no fluff
- LSI integration — weave naturally through body, headings, alt text
- E-E-A-T signals — concrete examples, data points, actionable steps
- Originality — amplify unique angles, don't dilute competitive advantages

**Title Tag / H1:** Include keyword near start, <60 chars, compelling for clicks, power word where natural.

**Meta Description:** 150–160 chars, keyword included naturally, compelling pitch with CTA.

**Heading Structure:** Clear H1→H2→H3 hierarchy. Keyword/variations in at least one H2. Cross-reference competitor H2s — if all top results have a subtopic section, add it. Headings should read like search queries (featured snippet potential).

**Keyword Usage:** Primary keyword in first 100 words. Match/slightly exceed competitor density. All secondary keywords at least once. LSI keywords 1–3 times each, clustered near relevant sections. Never keyword-stuff.

**Internal & External Linking:** Note internal link opportunities with `[link to: topic]` placeholders. Suggest 1–2 authoritative external links for credibility.

**URL Slug:** Short, lowercase, hyphenated, includes keyword.

**Readability:** 2–4 sentence paragraphs. Lists where they aid scanning. Clear intro hook + conclusion with key takeaway. Smooth transitions.

**Featured Snippets:** If keyword has snippet potential, structure one section as concise direct answer (short paragraph, numbered list, or table).

**Image/Media:** Suggest placements. Provide keyword-rich alt text recommendations.

## Step 5: Generate HTML Report

1. Read the HTML template: use `view` to load `assets/mode1-template.html` from the skill directory.
2. Replace all `{{PLACEHOLDER}}` values with actual data from analysis. Follow POPULATE comments inside the template for structure guidance.
3. Fix the SVG ring: set `stroke-dashoffset` on the `<circle>` element's inline `style` attribute. Formula: `502 - (502 * score / 100)` rounded to integer.
4. Use score-to-color mapping: `var(--green)` for 80+, `var(--yellow)` for 60–79, `var(--orange)` for 40–59, `var(--red)` for <40.
5. Save as `seo-report-{{URL_SLUG}}.html` in `/mnt/user-data/outputs/`.
6. Use `present_files` to deliver the report to the user.
7. Tell the user: the overall score, the top 3 most impactful changes, and a brief summary.

---

# MODE 2: Full Website SEO Audit

Comprehensive, site-wide SEO audit covering multiple pages, cross-page patterns, architecture, technical infrastructure, content strategy, and internal linking. Produces an interactive HTML report.

## Step 0: User Intake (MANDATORY)

Before crawling, gather context using `ask_user_input_v0`. Single message. Do NOT proceed without answers.

**Essential questions:**

1. **Target keywords** — "What are the top 3–5 keywords your site should rank for? Or say 'analyze and suggest'."
2. **Business & audience** — "Briefly describe your business and target audience."
3. **Geographic focus** — "What area do you serve?"
4. **SEO goals** — Options: More organic traffic / Rank for specific keywords / Improve local SEO / Fix technical issues / Build content strategy / Other

**Optional follow-ups (same message):**

5. **Key competitors** — "Competitor websites to benchmark against? (optional)"
6. **Related terms** — "Industry jargon or semantic keywords to prioritize? Or 'research for me'."
7. **Known issues** — "Any SEO problems you already know about?"

### Processing answers:
- "analyze and suggest" → Infer keywords from content, highlight suggestions prominently in Content Strategy tab.
- "research for me" → Extract from site content + competitor analysis, show found vs missing.
- Specific keywords → Evaluate every page against them, flag cannibalization, assess coverage.
- Competitor URLs → Compare structure, content depth, keyword coverage.
- Store ALL answers. Reference throughout audit.

## Step 1: Collect Page List

### Live URL:
1. `web_fetch` the homepage. Parse all internal `<a href>` links (relative paths + same-domain absolute). Exclude static assets, anchors, JS void links.
2. Deduplicate, remove query params/fragments.
3. Select up to 15 pages: homepage + main nav links + key content pages at different URL depths.
4. `web_fetch` each selected page.
5. Also fetch: `{domain}/robots.txt`, `{domain}/sitemap.xml`, `{domain}/sitemap_index.xml`.

### Local directory:
1. Use `bash_tool` to find all `.html` files (up to 15). Read with `view`.
2. Treat root `index.html` as homepage.

### Per-page data extraction:
**Meta:** title (+ char count), meta description (+ char count), meta robots, canonical, viewport, html lang.
**Headings:** H1 (content + count), H2s, H3s, hierarchy validity.
**Content:** Word count (exclude nav/footer/script/style), reading time, paragraph count, image count, alt text coverage.
**Links:** Internal count + hrefs, external count, broken-looking links (empty href, `#`, `javascript:void`).
**Technical:** Schema/JSON-LD, OG tags, Twitter cards, favicon, CSS/JS count, modern image formats, lazy loading, preload/preconnect, breadcrumbs, hreflang.

## Step 2: Site-Wide Resources

**robots.txt:** Exists? Valid? Important paths blocked? References sitemap? Crawl-delay?
**sitemap.xml:** Exists? Valid XML? URL count? Audited pages present? Recent lastmod dates?
**Headers (live only):** HTTPS, HSTS, CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Cache-Control, Content-Encoding (gzip/brotli), Server version exposure.

## Step 3: Per-Page Analysis

Evaluate each page → PASS / WARNING / FAIL:

| Check | PASS | WARNING | FAIL |
|-------|------|---------|------|
| Title tag | 30–60 chars, descriptive, unique | Too short/long/generic | Missing |
| Meta description | 120–160 chars, descriptive | Too short/long | Missing |
| H1 | Exactly one, descriptive | Multiple | None |
| Heading hierarchy | Logical (H1→H2→H3) | Minor skips | No headings / severely broken |
| Content length | 300+ words | 150–299 (thin) | <150 (extremely thin) |
| Image alt text | All images have descriptive alt | Some missing | Most/all missing |
| Canonical | Present, correct URL | Present, different URL | Missing |
| Viewport meta | Present with proper content | — | Missing |
| Structured data | Valid JSON-LD/microdata | Incomplete | None |
| OG tags | All 4 core tags present | Incomplete | None |
| Twitter cards | Complete | Partial | None |

## Step 4: Cross-Page Analysis

**Duplicate detection:** Compare titles, meta descriptions, H1s across all pages. Flag exact duplicates.
**Keyword cannibalization:** Infer target keyword per page (from title + H1 + first 150 words). Flag pages targeting same/very similar keywords. Recommend canonical target.
**Internal linking:** Build link matrix. Calculate incoming links per page. Identify orphan pages (zero incoming), hub pages (many outgoing), dead ends (no outgoing). Suggest specific links to add.
**Architecture:** URL structure consistency (lowercase, hyphens, logical dirs), max click depth from homepage, flat vs deep.
**Content clustering:** Group pages by topic/theme. Identify pillar + cluster opportunities. Note major topic gaps.
**LSI cross-page analysis:** For each user target keyword, identify 15–25 related terms. Map coverage per page. Flag terms completely missing from site. Check for LSI over-concentration.

## Step 5: Scoring

Calculate 0–100 per category:

**Technical SEO (25%):** HTTPS (10), viewport (10), robots.txt (10), sitemap (10), schema coverage (15), security headers (10 — 2 each for HSTS/CSP/X-Content-Type/X-Frame/Referrer-Policy), image optimization (10), canonicals (10), compression (5), preload/preconnect (5), no blocked resources (5).

**Content (25%):** Avg word count >300 (20), no thin pages (15), unique titles (15), meta descriptions (15), H1 tags (10), heading hierarchy (10), image alt text (10), no duplicates (5).

**Architecture (20%):** Consistent URLs (20), click depth ≤3 (20), no orphans (20), no dead ends (15), logical dirs (15), breadcrumbs (10).

**Cross-Page (15%):** No duplicate titles (20), no duplicate metas (20), no cannibalization (25), good link distribution (20), content theme coverage (15).

**Social & Schema (15%):** OG tags (30), Twitter cards (20), schema (30), consistent branding (10), favicon (10).

**Overall:** Weighted average. Grades: 90–100 A+, 80–89 A, 70–79 B, 60–69 C, 50–59 D, <50 F.

## Step 6: Generate HTML Report

1. Read the template: use `view` to load `assets/mode2-template.html` from the skill directory.
2. Replace all `{{PLACEHOLDER}}` values with audit data. Follow POPULATE comments.
3. SVG ring: `stroke-dashoffset` = `502 - (502 * score / 100)` rounded, set as inline `style` on `<circle>`.
4. Score colors: `var(--green)` 80+, `var(--yellow)` 60–79, `var(--orange)` 40–59, `var(--red)` <40.
5. Save as `seo-strategy-{domain}.html` in `/mnt/user-data/outputs/` (replace dots with hyphens).
6. Use `present_files` to deliver.
7. Tell user: score + grade, top 3 critical issues, biggest opportunities.

---

## Severity Guide (Mode 2)

**Critical** — Prevents indexing: No HTTPS, robots.txt blocking key pages, missing titles on key pages, noindex on indexable pages, broken canonicals.

**High** — Significant ranking impact: Missing meta descriptions on multiple pages, duplicate titles, keyword cannibalization, no structured data, no sitemap, orphan pages, thin content on primary pages (<150 words).

**Medium** — Noticeable SEO effect: Missing OG tags, inconsistent heading hierarchy, images without alt text, no lazy loading, missing security headers, weak internal linking.

**Low** — Minor improvements: Missing Twitter cards, no preload hints, server version exposed, minor heading issues, missing hreflang (if not targeting international).

## Edge Cases (Mode 2)

- **SPAs:** If HTML is mostly empty JS shells, note prominently. Recommend SSR/pre-rendering.
- **Large sites:** Cap at 15 pages. Prioritize: homepage, top-nav, sample content at different depths.
- **Auth-protected:** If pages redirect to login, audit accessible pages only.
- **Subdomains:** Audit specified domain/subdomain only. Note links to other subdomains.
- **Non-HTML:** Skip, note in report.
- **International:** Check hreflang consistency if present.
- **Fetch failures:** Report on successful pages, note which failed.
- **Core Web Vitals:** Cannot measure from HTML. Recommend Google PageSpeed Insights for LCP, CLS, INP assessment. Note this limitation in the executive summary.
