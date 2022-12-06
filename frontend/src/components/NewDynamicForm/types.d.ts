import { NumberSchema, NumberSchemaConstructor } from 'yup'

declare module 'yup' {
  interface NumberSchema {
    minorAgeValidation(minorAgeValidation: string): NumberSchema
  }
}

export const number: NumberSchemaConstructor