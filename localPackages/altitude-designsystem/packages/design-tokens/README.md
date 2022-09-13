# Altitude Design System: Design Tokens package

Design Tokens are all the values needed to construct and maintain a design system — spacing, color, typography, object styles, animation, etc. — represented as data. These can represent anything defined by design: a color as a RGB value, an opacity as a number, an animation ease as Bezier coordinates. They’re used in place of hard-coded values in order to ensure flexibility and unity across all product experiences.

## Tiers definition

The following types of design tokens are the building blocks and design decisions that make up the Altitude Design System shared language:

### Core

Core tokens are the primitive values in Altitude Design System shared language, represented by context-agnostic names. The color palette, animation, typography, and dimension values are all recorded as foundational tokens. These can be directly used, and are inherited by all other token types.

```scss
// tier-category-property-{state|scale}
$altids-core-color-grey-0: ""
```

### Component

Component-specific tokens are an exhaustive representation of every value associated with a component. They often inherit from core tokens, but are named in a way that allows engineering teams to be as specific as possible in applying tokens in component development.

They are also classified by brand. This makes it possible to introduce _themes_.

```scss
// tier-component-concept-category-property-variant-{state|scale}
$altids-component-button-action-color-background-primary-default: ""
```
