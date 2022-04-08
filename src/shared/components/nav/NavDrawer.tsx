import { Drawer, ScrollArea } from '@mantine/core';
import React from 'react'
import { useBreakpoints } from '../../hooks/useBreakpoints';
import { useThemeColors } from '../../hooks/useThemeColors';
import SmallDrawerFooter from './SmallDrawerFooter';

type NavDrawerProps = {
  appName?: string;
  avatarUrl?: string;
  displayThemeToggle?: boolean;
  isOpen: boolean;
  navbarContent?: React.ReactNode;
  onClose(): Promise<void> | void;
}

function NavDrawer(props: NavDrawerProps) {
  const breakpoints = useBreakpoints();
  const colors = useThemeColors();

  return (
    <Drawer
      title={['xs', 'sm'].includes(breakpoints.deviceSize) ? props.appName : undefined}
      opened={props.isOpen}
      size={['xs', 'sm'].includes(breakpoints.deviceSize) ? 'full' : breakpoints.deviceSize === 'md' ? 'lg' : '20vw'}
      styles={{
        drawer: {
          display: 'flex',
          flexDirection: 'column'
        },
        title: {
          color: colors.primary,
          fontSize: '1.6rem',
          padding: '0.4rem',
          fontWeight: 'bold'
        }
      }}
      onClose={() => props.onClose()}
    >
      {breakpoints.breakpointIncludes(['xs', 'sm']) && (
        <ScrollArea
          style={{position: 'relative', display: 'flex', flexDirection: 'column', flex: '1 1 auto', overflowY: 'auto', padding: '0.6rem'}}
        >
          <div
            style={{
              padding: '0.6rem 0.4rem',
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              flex: '1 1 auto',
              overflowY: 'auto'
            }}
          > 
            {props.navbarContent}
          </div>
          <SmallDrawerFooter avatarUrl={props.avatarUrl} displayThemeToggle={props.displayThemeToggle} />
        </ScrollArea>
      )}
      {breakpoints.breakpointExcludes(['xs', 'sm']) && (
        <ScrollArea>
          <div style={{position: 'relative', display: 'flex', flexDirection: 'column', flex: '1 1 auto', overflowY: 'auto', padding: '0.6rem'}}>
            {props.navbarContent}
          </div>
        </ScrollArea>
      )}
    </Drawer>
  )
}

export default NavDrawer