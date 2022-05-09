import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Input } from './Component/Input/Input'
import { InputWithLabel } from './Component/Input/InputWithLabel'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  display: flex;
  padding: 21px 150px 66px 150px;
  background-color: wheat;
`

const HeaderContainer = styled.div`
  height: 130px;
  display: flex;
  background-color: #f4f7fc;
  padding: 0px 150px 0px 150px;
  justify-content: flex-start;
`

const ConnectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 41px;
`

const CustomInput = styled.input``

const HouseList = () => {
  const [baseUrl, setBaseUrl] = useState<string | undefined>('')
  const [port, setPort] = useState<string | undefined>('')

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

  return (
    <Container>
      <HeaderContainer>
        <ConnectContainer>
          <InputWithLabel
            width={350}
            label='URL'
            placeholder='Url'
            value={baseUrl}
            onChange={handleSetBaseUrl}
          />
          <InputWithLabel
            width={350}
            label='PORT'
            placeholder='Port'
            value={port}
            onChange={handleSetPort}
          />
        </ConnectContainer>
      </HeaderContainer>
      <Content>
        <Input label='Reddit' />
      </Content>
    </Container>
  )
}

export default HouseList
