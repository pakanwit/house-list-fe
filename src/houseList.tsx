import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { ConnectButton, SuccessButton } from './Component/Button/Button'
import { InputWithLabel } from './Component/Input/InputWithLabel'
import { getHouseList, HouseListResponse } from './services/getHouseList'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  display: flex;
  padding: 21px 150px 66px 150px;
  flex-direction: column;
`

const HeaderContainer = styled.div`
  height: 130px;
  display: flex;
  background-color: #f4f7fc;
  padding: 0px 150px 0px 150px;
  justify-content: flex-start;
`

const StyledTableContainer = styled(TableContainer)`
  &.MuiTableContainer-root {
    border: 1px solid #e0e0e0;
  }
`

const StyledTableRow = styled(TableRow)`
  &.MuiTableRow-root {
    border-bottom: 1px solid #e0e0e0;
    &:last-child {
      border: 0;
    }
    &:hover {
      background-color: #f4f7fc;
    }
  }
`

const StyledTableCell = styled(TableCell)`
  &.MuiTableCell-root {
    border-right: 1px solid #e0e0e0;
    padding: 8px;
    &:last-child {
      border-right: 0;
    }
  }
`

const StyledPaper = styled(Paper)`
  &.MuiPaper-root {
    border: 0;
    box-shadow: none;
  }
`

interface WrapperProps {
  justifyContent?: React.CSSProperties['justifyContent']
  alignItems?: React.CSSProperties['alignItems']
  marginTop?: number
  marginBottom?: number
  flexDirection?: React.CSSProperties['flexDirection']
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : 'row'};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : 'center'};
  width: 100%;
  margin-top: ${(props) => (props.marginTop ? `${props.marginTop}px` : 0)};
  margin-bottom: ${(props) =>
    props.marginBottom ? `${props.marginBottom}px` : 0};
  align-items: ${(props) => (props.alignItems ? props.alignItems : 'center')};
`

interface HeadCell {
  id: string
  label: string
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    label: 'Id',
  },
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'postCode',
    label: 'Post Code',
  },
  {
    id: 'price',
    label: 'Price',
  },
  {
    id: 'action',
    label: 'Action',
  },
]

const HouseList = () => {
  const [baseUrl, setBaseUrl] = useState<string | undefined>('')
  const [port, setPort] = useState<string | undefined>('')
  const [houseList, setHouseList] = useState<HouseListResponse>({
    payload: [],
    count: 0,
  })
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    // fetch data
  }, [])

  const handleSetBaseUrl = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setBaseUrl(event.target.value)
  }
  const handleSetPort = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPort(event.target.value)
  }

  const handleConnectHouseList = async () => {
    if (baseUrl) {
      const res = await getHouseList({
        baseUrl: baseUrl || '',
        take: rowsPerPage,
      })
      if (res !== undefined) {
        setHouseList(res)
      }
    }
  }

  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage)
    if (baseUrl) {
      if (houseList.payload?.length >= houseList.count) {
        return
      }
      const res = await getHouseList({
        baseUrl: baseUrl || '',
        take:
          newPage <= 1
            ? newPage * rowsPerPage + houseList.payload?.length
            : newPage * rowsPerPage + rowsPerPage,
      })
      if (res !== undefined) {
        setHouseList(res)
      }
    }
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Container>
      <HeaderContainer>
        <Wrapper justifyContent='space-between' marginTop={41}>
          <InputWithLabel
            width={250}
            label='URL'
            placeholder='Url'
            value={baseUrl}
            onChange={handleSetBaseUrl}
          />
          <InputWithLabel
            width={250}
            label='PORT'
            placeholder='Port'
            value={port}
            onChange={handleSetPort}
          />
          <ConnectButton
            variant='contained'
            label='CONNECT'
            width={200}
            onClick={handleConnectHouseList}
          />
        </Wrapper>
      </HeaderContainer>
      <Content>
        <Wrapper justifyContent='space-between' marginBottom={26}>
          <Typography variant='h5'>House List</Typography>
          <SuccessButton variant='contained' label='CONNECT' width={200} />
        </Wrapper>
        <Wrapper
          justifyContent='flex-start'
          marginBottom={26}
          flexDirection='column'
        >
          <StyledPaper sx={{ width: '100%' }}>
            <StyledTableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {headCells.map((cell) => {
                      return (
                        <StyledTableCell key={cell.id} align='center'>
                          <Typography fontWeight={700}>{cell.label}</Typography>
                        </StyledTableCell>
                      )
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {houseList.payload
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((house) => {
                      return (
                        <StyledTableRow key={house.id}>
                          <StyledTableCell align='center'>
                            {house.id}
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            {house.name}
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            {house.post_code}
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            {house.price}
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            <Box>
                              <SuccessButton
                                variant='contained'
                                label='CONNECT'
                                // width={50}
                              />
                              <SuccessButton
                                variant='contained'
                                label='CONNECT'
                                // width={50}
                              />
                            </Box>
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </StyledTableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={houseList.count}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </StyledPaper>
        </Wrapper>
      </Content>
    </Container>
  )
}

export default HouseList
