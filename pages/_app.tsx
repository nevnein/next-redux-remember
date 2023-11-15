import { wrapper } from 'lib/store';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

export default function MyApp({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
}
