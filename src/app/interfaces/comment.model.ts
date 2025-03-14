export interface CommentModel {
  id: number;
  content: string;
  rating: number;
  date: string;
  status: string;
  commenterId: number;
  commenterFirstName: string;
  commenterLastName: string;
  commenterProfilePicture: string;
  solution: string;
  solutionProvider: string;
}
