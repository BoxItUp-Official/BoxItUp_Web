import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

/**
 * AI store-profile auto-fill.
 *
 * Uses Claude when ANTHROPIC_API_KEY is set; otherwise (or on any error) falls
 * back to a deterministic template so onboarding always works.
 */

type Input = { store_name?: string; city?: string; keywords?: string }
type Output = { category: string; description: string; tags: string[] }

const CATEGORIES = [
  'Bakery', 'Café', 'Restaurant', 'Convenience Store',
  'Supermarket', 'Deli / Butcher', 'Fresh Market / Produce', 'Other',
]
const ALL_TAGS = ['Bakery', 'Café', 'Meal', 'Dessert', 'Drinks', 'Snacks', 'Fruit & Veg', 'Vegetarian', 'Vegan', 'Organic', 'Local', 'Premium', 'Surprise']

// Swap to 'claude-haiku-4-5' for a cheaper/faster option on this simple task.
const MODEL = 'claude-opus-4-8'

// ── Real AI path ──────────────────────────────────────────────────────────
async function generateWithAI(input: Input): Promise<Output> {
  const client = new Anthropic() // reads ANTHROPIC_API_KEY from env

  const schema = {
    type: 'object',
    properties: {
      category: { type: 'string', enum: CATEGORIES },
      description: { type: 'string' },
      tags: { type: 'array', items: { type: 'string', enum: ALL_TAGS } },
    },
    required: ['category', 'description', 'tags'],
    additionalProperties: false,
  }

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    output_config: {
      effort: 'low',
      format: { type: 'json_schema', schema },
    },
    system:
      'You write concise, appealing store profiles for "Box It Up", an app that sells discounted surprise boxes of surplus food. ' +
      'Given a store name, city, and keywords, pick the best category from the allowed list, write a warm 1–2 sentence store description ' +
      '(mentioning the surprise-box value and reducing food waste), and choose up to 5 relevant tags. Do not invent an address.',
    messages: [
      {
        role: 'user',
        content:
          `Store name: ${input.store_name || '(none)'}\n` +
          `City: ${input.city || '(none)'}\n` +
          `Keywords: ${input.keywords || '(none)'}`,
      },
    ],
  } as Anthropic.MessageCreateParamsNonStreaming)

  const textBlock = message.content.find((b) => b.type === 'text')
  const raw = textBlock && 'text' in textBlock ? textBlock.text : '{}'
  const parsed = JSON.parse(raw) as Output
  return {
    category: CATEGORIES.includes(parsed.category) ? parsed.category : 'Other',
    description: parsed.description ?? '',
    tags: Array.isArray(parsed.tags) ? parsed.tags.slice(0, 5) : [],
  }
}

// ── Template fallback (no key / error) ────────────────────────────────────
const CATEGORY_RULES: { category: string; match: string[] }[] = [
  { category: 'Bakery', match: ['bread', 'pastry', 'pastries', 'cake', 'croissant', 'bun', 'bakery', 'toast', 'baked'] },
  { category: 'Café', match: ['coffee', 'tea', 'latte', 'cafe', 'café', 'espresso', 'matcha', 'drink'] },
  { category: 'Restaurant', match: ['meal', 'lunch', 'dinner', 'restaurant', 'rice', 'noodle', 'ramen', 'bento', 'curry', 'hotpot', 'bbq'] },
  { category: 'Deli / Butcher', match: ['deli', 'meat', 'butcher', 'sausage', 'ham', 'steak'] },
  { category: 'Fresh Market / Produce', match: ['produce', 'fruit', 'vegetable', 'veg', 'market', 'farm', 'organic'] },
  { category: 'Supermarket', match: ['supermarket', 'grocery', 'groceries'] },
  { category: 'Convenience Store', match: ['convenience', 'mart', 'kiosk'] },
]

function guessCategory(text: string): string {
  const t = text.toLowerCase()
  for (const rule of CATEGORY_RULES) if (rule.match.some((m) => t.includes(m))) return rule.category
  return 'Other'
}

function generateTemplate(input: Input): Output {
  const name = (input.store_name || 'Our store').trim()
  const city = (input.city || '').trim()
  const keywords = (input.keywords || '').trim()
  const category = guessCategory(`${name} ${keywords} ${city}`)
  const kwPhrase = keywords
    ? keywords.split(/[,、]/).map((k) => k.trim()).filter(Boolean).slice(0, 3).join(', ')
    : 'quality everyday items'
  const where = city ? ` in ${city}` : ''
  const catWord = category === 'Other' ? 'local shop' : category.toLowerCase()
  const description =
    `${name} is a ${catWord}${where} loved for ${kwPhrase}. ` +
    `Each Box It Up surprise box is a curated pick of great-value items from the day — ` +
    `helping reduce food waste while giving customers a delightful deal.`
  const tags = new Set<string>(['Surprise'])
  if (category === 'Bakery') { tags.add('Bakery'); tags.add('Dessert') }
  if (category === 'Café') { tags.add('Café'); tags.add('Drinks') }
  if (category === 'Restaurant') tags.add('Meal')
  return { category, description, tags: [...tags].slice(0, 5) }
}

export async function POST(request: Request) {
  let input: Input = {}
  try { input = await request.json() } catch { /* empty body */ }

  if (process.env.ANTHROPIC_API_KEY) {
    try {
      return NextResponse.json(await generateWithAI(input))
    } catch (err) {
      console.error('AI autofill failed, using template fallback:', err)
    }
  }

  return NextResponse.json(generateTemplate(input))
}
