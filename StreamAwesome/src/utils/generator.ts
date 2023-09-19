import type Icon from '@/model/icon'
import chroma from 'chroma-js'

export default class IconGenerator {
  generateIcon(icon: Icon) {
    const color = chroma(icon.foregroundColor)
    console.log(`Received icon: ${icon.symbol} with color ${color.hex('rgba')}`)
  }
}
