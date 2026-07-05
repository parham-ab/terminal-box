# terminal-box

A lightweight, zero-dependency React component that renders a retro terminal-window UI — complete with macOS-style window controls and an optional typewriter text effect. Ships with plain CSS, so there's no extra runtime dependency for styling.

## Features

- **Terminal window chrome** — a header bar with a title and three colored control dots (red/yellow/green), styled to resemble a classic terminal/code editor window.
- **Static or animated text** — pass a plain string for static content, or enable `typewriter` mode to animate the text being typed and deleted character by character.
- **Multiple messages in sequence** — pass an array of strings to `content` and the typewriter will cycle through each one automatically.
- **Looping control** — choose whether the typewriter cycles back to the first message after the last one, or stops.
- **Configurable timing** — independently control typing speed, deleting speed, and the pause before deleting begins.
- **Blinking cursor** — a blinking `|` cursor appears automatically while `typewriter` mode is active, and is omitted entirely in static mode.
- **Style overrides** — three dedicated style props let you override the container, title, and content text inline without needing to fight CSS specificity.
- **No external dependencies** — built with plain CSS and React hooks only. No styled-components, no CSS-in-JS runtime.
- **Next.js App Router compatible** — includes a `"use client"` directive, so it works out of the box in Server Component trees.

## Installation

```bash
npm install terminal-box
```

## Basic usage

Import the component and its stylesheet — the CSS is shipped separately and must be imported once, anywhere in your app (e.g. your root `App.jsx` or `main.jsx`):

```jsx
import Terminal from "terminal-box";
import "terminal-box/dist/index.css";

function App() {
  return <Terminal />;
}
```

This renders a terminal window with the default title `"Status"` and static text `"Loading..."`.

> **Note:** the CSS import is only needed once per app, not once per component instance.

## Props reference

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `"Status"` | Text shown in the header bar, to the left of the control dots. |
| `content` | `string \| string[]` | `"Loading..."` | The message shown in the terminal body. Pass a single string for static or single-message typewriter mode, or an array of strings to cycle through multiple messages in typewriter mode. |
| `containerStyle` | `object` | `{}` | Inline style object applied to the outer terminal container. Use this to override width, colors, fonts, etc. |
| `titleStyle` | `object` | `{}` | Inline style object applied to the header title text. |
| `contentStyle` | `object` | `{}` | Inline style object applied to the body text element. |
| `typewriter` | `boolean` | `false` | When `true`, animates `content` as if it were being typed and deleted, character by character. When `false`, `content` renders as static text with no animation and no cursor. |
| `typingSpeed` | `number` | `70` | Delay in milliseconds between each character being typed. Lower is faster. |
| `deletingSpeed` | `number` | `40` | Delay in milliseconds between each character being deleted. Lower is faster. |
| `pause` | `number` | `1500` | Delay in milliseconds the fully-typed message holds on screen before it starts deleting. |
| `loop` | `boolean` | `true` | When `true`, the typewriter returns to the first message after finishing the last one. When `false`, it stops after typing the final message once. |

## Usage examples

### Static message (no animation)

```jsx
<Terminal title="Status" content="Build succeeded." />
```

### Typewriter with a single message

```jsx
<Terminal
  title="Deploy"
  content="Deploying to production..."
  typewriter
/>
```

### Typewriter cycling through multiple messages

```jsx
<Terminal
  title="System"
  content={[
    "Installing dependencies...",
    "Running tests...",
    "Build complete.",
  ]}
  typewriter
  typingSpeed={50}
  deletingSpeed={30}
  pause={1200}
/>
```

### Typewriter that types once and stops (no loop)

```jsx
<Terminal
  content={["Initializing...", "Ready."]}
  typewriter
  loop={false}
/>
```

### Custom styling via style props

```jsx
<Terminal
  title="Custom Theme"
  content="Overridden styles"
  containerStyle={{ width: 320, borderColor: "#555" }}
  titleStyle={{ color: "#0ff" }}
  contentStyle={{ color: "#f0f", fontSize: "0.9em" }}
/>
```

## How typewriter mode works

When `typewriter` is `true`, the component runs an internal typing state machine:

1. Characters from the current message are appended one at a time, each after a delay of `typingSpeed` ms.
2. Once the full message is displayed, it holds for `pause` ms.
3. Characters are then removed one at a time, each after a delay of `deletingSpeed` ms.
4. Once fully deleted, the component moves to the next message in the `content` array (if any).
5. After the last message, it either loops back to the first (`loop={true}`) or stops (`loop={false}`).

If `content` is a single string rather than an array, it's treated as a one-item array — the typewriter will type it, pause, delete it, and then either loop on itself or stop, depending on `loop`.

## Notes

- The blinking cursor (`|`) is only rendered when `typewriter` is `true`. Static content renders without a cursor.
- All CSS classes are prefixed with `tb-terminal` to avoid collisions with class names already present in your app.
- The component has no required props — `<Terminal />` alone renders a complete, valid terminal window.

## License

MIT