# Mode 2: Detailed Steps

This file contains the full step-by-step procedure for Full Website SEO Audit.
Read this after completing Step 0 (User Intake) in SKILL.md.

---

## Step 1: Determine Input and Collect Page List

### If the user provides a live URL (root domain or homepage):

1. Use `web_fetch` to retrieve the homepage HTML.
2. Parse all internal links from the HTML — `<a href="...">` tags where the href:
   - Starts with `/` (relative paths)
   - Starts with the same domain (absolute internal links)
   - Does NOT point to static assets (images, CSS, JS, PDFs)
   - Does NOT point to anchor-only links (`#`)
3. Deduplicate the link list. Remove query parameters and fragments.
4. Prioritize pages to audit (select up to 15 total including homepage):
   - Homepage (always included)
   - Main navigation links (typically in `<nav>` or `<header>`)
   - Key content pages (blog posts, service pages, about, contact)
   - Prefer pages at different URL depths to assess architecture
5. Use `web_fetch` to retrieve each selected page's HTML.
6. Also fetch these site-wide resources:
   - `{root_domain}/robots.txt`
   - `{root_domain}/sitemap.xml`
   - `{root_domain}/sitemap_index.xml` (fallback if sitemap.xml is an index)

### If the user provides a local directory:

1. Use `bash_tool` with `find {directory} -name '*.html'` to list all HTML files.
2. Use `view` to read each HTML file (up to 15).
3. Treat `index.html` at the root as the homepage.
4. robots.txt and sitemap.xml checks: only verify if those files exist in the directory.

### Data to Extract From Each Page

Parse the raw HTML carefully for every page:

**Meta Information:**
- URL / file path
- `<title>` tag content and character count
- `<meta name="description">` content and character count
- `<meta name="robots">` content (if present)
- `<link rel="canonical">` href (if present)
- `<meta name="viewport">` (if present)
- Language attribute from `<html lang="...">`

**Heading Structure:**
- H1 tag(s) — content and count (should be exactly one)
- H2 tags — content and count
- H3 tags — content and count
- Whether heading hierarchy is logical (no skipping H1→H3)

**Content Metrics:**
- Total word count of visible text (exclude nav, footer, script, style)
- Approximate reading time (assume 200 words/min)
- Number of paragraphs
- Number of images (`<img>`)
- Image alt text presence (count with alt vs. without)

**Links:**
- Internal link count (same domain)
- External link count
- List of all internal link hrefs (for cross-page analysis)
- Broken-looking links (href="#", href="javascript:void(0)", empty href)

**Technical Elements:**
- Schema/structured data (`<script type="application/ld+json">` or microdata)
- Open Graph tags (og:title, og:description, og:image, og:url)
- Twitter Card tags
- Favicon reference
- CSS and JS file counts
- Image format usage (WebP/AVIF vs. PNG/JPG/BMP/GIF)
- Lazy loading usage (`loading="lazy"`)
- `<link rel="preload">`, `<link rel="preconnect">` tags
- Breadcrumb markup
- Hreflang tags

---

## Step 2: Site-Wide Resource Analysis

### robots.txt Analysis
- Does it exist and is it valid?
- Which user-agents are specified?
- Are important paths blocked (e.g., `/`, CSS/JS needed for rendering)?
- Does it reference a sitemap?
- Any `Crawl-delay` directives?

### sitemap.xml Analysis
- Does it exist and is it valid XML?
- How many URLs listed?
- Are all audited pages present?
- Are there `<lastmod>` dates? Are they recent?
- Any URLs that might return errors?
- Is it an index sitemap pointing to sub-sitemaps?

### Server/Hosting Headers (live URLs only)
When fetching pages, examine response headers if available:
- **HTTPS**: Served over HTTPS?
- **HSTS**: `Strict-Transport-Security` present?
- **CSP**: `Content-Security-Policy` present?
- **X-Content-Type-Options**: `nosniff` set?
- **X-Frame-Options**: Present?
- **Referrer-Policy**: Present?
- **Cache-Control / Expires**: Caching headers set?
- **Content-Encoding**: gzip or brotli compression?
- **Server**: Software revealed? (Flag if version numbers exposed)

