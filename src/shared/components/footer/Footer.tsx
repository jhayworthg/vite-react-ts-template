import { useMantineTheme } from '@mantine/core';
import React from 'react'
import { useBreakpoints } from '../../hooks/useBreakpoints';

type FooterProps = {
  content: React.ReactNode;
}

function Footer(props: FooterProps) {
  const theme = useMantineTheme();
  const { width } = useBreakpoints();
  const defaultStyle: React.CSSProperties = {
    position: 'sticky',
    bottom: 0,
    left: 0,
    margin: 0,
    padding: '0.4rem 0rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    flexWrap: 'wrap',
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.gray[5]}`
  }

  return (
    <div style={{...defaultStyle}}>
      {props.content}
    </div>
  )
}

export default Footer