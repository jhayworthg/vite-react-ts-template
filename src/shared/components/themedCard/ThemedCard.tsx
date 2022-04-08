import { Card, Group, GroupPosition, MantineShadow, Text, Title, useMantineTheme } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { Elevation, ExpandableProps } from '../../types/setup';
import { useExpand } from '../../hooks/useExpand';
import { useThemeColors } from '../../hooks/useThemeColors';

type ThemedCardProps = {
  action?: React.ReactNode;
  children?: React.ReactNode;
  elevation: Elevation;
  expandable?: boolean | ExpandableProps;
  subtitle?: React.ReactNode;
  title?: React.ReactNode;
  style?: React.CSSProperties;
}

const ThemedCard = (props: ThemedCardProps) => {
  const theme = useMantineTheme();
  const [shadow, setShadow] = useState<MantineShadow>('xs');
  const [bg, setBg] = useState<string | undefined>(undefined);
  const [headerPosition, setHeaderPosition] = useState<GroupPosition>('apart');
  const { expanded, setExpanded, hasChanged, ExpandButton } = useExpand();
  const { primary } = useThemeColors();

  useEffect(() => {
    if (typeof props.expandable === 'boolean' || hasChanged) return;
    if (props.expandable?.initialState !== undefined) setExpanded(props.expandable.initialState);
  }, [props.expandable])

  useEffect(() => {
    switch(props.elevation) {
      case 2:
        setShadow('md');
        setBg(theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]);
        break;
      case 3:
        setShadow('lg');
        setBg(theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]);
        break;
      case 4:
        setShadow('xl');
        setBg(theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]);
        break;
      default:
        setShadow('sm');
        setBg(theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white);
        break;                        
    }
  }, [props.elevation, theme])

  useEffect(() => {
    if (props.subtitle || props.title) {
      setHeaderPosition(props.action || props.expandable ? 'apart' : 'left');
    } else if (props.action || props.expandable) {
      setHeaderPosition('right');
    }
  }, [props.action, props.subtitle, props.title, props.expandable])

  return (
    <Card
      shadow={shadow}
      radius='md'
      style={props.style ? {...props.style, backgroundColor: bg} : {width: '100%', backgroundColor: bg}}
    >
      {(props.title || props.subtitle || props.action || props.expandable) && (
        <Group
          direction='row'
          align='flex-start'
          position={headerPosition}
          style={{marginBottom: '1rem', gap: '0.4rem'}}
        >
          {(props.title || props.subtitle) && (
            <Group direction='column' style={{gap: '0.2rem'}}>
              <Title order={4} style={{color: primary}}>
                {props.title}
              </Title>
              <Text size='sm'>
                {props.subtitle}
              </Text>
            </Group>
          )}
          {(props.action || props.expandable) && (
            <Group style={{gap: '0.4rem'}}>
              {props.action && (
                <>
                {props.action}
                </>
              )}
              {props.expandable && (
                <ExpandButton 
                  color={typeof props.expandable === 'boolean' ? undefined : props.expandable.color}
                  size={typeof props.expandable === 'boolean' ? undefined : props.expandable.size}
                  iconSize={typeof props.expandable === 'boolean' ? undefined : props.expandable.iconSize}
                  radius={typeof props.expandable === 'boolean' ? undefined : props.expandable.radius}
                  variant={typeof props.expandable === 'boolean' ? undefined : props.expandable.variant}
                />
              )}
            </Group>
          )}
        </Group>
      )}
      <Card.Section
        style={{padding: '0.6rem 1rem'}}
      >
        {(!props.expandable || expanded) && (
          <>
          {props.children}
          </>
        )}
      </Card.Section>
    </Card>
  )
}

export default ThemedCard
