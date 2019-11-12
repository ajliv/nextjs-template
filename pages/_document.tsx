import React from 'react';
import Document, { Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
    public static async getInitialProps(context: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = context.renderPage;

        try {
            const props = await Document.getInitialProps(context);

            context.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
                });

            props.styles = (
                <>
                    {props.styles}
                    {sheet.getStyleElement()}
                </>
            );

            return props;
        } finally {
            sheet.seal();
        }
    }

    public render() {
        return (
            <html lang="en">
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
