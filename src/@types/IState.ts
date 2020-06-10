import ICourse from "./ICourse";
import IAuthor from "./IAuthor";

export default interface IState {
  courses: ICourse[];
  authors: IAuthor[];
  apiCallsInProgress: number;
}
