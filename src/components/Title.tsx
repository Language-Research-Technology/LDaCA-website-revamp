import Head from 'next/head';
import React from 'react';

const TITLE_PREFIX = 'LDaCA';

type Props = {
  pageTitle?: string;
};

const Title: React.FC<Props> = ({pageTitle}) => {
  let title = TITLE_PREFIX;
  if (pageTitle) {
    title += ` - ${pageTitle}`;
  }
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default Title;
