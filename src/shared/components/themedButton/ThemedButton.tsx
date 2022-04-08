import { Button, ButtonVariant, MantineColor, MantineGradient, SharedButtonProps, Tooltip } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useThemeContext } from '../../hooks/useThemeContext';
import { ThemeColor } from '../../types/setup';

interface ThemedButtonProps extends SharedButtonProps {
  children: React.ReactNode;
  color: ThemeColor;
  disabled?: boolean;
  tooltip?: string;
  onClick(): Promise<void> | void;
}

const ThemedButton = (props: ThemedButtonProps) => {
  if (props.tooltip && !props.disabled) {
    return (
      <Tooltip
        withArrow
        label={props.tooltip}
        title={props.tooltip}
      >
        <ButtonComponent {...props}>
          {props.children}
        </ButtonComponent>
      </Tooltip>
    )
  }
  return (
    <ButtonComponent {...props}>
      {props.children}
    </ButtonComponent>
  )
}

const ButtonComponent = (props: ThemedButtonProps) => {
  const { colors, gradients, applyGradients } = useThemeContext();
  const [gradient, setGradient] = useState<MantineGradient>({ from: 'cyan', to: 'indigo'});
  const [color, setColor] = useState<MantineColor>('blue');

  useEffect(() => {
    if (props.color === 'error') setColor(colors.error);
    if (props.color === 'info') setColor(colors.info);
    if (props.color === 'primary') setColor(colors.primary);
    if (props.color === 'secondary') setColor(colors.secondary);
    if (props.color === 'success') setColor(colors.success);
    if (props.color === 'warn') setColor(colors.warn);
  }, [props.color, colors])

  useEffect(() => {
    if (props.color === 'error') setGradient(gradients.error);
    if (props.color === 'info') setGradient(gradients.info);
    if (props.color === 'primary') setGradient(gradients.primary);
    if (props.color === 'secondary') setGradient(gradients.secondary);
    if (props.color === 'success') setGradient(gradients.success);
    if (props.color === 'warn') setGradient(gradients.warn);
  }, [props.color, gradients])

  const buttonVariant = (): ButtonVariant | undefined => {
    if (props.disabled) return 'default';
    if (props.variant) return props.variant;
    if (applyGradients) return 'gradient';
    if (!props.variant) return 'filled';
    return undefined;
  }

  return (
    <Button
      color={props.variant !== 'gradient' ? color : undefined}
      size={props.size}
      type={props.type}
      leftIcon={props.leftIcon}
      rightIcon={props.rightIcon}
      fullWidth={props.fullWidth}
      radius={props.radius}
      variant={buttonVariant()}
      gradient={props.variant === 'gradient' || applyGradients ? gradient : undefined}
      uppercase={props.uppercase}
      compact={props.compact}
      loading={props.loading}
      loaderProps={props.loaderProps}
      loaderPosition={props.loaderPosition}
      disabled={props.disabled}
      onClick={() => props.onClick()}
    >
      {props.children}
    </Button>
  )
}

export default ThemedButton