import { PickMethod } from '../../types';

interface IRequestOptions {
  body?: any;
  params: any;
}
interface IRequest {
  someProperty: string;
  post(uri: string, options: IRequestOptions): any;
  get(uri: string, options?: IRequestOptions): any;
}

type PostMethodType = PickMethod<IRequest, 'post'>;
