import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
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
import {
  ConnectButton,
  DeleteButton,
  SuccessButton,
  ViewDetailButton,
} from './Component/Button/Button'
import { InputWithLabel } from './Component/Input/InputWithLabel'
import { getHouseList, HouseListResponse } from './services/getHouseList'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { getPostCode, PostCodeResponse } from './services/getPostCode'
import {
  getPostCodeDetail,
  PostCodeDetailPayload,
  PostCodeDetailResponse,
} from './services/getPostCodeDetail'

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
interface StyledTableCellProps {
  showBorderBottom?: boolean
}

const StyledTableCell = styled(TableCell)<StyledTableCellProps>`
  &.MuiTableCell-root {
    border-right: 1px solid #e0e0e0;
    ${(props) => {
      if (props.showBorderBottom) {
        return css`
          border-bottom: 1px solid #e0e0e0;
        `
      } else {
        return css`
          border-bottom: 0;
        `
      }
    }}

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

  const [postCode, setPostCode] = useState<PostCodeResponse>({
    payload: [],
    count: 0,
  })
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedPostCode, setSelectedPostCode] = useState('')
  const [postCodeDetail, setPostCodeDetail] = useState<PostCodeDetailPayload>({
    average: '',
    median: '',
  })

  const handleChangePostCode = async (event: SelectChangeEvent) => {
    setSelectedPostCode(event.target.value)
    if (baseUrl) {
      const result = await getPostCodeDetail({
        baseUrl,
        postCode: selectedPostCode,
      })
      if (result?.payload !== undefined) {
        setPostCodeDetail(result.payload)
      }
    }
  }

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
      const [houseListRes, postCodeRes] = await Promise.all([
        getHouseList({
          baseUrl: baseUrl || '',
          take: rowsPerPage,
        }),
        getPostCode({
          baseUrl: baseUrl || '',
        }),
      ])
      if (houseListRes !== undefined) {
        setHouseList(houseListRes)
      }
      if (postCodeRes !== undefined) {
        setPostCode(postCodeRes)
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
        <Wrapper
          justifyContent='space-between'
          marginTop={41}
          style={{ width: '100%' }}
        >
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
                        <StyledTableCell
                          key={cell.id}
                          align='center'
                          showBorderBottom={true}
                        >
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
                            <Box
                              display='flex'
                              flexDirection='row'
                              justifyContent='center'
                            >
                              <Box marginRight='4px'>
                                <ViewDetailButton
                                  variant='contained'
                                  label='VIEW DETAIL'
                                />
                              </Box>
                              <Box>
                                <DeleteButton
                                  variant='outlined'
                                  label='DELETE'
                                />
                              </Box>
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
        <Wrapper
          flexDirection='column'
          style={{ backgroundColor: '#f4f7fc', padding: '44px' }}
        >
          <FormControl variant='outlined' sx={{ m: 1, minWidth: 250 }}>
            <InputLabel id='select-post-code-label'>
              SELECT POST CODE
            </InputLabel>
            <Select
              labelId='select-post-code-label'
              id='post-code-select-outlined'
              value={selectedPostCode}
              onChange={handleChangePostCode}
            >
              {postCode.payload.map((p, index) => {
                return (
                  <MenuItem key={`${p.post_code}-${index}`} value={p.post_code}>
                    {p.post_code}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <div>
            <Typography align='left' color='#3C64B1'>
              Average : {postCodeDetail.average}
            </Typography>
            <Typography align='left' color='#3C64B1'>
              Median : {postCodeDetail.median}
            </Typography>
          </div>
        </Wrapper>
      </Content>
    </Container>
  )
}

export default HouseList
