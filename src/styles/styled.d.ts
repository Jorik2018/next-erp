import 'styled-components'
import type { RuleSet } from 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    PRIMARY_COLOR: string
    DANGER_COLOR: string
    WARNING_COLOR: string
    SUCCESS_COLOR: string
    INFO_COLOR: string
    FONT_COLOR_LIGHT: string
    BACKGROUND_COLOR: string
    TEXT_COLOR: string
    TEXT_INPUT_BACKGROUND_COLOR: string
    BORDER_RADIUS: string
    SHOW_FROM_TOP: Keyframes
  }
}