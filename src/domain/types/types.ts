export interface Exhibition {
  // id: string;
  name: string;
  theme: string;
  room_width: string;
  room_length: string;
}

export interface Illustration {
  id?: string;
  title: string;
  description: string;
  date: string;
  image?:  string;
  exhibition: string;
  position: number;
}
export interface IllustrationInput{
  id?: string;
  title: string;
  description: string;
  date: string;
  image: File | null;
  exhibition: string;
}