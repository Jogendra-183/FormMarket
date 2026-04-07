# 🎭 Character Animation States - Quick Reference

## Visual State Guide

```
┌─────────────────────────────────────────────────────────────┐
│                   IDLE STATE (Default)                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│              👋 "Hey! Ready to log in?"                     │
│                                                             │
│                      😊                                     │
│                    /  |  \                                  │
│                   |   |   |                                 │
│                   |  👔  |                                  │
│                   |   |   |                                 │
│                    \ | /                                    │
│                     👞👞                                     │
│                                                             │
│  Eyes: Neutral (0, 0)                                       │
│  Mouth: Straight line                                       │
│  Hands: At sides                                            │
│  Animation: Gentle breathing bounce                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              ROLE SELECTION (Looking Up)                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                      👀                                     │
│                    (⬆️ ⬆️)  ← Eyes up                       │
│                      😐                                     │
│                    /  |  \                                  │
│                   |   |   |                                 │
│                   |  👔  |                                  │
│                   |   |   |                                 │
│                    \ | /                                    │
│                     👞👞                                     │
│                                                             │
│  Eyes: Looking up (-10y)                                    │
│  Head: Tilted back slightly                                 │
│  Mouth: Neutral                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│            EMAIL INPUT (Watching You Type)                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                      👀                                     │
│                    (⬅️ ➡️)  ← Eyes moving                   │
│                      😊                                     │
│                    /  |  \                                  │
│                   🤚  |  🤚 ← Hands typing                  │
│                   |  👔  |                                  │
│                   |   |   |                                 │
│                    \ | /                                    │
│                     👞👞                                     │
│                                                             │
│              ✨ ✨ ✨ Particles ✨ ✨ ✨                      │
│                                                             │
│  Eyes: Looking down (+8y), scanning (+5x)                   │
│  Mouth: Happy smile (curved up)                             │
│  Hands: Typing position                                     │
│  Effects: Floating particles                                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│         PASSWORD INPUT (Not Peeking! 🙈)                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                      😳                                     │
│                   🤲🙈🤲  ← Covering eyes!                  │
│                      😊                                     │
│                    /  |  \                                  │
│                   |   |   |                                 │
│                   |  👔  |                                  │
│                   |   |   |                                 │
│                    \ | /                                    │
│                     👞👞                                     │
│                                                             │
│         💬 "🙈 I won't peek, promise!"                      │
│                                                             │
│  Eyes: Closed (squinting)                                   │
│  Hands: Covering face with fingers visible                  │
│  Mouth: Slight smile                                        │
│  Message: Privacy assurance                                 │
└─────────────────────────────────────────────────────────────┘
```

## Transition Flow

```
┌─────────┐
│  IDLE   │ ←──────────────┐
└────┬────┘                │
     │                     │
     │ Click Role          │ Blur
     ↓                     │
┌─────────┐                │
│  ROLE   │ ───────────────┤
│ SELECT  │                │
└────┬────┘                │
     │                     │
     │ Focus Email         │
     ↓                     │
┌─────────┐                │
│  EMAIL  │ ───────────────┤
│  INPUT  │    Blur         │
└────┬────┘                │
     │                     │
     │ Focus Password      │
     ↓                     │
┌─────────┐                │
│PASSWORD │ ───────────────┘
│  INPUT  │    Blur
└─────────┘
```

## Animation Timing

| State Change | Duration | Easing |
|-------------|----------|--------|
| Eye Movement | 0.3s | Spring (300, 30) |
| Hand Covering | 0.4s | Spring (200, 25) |
| Head Rotation | 0.5s | easeOut |
| Mouth Shape | 0.3s | easeInOut |
| Typing Arms | 0.5s | easeOut |
| Particle Float | 2.0s | easeInOut (loop) |
| Background Glow | 4.0s | easeInOut (loop) |

## Color Scheme

### Dark Theme
- Skin: `#fbbf24` (Amber 400)
- Hair: `#78350f` (Brown 900)
- Shirt: `#3b82f6` (Blue 500)
- Background: Indigo/Purple gradient
- Particles: `#818cf8` (Indigo 400)

### Light Theme
- Skin: `#f59e0b` (Amber 500)
- Hair: `#451a03` (Brown 950)
- Shirt: `#2563eb` (Blue 600)
- Background: Light Indigo/Purple
- Particles: `#6366f1` (Indigo 500)

## Props API

```typescript
interface AnimatedLoginCharacterProps {
  inputFocus: 'email' | 'password' | 'role' | null;
  emailValue: string;
  passwordValue: string;
  isTyping: boolean;
  theme: 'dark' | 'light';
}
```

## CSS Classes Used

```css
/* Container */
.flex items-center justify-center h-full relative

/* Background Glow */
.absolute w-64 h-64 rounded-full blur-3xl
.bg-indigo-500/10 (dark) | .bg-indigo-500/5 (light)

/* Speech Bubbles */
.absolute px-6 py-3 rounded-2xl border backdrop-blur-xl
.bg-white/10 border-white/20 (dark)
.bg-black/10 border-black/20 (light)

/* Particles */
.absolute w-2 h-2 rounded-full
.bg-indigo-400 (dark) | .bg-indigo-500 (light)
```

## Tips for Customization

1. **Change Colors**: Modify fill/stroke values in SVG elements
2. **Adjust Speed**: Change spring stiffness/damping values
3. **Add Expressions**: Modify mouth paths for different emotions
4. **New Animations**: Add more useEffect hooks for custom triggers
5. **Character Style**: Replace SVG with different shapes/design

## Performance Tips

- ✅ Uses GPU-accelerated transforms
- ✅ Spring animations cached by Motion
- ✅ Conditional rendering for particles
- ✅ Debounced typing detection (500ms)
- ✅ No external image loading

---

**Quick Test Checklist**:
- [ ] Character visible on desktop
- [ ] Hidden on mobile
- [ ] Eyes look up on role select
- [ ] Eyes follow email typing
- [ ] Hands cover eyes on password
- [ ] Smooth transitions between states
- [ ] Works in both light/dark theme
- [ ] No lag or jank during animations
