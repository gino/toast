## Basic usage

1. You must wrap your App component with our `ToastProvider` in order to access the required context.

```tsx
<ToastProvider>
  <Component {...pageProps} />
</ToastProvider>
```

2. In order to create a toast, simply use the `toast` function exported from the `useToast` hook.

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

In order to render toasts, we made this library as flexibile as possible. You can simply map over the `toasts` array that is exported by the `useToasts` hook.

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

> This library is a headless toast library that does not include any styling or animations. You are free to add those yourself or copy an [example](/tree/master/examples/) of how it could be used.