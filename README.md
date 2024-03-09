# Next JS Internationalization

- Folder Structure setup like this **``**

```javascript

| src
|    ├── [locale]
|    |        ├── about-us
|    |                └── page.jsx
|    |        ├── about-us
|    |                └── page.jsx
|    ├── global.css
|    ├── page.jsx
|    └── layout.js
|
|
| i18n.js
| i18nConfig.js
| .env

```

- Install Following packages

```javascript
npm i i18next react-i18next i18next-resources-to-backend next-i18n-router
```

- Create file **`i18nConfig.js`** globally

```javascript
const i18nConfig = {
  locales: ["en", "ur"],
  defaultLocale: "en",
  // prefixDefault: true,
};

module.exports = i18nConfig;
```

- Create file **`middleware.js`**

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

- Create file **`i18n.js`**

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
