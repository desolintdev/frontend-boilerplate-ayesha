import {Socket} from 'socket.io-client';

export type User = {
  _id: string;
  name?: string;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
  organizationId: string;
};

export type UsersState = {
  currentUser: User | null;
  list: User[];
};

export type SocketState = {
  value: Socket | null;
};

export type AppState = {
  language: string;
};
