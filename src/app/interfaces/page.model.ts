export interface Page<T> {
  /**
   * The list of items on the current page.
   */
  content: T[];

  /**
   * The number of elements on the current page.
   */
  numberOfElements: number;

  /**
   * Total number of pages available.
   */
  totalPages: number;

  /**
   * Total number of elements across all pages.
   */
  totalElements: number;

  /**
   * Maximum number of elements per page (page size).
   */
  size: number;

  /**
   * Current page index (0-based).
   */
  number: number;

  /**
   * Indicates whether this is the last page.
   */
  last: boolean;

  /**
   * Indicates whether this is the first page.
   */
  first: boolean;

  /**
   * Indicates whether the page has no content.
   */
  empty: boolean;

  [key: string]: any;
}
