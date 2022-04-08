import { Collapse, Divider, Grid, Text, useMantineTheme } from '@mantine/core';
import { CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react'

type SectionState = 'collapsed' | 'expanded';

type NavSectionProps = {
  defaultState?: SectionState;
  displayBottomDivider?: boolean;
  displayTopDivider?: boolean;
  children?: React.ReactNode;
  title: string;
  titleColor?: string;
}

function NavSection(props: NavSectionProps) {
  const [open, setOpen] = useState<boolean>(true);
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const theme = useMantineTheme();

  useEffect(() => {
    if (!hasChanged) {
      setOpen(props.defaultState === 'collapsed' ? false : true);
      setHasChanged(true);
    }
  }, [props.defaultState])
  
  return (
    <>
    {props.displayTopDivider && (
      <Divider />
    )}
    <Grid.Col
      span={12}
      style={{display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer'}}
      onClick={() => setOpen(!open)}
    >
      {
        open
        ? <CaretUpIcon color={theme.colorScheme === 'dark' ? 'white' : 'black'} style={{height: '1.2rem', width: '1.2rem'}} />
        : <CaretDownIcon color={theme.colorScheme === 'dark' ? 'white' : 'black'} style={{height: '1.2rem', width: '1.2rem'}}  />
      }
      <Text size='sm' style={{marginLeft: '0.6rem', color: props.titleColor ? props.titleColor : theme.colorScheme === 'dark' ? 'white' : 'black'}}>
        {props.title}
      </Text>
    </Grid.Col>
    <Collapse
      in={open}
      style={{paddingLeft: '2rem'}}
    >
      {props.children}
    </Collapse>
    {props.displayBottomDivider && (
      <Divider />
    )}
    </>
  )
}

export default NavSection