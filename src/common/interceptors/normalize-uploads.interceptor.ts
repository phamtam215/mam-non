import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import type { Request } from 'express'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

const UPLOAD_FIELDS = ['thumbnail', 'imageUrl']

@Injectable()
export class NormalizeUploadsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<Request>()
    const baseUrl = `${req.protocol}://${req.get('host')}`

    return next.handle().pipe(map(data => this.normalize(data, baseUrl)))
  }

  private normalize(data: unknown, baseUrl: string): unknown {
    if (Array.isArray(data))
      return data.map(item => this.normalize(item, baseUrl))
    if (data && typeof data === 'object') {
      const result = { ...(data as Record<string, unknown>) }
      for (const key of UPLOAD_FIELDS) {
        if (
          typeof result[key] === 'string' &&
          result[key].startsWith('/uploads/')
        ) {
          result[key] = `${baseUrl}${result[key]}`
        }
      }
      return result
    }
    return data
  }
}
