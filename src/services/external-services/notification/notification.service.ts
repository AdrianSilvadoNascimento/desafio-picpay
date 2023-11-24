import { Injectable } from '@nestjs/common';

import axios from 'axios'

@Injectable()
export class NotificationMessageService {
  private readonly notificationUrl: string = 'https://run.mocky.io/v3/54dc2cf1-3add-45b5-b5a9-6bf7e7f1f4a6'
  
  async checkNotification(): Promise<boolean> {
    try {
      const res = await axios.get(this.notificationUrl)

      return res.status === 200 && res.data?.message === true
    } catch (error) {
      console.error('Error:', error)
      throw new Error(error)
    }
  }
}
