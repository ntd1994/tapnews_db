import moment from "moment";
import { type PagedList } from "~/models/pagination.model";

export const formatNewsDate = (date: string | Date) => {
    return moment(date).format('DD-MM-YYYY')
}

export const replaceAllHtmlTag = (string?: string) => {
    return string?.replaceAll(/(<([^>]+)>)/ig, '')
}

export function generateSubPages<T>(pageList: PagedList<T>): number[] {
    let middlePage = Math.min(Math.max(pageList?.page, 3), pageList?.totalPage - 2);
    let startPage = Math.max(middlePage - 1, 2);
    let endPage = Math.min(middlePage + 1, pageList?.totalPage - 1);
    const pages = [];
  
    for(let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
}


export const convertBackEndUrlToIMGEIX = (url: string, w: string = 'auto', h: string = 'auto'): string  => {
    if (url) {
      const separate = url.split('.com/')
      separate[0] = 'https://ddl-6879.imgix.net/'
      url = separate.join('') + `?h=${h}&w=${w}&auto=format`
    }

    return url
  }