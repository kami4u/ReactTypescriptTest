import ICourse from "./ICourse";

export default interface ICourses {
  courses: ICourse[];
  onDeleteClick: (any) => void;
}
