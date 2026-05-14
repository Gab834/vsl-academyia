# ProblemSections Specification
(Covers 2 adjacent sections: ProblemStatement + PainPoint)

## Overview
- **Target file:** `src/components/ProblemSections.tsx`
- **Interaction model:** static

## Section 1: "Without This, Your Business Can't Thrive"

### DOM Structure
```
<section> (dark bg, centered text)
  <h2>Without This, Your Business Can't Thrive</h2>
  <p>In a time where marketplaces like Dubai...</p>
  <p>And customers are incredibly demanding...</p>
  <p>It is important you stand out from every other option.</p>
  <p>And position yourself as the absolute pinnacle offer in your space.</p>
  <p>People should see your website and immediately know you are the best.</p>
  <p>Without that, you won't be able to scale as fast...</p>
  <p>But Ninety Eight can make it happen.</p>
  <a href="#pricing">See Pricing</a>
</section>
```

### Styles
- Background: var(--bg) #030604
- Max-width: 640px centered
- Padding: 120px 28px
- text-align: center (heading) + left (body paragraphs)

### H2
- font-size: clamp(40px, 5vw, 64px)
- font-weight: 600
- letter-spacing: -2px
- background: linear-gradient(135deg, #fff 50%, rgba(255,255,255,0.55))
- -webkit-background-clip: text; -webkit-text-fill-color: transparent
- margin-bottom: 40px

### Body paragraphs
- font-size: 18px
- line-height: 1.7
- color: rgba(255,255,255,0.7)
- margin-bottom: 16px

### "See Pricing" button
- Same pill style as hero: white bg, black text, border-radius 1440px, padding 14px 36px

---

## Section 2: "THE PROBLEM — You're Missing Out On a Great First Impression"

### DOM Structure
```
<section>
  <div> (label)
    | THE PROBLEM (cyan, small caps)
  </div>
  <h2>You're Missing Out On a Great First Impression</h2>
  <p>Your website is the first thing that your potential customers see.</p>
  <p>Ask yourself, are you creating the greatest possible first impression...</p>
  <p>If the answer is no, your business is suffering from opportunity cost...</p>
  <p>To solve this you need:</p>
  <ul>
    <li>✓ Captivating Visuals</li>
    <li>✓ Top Level Copy</li>
    <li>✓ Conversion Optimisation</li>
  </ul>
</section>
```

### Styles — same as Section 1 but with:
- Label "THE PROBLEM": same badge style as hero (cyan, uppercase, letter-spacing 0.1em)
- H2: same gradient text heading
- Check list items:
  - display: flex; gap: 12px; align-items: center
  - Checkmark: cyan (0,255,239) icon or ✓ character
  - font-size: 18px; font-weight: 500; color: rgba(255,255,255,0.85)
  - gap: 12px between items

## Text Content (verbatim)
**Section 1:**
"Without This, Your Business Can't Thrive"
"In a time where marketplaces like Dubai, and the rest of the world, are incredibly competitive..."
"And customers are incredibly demanding..."
"It is important you stand out from every other option."
"And position yourself as the absolute pinnacle offer in your space."
"People should see your website and immediately know you are the best."
"Without that, you won't be able to scale as fast..."
"But Ninety Eight can make it happen."

**Section 2:**
Label: "THE PROBLEM"
H2: "You're Missing Out On a Great First Impression"
"Your website is the first thing that your potential customers see."
"Ask yourself, are you creating the greatest possible first impression to increase sales?"
"If the answer is no, your business is suffering from opportunity cost, and you are wasting ad spend."
"To solve this you need:"
List: "Captivating Visuals" | "Top Level Copy" | "Conversion Optimisation"

## Responsive
- Mobile: padding 80px 24px, font-size reduced
