import {ChangeEvent} from 'react';

export type OnChangeEvent = ChangeEvent<HTMLInputElement>;

export type TranslateFunction = (key: string) => string;
