# FAQSection Specification

## Overview
- **Target file:** `src/components/FAQSection.tsx`
- **Interaction model:** click-driven accordion (one open at a time)

## DOM Structure
```
<section>
  <h2>Frequently Asked Questions</h2>
  <div> (accordion list)
    <div> (accordion item, repeated 7x)
      <button> (question + chevron)
        <span>Question text</span>
        <svg> (chevron down, rotates on open)
      </button>
      <div> (answer, height: 0 → auto, overflow hidden)
        <p>Answer text...</p>
      </div>
    </div>
  </div>
</section>
```

## Section Container
- background: var(--bg) #030604
- padding: 120px 28px
- max-width: 800px centered

## H2
- font-size: clamp(40px, 5vw, 72px)
- font-weight: 600
- letter-spacing: -2.5px
- gradient text (white → white 55% opacity, gradient 135deg)
- text-align: center
- margin-bottom: 64px

## Accordion Item
- border-bottom: 1px solid rgba(255, 255, 255, 0.1)
- padding: 0

## Accordion Button (question)
- display: flex
- justify-content: space-between
- align-items: center
- width: 100%
- padding: 24px 0
- background: transparent
- border: none
- cursor: pointer
- text-align: left
- font-size: 18px
- font-weight: 500
- color: rgb(255, 255, 255)
- hover: color rgba(255,255,255,0.8)

## Chevron
- width: 20px; height: 20px
- color: rgba(255,255,255,0.5)
- transform: rotate(0deg) → rotate(180deg) when open
- transition: transform 0.3s ease

## Answer panel
- padding: 0 0 24px
- font-size: 16px
- line-height: 1.7
- color: rgba(255, 255, 255, 0.6)
- overflow: hidden
- transition: height 0.3s ease (or max-height)

## Text Content (7 questions verbatim)

**Q1:** "Why are your rates high?"
At Ninety Eight we are solely specialised in high end websites. Websites that blow your prospects minds away, and turn them into customers. Websites that are visually stunning, and make you look like the best and leading option in your market. Websites that tell a story, and convert incredibly well. To achieve all of this, it takes lots of focus, time and experience from our designers, developers and copywriters. We only deliver the best, and therefore our clients always see incredible results from their websites. That's also why we are trusted by A-List offers and celebrities.

**Q2:** "How much can you boost conversion rates?"
With a combination of optimised visuals, page structure and copy, we predictably lift the conversion rates of your business' website regardless of the industry. Depending on your plan we can also include ongoing A/B testing to find the best converting format for your specific offer. Please contact us to inquire.

**Q3:** "How fast will I receive my website?"
We can work on rushed timelines if needed, but usually between 5 days and 11 days. Contact us if you have an urgent project with special requirements and we will be more than happy to accommodate.

**Q4:** "What do you need from me?"
To begin, we will need exports of your branding assets (logo variations and any guidelines you have), some references of the style you like, and some information about the things you want your new website to achieve. Based on this info we will help you hit the KPIs you are looking for.

**Q5:** "Who have you worked with?"
We have worked with A-list offers and celebrity clients including Andrew Tate - we are the team responsible for all of his websites for the last 3 years - as well as other big names like Luke Belmar, Sneako, and other influencers. Aside from influencers, we have also worked with tech, real estate startups, dozens of crypto projects and many other niches in the last few years.

**Q6:** "What programs do you use?"
Primarily we use a stack of Figma for designs and mockups, then either Webflow, Framer or GoHighLevel depending on the needs of your business. Whatever your tech requirements are, we can deliver.

**Q7:** "What do you guarantee?"
We guarantee unlimited changes until you are fully satisfied with how your website is looking. But most often, our clients love what they see without many edits. In addition, we include small changes after the website has gone live if you need any content updated. We're available to call with our clients at any time to discuss ideas, updates and general progress. The only reason we have been successful and received so many referrals as a team is because we genuinely care about the success of our clients. Let's crush your project. Contact us now.

## Responsive
- Same layout on mobile, just narrower
