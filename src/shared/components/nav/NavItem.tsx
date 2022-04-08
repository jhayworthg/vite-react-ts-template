import { Button, useMantineTheme } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useThemeColors } from '../../hooks/useThemeColors';

type NavItemProps = {
  condensed?: boolean;
  disabled?: boolean;
  exact?: boolean;
  icon?: React.ReactNode;
  path: string;
  title: string;
}

function NavItem(props: NavItemProps) {
  const theme = useMantineTheme();
  const { pathname } = useLocation();
  const [active, setActive] = useState<boolean>(false);
  const { primary } = useThemeColors();

  useEffect(() => {
    let fixedName: string = pathname.trim().toLocaleLowerCase();
    let fixedPath: string = props.path.trim().toLocaleLowerCase();

    if (props.exact) {
      setActive(fixedName === fixedPath);
    } else {
      setActive(fixedName.includes(fixedPath));
    }
  }, [props.path, pathname])

  const color = (): string => {
    return active
    ? primary
    : theme.colorScheme === 'dark' ? theme.white : theme.black
  }

  if (props.disabled) {
    return (
      <Button
        disabled
        leftIcon={props.icon}
        variant='subtle'
        size={props.condensed ? 'sm' : 'md'}
        styles={(theme) => ({
          inner: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start'
          },
          label: {
            color: color()
          }
        })}
      >
        {props.title}
      </Button>
    )
  }
  return (
    <Button
      component={Link}
      to={props.path}
      leftIcon={props.icon}
      variant='subtle'
      size={props.condensed ? 'sm' : 'md'}
      color={color()}
      style={{width: '100%'}}
      styles={(theme) => ({
        inner: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }
      })}
    >
      {props.title}
    </Button>
  )
}

export default NavItem