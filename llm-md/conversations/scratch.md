### context >>>
system = "You are a helpful assistant."
model = "urn:llm:anthropic:claude-3-7-sonnet-20250219"
parameters = { thinking = { type = "enabled", budget_tokens = 8000 }, max_tokens = 64000 }
root-dir = "../"
context = "llm-md/resources/context.md"

### user >>>

Create a concise style guide for the UI additions to marktext, based on the following guide for llm-md;

Rationale
The llm-md identity is built around the principles of clarity,
structure, and minimalism—mirroring the purpose of the
tool itself: to create AI workflows using natural language
and Markdown-inspired syntax.
At the core of the design is a bold, modern interpretation
of the Markdown “down arrow,” cleverly shaped to also
resemble an open book. This dual symbolism reinforces
the connection between lightweight documentation and
intelligent, readable workflows. It bridges the world of
technical syntax and human-readable logic, reflecting how
llm-md transforms language into action.
Overall, the identity presents llm-md as a forward-thinking
open-source tool—minimal, intuitive, and built for a new
generation of developers and thinkers working at the
Studio Storm™
intersection of AI and natural language.


Simple and bold digital experience
with thoughtful UI/UX to help users
easily navigate, engage and connect
with content and products and call-
to-actions.

Typography:
Funnel Sans

Colours;
HEX #000000
HEX #1A1A1A
HEX #333333
HEX #C1BEC1
HEX #7600FF
HEX #DBD3FC


### Assistant >>>

```thinking

The style guide for the UI additions to marktext should be based on the llm-md style guide. Let me organize what I understand about the llm-md style guide:

### Key principles from llm-md:
1. Clarity, structure, and minimalism
2. Modern interpretation of Markdown elements
3. Forward-thinking, intuitive design
4. Simple and bold digital experience with thoughtful UI/UX

### Design elements from llm-md:
- Typography: Funnel Sans
- Colors:
  - #000000 (Black)
  - #1A1A1A (Very dark gray)
  - #333333 (Dark gray)
  - #C1BEC1 (Light gray)
  - #7600FF (Vibrant purple)
  - #DBD3FC (Light lavender)

Now I need to create a concise style guide for marktext UI additions that follows these principles while being appropriate for a markdown editor. I should keep the guide brief and practical, addressing typography, colors, UI elements, and any specific guidelines for implementation.

For marktext (which I understand is a markdown editor), the style guide should emphasize clarity for text editing while incorporating the modern, minimal aesthetic from llm-md.

Here's my draft for the marktext UI additions style guide:
```

# llm-md-markText UI Style Guide

## Design Principles
- **Clarity** - Prioritize readability and intuitive interactions
- **Minimalism** - Clean interfaces with purposeful elements
- **Structure** - Consistent hierarchy and organized components
- **Approachability** - Welcoming experience for all user levels

## Typography
- **Primary Font**: Funnel Sans
- Use consistent font weights for hierarchy:
  - Headings: Semi-bold (600)
  - Body: Regular (400)
  - UI Elements: Medium (500)

## Color Palette
- **Primary Colors**
  - Black (#000000) - Primary text, icons
  - Dark Gray (#1A1A1A) - Backgrounds, containers
  - Medium Gray (#333333) - Secondary elements, borders

- **Secondary Colors**
  - Light Gray (#C1BEC1) - Inactive elements, subtle accents
  - Purple (#7600FF) - Primary accent, interactive elements
  - Light Purple (#DBD3FC) - Highlights, selection, hover states

## UI Components
- **Buttons**
  - Simple rectangular shape with minimal rounding
  - Use purple (#7600FF) for primary actions
  - Consistent padding (12px horizontal, 8px vertical)

- **Icons**
  - Clean, monoline style with 1.5px stroke weight
  - Keep consistent 24px × 24px sizing
  - Black (#000000) for standard state, purple (#7600FF) for active state

- **Containers & Panels**
  - Subtle shadows (4px blur, 2px y-offset, 10% opacity)
  - Minimal borders (1px, #333333)
  - 8px border radius for all containers

## Interaction States
- **Hover**: Lighten elements by 10%
- **Active/Selected**: Use accent purple (#7600FF)
- **Focus**: 2px purple outline with 2px offset

## Spacing
- Use 8px increments for all spacing and sizing
- Maintain consistent padding within containers (16px)
- Allow adequate whitespace between interface sections (24px minimum)
