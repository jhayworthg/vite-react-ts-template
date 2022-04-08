import { ActionIcon, ActionIconVariant, LoaderProps, MantineColor, MantineGradient, MantineNumberSize, ThemeIconVariant, Tooltip } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { useThemeContext } from '../../hooks/useThemeContext';
import { ThemeColor } from '../../types/setup';
import ThemedIcon from '../themedIcon/ThemedIcon';

type ThemedActionIconProps = {
  children: React.ReactNode;
  color: ThemeColor;
  disabled?: boolean;
  radius?: MantineNumberSize;
  size?: MantineNumberSize;
  loading?: boolean;
  loaderProps?: LoaderProps;
  tooltip?: string;
  variant?: ActionIconVariant | 'gradient';
  onClick(): Promise<void> | void;
}

const ThemedActionIcon = (props: ThemedActionIconProps) => {
  if (props.tooltip && !props.disabled) {
    return (
      <Tooltip
        withArrow
        label={props.tooltip}
        title={props.tooltip}
      >
        <IconButton
          {...props}
        >
          {props.children}
        </IconButton>
      </Tooltip>
    )
  }
  return (
    <IconButton {...props}>
      {props.children}
    </IconButton>
  )
}

const IconButton = (props: ThemedActionIconProps) => {
  const { colors, gradients, applyGradients } = useThemeContext();
  const [gradient, setGradient] = useState<MantineGradient>({ from: 'cyan', to: 'indigo'});
  const [actionVariant, setActionVariant] = useState<ActionIconVariant | undefined>(undefined);
  const [iconVariant, setIconVariant] = useState<ThemeIconVariant | undefined>(undefined);
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

  useEffect(() => {
    switch(props.variant) {
      case 'hover': 
        setActionVariant('hover');
        break;
      case 'light':
        setActionVariant('light');
        break;
      case 'outline': 
        setActionVariant('outline');
        break;
      case 'gradient':
      case 'transparent':
        setActionVariant('transparent');
        break;
      case 'filled':
        setActionVariant('filled');
        break;
      default:
        setActionVariant(applyGradients ? 'transparent' : 'filled');
        break;
    }
  }, [props.variant])

  const isGradient = (): boolean => {
    if (!gradient || props.disabled) return false;
    if (props.variant === 'gradient' || (!props.variant && applyGradients)) return true;
    return false;
  }

  if (props.tooltip) {
    return (
      <Tooltip 
        withArrow
        label={props.tooltip}
        title={props.tooltip}
      >
        <ActionIcon
          disabled={props.disabled}
          size={props.size}
          color={color}
          radius={props.radius ?? 'md'}
          loading={props.loading}
          loaderProps={props.loaderProps}
          variant={actionVariant}
          onClick={() => props.onClick()}
        >
          {isGradient() && (
            <ThemedIcon
              color={props.color}
              variant='gradient'
              radius={props.radius}
              size={props.size}
              loading={props.loading}
              loaderProps={props.loaderProps}
              tooltip={props.tooltip}
            >
              {props.children}
            </ThemedIcon>
          )}
          {!isGradient() && (
            <>
            {props.children}
            </>
          )}
        </ActionIcon>
      </Tooltip>
    )
  }

  return (
    <ActionIcon
      color={color}
      disabled={props.disabled}
      radius={props.radius}
      loading={props.loading}
      loaderProps={props.loaderProps}
      variant={actionVariant}
      onClick={() => props.onClick()}
    >
      {isGradient() && (
        <ThemedIcon
          color={props.color}
          variant='gradient'
          radius={props.radius}
          size={props.size}
          loading={props.loading}
          loaderProps={props.loaderProps}
        >
          {props.children}
        </ThemedIcon>
      )}
      {!isGradient() && (
        <>
        {props.children}
        </>
      )}
    </ActionIcon>
  )
}

export default ThemedActionIcon