const source = document.documentElement.lang

const Translators = {
  Google: {
    hostnames: ['translate.googleusercontent.com', 'translate.google.', '.translate.goog'],
    dom: 'html.translated-ltr, html.translated-rtl',
    api: {
      hostname: 'translate.googleapis.com',
      parameter: 'tl',
    },
    changesLangAttribute: true,
  },
  Microsoft: {
    hostnames: [
      'translatoruser-int.com',
      'translatetheweb.com',
      'ssl.microsofttranslator.com',
      'microsofttranslator.com',
    ],
    dom: '*[_msttexthash]',
    api: {
      hostname: 'api.cognitive.microsofttranslator.com',
      parameter: 'to',
    },
  },
  Mozilla: {
    dom: '*[x-bergamot-translated]',
    defaultLanguage: true,
  },
  Baidu: {
    hostnames: ['translate.baiducontent.com', 'fanyi.baidu.com'],
    parameter: 'to',
  },
  Yandex: {
    hostnames: ['translate.yandex.com', 'translate.yandex.'],
    dom: 'ya-tr-span',
    changesLangAttribute: true,
  },
  Naver: {
    hostnames: ['papago.naver.net'],
    parameter: 'target',
    changesLangAttribute: true,
  },
}

function detectTargetLanguageFromApi(api) {
  if ('performance' in window && 'getEntriesByType' in performance) {
    // Reverse to find latest entries first
    for (const entry of performance.getEntriesByType('resource').reverse()) {
      const url = new URL(entry.name)
      if (api.hostname === url.hostname && url.searchParams.get(api.parameter))
        return url.searchParams.get(api.parameter)
    }
  }
}

function detectTargetLanguage(name) {
  if ('parameter' in Translators[name]) {
    const query = new URLSearchParams(location.search)
    if (query.get(Translators[name].parameter)) return query.get(Translators[name].parameter)
  }
  if ('api' in Translators[name]) {
    const target = detectTargetLanguageFromApi(Translators[name].api)
    if (target) return target
  }
  if (Translators[name].changesLangAttribute) return document.documentElement.lang
  if (Translators[name].defaultLanguage) return navigator.language
}

function detectMachineTranslation() {
  const hostname = window.location.hostname.replace(/^www\./, '')
  for (const translator in Translators) {
    if ('hostnames' in Translators[translator]) {
      for (const hint of Translators[translator].hostnames) {
        if (
          (hint.startsWith('.') && hostname.endsWith(hint)) ||
          (hint.startsWith('.') && hostname.endsWith(hint)) ||
          hostname === hint
        )
          return { translator, source, target: detectTargetLanguage(translator) }
      }
    }

    if ('dom' in Translators[translator]) {
      if (document.querySelector(Translators[translator].dom))
        return { translator, source, target: detectTargetLanguage(translator) }
    }

    if ('api' in Translators[translator]) {
      const target = detectTargetLanguageFromApi(Translators[translator].api)
      if (target) return { translator, source, target }
    }
  }
}

export default detectMachineTranslation
