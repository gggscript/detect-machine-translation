# Detect if your users translate your site

Detect if the current website has been machine-translated

# Why

Not everyone speaks the language of your website's content. Browsers (like Chrome and Edge) sometimes automatically translate the page. Search Engines (like Google, Bing, Baidu, and Yandex) include "Translate Page" links next to your website. Automatic translations aren't perfect, which can impact your user's experience. The example below shows how you can integrate this with your analytics to monitor machine translations

# Usage

```js
import detectMachineTranslation from 'detect-machine-translation'

// use pagehide event
window.addEventListener('pagehide', () => {
  const translation = detectMachineTranslation()
  if (translation) {
    yourAnalytics.sendEvent('machine-translation', {
      by: translation.translator,
      from: translation.source,
      target: translation.target,
    })
  }
})
```

# Install

```
npm install detect-machine-translation
```

This project has no dependencies

# API

```ts
interface Translation {
  translator: 'Google' | 'Microsoft' | 'Mozilla' | 'Baidu' | 'Yandex' | 'Naver'
  source: string // initial value from document.documentElement.lang
  target: string // ISO 639-1 language code
}
export default function detectMachineTranslation(): Translation | undefined
```

# Support

- Google Chrome Built In Extension
- Microsoft Edge Built In Extension
- [Mozilla's Bergamot Extension](https://browser.mt)
- [Google Translate](https://translate.google.com/?op=websites) (also used by many browser extensions)
- [Yandex Translate](https://translate.yandex.com)
- [Naver Papago](https://papago.naver.net/website)
- [Baidu Translate](https://fanyi.baidu.com/transpage)

# Resources

[Daniel's Article on detecting machine-translated webpages](https://www.ctrl.blog/entry/detect-machine-translated-webpages.html)

# ToDo

- Callback when translation happens using Observers
- Normalizing Language Codes

## Support more Services

- Apple/Safari
- UC Browser
- Xiaomi Browser
- Sogou
- Tencent
- https://apertium.org
- https://fanyi.caiyunapp.com
- https://gramtrans.com
- https://www.worldlingo.com
- https://fanyi.youdao.com/
- https://caiyunai.com/
- https://lingvanex.com/
