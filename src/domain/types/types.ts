export interface Exhibition {
  // id: string;
  name: string;
  theme: string;
  room_width: string;
  room_length: string;
  artist: string;
}
export interface ExhibitionErrorData {
  name?: string;
  theme?: string;
  room_width?: string;
  room_length?: string;
}

export interface Illustration {
  id?: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  exhibition: string;
  position: number;
}
export interface IllustrationInput {
  id?: string;
  title: string;
  description: string;
  date: string;
  image: File | null;
  exhibition: string;
}
export interface IllustrationErrorData {
  title?: string;
  description?: string;
  date_painted?: string;
  image?: string;
}

export interface User {
  pk: string;
  username: string;
  email: string;
}
export interface UserLogin {
  username: string;
  password: string;
}
export interface UserRegister {
  username: string;
  email: string;
  password1: string;
  password2: string;
  profile_type: string;
}
export interface LoginErrorData {
  username?: string;
  password?: string;
  non_field_errors?: string;
}
export interface RegisterErrorData {
  username?: string;
  email?: string;
  password1?: string;
  password2?: string;
  profile_type?: string;
  non_field_errors?: string;
}
