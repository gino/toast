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
<ToastProvider>
  <Component {...pageProps} />
</ToastProvider>
```

2. To create a toast, simply use the `toast` function exported from the `useToast` hook.

```tsx
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

> This library is a headless toast library that does not include any styling or animations. You are free to add those yourself or copy an [example](/examples/) of how it could be used.