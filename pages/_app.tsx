import { AppProps } from 'next/app';
import React from 'react';

import '../lib/styles.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => <Component {...pageProps} />;

export default App;
