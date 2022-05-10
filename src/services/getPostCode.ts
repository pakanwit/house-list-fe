import { AxiosResponse } from 'axios'
import request from './request'

interface PostCodeRequest {
  baseUrl: string
}
export interface PostCodePayload {
  post_code: string
}
export interface PostCodeResponse {
  payload: PostCodePayload[]
  count: number
}

export const getPostCode = async (
  props: PostCodeRequest
): Promise<PostCodeResponse | undefined> => {
  try {
    const res: AxiosResponse<PostCodeResponse> = await request({
      method: 'GET',
      url: `/postCode`,
      baseURL: props.baseUrl,
    })

    return res.data
  } catch (error) {
    return undefined
  }
}
