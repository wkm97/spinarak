export const handlerPath = (context: string) => {
  return `${context.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}`
};

export const createHttpPath = (context: string) => {
  return `${context.split(`${process.cwd()}/src/modules`)[1].substring(1).replace(/\\/g, '/')}`
}
