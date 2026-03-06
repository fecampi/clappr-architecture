type LoaderOptions<T = any> = {
  name?: string
  module?: () => Promise<any>
  global?: string
  script?: string
  init?: (lib: T) => void | Promise<void>
}

export class LibraryLoader {

  private static cache = new Map<string, Promise<any>>()

  static async load<T = any>(options: LoaderOptions<T>): Promise<T> {

    // Deduz name do script se não fornecido
    if (!options.name && options.script) {
      const filename = options.script.split('/').pop()?.split('.')[0] || 'lib'
      options.name = filename
    }

    if (this.cache.has(options.name!)) {
      return this.cache.get(options.name!)!
    }

    const promise = this.loadInternal(options)

    this.cache.set(options.name!, promise)

    return promise
  }

  private static async loadInternal<T>(options: LoaderOptions<T>): Promise<T> {

    let lib: any

    // 1️⃣ tenta npm import
    if (options.module) {
      try {
        const mod = await options.module()
        lib = mod.default || mod
        console.log(`✅ [${options.name}] Carregado via module (import)`)
      } catch (e) {
        console.log(`❌ [${options.name}] Falhou module (import):`, e)
      }
    }

    // 2️⃣ tenta global existente
    if (!lib && options.global && (window as any)[options.global]) {
      lib = (window as any)[options.global]
      console.log(`✅ [${options.name}] Encontrado no global (window.${options.global})`)
    }

    // 3️⃣ carrega script fallback
    if (!lib && options.script) {
      console.log(`⏳ [${options.name}] Carregando script: ${options.script}`)
      await this.loadScript(options.script)

      if (options.global) {
        lib = (window as any)[options.global]
        if (lib) {
          console.log(`✅ [${options.name}] Carregado via script global`)
        }
      }
    }

    if (!lib) {
      throw new Error(`Failed to load library: ${options.name}`)
    }

    // 4️⃣ init opcional (polyfills etc)
    if (options.init) {
      console.log(`🔧 [${options.name}] Executando init...`)
      await options.init(lib)
      console.log(`✅ [${options.name}] Init concluído`)
    }

    return lib
  }

  private static loadScript(src: string): Promise<void> {

    return new Promise((resolve, reject) => {

      const existing = document.querySelector(`script[src="${src}"]`)

      if (existing) {
        resolve()
        return
      }

      const script = document.createElement("script")

      script.src = src
      script.async = true

      script.onload = () => resolve()
      script.onerror = reject

      document.head.appendChild(script)

    })
  }
}

