import { Chip, Paper, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Flex } from '../../layout'

const StoryList = ({ stories }) => {
  const theme = useTheme()
  return (
    <Flex flexColumn width="100%" spacing={1}>
      {stories.map(({ title, authors, genre }, index) => (
        <Paper
          variant="outlined"
          key={index}
          sx={{
            display: 'flex',
            height: 'auto',
            width: '100%',
            px: 3,
            py: 2,
            '&:hover': {
              backgroundColor: theme.palette.grey[100],
              cursor: 'pointer',
            },
          }}
        >
          <Flex
            flexRow
            width="100%"
            key={index}
            justifyContent="space-between"
            overflow="hidden"
          >
            <Flex flexColumn>
              <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
                {title}
              </Typography>
              <Chip
                label={genre}
                size="small"
                sx={{
                  width: 'min-content',
                  backgroundColor: 'secondary.light',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              ></Chip>
            </Flex>
            <Flex flexColumn alignItems="flex-end">
              <Typography variant="subtitle2">
                {authors === 1 ? '1 Author' : `${authors} Authors`}
              </Typography>
            </Flex>
          </Flex>
        </Paper>
      ))}
    </Flex>
  )
}

export default StoryList
