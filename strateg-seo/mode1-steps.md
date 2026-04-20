# Mode 1: Detailed Steps

This file contains the full step-by-step procedure for Article/Page SEO Optimization.
Read this after completing Step 0 (User Intake) in SKILL.md.

---

## Step 1: Determine Target Keyword

Using the user's answers from Step 0:

1. **Target keyword/keyphrase** — Use the primary keyword the user provided.
   If the user said "suggest for me", read the article carefully and infer the primary keyword
   from the title, recurring themes, and topic. Pick the most specific, searchable phrase that
   captures the article's intent. **Present your suggestion to the user and get confirmation
   before proceeding.**

2. **Search intent** — Use the intent the user selected. If they said "not sure",
   determine it from the keyword and competitor research. The article must match this intent
   or it won't rank regardless of other optimizations.

---

## Step 2: Competitor Research (CRITICAL — DO NOT SKIP)

This is the most important step. You must research what's currently ranking before making changes.

### 2a. Find Top-Ranking Competitors

Use `web_search` to search for the target keyword. Examine the top 5-10 results.

For each top result, note:
- **Title tag** — exact wording
- **URL** — structure and slug
- **Meta description** — if visible in search results

Then use `web_fetch` to retrieve the full HTML of the **top 3-5 ranking pages**. For each, extract:
- **Title tag and H1**
- **All H2 and H3 headings** — these reveal the subtopics competitors cover
- **Word count** — approximate length of the content
- **Key topics/sections covered** — what subtopics do they address that the user's article doesn't?
- **Content structure** — how do they organize information? (listicle, how-to, comparison, etc.)

### 2b. Extract Keyword & LSI Strategy (CRITICAL FOR RANKING)

From the competitor pages AND the user's keyword preferences, build a **keyword map**:

1. **Primary keyword** — Use what the user provided. If "suggest for me", confirm/refine
   based on what competitors target.
2. **Secondary keywords** — close variations and long-tail versions competitors use in titles/H2s
   (e.g., if primary is "best running shoes", secondaries might be "top running shoes 2026",
   "running shoes for beginners"). Cross-reference with any user-provided secondaries.
3. **LSI (Latent Semantic Indexing) keywords** — semantically related terms that appear
   frequently across multiple competitor pages. These are NOT synonyms — they're contextually
   related words signaling topical depth to Google.

   **How to extract LSI keywords:**
   - Start with any terms the user provided — these are priority inclusions
   - Read competitor content, note terms/phrases appearing in 2+ top results
   - Look for technical terms, related concepts, descriptive phrases specific to the topic
   - Group by subtopic/theme (e.g., for a moving company: "logistics terms", "cost terms",
     "service types", "trust signals")
   - Aim for 20-40 LSI terms
   - Use `web_search` for "[primary keyword] related searches" and
     "[primary keyword] people also ask" to discover additional terms

   **Example:** For "home removals UK" — packing service, removal quote, man and van,
   moving checklist, removal insurance, house clearance, storage solutions, moving day,
   white glove service, fragile items, disassembly, inventory list, transit insurance,
   removal boxes, bubble wrap, moving costs, local movers, long distance move

   **LSI categories to always look for:**
   - **Process terms** — how the service/product works
   - **Cost/pricing terms** — comparison and pricing language
   - **Trust/quality terms** — reliability and quality signals
   - **Problem terms** — pain points the content solves
   - **Comparison terms** — evaluating alternatives
   - **Location terms** — geographic modifiers (from user's Step 0 answers)

4. **Keyword density targets** — Note approximate density of top-ranking pages (typically 1-2%).
   LSI keywords should appear 1-3 times each, naturally distributed.

5. **User-provided LSI integration** — If the user provided specific terms, these MUST be
   integrated. Mark them separately in the report for verification.

### 2c. Gap Analysis

Compare the user's article against competitor research:

- **Content gaps** — Subtopics ALL top competitors cover that the user's article misses.
  These are mandatory additions.
- **Structural gaps** — Do competitors use formats the user doesn't? (comparison table,
  step-by-step, FAQ). Consider adopting effective structures.
- **Depth gaps** — Where do competitors go deeper? Which sections are too thin?
- **Keyword gaps** — Which LSI/secondary keywords are missing?
- **Unique angles** — What does the user's article offer that competitors DON'T?
  Preserve and amplify these differentiators.

---

## Step 3: Analyze Current Article Strengths

Assess the user's article:

1. **Current SEO strengths** — What's already working? Don't fix what isn't broken.
2. **SEO gaps** — Mapped against competitor research.
3. **Author's voice and style** — Note the tone for preservation in the rewrite.

---

## Step 4: SEO Optimization Checklist

Work through each area. Every decision should be informed by competitor research from Step 2.

### Content Quality & Search Intent (Highest Impact)

- **Search intent match**: Does the article fully satisfy the searcher's need? Add missing
  subtopics that ALL top results cover.
- **Depth and comprehensiveness**: Add substance where thinner than competitors. Don't pad
  with fluff — only add genuinely useful information.
- **LSI keyword integration**: Weave LSI keywords naturally throughout body text, headings,
  image alt text, and lists. Aim for 1-3 mentions each. Never force them.
- **E-E-A-T signals**: Experience, Expertise, Authoritativeness, Trustworthiness. Add concrete
  examples, data points, specific details, or actionable steps where content feels generic.
