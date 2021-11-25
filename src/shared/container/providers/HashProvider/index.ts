import { container } from 'tsyringe';

import IHashProvider from './models/IHashProvider';
import HashProvider from './implementations/HashProvider';

const providers = {
  bcrypt: HashProvider,
};

container.registerSingleton<IHashProvider>('HashProvider', providers.bcrypt);
