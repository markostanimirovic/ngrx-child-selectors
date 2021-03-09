import { createFeatureSelector, Selector } from '@ngrx/store';
import { createChildSelectors } from './create-child-selectors';

interface Musician {
  name: string;
  instrument: 'guitar' | 'bass' | 'drums';
}

interface Pagination {
  currentPage: number;
  itemsPerPage: number;
}

interface State {
  entities: Musician[];
  loading: boolean;
  searchTerm: string;
  pagination: Pagination;
}

interface AppState {
  musicians: State;
}

const appStateMock: AppState = {
  musicians: {
    entities: [
      { name: 'Marko', instrument: 'guitar' },
      { name: 'John', instrument: 'bass' },
      { name: 'Jimmy', instrument: 'drums' },
    ],
    loading: false,
    searchTerm: 'search',
    pagination: { currentPage: 1, itemsPerPage: 10 },
  },
};

describe('createChildSelectors', () => {
  it('should create child selectors when the selected keys are passed as a second argument', () => {
    const selectMusiciansState: Selector<AppState, State> = state => state.musicians;
    const { selectLoading, selectPagination } = createChildSelectors(selectMusiciansState, [
      'loading',
      'pagination',
    ]);
    const { selectCurrentPage, selectItemsPerPage } = createChildSelectors(selectPagination, [
      'currentPage',
      'itemsPerPage',
    ]);

    expect(selectLoading(appStateMock)).toBe(appStateMock.musicians.loading);
    expect(selectPagination(appStateMock)).toBe(appStateMock.musicians.pagination);
    expect(selectCurrentPage(appStateMock)).toBe(appStateMock.musicians.pagination.currentPage);
    expect(selectItemsPerPage(appStateMock)).toBe(appStateMock.musicians.pagination.itemsPerPage);
  });

  it('should create child selectors when the object with the selected keys is passed as a second argument', () => {
    const selectMusiciansState = createFeatureSelector<State>('musicians');
    const {
      selectEntities,
      selectLoading,
      selectSearchTerm,
      selectPagination,
    } = createChildSelectors(selectMusiciansState, appStateMock.musicians);
    const { selectCurrentPage, selectItemsPerPage } = createChildSelectors(
      selectPagination,
      appStateMock.musicians.pagination,
    );

    expect(selectEntities(appStateMock)).toBe(appStateMock.musicians.entities);
    expect(selectLoading(appStateMock)).toBe(appStateMock.musicians.loading);
    expect(selectSearchTerm(appStateMock)).toBe(appStateMock.musicians.searchTerm);
    expect(selectPagination(appStateMock)).toBe(appStateMock.musicians.pagination);
    expect(selectCurrentPage(appStateMock)).toBe(appStateMock.musicians.pagination.currentPage);
    expect(selectItemsPerPage(appStateMock)).toBe(appStateMock.musicians.pagination.itemsPerPage);
  });
});
