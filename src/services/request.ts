import axios, { Method } from 'axios'

interface RequestProps {
  baseUrl: string
  port?: string
  method?: Method
  data?: object
}
const initialRequest = (props: RequestProps) => {
  const dataOrParams = ['GET', 'DELETE', 'PATCH'].includes(
    props.method || 'GET'
  )
    ? 'params'
    : 'data'
  return axios.create({
    baseURL: props.port ? `${props.baseUrl}:${props.port}` : props.baseUrl,
    method: props.method || 'GET',
    [dataOrParams]: props.data,
  })
}

const defaultParam = {
  baseUrl: 'http:localhost',
}

const request = initialRequest(defaultParam)
export default request