---

## Step 3: Per-Page Analysis

Evaluate each page and assign PASS / WARNING / FAIL:

### On-Page SEO

**Title Tag:**
- PASS: Present, 30-60 characters, descriptive and unique
- WARNING: Present but <30 or >60 chars, or generic
- FAIL: Missing entirely

**Meta Description:**
- PASS: Present, 120-160 characters, descriptive
- WARNING: Present but <120 or >160 chars
- FAIL: Missing entirely

**H1 Tag:**
- PASS: Exactly one H1, descriptive
- WARNING: Multiple H1 tags
- FAIL: No H1

**Heading Hierarchy:**
- PASS: Logical (H1 > H2 > H3), no skipped levels
- WARNING: Minor issues (e.g., H2 → H4 jump)
- FAIL: No headings beyond H1, or severely broken

**Content Length:**
- PASS: 300+ words of body content
- WARNING: 150-299 words (thin)
- FAIL: <150 words (extremely thin)

**Image Alt Text:**
- PASS: All images have descriptive alt text
- WARNING: Some images missing alt
- FAIL: Most/all missing alt

**Canonical Tag:**
- PASS: Present, points to correct URL
- WARNING: Present, points to different URL (misconfigured?)
- FAIL: Missing on a page that should have one

### Technical SEO

**Viewport Meta:**
- PASS: Present with proper content
- FAIL: Missing (not mobile-friendly)

**Structured Data:**
- PASS: Valid JSON-LD or microdata present
- WARNING: Schema present but incomplete
- FAIL: No structured data

**Open Graph Tags:**
- PASS: All four core OG tags (title, description, image, url)
- WARNING: Some present but incomplete
- FAIL: No OG tags

**Twitter Card:**
- PASS: Complete Twitter card tags
- WARNING: Partial
- FAIL: None

---

## Step 4: Cross-Page Analysis

This is the most valuable part — analyzing patterns ACROSS all audited pages.

### Duplicate Content Detection
- Compare title tags across all pages. Flag exact duplicates.
- Compare meta descriptions. Flag exact duplicates.
- Compare H1 tags. Flag exact duplicates.
- Note pages with very similar themes that might cannibalize each other.

### Keyword Cannibalization
- Infer likely target keyword per page (from title, H1, first 150 words).
- Flag pages targeting the same or very similar keywords.
- Recommend which page should be canonical; suggest differentiating others.

### Internal Linking Analysis
- Build a link matrix: which pages link to which.
- Calculate internal links received per page (equity distribution).
- Identify **orphan pages**: zero incoming internal links.
- Identify **hub pages**: many outgoing internal links.
- Identify **dead-end pages**: no outgoing internal links.
- Suggest specific links to add (e.g., "Page A discusses Topic X but doesn't link to Page B").

### Site Architecture Assessment
- URL structure patterns: consistent format? lowercase, hyphens, no underscores?
- Logical directory structure? (/blog/post-name, /services/service-name)
- Maximum click depth from homepage
- Flat vs. deep architecture
- URL anomalies (mixed conventions, overly long, parameter-heavy)

### Content Theme Clustering
- Group pages by topic/theme
- Identify pillar page + cluster content opportunities
- Note major topic gaps based on the site's apparent focus

### LSI / Semantic Keyword Analysis (Cross-Page)

1. **Extract site-wide LSI terms** — For each user-provided target keyword, identify 15-25
   related terms. Use `web_search` for related searches and "people also ask". Include any
   user-requested terms from Step 0.

2. **Map LSI coverage per page** — Check which terms appear on which pages. Create a matrix:
   - Which LSI terms appear where
   - Which important terms are completely missing
   - Which pages have best/worst semantic depth

3. **Identify LSI gaps** — Flag important missing terms competitors would cover.

4. **LSI cannibalization** — Check if same terms cluster on too few pages while others
   are semantically thin. Recommend more even distribution.

