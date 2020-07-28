import * as React from 'react';
import { FormiumForm, defaultComponents } from '@formium/react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { FormiumComponents } from 'components/FormiumComponents';
import { formium } from '../../lib/formium-client';

export default function FormPage(props: any) {
  const [success, setSuccess] = React.useState(false);
  const [data, setData] = React.useState({});

  if (success) {
    return (
      <div>
        <h1>Thank you! Your response has been recorded.</h1>
        <br />
        {props.preview ? (
          <>
            <hr />
            <p>
              <small>
                Note: This was a test submission. It would have produced this
                data:
              </small>
            </p>
            <pre style={{ fontSize: 11 }}>{JSON.stringify(data, null, 2)}</pre>
            <button type="button" onClick={() => window.location.reload()}>
              Reset Form
            </button>
            <hr />
          </>
        ) : null}
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>{props.form.title}</title>
      </Head>
      <FormiumForm
        formSlug={props.form.slug}
        data={props.form}
        components={{
          ...defaultComponents,
          ...FormiumComponents,
          PageWrapper: ({ children }: any) => <>{children}</>,
          Header: ({ page }: any) => (
            <header>
              <h1 style={{ display: 'inline-flex', alignItems: 'center' }}>
                {page.title}
              </h1>
            </header>
          ),
        }}
        onSubmit={async (values) => {
          if (props.preview) {
            setData(values);
          } else {
            await formium.submitForm(props.form.slug, values);
          }
          setSuccess(true);
        }}
      />
      <style jsx global>{`
        .shake {
          animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
        /* Credit Adam Argyle */
        @media (prefers-reduced-motion) {
          .shake {
            animation: shake 0.01s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
          }
        }

        @keyframes shake {
          10% {
            transform: translate3d(-1px, 0, 0);
          }
          90% {
            transform: translate3d(-1px, 0, 0);
          }

          20% {
            transform: translate3d(2px, 0, 0);
          }
          80% {
            transform: translate3d(2px, 0, 0);
          }

          30%,
          50%,
          70% {
            transform: translate3d(-4px, 0, 0);
          }

          40%,
          60% {
            transform: translate3d(4px, 0, 0);
          }
        }
      `}</style>
    </>
  );
}

export const getStaticProps: GetStaticProps<
  Record<string, any>,
  { slug: string }
> = async ({ params, preview = false, previewData = {} }) => {
  if (params?.slug) {
    try {
      const form = await formium.getFormBySlug(params.slug, previewData);
      return {
        props: {
          preview,
          form: form || null,
        },
      };
    } catch (e) {
      console.log(e);
    }
  }

  return {
    props: {},
  };
};

export const getStaticPaths = async () => {
  // By default we only return 10 results, max is 100 per request. Be aware of rate limits.
  const { data: forms, next } = await formium.findForms({ limit: 100 });

  // if (next) {
  //   const { data: moreForms } = await client.findForms({
  //     limit: 100,
  //     from: next, // it's a cursor
  //   });
  // }

  // Map forms to just slugs
  return forms.map((form) => ({
    params: { slug: form.slug },
  }));
};
