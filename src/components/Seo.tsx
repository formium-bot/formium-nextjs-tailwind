import React from 'react';
import Head from 'next/head';
import { withRouter, Router } from 'next/router';

export interface SeoProps {
  title: string;
  description?: string;
  image?: string;
  // jsonld?: JsonLDType | Array<JsonLDType>;
  children?: React.ReactNode;
}

export const Seo = withRouter(
  ({
    title,
    description,
    image,
    router,
    children,
  }: SeoProps & { router: Router }) => (
    <Head>
      {/* DEFAULT */}

      {title != undefined && <title key="title">{title}</title>}
      {description != undefined && (
        <meta name="description" key="description" content={description} />
      )}
      <link rel="icon" type="image/x-icon" href="/img/favicon.png" />
      <link rel="apple-touch-icon" href="/img/favicon.png" />

      {/* OPEN GRAPH */}
      <meta property="og:type" key="og:type" content="website" />
      <meta
        property="og:url"
        key="og:url"
        content={`https://forms.formium.io${router.pathname}`}
      />
      {title != undefined && (
        <meta property="og:title" content={title} key="og:title" />
      )}
      {description != undefined && (
        <meta
          property="og:description"
          key="og:description"
          content={description}
        />
      )}
      {image != undefined && (
        <meta
          property="og:image"
          key="og:image"
          content={`https://forms.formium.io${image}`}
        />
      )}

      {/* TWITTER */}
      <meta
        name="twitter:card"
        key="twitter:card"
        content="summary_large_image"
      />
      <meta name="twitter:site" key="twitter:site" content="@formiumhq" />
      <meta name="twitter:creator" key="twitter:creator" content="@formiumhq" />
      {title != undefined && (
        <meta name="twitter:title" key="twitter:title" content={title} />
      )}
      {description != undefined && (
        <meta
          name="twitter:description"
          key="twitter:description"
          content={description}
        />
      )}
      {image != undefined && (
        <meta
          name="twitter:image"
          key="twitter:image"
          content={`https://forms.formium.io${image}`}
        />
      )}

      {children}
    </Head>
  )
);
