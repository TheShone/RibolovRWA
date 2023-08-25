import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { KomentarModel } from '../types/komentar.module';
import { KomentariState } from '../types/komentari.interface';
import { createReducer, on } from '@ngrx/store';
import * as komentariActions from '../actions/komentari.actions'
export const adapter: EntityAdapter<KomentarModel> =
  createEntityAdapter<KomentarModel>();
export const initialState: KomentariState = adapter.getInitialState({
  isLoadingg: false,
  errorr: null,
});
export const reducers4 = createReducer(initialState,
  on(komentariActions.getKomentare,(state)=>({...state,isLoadingg:true})),
  on(komentariActions.getKomentareSuccess,(state,action)=>{
    return adapter.addMany(action.komentari,{...state,isLoadingg:false})
  }),
  on(komentariActions.getKomentareFailure,(state,action)=>({...state,errorr: action.error})),
  on(komentariActions.createCommentSuccess, (state,action)=> {
    return adapter.addOne(action.komentar, {...state, isLoadingg: false})
  }),
  on(komentariActions.deleteComment,(state)=>({...state,isLoadingg:true})),
  on(komentariActions.deleteCommentSuccess,(state,action)=>{
    return adapter.removeOne(action.id,{...state,isLoadingg:false})
  }),
  on(komentariActions.deleteCommentFailure,(state,action)=>({...state,errorr:action.error}))
)

