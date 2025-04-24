import {create} from "zustand";
export interface Comment {
    id: string
    username: string
    projectId : string
    content : string
    createdAt: Date
}

export interface CommentState {
    comments : Comment[]

}

export interface CommentActions {
    setComments: (comments: Comment[]) => void;
    addComment: (comment: Comment) => void;
    deleteComment: (id: string) => void;
}

export const useCommentStore = create<CommentState & CommentActions>((set) => ({
    comments: [],
    setComments: (comments) => set({comments}),

    addComment: (comment) => {
        set((state) => ({
            comments: [...state.comments, comment]
        }))
    },
    deleteComment: (id) => {
        set((state) => ({
            comments: state.comments.filter((comment) => comment.id !== id)
        }))
    }
    
}))