5. **Include in report** — LSI coverage section in Content Strategy tab with visual tag cloud
   and per-page coverage score.

---

## Step 5: Scoring

Calculate scores for each category on a 0-100 scale.

### Technical SEO Score (weight: 25%)
- HTTPS: 10 points
- Viewport meta on all pages: 10 points
- robots.txt valid: 10 points
- sitemap.xml valid: 10 points
- Schema markup coverage: 15 points (proportional to % of pages with schema)
- Security headers: 10 points (2 pts each: HSTS, CSP, X-Content-Type, X-Frame, Referrer-Policy)
- Image optimization (modern formats, lazy loading): 10 points
- Canonical tags present: 10 points
- Compression enabled: 5 points
- Preload/preconnect hints: 5 points
- No blocked resources in robots.txt: 5 points

### Content Score (weight: 25%)
- Average word count above 300: 20 points
- No thin content pages (<150 words): 15 points
- All pages have unique titles: 15 points
- All pages have meta descriptions: 15 points
- All pages have H1 tags: 10 points
- Proper heading hierarchy on all pages: 10 points
- All images have alt text: 10 points
- No duplicate content detected: 5 points

### Architecture Score (weight: 20%)
- Consistent URL structure: 20 points
- Reasonable click depth (max 3 clicks from homepage): 20 points
- No orphan pages: 20 points
- No dead-end pages: 15 points
- Logical directory structure: 15 points
- Breadcrumb markup present: 10 points

### Cross-Page Score (weight: 15%)
- No duplicate titles: 20 points
- No duplicate meta descriptions: 20 points
- No keyword cannibalization: 25 points
- Good internal link distribution: 20 points
- Content theme coverage: 15 points

### Social & Schema Score (weight: 15%)
- OG tags on all pages: 30 points
- Twitter cards on all pages: 20 points
- Schema markup on all pages: 30 points
- Consistent branding in OG tags: 10 points
- Favicon present: 10 points

### Overall Score
Weighted average. Grade scale:
- 90-100: A+ (Excellent)
- 80-89: A (Great)
- 70-79: B (Good, needs work)
- 60-69: C (Fair, significant issues)
- 50-59: D (Poor)
- <50: F (Critical issues)

---

## Step 6: Generate the HTML Report

1. Read `templates/mode2-report.html` — complete template with `{{PLACEHOLDER}}` markers.
2. Replace every placeholder with actual audit data.
3. Do NOT modify the template's design or CSS — only fill in dynamic content.

### Generating Finding Items

For every issue found:
```html
<div class="finding">
  <div class="finding-status [pass|warning|fail]"></div>
  <div class="finding-content">
    <h4>[Concise title]</h4>
    <p>[Description of what was found and why it matters]</p>
    <div class="finding-rec">[Specific, actionable recommendation]</div>
  </div>
  <span class="badge badge-[critical|high|medium|low]">[Level]</span>
</div>
```

### Generating Action Items

```html
<div class="action-item">
  <div class="action-number">[N]</div>
  <div class="action-content">
    <div class="action-title">[Action title]</div>
    <div class="action-desc">[What to do and how]</div>
    <div class="action-impact">Expected impact: [description]</div>
  </div>
  <span class="badge badge-[critical|high|medium|low]">[Level]</span>
</div>
```

### Generating Collapsible Page Details

```html
<div class="collapsible">
  <div class="collapsible-header">
    <span class="collapsible-title">
      <span class="page-url">[/page-url]</span>
      <span class="badge badge-[worst_severity]">[N] issues</span>
    </span>
    <span class="collapse-icon">&#9660;</span>
  </div>
  <div class="collapsible-body">
    <div class="collapsible-body-inner">
      [Finding items for this page]
    </div>
  </div>
</div>
```

Note: Collapsible toggle is handled by JavaScript at the bottom of the template.
Do NOT add inline onclick handlers — the template's JS handles all `.collapsible-header` clicks.

---

## Step 7: Save and Deliver

