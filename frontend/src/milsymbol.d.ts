declare module 'milsymbol' {
    export default class Symbol {
      constructor(code: string, options?: any)
      asCanvas(): HTMLCanvasElement
      getSize(): { width: number; height: number }
    }
  }