import {
  bookReducer,
  IAction,
  IUpdateBookSelllFieldPayload,
  UPDATE_BOOK_SELLOUT_FIELD,
  UPDATE_BOOK_SELLOUT_FIELD_V2,
  initialState,
  IBookState,
} from '../../utils/immutability';

describe('bookReducer测试套件', () => {
  const expectedState: IBookState = {
    books: [
      { name: 'react', id: 1, sellout: false },
      { name: 'angular', id: 2, sellout: false },
      { name: 'rxjs', id: 3, sellout: false },
    ],
  };

  it('应该返回初始化的state，如果没有action参数', () => {
    const actualState: IBookState = bookReducer(initialState);
    expect(actualState).toEqual(initialState);
  });

  it('应该返回新的state, id为2的book的sellout字段被更新为false；state，books, id为2的book都是新的引用，其他的book引用不变', () => {
    const actualAction: IAction<IUpdateBookSelllFieldPayload> = {
      type: UPDATE_BOOK_SELLOUT_FIELD,
      payload: {
        id: 2,
        sellout: false,
      },
    };

    const actualState: IBookState = bookReducer(initialState, actualAction);
    expect(actualState).toEqual(expectedState);
    expect(actualState).not.toBe(expectedState);
    expect(actualState.books).not.toBe(expectedState.books);

    actualState.books.forEach((book, idx) => {
      expect(book).not.toBe(expectedState.books[idx]);
    });
  });

  it(
    '使用自定义操作符$updateObjFieldFromArrayById更新数据' +
      '应该返回新的state, id为2的book的sellout字段被更新为false；state，books, id为2的book都是新的引用，其他的book引用不变',
    () => {
      const actualAction: IAction<IUpdateBookSelllFieldPayload> = {
        type: UPDATE_BOOK_SELLOUT_FIELD_V2,
        payload: {
          id: 2,
          sellout: false,
        },
      };
      const actualState: IBookState = bookReducer(initialState, actualAction);
      expect(actualState).toEqual(expectedState);
      expect(actualState).not.toBe(expectedState);
      expect(actualState.books).not.toBe(expectedState.books);

      actualState.books.forEach((book, idx) => {
        expect(book).not.toBe(expectedState.books[idx]);
      });
    },
  );
});