1. Save the HTML report to `/mnt/user-data/outputs/seo-strategy-{{DOMAIN}}.html`
   (replace dots in domain with hyphens, e.g., `seo-strategy-example-com.html`)
2. Use `present_files` to deliver the report to the user.
3. Tell the user:
   - The overall score and grade
   - The top 3 most critical issues found
   - A brief summary of the biggest opportunities
   - Recommend checking Google PageSpeed Insights for Core Web Vitals data (LCP, CLS, INP)
     and Google Search Console for indexing status and real search performance

---

## Placeholder Quick Reference

| Placeholder | Description |
|---|---|
| `{{SITE_DOMAIN}}` | Root domain (e.g., "example.com") |
| `{{PAGE_COUNT}}` | Number of pages audited |
| `{{REPORT_DATE}}` | Date in "April 3, 2026" format |
| `{{OVERALL_SCORE}}` | Overall score 0-100 |
| `{{SCORE_DASHOFFSET}}` | SVG ring offset: `465 - (465 * score / 100)` rounded |
| `{{GRADE}}` | Letter grade (A+, A, B, C, D, F) |
| `{{SCORE_HEADLINE}}` | One-line summary |
| `{{SCORE_SUMMARY}}` | 2-3 sentence explanation |
| `{{TECH_SCORE}}`, `{{CONTENT_SCORE}}`, `{{ARCH_SCORE}}`, `{{CROSS_SCORE}}`, `{{SOCIAL_SCORE}}` | Category scores |
| `{{*_SCORE_COLOR}}` | CSS color by score range |
| `{{CRITICAL_COUNT}}`, `{{HIGH_COUNT}}`, `{{WARNINGS_COUNT}}` | Issue counts |
| `{{AVG_WORD_COUNT}}` | Average word count |
| `{{SCHEMA_COVERAGE}}` | Percentage of pages with schema |
| `{{SITEWIDE_ISSUE_COUNT}}` | Total site-wide issues |
| `{{KEY_FINDINGS_PARAGRAPH}}` | 3-5 sentence summary |
| `{{TOP_3_PRIORITIES}}` | HTML for 3 action-item divs |
| `{{PAGE_TABLE_ROWS}}` | HTML table rows for page summary |
| `{{PAGE_DETAIL_COLLAPSIBLES}}` | HTML for per-page collapsible sections |
| `{{DUPLICATE_CONTENT_FINDINGS}}`, `{{CONSISTENCY_FINDINGS}}`, `{{ROBOTS_SITEMAP_FINDINGS}}`, `{{SECURITY_HEADERS_FINDINGS}}` | HTML finding items |
| `{{TECHNICAL_CHECKLIST}}` | HTML checklist items |
| `{{SCHEMA_STRATEGY}}` | HTML for schema table/findings |
| `{{PERFORMANCE_FINDINGS}}` | HTML for performance findings |
| `{{THIN_PAGES}}`, `{{STRONG_PAGES}}`, `{{TOTAL_WORDS}}`, `{{MISSING_META}}` | Content stats |
| `{{KEYWORD_MAP_ROWS}}` | HTML table rows for keyword map |
| `{{CONTENT_CLUSTERS}}` | HTML cluster cards |
| `{{CONTENT_GAPS}}` | HTML for content gap recommendations |
| `{{TOTAL_INTERNAL_LINKS}}`, `{{ORPHAN_PAGES}}`, `{{DEAD_END_PAGES}}`, `{{AVG_LINKS_PER_PAGE}}` | Linking stats |
| `{{LINK_EQUITY_ROWS}}` | HTML table rows for link equity |
| `{{ORPHAN_PAGES_DETAIL}}` | HTML for orphan page details |
| `{{SUGGESTED_LINKS}}` | HTML for suggested internal links |
| `{{QUICK_WINS}}`, `{{HIGH_IMPACT_ACTIONS}}`, `{{STRATEGIC_ACTIONS}}` | HTML action-item divs |
| `{{FULL_CHECKLIST}}` | HTML checklist items |
