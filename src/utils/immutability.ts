import update from 'immutability-helper';

interface IBook {
  name: string;
  id: number;
  sellout: boolean;
}
interface IBookState {
  books: IBook[];
}

interface IAction<Payload> {
  type: string;
  payload: Payload;
}
interface IActionMeta<Payload, Meta> extends IAction<Payload> {
  meta?: Meta;
}
interface IUpdateBookSelllFieldPayload {
  id: number;
  sellout: boolean;
}

type UPDATE_BOOK_SELLOUT_FIELD = 'UPDATE_BOOK_SELLOUT_FIELD';
const UPDATE_BOOK_SELLOUT_FIELD: UPDATE_BOOK_SELLOUT_FIELD = 'UPDATE_BOOK_SELLOUT_FIELD';
type UPDATE_BOOK_SELLOUT_FIELD_V2 = 'UPDATE_BOOK_SELLOUT_FIELD_V2';
const UPDATE_BOOK_SELLOUT_FIELD_V2: UPDATE_BOOK_SELLOUT_FIELD_V2 = 'UPDATE_BOOK_SELLOUT_FIELD_V2';

const initialState: IBookState = {
  books: [
    { name: 'react', id: 1, sellout: false },
    { name: 'angular', id: 2, sellout: true },
    { name: 'rxjs', id: 3, sellout: false }
  ]
};

function bookReducer(state: IBookState = initialState, action?: IAction<IUpdateBookSelllFieldPayload>): IBookState {
  if (action) {
    let nState: IBookState;
    switch (action.type) {
      case UPDATE_BOOK_SELLOUT_FIELD:
        const { id, sellout } = action.payload;
        nState = update<IBookState>(state, {
          books: {
            $apply: function updateBook(books: IBook[]): IBook[] {
              return books.map(
                (book: IBook): IBook => {
                  if (book.id === id) {
                    return { ...book, sellout };
                  }
                  return book;
                }
              );
            }
          }
        });
        return nState;

      case UPDATE_BOOK_SELLOUT_FIELD_V2:
        nState = update(state, {
          books: {
            $updateObjFieldFromArrayById: { id: action.payload.id, key: 'sellout', value: action.payload.sellout }
          }
        } as any);
        return nState;
      default:
        return state;
    }
  } else {
    return state;
  }
}

// update.extend<IBook[]>('$updateObjFieldFromArrayById', function handler(param, old: IBook[]): IBook[] {
//   return old.map(
//     (book: IBook): IBook => {
//       if (book.id === param.id) {
//         return update(book, { $merge: { [param.key]: param.value } });
//       }
//       return book;
//     }
//   );
// });

export {
  bookReducer,
  IBook,
  IBookState,
  IAction,
  IActionMeta,
  IUpdateBookSelllFieldPayload,
  UPDATE_BOOK_SELLOUT_FIELD,
  UPDATE_BOOK_SELLOUT_FIELD_V2,
  initialState
};
