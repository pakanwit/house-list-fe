import { AxiosResponse } from 'axios'
import request from './request'

interface HouseListRequest {
  baseUrl: string
  take: number
}

export interface HouseListPayload {
  id: number
  name: string
  desc: string
  price: string
  post_code: string
}
export interface HouseListResponse {
  payload: HouseListPayload[]
  count: number
}

export const getHouseList = async (
  props: HouseListRequest
): Promise<HouseListResponse | undefined> => {
  try {
    const res: AxiosResponse<HouseListResponse> = await request({
      method: 'GET',
      url: `/home?skip=1&take=${props.take}`,
      baseURL: props.baseUrl,
    })

    return res.data
  } catch (error) {
    return undefined
  }
}
