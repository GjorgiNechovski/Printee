export class Pageable {
  constructor(
    public pageNumber: number,
    public pageSize: number,
    public sort: Sort,
    public offset: number,
    public paged: boolean,
    public unpaged: boolean
  ) {}
}

export class Sort {
  constructor(
    public empty: boolean,
    public sorted: boolean,
    public unsorted: boolean
  ) {}
}
