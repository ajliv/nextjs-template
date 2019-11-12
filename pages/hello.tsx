import React from 'react';
import { NextPage } from 'next';

import HelloContainer from '../lib/containers/HelloContainer';
import withRedux from '../lib/redux/withRedux';

const HelloPage: NextPage = props => <HelloContainer {...props} />;

// Next.js automatically determines that a page is static (can be prerendered) if it has no blocking data requirements.
// This determination is made by the absence of getInitialProps in the page.
// See: https://nextjs.org/docs#automatic-prerendering

// HelloPage.getInitialProps = async () => ({});

export default withRedux(HelloPage);
