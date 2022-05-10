import { AxiosResponse } from 'axios'
import request from './request'

interface PostCodeDetailRequest {
  baseUrl: string
  postCode: string
}
export interface PostCodeDetailPayload {
  average: string
  median: string
}
export interface PostCodeDetailResponse {
  payload: PostCodeDetailPayload
}

export const getPostCodeDetail = async (
  props: PostCodeDetailRequest
): Promise<PostCodeDetailResponse | undefined> => {
  try {
    const res: AxiosResponse<PostCodeDetailResponse> = await request({
      method: 'GET',
      url: `/postCode/${props.postCode}`,
      baseURL: props.baseUrl,
    })

    return res.data
  } catch (error) {
    return undefined
  }
}
