import { createFeatureSelector } from '@ngrx/store';
import { createChildSelector } from './create-child-selector';

interface Book {
  title: string;
}

interface Pagination {
  currentPage: number;
  itemsPerPage: number;
}

interface State {
  entities: Book[];
  pagination: Pagination;
}

interface AppState {
  books: State;
}

const appStateMock: AppState = {
  books: {
    entities: [{ title: 'Book 1' }, { title: 'Book 2' }, { title: 'Book 3' }],
    pagination: { currentPage: 2, itemsPerPage: 100 },
  },
};

describe('createChildSelector', () => {
  it('should create child selectors', () => {
    const selectBooksState = createFeatureSelector<State>('books');
    const selectBooks = createChildSelector(selectBooksState, 'entities');
    const selectPagination = createChildSelector(selectBooksState, 'pagination');
    const selectCurrentPage = createChildSelector(selectPagination, 'currentPage');
    const selectItemsPerPage = createChildSelector(selectPagination, 'itemsPerPage');

    expect(selectBooks(appStateMock)).toBe(appStateMock.books.entities);
    expect(selectPagination(appStateMock)).toBe(appStateMock.books.pagination);
    expect(selectCurrentPage(appStateMock)).toBe(appStateMock.books.pagination.currentPage);
    expect(selectItemsPerPage(appStateMock)).toBe(appStateMock.books.pagination.itemsPerPage);
  });
});
