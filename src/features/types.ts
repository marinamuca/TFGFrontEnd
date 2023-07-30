export interface Exhibition {
  // id: string;
  name: string;
  theme: string;
  room_width: string;
  room_length: string;
}

export interface Illustration {
  title: string,
  description: string,
  date: string,
  image: File | null,
  exhibition: string,
  position: number
}

export interface Frame {
  position: number,
  image: string,
}