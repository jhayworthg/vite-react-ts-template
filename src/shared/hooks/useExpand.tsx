import { ExpandButtonProps, ThemeColor } from "../types/setup";
import React, { useEffect, useState } from 'react'
import ThemedActionIcon from "../components/themedActionIcon/ThemedActionIcon";
import { useThemeContext } from "./useThemeContext";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";

export const useExpand = (initialState?: boolean, color?: ThemeColor) => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const { applyGradients } = useThemeContext();

  useEffect(() => {
    if (hasChanged) {
      setExpanded(initialState === false ? false : true);
    } else {
      setHasChanged(true);
    }
  }, [initialState])

  const ExpandButton = ({ color, iconSize, radius, size, variant }: ExpandButtonProps) => {
    return (
      <ThemedActionIcon
        color={color ?? 'primary'}
        radius={radius ?? 'md'}
        size={size ?? 'md'}
        tooltip={expanded ? 'Collapse' : 'Expand'}
        variant={variant ? variant : applyGradients ? 'gradient' : 'filled'}
        onClick={() => setExpanded(!expanded)}
      >
        <>
        {expanded && (
          <CaretUpIcon style={{height: iconSize ?? '1.2rem', width: iconSize ?? '1.2rem'}} />
        )}
        {!expanded && (
          <CaretDownIcon style={{height: iconSize ?? '1.2rem', width: iconSize ?? '1.2rem'}} />
        )}
        </>
      </ThemedActionIcon>
    )
  }

  return { expanded, setExpanded, hasChanged, ExpandButton };
}