- **Originality**: Amplify unique angles. This is the article's competitive advantage.

### Title Tag / H1

- Include target keyword, ideally near the beginning
- Keep under 60 characters to avoid truncation in search results
- Make it compelling enough to earn clicks over competitors
- Use a power word where natural (e.g., "proven," "complete," "ultimate," "[year]")

### Meta Description

- 150-160 characters
- Include target keyword naturally
- Write as a compelling pitch — give a reason to click
- Include a call to action or value proposition

### Heading Structure (H2s, H3s)

- Clear hierarchy: one H1 (title), H2s for major sections, H3s for subsections
- Include target keyword or variations in at least one H2
- Cross-reference competitor H2s — if all top results have a specific subtopic, add it
- Use headings that read like search queries — these can become featured snippets
- Every section should earn its heading. One paragraph ≠ needs its own H2.

### Keyword Usage

- Primary keyword in the first 100 words
- Match or slightly exceed competitor keyword density (typically 1-2%)
- Include all secondary keywords at least once, ideally in headings/early paragraphs
- Integrate LSI keywords throughout — cluster related terms near relevant sections
- Never keyword-stuff. If it sounds unnatural read aloud, remove it.

### Internal & External Linking

- Note where internal links should go (use `[link to: topic]` if site structure is unknown)
- Suggest 1-2 authoritative external link opportunities for credibility

### URL Slug

- Short, lowercase, hyphenated, includes target keyword
- Example: `how-to-start-a-podcast` not `how-to-start-a-podcast-in-2024-the-complete-guide`

### Readability & User Experience

- 2-4 sentences per paragraph for web reading
- Bullet points and numbered lists where they aid scanning
- Clear introduction that hooks the reader
- Conclusion reinforcing the key takeaway
- Smooth transitions between sections

### Featured Snippet Optimization

- If the keyword has snippet potential (how-to, what-is, list, comparison),
  structure one section as a concise, pullable answer (short paragraph, numbered list, or table)

### Image/Media Recommendations

- Suggest where images, diagrams, or tables would improve the article
- Provide recommended alt text for each (include keyword where relevant)

---

## Step 5: Generate the HTML Report

1. Read `templates/mode1-report.html` — it contains the complete template with `{{PLACEHOLDER}}`
   markers.
2. Replace every placeholder with actual data from your analysis.
3. Do NOT modify the template's design or CSS — only fill in dynamic content.
4. Save as `/mnt/user-data/outputs/seo-report-{{URL_SLUG}}.html`.
5. Use `present_files` to deliver it.

### Placeholder Quick Reference

| Placeholder | Description |
|---|---|
| `{{ARTICLE_TITLE}}` | Article title |
| `{{REPORT_DATE}}` | Date in "April 3, 2026" format |
| `{{OVERALL_SCORE}}` | SEO score 0-100 |
| `{{SCORE_DASHOFFSET}}` | SVG ring offset: `465 - (465 * score / 100)` rounded |
| `{{SCORE_HEADLINE}}` | One-line assessment |
| `{{SCORE_SUMMARY}}` | 2-3 sentence explanation |
| `{{CONTENT_SCORE}}`, `{{KEYWORDS_SCORE}}`, `{{STRUCTURE_SCORE}}`, `{{TECHNICAL_SCORE}}` | Sub-scores 0-100 |
| `{{*_SCORE_COLOR}}` | `var(--green)` 80+, `var(--yellow)` 60-79, `var(--orange)` 40-59, `var(--red)` <40 |
| `{{COMPETITORS_ANALYZED}}` | Number of competitors |
| `{{LSI_TOTAL}}` | Total LSI keywords found |
| `{{CONTENT_GAPS_COUNT}}` | Content gaps found |
| `{{TARGET_KEYWORD_DENSITY}}` | Target density from competitors |
| `{{TARGET_KEYWORD}}` | Primary target keyword |
| `{{COMPETITOR_CARDS}}` | HTML for competitor cards (see template comments) |
| `{{KEYWORD_TABLE_ROWS}}` | HTML table rows for keyword strategy |
| `{{LSI_CLOUD}}` | HTML for LSI tag cloud (integrated/missing classes) |
| `{{CONTENT_GAPS_LIST}}`, `{{STRUCTURAL_GAPS_LIST}}`, `{{UNIQUE_ADVANTAGES_LIST}}`, `{{KEYWORD_GAPS_LIST}}` | `<li>` items for gap cards |
| `{{TITLE_TAG}}` | Optimized title tag |
| `{{META_DESCRIPTION}}` | Optimized meta description |
| `{{URL_SLUG}}` | Suggested URL slug |
| `{{NEW_KEYWORD_DENSITY}}`, `{{OLD_KEYWORD_DENSITY}}` | Density before/after |
| `{{LSI_INTEGRATED}}` | Count of LSI keywords integrated |
| `{{REVISED_ARTICLE_HTML}}` | Full revised article as HTML |
| `{{CHANGELOG_COUNT}}`, `{{CHANGELOG_CATEGORY_COUNT}}` | Change counts |
| `{{CHANGELOG_HTML}}` | Full changelog (see template comments) |
| `{{ORIGINAL_ARTICLE_HTML}}` | Original article, unmodified |
