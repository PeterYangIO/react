import React from 'react'
import styled from 'styled-components'
import TokenBase, { TokenBaseProps } from './TokenBase'
import RemoveTokenButton from './_RemoveTokenButton'
import tinycolor from 'tinycolor2'
import { useTheme } from '../ThemeProvider'

const colorModeConfig = {
    dark: {
        bgOpacity: 0.18,
        borderThreshold: 0,
        borderOpacity: 0.3,
        lightnessThreshold: 0.6,
    },
    light: {
        bgOpacity: 1,
        borderThreshold: 0.96,
        borderOpacity: 1,
        lightnessThreshold: 0.453,
    }
};

export interface TokenLabelProps extends TokenBaseProps {
    /**
     * The color that corresponds to the label
     */
    fillColor?: string
}

interface LabelStyleProps {
    bgColor: React.CSSProperties['backgroundColor'];
    borderColor: React.CSSProperties['borderColor'];
    textColor: React.CSSProperties['color'];
}

const tokenBorderWidthPx = 1;

const StyledTokenLabel = styled(TokenBase)<TokenLabelProps & LabelStyleProps>`
  background-color: ${props => props.bgColor};
  border-width: ${tokenBorderWidthPx}px;
  border-style: solid;
  border-color: ${props => props.borderColor};
  box-shadow: ${props => props.isSelected ? `0 0 0 2px ${props.bgColor}` : undefined};
  color: ${props => props.textColor};
  overflow: hidden;
  padding-right: ${props => props.handleRemove ? 0 : undefined};
  position: relative;
`;

// TODO: make this text truncate
const TokenTextContainer = styled('span')`
    white-space: nowrap;
    z-index: 1;
`;

const TokenLabel: React.FC<TokenLabelProps> = ({
    fillColor,
    isSelected,
    ...tokenBaseProps
}) => {
    const { handleRemove, text, as, variant } = tokenBaseProps;
    const { colorScheme } = useTheme();
    // const colorScheme = 'dark';
    const {
        bgOpacity,
        borderOpacity,
        borderThreshold,
        lightnessThreshold
    } = colorModeConfig[colorScheme || 'light'];
    let bgColor = fillColor;
    let borderColor = fillColor;
    let textColor = '#FFF';
    const perceivedLightness = tinycolor(fillColor).getLuminance();
    const isFillColorLight = perceivedLightness >= lightnessThreshold;

    if (colorScheme === 'dark') {
        const lightenBy = ((perceivedLightness - lightnessThreshold) * 100) * (isFillColorLight ? 1 : 0);

        bgColor = isSelected
            ? tinycolor(fillColor).setAlpha(bgOpacity * 1.2).toRgbString()
            : tinycolor(fillColor).setAlpha(bgOpacity).toRgbString();
        textColor = isSelected
            ? tinycolor(fillColor).lighten(lightenBy + 8).toString()
            : tinycolor(fillColor).lighten(lightenBy).toString();
        borderColor = isSelected
            ? tinycolor(fillColor).lighten(lightenBy).toRgbString()
            : tinycolor(fillColor).lighten(lightenBy).setAlpha(borderOpacity).toRgbString();
    } else {
        const isFillColorDark = perceivedLightness < 0.1;
        borderColor = perceivedLightness >= borderThreshold
            ? tinycolor(fillColor).darken(25).toString()
            : 'transparent';

        if (isFillColorLight) {
            textColor = '#000';
        }

        if (isSelected) {
            bgColor = isFillColorDark
                ? tinycolor(fillColor).lighten(10).toString()
                : tinycolor(fillColor).darken(10).toString()
        }
    }

    return (
        <StyledTokenLabel
            fillColor={fillColor}
            bgColor={bgColor}
            borderColor={borderColor}
            textColor={textColor}
            isSelected={isSelected}
            {...tokenBaseProps}
        >
            <TokenTextContainer>{text}</TokenTextContainer>
            {handleRemove ? (
                <RemoveTokenButton
                    borderOffset={tokenBorderWidthPx}
                    parentTokenTag={as || 'span'}
                    tabIndex={-1}
                    onClick={handleRemove}
                    variant={variant}
                />
            ) : null}
        </StyledTokenLabel>
    )
};

TokenLabel.defaultProps = {
    fillColor: '#999' // TODO: pick a real color
};

export default TokenLabel;
