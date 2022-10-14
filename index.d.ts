interface Translation {
  translator: 'Google' | 'Microsoft' | 'Mozilla' | 'Baidu' | 'Yandex' | 'Naver'
  source: string // initial value from document.documentElement.lang
  target: string // ISO 639-1 language code
}
export default function detectMachineTranslation(): Translation | undefined
