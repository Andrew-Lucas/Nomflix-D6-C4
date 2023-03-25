import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    red: string
    dark: {
      veryDark: string
      normalDark: string
      lightDark: string
    }
    light: {
      brighter: string
      dimer: string
    }
  }
}
