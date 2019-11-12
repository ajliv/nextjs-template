import { Store } from 'redux';
import React from 'react';
import { Provider } from 'react-redux';
import { NextPage } from 'next';
import App from 'next/app';

import configureStore from './configureStore';

declare module 'next' {
    interface NextPageContext {
        redux: Store;
    }
}

interface Options {
    ssr?: boolean;
}

let store: Store;

function initializeStore(initialState?: any): Store {
    if (typeof window === 'undefined') {
        return configureStore(initialState);
    }

    if (!store) {
        store = configureStore(initialState);
    }

    return store;
}

export default (PageComponent: any, { ssr = true }: Options = {}) => {
    const WithStore: NextPage<{ __REDUX_STATE__: any }> = ({ __REDUX_STATE__, ...props }) => {
        const store = initializeStore(__REDUX_STATE__);

        return (
            <Provider store={store}>
                <PageComponent {...props} />
            </Provider>
        );
    };

    // Make sure people don't use this HOC on _app.js level
    if (process.env.NODE_ENV !== 'production') {
        if (PageComponent === App || PageComponent.prototype instanceof App) {
            throw new Error('The withRedux HOC only works with PageComponents');
        }
    }

    // Set the correct displayName in development
    if (process.env.NODE_ENV !== 'production') {
        WithStore.displayName = `withStore(${PageComponent.displayName ||
            PageComponent.name ||
            'Component'})`;
    }

    if (ssr || PageComponent.getInitialProps) {
        WithStore.getInitialProps = async context => {
            const store = initializeStore();

            context.redux = store;

            const pageProps =
                typeof PageComponent.getInitialProps === 'function'
                    ? await PageComponent.getInitialProps(context)
                    : {};

            return {
                ...pageProps,
                __REDUX_STATE__: store.getState(),
            };
        };
    }

    return WithStore;
};
