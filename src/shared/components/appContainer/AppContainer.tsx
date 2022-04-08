import { AppShell } from '@mantine/core';
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useBreakpoints } from '../../hooks/useBreakpoints';
import { useDrawerState } from '../../hooks/useDrawerState';
import Footer from '../footer/Footer';
import NavHeader from '../nav/NavHeader';
import { useStyles } from './styles';

type AppContainerProps = {
  appName?: string;
  avatarUrl?: string;
  closeAfterRoute?: boolean;
  displayThemeToggle?: boolean;
  logo?: React.ReactNode;
  headerContent?: React.ReactNode;
  navbarContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  children: React.ReactNode;
}

function AppContainer(props: AppContainerProps) {
  const setDrawerOpened = useDrawerState(state => state.setDrawerOpened);
  const { classes } = useStyles();
  const { pathname } = useLocation();

  useEffect(() => {
    if (props.closeAfterRoute) setDrawerOpened(false);
  }, [pathname])
  
  return (
    <AppShell
      className={classes.shell}
      styles={(theme) => ({
        body: {
          display: 'flex',
          flex: '1 1 auto'
        },
        main: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
          display: 'flex',
          flexDirection: 'column'
        },
      })}
      header={
        <NavHeader 
          appName={props.appName}
          avatarUrl={props.avatarUrl}
          displayThemeToggle={props.displayThemeToggle}
          logo={props.logo}
          headerContent={props.headerContent}
          navbarContent={props.navbarContent}
        />
      }
    >
      <div style={{display: 'flex', flexDirection: 'column', flex: '1 1 auto', overflowY: 'auto'}}>
        {props.children}
      </div>
      {props.footerContent && (
        <Footer content={props.footerContent} />
      )}
    </AppShell>
  )
}

export default AppContainer