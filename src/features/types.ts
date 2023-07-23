export interface Exhibition {
  // id: string;
  name: string;
  theme: string;
  room_width: string;
  room_height: string;
}

export interface Illustration {
  title: string,
  description: string,
  date: string,
  image: File | null
}