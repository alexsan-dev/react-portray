import caller from 'callsite'
import path from 'path'
import fs from 'fs'

const portrayAppCtx = (stringsDict: PortrayDict) => {
  // RUTA DE STRINGS
  const srcPath = caller().map((value: caller.CallSite) => {
    const fileName: string = value.getFileName()
    return `${fileName.substr(
      0,
      fileName.lastIndexOf('/')
    )}/src/Lang/Strings.json`
  })[2]

  // REESCRIBIR STRINGS
  const srcPathSolved: string = path.resolve(srcPath)
  fs.exists(srcPathSolved, (exists: boolean) => {
    if (exists) {
      fs.readFile(srcPathSolved, (err: NodeJS.ErrnoException, data: Buffer) => {
        if (err) console.warn(err)
        else {
          // NUEVO DICCIONARIO
          const newStrings = {
            ...stringsDict,
            // @ts-ignore
            ...JSON.parse(data)
          } as PortrayDict

          // ESCRIBIR ARCHIVO
          fs.writeFile(
            srcPathSolved,
            JSON.stringify(newStrings),
            (err: NodeJS.ErrnoException) => {
              if (err) console.warn(err)
            }
          )
        }
      })
    }
  })
}
export default portrayAppCtx
