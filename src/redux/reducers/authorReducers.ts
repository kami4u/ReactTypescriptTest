import IState from "../../@types/IState";

import initialState from "./initialState";
import IAuthor from "../../@types/IAuthor";

const authorReducers = (
  authors: IAuthor[] = initialState.authors,
  action: { type: string; payload: Array<IAuthor> }
): IAuthor[] => {
  switch (action.type) {
    case "GET_AUTHORS":
      return action.payload;

    default:
      return authors;
  }
};

export default authorReducers;
