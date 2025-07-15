export class LanguageLoader {
  constructor(languages) {
    this.map = {}
    this.languages = languages
    languages.forEach((language) => {
      language.alias.forEach((alias) => {
        this.map[alias] = language
      })
    })
  }

  getAll() {
    return this.languages.map(language => {
      return {
        name: language.name,
        alias: language.alias,
      }
    })
  }

  load(languageName) {
    const languageMap = this.map
    const language = languageMap[languageName.toLowerCase()]

    if (!language) return Promise.resolve(undefined)

    if (language.support) return Promise.resolve(language.support)

    return language.load()
  }
}
