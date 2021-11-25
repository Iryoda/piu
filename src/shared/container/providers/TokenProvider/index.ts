import { container } from 'tsyringe';
import TokenProvider from './implementations/TokenProvider';
import ITokenProvider from './models/ITokenProvider';

container.registerSingleton<ITokenProvider>('TokenProvider', TokenProvider);
