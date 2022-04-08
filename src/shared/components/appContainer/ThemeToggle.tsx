import { Chip, Group, Switch, useMantineTheme } from '@mantine/core';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import React from 'react'
import { useBreakpoints } from '../../hooks/useBreakpoints';
import { useToggleTheme } from '../../hooks/useToggleTheme';
import { useStyles } from './styles';

type Props = {}

const ThemeToggle = (props: Props) => {
  const toggleTheme = useToggleTheme();
  const { deviceSize } = useBreakpoints();
  const { classes } = useStyles();
  const theme = useMantineTheme();

  if (['xs', 'sm'].includes(deviceSize)) {
    return (
      <Group style={{gap: '0'}}>
        <SunIcon className={classes.smallIcon} style={{color: theme.colors.yellow[5]}} />
        <Switch 
          checked={true}
          size='md'
          color={theme.colorScheme === 'dark' ? 'violet' : 'yellow'}
          style={{marginLeft: '0.6rem', marginRight: '0.6rem', transform: theme.colorScheme === 'light' ? 'rotate(180deg)' : undefined}}
          onChange={() => {}}
          onClick={() => toggleTheme()}
        />
        <MoonIcon className={classes.smallIcon} style={{color: theme.colors.violet[5]}} />
      </Group>
    )
  }
  return (
    <Chip
      value='chip'
      checked={false}
      variant='outline'
      size='lg'
      styles={(theme) => ({
        label: {
          paddingLeft: '0.8rem',
          paddingRight: '0.4rem'
        }
      })}
      onChange={() => toggleTheme()}
    >
      <div className={classes.chipContent}>
        {theme.colorScheme === 'dark' ? 'Light Theme' : 'Dark Theme'}
        {
          theme.colorScheme === 'dark'
          ? <SunIcon className={classes.icon} />
          : <MoonIcon className={classes.icon} />
        }
      </div>
    </Chip>
  )
}

export default ThemeToggle