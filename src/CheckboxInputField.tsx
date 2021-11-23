import React, {HTMLProps} from 'react'
import {ComponentProps} from './utils/types'
import InputField, {InputFieldContext} from './_InputField/InputField'
import {Slot} from './_InputField/slots'
import ToggleInputField from './_InputField/ToggleInputField'
import ToggleInputLeadingVisual from './_InputField/ToggleInputLeadingVisual'

// TODO: use Primer's checkbox input once it's available
// https://github.com/github/primer/issues/467
const CheckboxInput: React.FC<HTMLProps<HTMLInputElement>> = props => {
  return <input type="checkbox" {...props} />
}

const Input: React.FC<HTMLProps<HTMLInputElement>> = props => (
  <Slot name="Input">
    {({disabled, id, required, captionId}: InputFieldContext) => (
      <CheckboxInput aria-describedby={captionId} id={id} required={required} disabled={disabled} {...props} />
    )}
  </Slot>
)

const CheckboxInputField: React.FC<ComponentProps<typeof ToggleInputField>> = props => <ToggleInputField {...props} />

export default Object.assign(CheckboxInputField, {
  Input,
  Caption: InputField.Caption,
  Label: InputField.Label,
  Validation: InputField.Validation,
  LeadingVisual: ToggleInputLeadingVisual
})
