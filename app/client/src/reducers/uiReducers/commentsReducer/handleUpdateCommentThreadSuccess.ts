import { CommentThread } from "entities/Comments/CommentsInterfaces";
import { ReduxAction } from "constants/ReduxActionConstants";
import { get } from "lodash";
import { CommentsReduxState } from "./interfaces";

const handleUpdateCommentThreadSuccess = (
  state: CommentsReduxState,
  action: ReduxAction<Partial<CommentThread>>,
) => {
  const id = action.payload.id as string;
  const commentThreadInStore = state.commentThreadsMap[id];
  const existingComments = get(commentThreadInStore, "comments", []);

  if (!commentThreadInStore) return state;

  // Need to do this to update the app comments section
  // TODO: handle this at the thread level for better perf
  state.applicationCommentThreadsByRef[commentThreadInStore.applicationId] = {
    ...state.applicationCommentThreadsByRef[commentThreadInStore.applicationId],
  };

  state.commentThreadsMap[id] = {
    ...commentThreadInStore,
    ...action.payload,
    comments: existingComments,
  };

  return {
    ...state,
    creatingNewThreadComment: false,
  };
};

export default handleUpdateCommentThreadSuccess;
