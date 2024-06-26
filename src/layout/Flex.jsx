import { forwardRef } from 'react'
import { Stack } from '@mui/material'

const Flex = forwardRef(
  (
    { flexDirection = 'row', flexColumn, flexRow, flexFull, children, ...rest },
    ref
  ) => {
    return (
      <Stack
        ref={ref}
        direction={flexDirection}
        {...((flexColumn || flexFull) && {
          direction: 'column',
          minHeight: '0%',
          flex: 1,
        })}
        {...(flexRow && {
          direction: 'row',
          width: '100%',
          flex: 1,
          minWidth: '0%',
          minHeight: '0%',
        })}
        {...rest}
      >
        {children}
      </Stack>
    )
  }
)

Flex.displayName = 'Flex'

export default Flex
