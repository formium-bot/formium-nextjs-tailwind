import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import GoogleFonts from 'next-google-fonts';
import '../styles/index.css';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <GoogleFonts href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" />
        <Head>
          <meta name="robots" content="noindex"></meta>
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;
