import { Injectable } from '@nestjs/common';
import axios from 'axios'

@Injectable()
export class AuthService {
  private readonly authUrl: string = 'https://run.mocky.io/v3/5794d450-d2e2-4412-8131-73d0293ac1cc'
  
  async checkAuth(): Promise<boolean> {
    try {
      const res = await axios.get(this.authUrl)

      return res.status === 200 && res.data?.message === 'Autorizado'
    } catch (error) {
      console.error('Error:', error)
      throw new Error(error)
    }
  }
}
