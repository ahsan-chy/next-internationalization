# Next JS Internationalization

#### Folder Structure setup like this **``**

```javascript

| src
|   app
|    ├── [locale]
|    |        ├── about-us
|    |        |        └── page.jsx
|    |        ├── faq
|    |        |        └── page.jsx
|    |        ├── page.jsx
|    |        └── layout.js
|    ├── components
|    |        ├── ExampleClientComponent.js
|    |        └── TranslationsProvider.js
|    ├── page.jsx
|    └── layout.js
|
|
| i18n.js
| i18nConfig.js
| .env

```

### Install Following packages

```javascript
npm i i18next react-i18next i18next-resources-to-backend next-i18n-router
```

#### Create file **`i18nConfig.js`** globally

```javascript
const i18nConfig = {
  locales: ["en", "ur"],
  defaultLocale: "en",
  // prefixDefault: true,
};

module.exports = i18nConfig;
```

#### Create file **`middleware.js`**

```javascript
import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";

export function middleware(request) {
  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

| If you are using **`app`** inside **`src`**. Search ur should be like this.

```javascript
http://localhost:3000/en
http://localhost:3000/en/about-us
http://localhost:3000/en/faq
```

| If you are using **`app`** outside **`src`**. Search ur should be like this.

```javascript
http://localhost:3000
http://localhost:3000/about-us
http://localhost:3000/faq
```

- Create AC on **[i18nexus](https://app.i18nexus.com/)**

Setup language here and use api key inside your .env file

**.env**

```javascript
I18NEXUS_API_KEY = "96_nSHQv-sjklfsalkj";
```

Run Following commonds like this.

```javascript
npm install i18nexus-cli -g

npm i i18nexus-cli --save-dev
```

```javascript
i18nexus pull
```

#### Setup the **package.json**

```javascript
"scripts": {
  "dev": "i18nexus pull && next dev",
  "build": "i18nexus pull && next build",
  "start": "i18nexus pull && next start",
  "lint": "next lint"
},
```

### Create file **`i18n.js`**

```javascript
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import i18nConfig from "../i18nConfig";

export default async function initTranslations(locale, namespaces, i18nInstance, resources) {
  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend((language, namespace) => import(`@/locales/${language}/${namespace}.json`))
    );
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales,
  });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t,
  };
}
```

### Create **Provider** to wrap

You can create component at anywhere like **components/TranslationsProvider.js**

```javascript
"use client";

import { I18nextProvider } from "react-i18next";
import initTranslations from "@/app/i18n";
import { createInstance } from "i18next";

export default function TranslationsProvider({ children, locale, namespaces, resources }) {
  const i18n = createInstance();

  initTranslations(locale, namespaces, i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

This provider is a Client Component that creates an i18next instance on the client and uses the I18nextProvider to provide the instance to all descendent Client Components.

### Wrap the **/[locale]/layout.js**

```javascript
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "../../../i18n";
import i18nConfig from "../../../i18nConfig";

//+ const languages = ["en", "ur"];
export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

const i18nNamespaces = ["home"];

export default function RootLayout({ children, params: { locale } }) {
  const { t, resources } = initTranslations(locale, i18nNamespaces);

  return (
    <html>
      <body>
        <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
          {children}
        </TranslationsProvider>
      </body>
    </html>
  );
}
```

Even though we’re wrapping our page with this Client Component, our page is still rendered as a Server Component. Next 13+ is awesome!

### useTranslation Hook

```diff
"use client";

  import React from "react";
! import { useTranslation } from "react-i18next";

const Faq = () => {
  const { t } = useTranslation();
  return (
    <div className="w-100 h-100 flex justify-center items-center flex-col mt-72 gap-10">
      <h2 className="text-4xl text-pink-700">Faq</h2>
!      <p>{t("welcome")}</p>
    </div>
  );
};

export default Faq;
```

Just like with our initTranslations function, we call the t function with our string's key.

### Changing Languager Button

The next-i18n-router does a good job of detecting a visitor’s preferred language, but oftentimes we want to allow our visitors to change the language themselves.

To do this, we will create a dropdown for our user to select their new language. We will take their selected locale and set it as a cookie named "NEXT_LOCALE" that next-i18n-router uses to override the automatic locale detection.

I’m going to create a new component called LanguageChanger:

**`components/LanguageChanger.js`**


```javascript
'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/i18nConfig';

export default function LanguageChanger() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = e => {
    const newLocale = e.target.value;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  return (
    <select onChange={handleChange} value={currentLocale}>
      <option value="en">English</option>
      <option value="it">Italian</option>
      <option value="fr">French</option>
    </select>
  );
}
```


### Using SSG

Lastly, let’s update our **`layout.js`**. We’ll use **`generateStaticProps`** so that Next.js statically generates pages for each of our languages. We’ll also make sure to add the current locale to the **`<html>`** tag of our app.



```javascript
import './globals.css';
import { Inter } from 'next/font/google';
import i18nConfig from '@/i18nConfig';
import { dir } from 'i18next';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

export default function RootLayout({ children, params: { locale } }) {
  return (
    <html lang={locale} dir={dir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```
