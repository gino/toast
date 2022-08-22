# toast 🍞

![Version](https://img.shields.io/github/package-json/v/gino/toast)
![Top language](https://img.shields.io/github/languages/top/gino/toast)
![Stars](https://img.shields.io/github/stars/gino/toast?style=plastic)
![Contributors](https://img.shields.io/github/contributors/gino/toast)
![License](https://img.shields.io/github/license/gino/toast)

A lightweight easy-to-use toast library

## Installation

```
yarn add @gino/toast
```
```
npm install @gino/toast
```

## Basic usage

1. You must wrap your App component with our `ToastProvider` to access the required context.

```tsx
import { ToastProvider } from "@gino/toast"

<ToastProvider>
  <Component {...pageProps} />
</ToastProvider>
```

2. To create a toast, simply use the `toast` function exported from the `useToast` hook.

```tsx
const { toast } = useToast();

<button
  onClick={() => {
    toast("This is my toast");
  }}
>
  Add toast
</button>
```

### Rendering toasts

We have made this library as flexibile as possible. In order to render toasts, you can simply map over the `toasts` array that is exported by the `useToasts` hook.

```tsx
const { toasts, removeToast } = useToast();

return (
  <ul>
    {toasts.map((toast) => (
      <li key={toast.id}>
        <div>{toast.message}</div>
        <button onClick={() => removeToast(toast.id)}>Close toast</button>
      </li>
    ))}
  </ul>
)
```

### Making toasts disappear after a certain time

To make toasts disappear after a certain amount of time, we have created a `useToastTimer` hook that easily handles all this functionality for you.

```tsx
import { useToastTimer } from "@gino/toast"

const ref = useToastTimer<HTMLDivElement>(toast.id, {
  duration: 3,
  pauseOnHover: true,
});

return (
  <div ref={ref}>
    <div>This toast will disappear after 3 seconds unless I'm being hovered</div>
  </div>
)
```

> This library is a headless toast library that does not include any styling or animations. You are free to add those yourself or copy an [example](/examples/) of how it could be used.