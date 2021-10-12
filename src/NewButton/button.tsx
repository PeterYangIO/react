import React from 'react'
import styled from 'styled-components'
import {SxProp} from '../sx'
import {get} from '../constants'

export type ButtonProps = {
  variant: 'default' | 'primary' | 'outline' | 'invisible' | 'block' | 'danger'
  size: 'small' | 'medium' | 'large'
} & SxProp

const Button = styled.button<ButtonProps>`
  color: ${get('colors.btn.text')};
  background-color: ${get('colors.btn.bg')};
  border: 1px solid ${get('colors.btn.border')};
  box-shadow: ${get('shadows.btn.shadow')}, ${get('shadows.btn.insetShadow')}};
  &:hover {
    background-color: ${get('colors.btn.hoverBg')};
    border-color: ${get('colors.btn.hoverBorder')};
  }

  // focus must come before :active so that the active box shadow overrides
  &:focus {
    border-color: ${get('colors.btn.focusBorder')};
    box-shadow: ${get('shadows.btn.focusShadow')};
  }

  &:active {
    background-color: ${get('colors.btn.selectedBg')};
    box-shadow: ${get('shadows.btn.shadowActive')};
  }

  &:disabled {
    color: ${get('colors.fg.muted')};
    background-color: ${get('colors.btn.bg')};
    border-color: ${get('colors.btn.border')};
  }
  ${sx};
`

export default Button
